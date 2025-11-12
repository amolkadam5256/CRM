import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaStickyNote,
  FaSignOutAlt,
  FaChevronDown,
  FaBars,
} from 'react-icons/fa';
import Images from '../../assets/images/images';

const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced profile menu items
  const profileMenuItems = [
    {
      label: 'My Profile',
      path: '/profile',
      icon: <FaUserCircle className="text-blue-500" />,
      description: 'View and edit your profile'
    },
    {
      label: 'My Notes',
      path: '/notes',
      icon: <FaStickyNote className="text-green-500" />,
      badge: '12'
    },
    {
      label: 'Notification Settings',
      path: '/notifications',
      icon: <FaBell className="text-purple-500" />
    },
    {
      label: 'Logout',
      path: '/logout',
      icon: <FaSignOutAlt className="text-gray-500" />,
      danger: true
    },
  ];

  // Enhanced notifications data
  const notifications = [
    {
      id: 1,
      text: 'New lead assigned from website',
      time: '5 min ago',
      unread: true,
      type: 'lead',
      icon: '🎯',
      priority: 'high'
    },
    {
      id: 2,
      text: 'Property viewing scheduled for tomorrow',
      time: '1 hour ago',
      unread: true,
      type: 'calendar',
      icon: '📅',
      priority: 'medium'
    },
    {
      id: 3,
      text: 'Document signed successfully by client',
      time: '2 hours ago',
      unread: false,
      type: 'document',
      icon: '📝',
      priority: 'low'
    },
    {
      id: 4,
      text: 'Monthly sales target achieved!',
      time: '1 day ago',
      unread: false,
      type: 'achievement',
      icon: '🏆',
      priority: 'high'
    },
  ];

  // Enhanced messages data
  const messages = [
    {
      id: 1,
      text: 'Sarah Johnson: Regarding property tour tomorrow...',
      time: '10 min ago',
      unread: true,
      avatar: 'SJ',
      status: 'online'
    },
    {
      id: 2,
      text: 'Mike Wilson: Contract discussion for downtown apartment',
      time: '1 hour ago',
      unread: true,
      avatar: 'MW',
      status: 'away'
    },
    {
      id: 3,
      text: 'Emma Davis: Follow-up on beach house proposal',
      time: '3 hours ago',
      unread: false,
      avatar: 'ED',
      status: 'offline'
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <>
      {/* Enhanced Navbar */}
      <nav className={`fixed w-full z-40 top-0 transition-all duration-500 ${scrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/60'
        : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/40'
        }`}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between">

            {/* Left Section with Menu Toggle */}
            <div className="flex items-center space-x-8">
              <button
                onClick={onToggleSidebar}
                className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                title="Toggle Sidebar"
              >
                <FaBars size={16} />
              </button>

              {/* Optional: Add your logo/brand here 
              */}
              <div className="hidden md:flex items-center">
                {/* <img
                  src={Images.favicon1}
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                /> */}
                <h2 className='text-black font-bold text-lg bg-gradient-to-r from-black to-gray-700 bg-clip-text pl-3'>Majestic Realties</h2>

              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">

              {/* Messages Dropdown - Enhanced */}
              <div className="relative" ref={messagesRef}>
                <button
                  onClick={() => {
                    setMessagesOpen(!messagesOpen);
                    setNotificationsOpen(false);
                  }}
                  className="relative p-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg group"
                  title="Messages"
                >
                  <FaEnvelope size={16} />
                  {messages.some(msg => msg.unread) && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse border-2 border-white">
                      {messages.filter(msg => msg.unread).length}
                    </span>
                  )}
                </button>

                {messagesOpen && (
                  <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl border border-gray-200/60 py-3 z-50 animate-fade-in backdrop-blur-lg bg-white/95">
                    <div className="px-5 py-3 border-b border-gray-200/60">
                      <div className="flex items-center justify-between">
                        <h3 className="text-black font-bold text-lg flex items-center">
                          <FaEnvelope className="mr-3 text-blue-500" />
                          Messages
                          <span className="ml-2 bg-blue-500 text-white text-sm px-2.5 py-1">
                            {messages.filter(msg => msg.unread).length} New
                          </span>
                        </h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                          View All
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group ${message.unread ? 'bg-blue-50/50' : ''
                            }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                {message.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(message.status)} border-2 border-white`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 font-medium leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                                {message.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-2 flex items-center">
                                <span className={`w-2 h-2 mr-2 ${message.unread ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></span>
                                {message.time}
                              </p>
                            </div>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Dropdown - Enhanced */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setMessagesOpen(false);
                  }}
                  className="relative p-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  title="Notifications"
                >
                  <FaBell size={16} />
                  {notifications.some(notif => notif.unread) && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse border-2 border-white">
                      {notifications.filter(notif => notif.unread).length}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl border border-gray-200/60 py-3 z-50 animate-fade-in backdrop-blur-lg bg-white/95">
                    <div className="px-5 py-3 border-b border-gray-200/60">
                      <div className="flex items-center justify-between">
                        <h3 className="text-black font-bold text-lg flex items-center">
                          <FaBell className="mr-3 text-blue-500" />
                          Notifications
                          <span className="ml-2 bg-blue-500 text-white text-sm px-2.5 py-1">
                            {notifications.filter(notif => notif.unread).length} New
                          </span>
                        </h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                          Mark All Read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group ${notification.unread ? 'bg-blue-50/50' : ''
                            }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="text-2xl">{notification.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                {notification.text}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500 flex items-center">
                                  <span className={`w-2 h-2 mr-2 ${getPriorityColor(notification.priority)}`}></span>
                                  {notification.time}
                                </p>
                                {notification.unread && (
                                  <span className="bg-blue-500 text-white text-xs px-2 py-1 font-semibold">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300/50 px-4 py-2.5 hover:from-blue-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:from-white group-hover:to-white group-hover:text-blue-600 transition-all duration-300">
                      AK
                    </div>
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                      Amol Kadam
                    </p>
                    <p className="text-xs text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                      Sales Manager
                    </p>
                  </div>
                  <FaChevronDown
                    className={`text-gray-400 transform transition-all duration-300 group-hover:text-white ${profileMenuOpen ? 'rotate-180' : ''
                      }`}
                    size={12}
                  />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl border border-gray-200/60 py-3 z-50 animate-fade-in backdrop-blur-lg bg-white/95">
                    {/* Enhanced Profile Header */}
                    <div className="px-5 py-4 border-b border-gray-200/60 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            <img src={Images.favicon1} alt="" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg">Amol Kadam</p>
                          <p className="text-sm text-gray-600 truncate">amol.kadam@majesticrealties.in</p>
                          <div className="flex items-center mt-1">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 font-semibold">
                              Sales Manager
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Profile Menu Items */}
                    <div className="py-2">
                      {profileMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action || (() => { })}
                          className={`flex items-center justify-between w-full px-5 py-3 text-sm transition-all duration-300 group ${item.danger
                            ? 'hover:bg-red-50 hover:text-red-600'
                            : item.premium
                              ? 'hover:bg-yellow-50 hover:text-yellow-600'
                              : 'hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`transition-all duration-300 transform group-hover:scale-110 ${item.premium ? 'text-yellow-500' : ''
                              }`}>
                              {item.icon}
                            </span>
                            <div className="text-left">
                              <span className={`font-medium ${item.premium ? 'text-yellow-600' : ''
                                }`}>
                                {item.label}
                              </span>
                              {item.description && (
                                <p className="text-xs text-gray-500 group-hover:text-current mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 font-semibold">
                                {item.badge}
                              </span>
                            )}
                            {item.premium && (
                              <FaCrown className="text-yellow-500 text-sm" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Custom Styles */}
      <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
    </>
  );
};

export default Navbar;