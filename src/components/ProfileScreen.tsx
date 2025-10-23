import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { 
  Trophy, 
  Zap, 
  Star, 
  Award, 
  Target, 
  Crown,
  Flame,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Brain
} from 'lucide-react';
import { tribes } from './TribeSelectionScreen';
import type { User } from '../App';

interface ProfileScreenProps {
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

const mockAchievements = [
  { id: 1, name: 'Birinchi qadamlar', description: 'Birinchi topshiriqni bajaring', icon: Star, unlocked: true, color: 'text-blue-400' },
  { id: 2, name: 'Yangi yulduz', description: '5-darajaga erishing', icon: Sparkles, unlocked: true, color: 'text-purple-400' },
  { id: 3, name: 'Jamoa o\'yinchisi', description: 'Birinchi klubga qo\'shiling', icon: Users, unlocked: true, color: 'text-green-400' },
  { id: 4, name: 'Bilim izlovchi', description: '10 ta sinovni bajaring', icon: Brain, unlocked: false, color: 'text-slate-600' },
  { id: 5, name: 'Chempion', description: 'Top 10 reytingga kirish', icon: Trophy, unlocked: true, color: 'text-amber-400' },
  { id: 6, name: 'Afsonaviy', description: 'MVP bo\'ling', icon: Crown, unlocked: false, color: 'text-slate-600' },
  { id: 7, name: 'Yonib turibdi', description: '7 kunlik seriyani saqlang', icon: Flame, unlocked: true, color: 'text-orange-400' },
  { id: 8, name: 'Himoyachi', description: '5 qabila a\'zosiga yordam bering', icon: Shield, unlocked: false, color: 'text-slate-600' },
];

const mockChallenges = [
  { title: 'AI tadqiqot maqolasi', status: 'Jarayonda', progress: 65, xp: 300 },
  { title: 'Hackathon g\'olibi', status: 'Bajarildi', progress: 100, xp: 500 },
  { title: 'UI/UX portfolio', status: 'Bajarildi', progress: 100, xp: 200 },
  { title: 'Kod optimallashtirish', status: 'Jarayonda', progress: 40, xp: 150 },
];

const mockTribeStats = [
  { label: 'Jami a\'zolar', value: '156', icon: Users },
  { label: 'O\'rtacha daraja', value: '4.2', icon: TrendingUp },
  { label: 'Yutilgan raqobatlar', value: '23', icon: Trophy },
  { label: 'Faol klublar', value: '8', icon: Star },
];

export default function ProfileScreen({ user }: ProfileScreenProps) {
  const tribeColor = getTribeColor(user.tribe);
  const tribeGradient = getTribeGradient(user.tribe);
  const nextLevelXP = user.level * 500;
  const xpProgress = (user.xp % 500) / 500 * 100;
  
  // Get tribe info
  const currentTribe = tribes.find(t => t.name === user.tribe);
  const tribeRank = user.rank;
  const tribeTotalMembers = currentTribe?.memberCount || 0;

  return (
    <div className="min-h-screen bg-transparent p-4 space-y-6 pb-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-slate-700 backdrop-blur-sm relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute inset-0 bg-gradient-to-br ${tribeGradient}`} />
          </div>

          {/* Profile Content */}
          <div className="relative">
            <div className="flex items-start gap-6 mb-6">
              {/* Avatar with Level Ring */}
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    stroke="#334155"
                    strokeWidth="4"
                    fill="none"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="44"
                    stroke={tribeColor}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - xpProgress / 100)}`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - xpProgress / 100) }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${tribeGradient} flex items-center justify-center text-white text-3xl`}>
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl text-white mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm bg-gradient-to-r ${tribeGradient} text-white mb-2`}>
                  {user.tribe} qabilasi
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Mening reytingim: {tribeRank}/{tribeTotalMembers} in {user.tribe} qabilasida
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-5 h-5" style={{ color: tribeColor }} />
                    <div>
                      <div className="text-xs text-slate-400">Tajriba</div>
                      <div className="text-white">{user.xp} XP</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-xs text-slate-400">Reyting</div>
                      <div className="text-white">#{user.rank}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Target className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-xs text-slate-400">Daraja</div>
                      <div className="text-white">{user.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Award className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-xs text-slate-400">Yutuqlar</div>
                      <div className="text-white">5/8</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div>
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Level {user.level}</span>
                <span>{user.xp % 500} / 500 XP to Level {user.level + 1}</span>
              </div>
              <Progress 
                value={xpProgress} 
                className="h-3" 
                style={{ 
                  '--progress-background': tribeColor 
                } as React.CSSProperties} 
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="w-full bg-slate-800/60 border border-slate-700 p-1 grid grid-cols-3">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600">
              <Award className="w-4 h-4 mr-1" />
              Yutuqlar
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-1" />
              Sinovlar
            </TabsTrigger>
            <TabsTrigger value="tribe" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-1" />
              Qabila
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockAchievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Card className={`p-4 ${achievement.unlocked ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-900/40 border-slate-800'} border text-center hover:scale-105 transition-transform`}>
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${achievement.unlocked ? `bg-gradient-to-br ${tribeGradient}` : 'bg-slate-800'} flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${achievement.color}`} />
                      </div>
                      <h4 className={`text-sm mb-1 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-xs ${achievement.unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <Badge className="mt-2 bg-green-500/20 text-green-400 border-0 text-xs">
                          Ochilgan
                        </Badge>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="mt-4 space-y-3">
            {mockChallenges.map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="p-4 bg-slate-800/60 border border-slate-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{challenge.title}</h4>
                      <Badge className={challenge.status === 'Bajarildi' 
                        ? 'bg-green-500/20 text-green-400 border-0' 
                        : 'bg-blue-500/20 text-blue-400 border-0'
                      }>
                        {challenge.status}
                      </Badge>
                    </div>
                    <Badge className={`bg-gradient-to-r ${tribeGradient} border-0 text-white`}>
                      +{challenge.xp} XP
                    </Badge>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                  <p className="text-xs text-slate-400 mt-2">{challenge.progress}% Bajarildi</p>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Tribe Stats Tab */}
          <TabsContent value="tribe" className="mt-4">
            <Card className={`p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-${user.tribe?.toLowerCase()}-500/30 mb-4`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tribeGradient} flex items-center justify-center`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl text-white bg-gradient-to-r ${tribeGradient} bg-clip-text text-transparent`}>
                    {user.tribe} qabilasi
                  </h3>
                  <p className="text-sm text-slate-400">Qabilangizning natijalari</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {mockTribeStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="p-4 bg-slate-900/50 rounded-lg"
                    >
                      <Icon className="w-5 h-5 mb-2" style={{ color: tribeColor }} />
                      <div className="text-2xl text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Tribe Ranking */}
            <Card className="p-4 bg-slate-800/60 border border-slate-700">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Qabila reytingi
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Umumiy pozitsiya</span>
                  <Badge className={`bg-gradient-to-r ${tribeGradient} border-0 text-white`}>
                    #2
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Qabila XP</span>
                  <span className="text-white">45,680</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Faol a'zolar</span>
                  <span className="text-white">156</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
