import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch, API_BASE } from '../utils/api';
import { io } from 'socket.io-client';

const VideoCall = ({ user }) => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchBookingDetails();
  }, [bookingId, user, navigate]);

  useEffect(() => {
    if (booking) {
      // Init video
      loadJitsiMeet();

      // Init socket chat
      const base = API_BASE || window.location.origin;
      const socket = io(base, { transports: ['websocket'], reconnection: true });
      socketRef.current = socket;

      socket.on('connect', () => setSocketConnected(true));
      socket.on('disconnect', () => setSocketConnected(false));

      socket.emit('join-room', { bookingId, user: { id: user.id, name: user.name, role: user.role } });

      socket.on('chat-message', (payload) => {
        setMessages((prev) => [...prev, payload]);
      });

      socket.on('typing', ({ user: typingUser, isTyping }) => {
        if (typingUser?.id !== user.id) setPeerTyping(!!isTyping);
      });

      return () => {
        try { socket.disconnect(); } catch (e) { /* noop */ }
        if (jitsiApiRef.current) {
          jitsiApiRef.current.dispose();
        }
      };
    }
  }, [booking]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    // Use direct scroll to avoid layout jumping that can hide the chat panel
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const fetchBookingDetails = async () => {
    try {
      const response = await apiFetch(`/api/booking/${bookingId}`);
      if (!response.ok) {
        throw new Error('Booking not found');
      }
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Failed to load session details');
      navigate(-1);
    }
  };

  const loadJitsiMeet = () => {
    // Load Jitsi Meet API script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => initializeJitsi();
    document.body.appendChild(script);
  };

  const initializeJitsi = () => {
    if (!window.JitsiMeetExternalAPI) {
      console.error('Jitsi Meet API not loaded');
      return;
    }

    const domain = 'meet.jit.si';
    const options = {
      roomName: `MentorConnect_${bookingId}`,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: user.name
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        disableDeepLinking: true
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'profile',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'download',
          'help',
          'mute-everyone'
        ]
      }
    };

    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    // Listen for when the user hangs up
    jitsiApiRef.current.addEventListener('readyToClose', () => {
      handleEndCall();
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: user.name,
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Optimistic update
    setMessages((prev) => [...prev, message]);

    // Emit to room
    try {
      socketRef.current?.emit('chat-message', { bookingId, message });
    } catch (_) {}
    setNewMessage('');
  };

  const handleTyping = (value) => {
    setNewMessage(value);
    const wasTyping = isTyping;
    if (!wasTyping) {
      setIsTyping(true);
      socketRef.current?.emit('typing', { bookingId, user: { id: user.id, name: user.name }, isTyping: true });
      // Stop typing indicator after 1.5s of inactivity
      setTimeout(() => {
        setIsTyping(false);
        socketRef.current?.emit('typing', { bookingId, user: { id: user.id, name: user.name }, isTyping: false });
      }, 1500);
    }
  };

  const handleEndCall = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
    }
    navigate(user.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard');
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  const otherUser = user.role === 'mentor' ? booking.menteeId : booking.mentorId;

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-bold">Mentoring Session</h1>
          <p className="text-sm text-gray-300">
            {user.role === 'mentor' ? 'Mentee' : 'Mentor'}: {otherUser?.name} | {booking.date} at {booking.timeSlot}
          </p>
        </div>
        <button
          onClick={handleEndCall}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
        >
          End Call
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-x-hidden items-stretch">
        {/* Video Container */}
        <div className={`flex-grow transition-all duration-300 ${isChatOpen ? 'mr-0' : ''}`}>
          <div ref={jitsiContainerRef} className="w-full h-full bg-black"></div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-[320px] bg-white flex flex-col shadow-xl h-full border-l border-gray-200 relative z-10">
            {/* Chat Header */}
            <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
              <h3 className="font-semibold">Chat</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-indigo-700 p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
            >
              {!socketConnected && (
                <div className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                  Connecting chat...
                </div>
              )}
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 text-sm mt-4">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === user.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                      <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
              {peerTyping && (
                <div className="text-xs text-gray-500 px-2">Typing...</div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Toggle Chat Button (when closed) */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="absolute right-4 top-24 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition"
          >
            💬 Open Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
