import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import TribeSelectionScreen from './components/TribeSelectionScreen';
import HomeScreen from './components/HomeScreen';
import ForumScreen from './components/ForumScreen';
import ClubsScreen from './components/ClubsScreen';
import ProfileScreen from './components/ProfileScreen';
import { Home, MessageSquare, Users, UserCircle } from 'lucide-react';

export type Tribe = 'Luminary' | 'Vanguard' | 'Oracle' | 'Forge';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  tribe: Tribe | null;
  xp: number;
  level: number;
  rank: number;
}

type Screen = 'splash' | 'login' | 'tribe' | 'home' | 'forum' | 'clubs' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    age: 0,
    tribe: null,
    xp: 1250,
    level: 3,
    rank: 12,
  });

  // Auto-transition from splash to login
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (firstName: string, lastName: string, age: number) => {
    setUser((prev) => ({
      ...prev,
      firstName,
      lastName,
      age,
    }));
    setCurrentScreen('tribe');
  };

  const handleSelectTribe = (tribe: Tribe) => {
    setUser((prev) => ({
      ...prev,
      tribe,
    }));
    setCurrentScreen('home');
  };

  const navItems = [
    { id: 'home' as Screen, label: 'Bosh sahifa', icon: Home },
    { id: 'forum' as Screen, label: 'Forum', icon: MessageSquare },
    { id: 'clubs' as Screen, label: 'Klublar', icon: Users },
    { id: 'profile' as Screen, label: 'Profil', icon: UserCircle },
  ];

  const getTribeColor = (tribe: string | null) => {
    const colors: Record<string, string> = {
      Luminary: '#FACC15',
      Vanguard: '#3B82F6',
      Oracle: '#22C55E',
      Forge: '#EF4444',
    };
    return colors[tribe || ''] || '#FACC15';
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'tribe':
        return <TribeSelectionScreen onSelectTribe={handleSelectTribe} />;
      case 'home':
        return <HomeScreen user={user} />;
      case 'forum':
        return <ForumScreen user={user} />;
      case 'clubs':
        return <ClubsScreen user={user} />;
      case 'profile':
        return <ProfileScreen user={user} />;
      default:
        return <SplashScreen />;
    }
  };

  const showNavigation = ['home', 'forum', 'clubs', 'profile'].includes(currentScreen);

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="size-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {showNavigation && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
          className="bg-slate-900/90 backdrop-blur-lg border-t border-slate-700 px-4 py-3 safe-area-inset-bottom"
        >
          <div className="max-w-md mx-auto flex items-center justify-around gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              const tribeColor = getTribeColor(user.tribe);

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    isActive ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-6 h-6 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                      style={isActive ? { color: tribeColor } : {}}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ backgroundColor: tribeColor }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                    style={isActive ? { color: tribeColor } : {}}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </div>
  );
}
