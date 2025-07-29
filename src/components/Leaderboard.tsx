import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Leaf, Star } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  sustainableActions: number;
  streak: number;
  achievements: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  completed: boolean;
}

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard');
  
  const currentUser: User = {
    id: 'current',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    points: 1250,
    rank: 8,
    sustainableActions: 47,
    streak: 12,
    achievements: ['First Scan', 'Eco Warrior', 'Sustainable Shopper']
  };

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Green',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 2850,
      rank: 1,
      sustainableActions: 89,
      streak: 28,
      achievements: ['Eco Champion', 'Sustainable Legend']
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 2640,
      rank: 2,
      sustainableActions: 76,
      streak: 22,
      achievements: ['Eco Warrior', 'Green Guru']
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 2380,
      rank: 3,
      sustainableActions: 68,
      streak: 18,
      achievements: ['Sustainability Star', 'Eco Warrior']
    },
    {
      id: '4',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 1980,
      rank: 4,
      sustainableActions: 61,
      streak: 15,
      achievements: ['Green Shopper', 'Eco Warrior']
    },
    {
      id: '5',
      name: 'Lisa Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      points: 1750,
      rank: 5,
      sustainableActions: 54,
      streak: 11,
      achievements: ['Sustainable Scanner', 'Eco Warrior']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Scan',
      description: 'Complete your first product scan',
      icon: '🔍',
      progress: 1,
      total: 1,
      completed: true
    },
    {
      id: '2',
      title: 'Eco Warrior',
      description: 'Scan 25 products',
      icon: '🌱',
      progress: 25,
      total: 25,
      completed: true
    },
    {
      id: '3',
      title: 'Sustainable Shopper',
      description: 'Buy 10 sustainable products',
      icon: '🛍️',
      progress: 10,
      total: 10,
      completed: true
    },
    {
      id: '4',
      title: 'Green Guru',
      description: 'Maintain a 30-day streak',
      icon: '🏆',
      progress: 12,
      total: 30,
      completed: false
    },
    {
      id: '5',
      title: 'Eco Champion',
      description: 'Reach 100 sustainable actions',
      icon: '🌟',
      progress: 47,
      total: 100,
      completed: false
    },
    {
      id: '6',
      title: 'Community Leader',
      description: 'Help 50 people make sustainable choices',
      icon: '👥',
      progress: 23,
      total: 50,
      completed: false
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-gray-600 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default: return 'bg-gradient-to-r from-green-500 to-green-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Community Hub
        </h1>
        <p className="text-gray-600">
          Connect with fellow eco-warriors and track your progress
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'achievements' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Achievements
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.rank}</div>
                <div className="text-sm opacity-90">Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.points}</div>
                <div className="text-sm opacity-90">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.sustainableActions}</div>
                <div className="text-sm opacity-90">Actions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.streak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="mr-2 text-green-600" size={20} />
                Top Eco-Warriors
              </h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getRankIcon(user.rank)}
                      </div>
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-600">
                          {user.sustainableActions} actions • {user.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{user.points}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Current User */}
              <div className="p-4 bg-green-50 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-gray-600 font-bold">#{currentUser.rank}</span>
                    </div>
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{currentUser.name}</div>
                      <div className="text-sm text-gray-600">
                        {currentUser.sustainableActions} actions • {currentUser.streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{currentUser.points}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Your Achievements
            </h2>
            <p className="text-gray-600">
              {achievements.filter(a => a.completed).length} of {achievements.length} completed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.completed && (
                    <Star className="text-yellow-500 fill-current" size={20} />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {achievement.progress} / {achievement.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        achievement.completed ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;