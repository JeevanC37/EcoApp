import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit2, Camera, Leaf } from 'lucide-react';

const Profile: React.FC = () => {
  const [notifications, setNotifications] = useState({
    scanReminders: true,
    marketplaceUpdates: true,
    leaderboardUpdates: false,
    achievements: true
  });

  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: 'March 2024',
    totalScans: 47,
    sustainableChoices: 34,
    co2Saved: 12.5,
    points: 1250
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const stats = [
    { label: 'Total Scans', value: user.totalScans, icon: '🔍' },
    { label: 'Sustainable Choices', value: user.sustainableChoices, icon: '🌱' },
    { label: 'CO₂ Saved', value: `${user.co2Saved}kg`, icon: '🌍' },
    { label: 'Points Earned', value: user.points, icon: '⭐' }
  ];

  return (
    <div className="max-w-md mx-auto p-6 pb-20 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <button className="absolute bottom-0 right-0 bg-white text-green-600 rounded-full p-1 shadow-sm">
              <Camera size={12} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-green-100">{user.email}</p>
            <p className="text-green-100 text-sm">Member since {user.joinDate}</p>
          </div>
          <button className="text-white hover:text-green-100">
            <Edit2 size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Summary */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2 flex items-center">
          <Leaf className="mr-2" size={18} />
          Your Environmental Impact
        </h3>
        <p className="text-sm text-green-700">
          Your sustainable choices have helped reduce carbon emissions by {user.co2Saved}kg CO₂ 
          this month. Keep up the great work!
        </p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Settings className="mr-2" size={18} />
            Settings
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {/* Notifications */}
          <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <Bell className="mr-2" size={16} />
              Notifications
            </h4>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <button
                    onClick={() => handleNotificationToggle(key)}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      value ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      value ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-gray-200">
            <button className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="mr-3 text-gray-500" size={18} />
                <span className="text-gray-700">Privacy & Security</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle className="mr-3 text-gray-500" size={18} />
                <span className="text-gray-700">Help & Support</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between text-red-600">
              <div className="flex items-center">
                <LogOut className="mr-3" size={18} />
                <span>Sign Out</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;