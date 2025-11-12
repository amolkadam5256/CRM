import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaUserCircle,
  FaUserTie,
  FaBuilding,
  FaUserFriends,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaList,
  FaTable,
  FaFileAlt,
  FaChartPie,
  FaCubes,
  FaPlug,
  FaEllipsisH,
  FaUsers,
  FaHandshake,
  FaTasks,
  FaEnvelope,
  FaCog,
  FaPhone,
  FaBullhorn  ,
  FaMapMarkedAlt ,
} from 'react-icons/fa';
import Images from '../../assets/images/images';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (menuLabel) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const realEstateMenu  = [
    {
      label: 'Home',
      icon: <FaHome className="text-lg" />,
      path: '/admin',
    },

    {
      label: 'Users',
      icon: <FaUserCircle className="text-lg" />,
      submenu: [
        { label: 'All Users', path: '/users' },
        { label: 'Create User', path: '/users/create' },
        { label: 'Edit / Delete', path: '/users/manage' },
        { label: 'Roles & Permissions', path: '/users/roles' },
        { label: 'Import Users', path: '/users/import' },
      ],
    },

    {
      label: 'Leads',
      icon: <FaUserTie className="text-lg" />,
      submenu: [
        { label: 'All Leads', path: '/leads' },
        { label: 'Create Lead', path: '/leads/create' },
        { label: 'Assigned Leads', path: '/leads/assigned' },
        { label: 'Lead Sources', path: '/leads/sources' },
        { label: 'Follow-ups', path: '/leads/follow-ups' },
        { label: 'Import Leads', path: '/leads/import' },
        { label: 'Reports', path: '/leads/reports' },
      ],
    },

    {
      label: 'Documents',
      icon: <FaFileAlt className="text-lg" />,
      path: '/documents',
    },

    {
      label: 'Visits',
      icon: <FaMapMarkedAlt className="text-lg" />,
      path: '/visits',
    },

    {
      label: 'Projects',
      icon: <FaBuilding className="text-lg" />,
      submenu: [
        { label: 'All Projects', path: '/projects' },
        { label: 'Create Project', path: '/projects/create' },
        { label: 'Edit / Delete', path: '/projects/manage' },
        { label: 'Project Timeline', path: '/projects/timeline' },
        { label: 'Project Budget', path: '/projects/budget' },
        { label: 'Project Documents', path: '/projects/documents' },
      ],
    },

    {
      label: 'Reports',
      icon: <FaChartLine className="text-lg" />,
      path: '/reports',
    },
    
    {
      label: 'Reports',
      icon: <FaChartLine className="text-lg" />,
      path: '/reports',
    },
  ];


  const MenuItem = ({ item }) => (
    <Link
      to={item.path}
      className={`flex items-center justify-between group transition-all duration-300 py-3 px-6 mx-2 mb-1 relative overflow-hidden ${location.pathname === item.path
        ? 'bg-yellow-50 text-black shadow-sm border-l-4 border-yellow-500'
        : 'text-gray-700 hover:bg-yellow-50 hover:text-black hover:border-l-4 hover:border-yellow-400'
        }`}
    >
      <div
        className={`absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${location.pathname === item.path ? 'opacity-20' : ''
          }`}
      ></div>

      <div className="flex items-center space-x-3 z-10">
        <span
          className={`transition-colors duration-300 ${location.pathname === item.path
            ? 'text-yellow-600'
            : 'text-gray-500 group-hover:text-yellow-600'
            }`}
        >
          {item.icon}
        </span>
        {!isCollapsed && (
          <span className="font-medium text-sm transition-colors duration-300">
            {item.label}
          </span>
        )}
      </div>

      {!isCollapsed && location.pathname === item.path && (
        <div className="w-2 h-2 bg-yellow-500 animate-pulse"></div>
      )}
    </Link>
  );

  const SubmenuItem = ({ item, level = 0 }) => (
    <Link
      to={item.path}
      className={`flex items-center group transition-all duration-300 py-2 px-6 ml-${level * 4} relative overflow-hidden ${location.pathname === item.path
        ? 'bg-yellow-50 text-black shadow-sm border-l-2 border-yellow-500'
        : 'text-gray-600 hover:bg-yellow-50 hover:text-black hover:border-l-2 hover:border-yellow-400'
        }`}
    >
      <div
        className={`absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${location.pathname === item.path ? 'opacity-20' : ''
          }`}
      ></div>

      <div className="flex items-center space-x-3 z-10">
        <div className="w-3 flex justify-center">
          <div className="w-1 h-1 bg-gray-400 group-hover:bg-yellow-500 transition-colors duration-300"></div>
        </div>
        <span
          className={`text-sm transition-colors duration-300 ${location.pathname === item.path
            ? 'text-black font-medium'
            : 'text-gray-500 group-hover:text-black'
            }`}
        >
          {item.label}
        </span>
      </div>
    </Link>
  );

  const Submenu = ({ item }) => (
    <div className="mb-1">
      <button
        onClick={() => toggleSubmenu(item.label)}
        className={`flex items-center justify-between w-full py-3 px-6 mx-2 mb-1 transition-all duration-300 group relative overflow-hidden ${activeMenu === item.label
          ? 'bg-yellow-50 text-black border-l-4 border-yellow-500'
          : 'text-gray-700 hover:bg-yellow-50 hover:text-black hover:border-l-4 hover:border-yellow-400'
          }`}
      >
        <div
          className={`absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${activeMenu === item.label ? 'opacity-20' : ''
            }`}
        ></div>

        <div className="flex items-center space-x-3 z-10">
          <span
            className={`transition-colors duration-300 ${activeMenu === item.label
              ? 'text-yellow-600'
              : 'text-gray-500 group-hover:text-yellow-600'
              }`}
          >
            {item.icon}
          </span>
          {!isCollapsed && (
            <span className="font-medium text-sm transition-colors duration-300">
              {item.label}
            </span>
          )}
        </div>

        {!isCollapsed && (
          <FaChevronRight
            className={`transform transition-all duration-300 z-10 ${activeMenu === item.label
              ? 'rotate-90 text-yellow-600'
              : 'text-gray-400 group-hover:text-yellow-600'
              }`}
            size={12}
          />
        )}
      </button>

      {!isCollapsed && activeMenu === item.label && (
        <div className="mt-1 space-y-1 animate-fade-in ml-2">
          {item.submenu.map((subItem, index) => (
            <div key={index} className="relative">
              <SubmenuItem item={subItem} level={1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white h-screen flex flex-col transition-all duration-500 ${isCollapsed ? 'w-20' : 'w-64'
        } border-r border-gray-200 shadow-xl fixed left-0 top-0 z-50`}
    >
      <div className="py-5 px-5 border-b border-gray-200">
        <div className="flex items-center justify-between relative">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={Images.favicon} alt="Logo" className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-black font-bold text-lg bg-gradient-to-r from-black to-gray-700 bg-clip-text">
                  RealEstate CRM
                </h2>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 flex items-center justify-center mx-auto">
              <img src={Images.favicon} alt="Logo" className="w-10 h-10" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-1/2 -right-9 transform -translate-y-1/2 p-2 bg-gray-100 text-gray-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center"
          >
            {isCollapsed ? (
              <FaChevronRight size={14} />
            ) : (
              <FaChevronLeft size={14} />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="space-y-3">
          <div>
            <h2
              className={`text-xs uppercase tracking-wider text-gray-400 px-6 mb-2 ${isCollapsed ? 'text-center' : 'text-left'
                }`}
            >
              Manu
            </h2>
            {realEstateMenu.map((item, index) => (
              <div key={index}>
                {item.submenu ? <Submenu item={item} /> : <MenuItem item={item} />}
              </div>
            ))}
          </div>


        </nav>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;