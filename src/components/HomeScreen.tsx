import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Zap, TrendingUp, Star, Users, Target, Sun, Sword, Eye, Hammer } from 'lucide-react';
import TribeInfoModal from './TribeInfoModal';
import { tribes } from './TribeSelectionScreen';
import type { User } from '../App';

interface HomeScreenProps {
  user: User;
}

const getTribeColor = (tribe: string | null) => {
  const colors: Record<string, string> = {
    Luminary: '#FACC15',
    Vanguard: '#3B82F6',
    Oracle: '#22C55E',
    Forge: '#EF4444',
  };
  return colors[tribe || ''] || '#FACC15';
};

const getTribeGradient = (tribe: string | null) => {
  const gradients: Record<string, string> = {
    Luminary: 'from-amber-500 to-yellow-400',
    Vanguard: 'from-blue-600 to-blue-400',
    Oracle: 'from-green-600 to-emerald-400',
    Forge: 'from-red-600 to-orange-500',
  };
  return gradients[tribe || ''] || 'from-purple-500 to-amber-500';
};

const mockLeaderboard = [
  { name: 'Aziza Rahimova', tribe: 'Oracle', xp: 2450, rank: 1 },
  { name: 'Davron Tursunov', tribe: 'Vanguard', xp: 2380, rank: 2 },
  { name: 'Malika Karimova', tribe: 'Luminary', xp: 2250, rank: 3 },
  { name: 'Bekzod Ergashev', tribe: 'Forge', xp: 2100, rank: 4 },
  { name: 'Nilufar Ahmadova', tribe: 'Oracle', xp: 1980, rank: 5 },
];

const mockQuests = [
  { title: '3 ta dasturlash muammosini yeching', reward: 150, progress: 66 },
  { title: 'AI bo\'yicha seminarida ishtirok eting', reward: 200, progress: 0 },
  { title: 'O\'quv guruhiga qo\'shiling', reward: 100, progress: 100 },
  { title: 'Ilmiy maqola topshiring', reward: 300, progress: 45 },
];

const mockActivity = [
  { text: 'Aziza Rahimova "Code Wizards" klubini yaratdi', time: '5 daqiqa oldin', type: 'club' },
  { text: 'Yangi tanlov: Hackathon 2025 e\'lon qilindi!', time: '1 soat oldin', type: 'challenge' },
  { text: 'Davron Tursunov MVP bo\'ldi!', time: '2 soat oldin', type: 'achievement' },
];

const tribeIcons: Record<string, any> = {
  Luminary: Sun,
  Vanguard: Sword,
  Oracle: Eye,
  Forge: Hammer,
};

export default function HomeScreen({ user }: HomeScreenProps) {
  const [selectedTribe, setSelectedTribe] = useState<typeof tribes[0] | null>(null);
  const tribeColor = getTribeColor(user.tribe);
  const tribeGradient = getTribeGradient(user.tribe);
  const nextLevelXP = user.level * 500;
  const xpProgress = (user.xp % 500) / 500 * 100;

  const totalXP = tribes.reduce((sum, t) => sum + t.totalXP, 0);
  const sortedTribes = [...tribes].sort((a, b) => b.totalXP - a.totalXP);

  return (
    <div className="min-h-screen bg-transparent p-4 space-y-6 pb-6">
      {/* Tribe Competition Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`p-4 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/50`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-amber-400 mb-3">Bugun Luminary yetakchilik qilmoqda! ⚡</p>
              
              {/* Animated Tribe Rankings */}
              <div className="space-y-3">
                {sortedTribes.map((tribe, idx) => {
                  const Icon = tribeIcons[tribe.name];
                  const percentage = Math.round((tribe.totalXP / totalXP) * 100);
                  
                  return (
                    <div key={tribe.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{idx + 1}️⃣</span>
                          <button
                            onClick={() => setSelectedTribe(tribe)}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                          >
                            <Icon className="w-4 h-4" style={{ color: tribe.color }} />
                            <span className="text-slate-300">{tribe.name}</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm">{tribe.totalXP.toLocaleString()} XP</span>
                          <span className="text-slate-400 text-xs">({percentage}%)</span>
                        </div>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.1 * idx }}
                        className="relative h-3 bg-slate-800 rounded-full overflow-hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 * idx, type: 'spring' }}
                          className={`h-full bg-gradient-to-r ${tribe.gradient} relative`}
                          style={{
                            boxShadow: idx === 0 ? `0 0 20px ${tribe.color}80` : 'none'
                          }}
                        >
                          {idx === 0 && (
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-white/20"
                            />
                          )}
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Header with XP Ring */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {/* XP Ring */}
            <div className="relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#334155"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke={tribeColor}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - xpProgress / 100)}`}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - xpProgress / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl text-white">{user.level}</div>
                  <div className="text-xs text-slate-400">LVL</div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <div className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-r ${tribeGradient} text-white mb-2`}>
                {user.tribe}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4" style={{ color: tribeColor }} />
                <span>{user.xp} XP</span>
                <span className="text-slate-500">•</span>
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Reyting #{user.rank}</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Daraja {user.level}</span>
              <span>{user.xp % 500} / 500 XP</span>
            </div>
            <Progress value={xpProgress} className="h-2" style={{ 
              '--progress-background': tribeColor 
            } as React.CSSProperties} />
          </div>
        </Card>
      </motion.div>

      {/* Weekly Quests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Haftalik topshiriqlar
          </h3>
        </div>
        <div className="space-y-3">
          {mockQuests.map((quest, idx) => (
            <Card key={idx} className="p-4 bg-slate-800/60 border border-slate-700">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white">{quest.title}</p>
                <Badge className={`bg-gradient-to-r ${tribeGradient} border-0 text-white`}>
                  +{quest.reward} XP
                </Badge>
              </div>
              <Progress value={quest.progress} className="h-2" />
              <p className="text-xs text-slate-400 mt-1">{quest.progress}% Bajarildi</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Eng yaxshi talabalar
          </h3>
        </div>
        <Card className="bg-slate-800/60 border border-slate-700 overflow-hidden">
          <div className="divide-y divide-slate-700">
            {mockLeaderboard.map((player, idx) => (
              <div key={idx} className="p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${idx < 3 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-slate-700'} text-white`}>
                  {idx < 3 ? <Trophy className="w-4 h-4" /> : <span>{idx + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="text-white">{player.name}</p>
                  <p className="text-sm text-slate-400">{player.tribe}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">{player.xp} XP</p>
                  <p className="text-xs text-slate-400">Reyting #{player.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-400" />
            So'ngi faoliyat
          </h3>
        </div>
        <Card className="bg-slate-800/60 border border-slate-700">
          <div className="divide-y divide-slate-700">
            {mockActivity.map((activity, idx) => (
              <div key={idx} className="p-4">
                <p className="text-white text-sm mb-1">{activity.text}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Tribe Info Modal */}
      <TribeInfoModal
        isOpen={!!selectedTribe}
        onClose={() => setSelectedTribe(null)}
        tribe={selectedTribe}
      />
    </div>
  );
}
