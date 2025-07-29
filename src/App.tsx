import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Scanner from './components/Scanner';
import Marketplace from './components/Marketplace';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import { Leaf } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'scanner':
        return <Scanner />;
      case 'marketplace':
        return <Marketplace />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Scanner />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <Leaf className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">SustainChoice</h1>
          <p className="text-green-600">Making sustainable choices simple</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={18} />
              </div>
              <h1 className="text-xl font-bold text-green-800">SustainChoice</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16">
        {renderContent()}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;