import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Users, Trophy, TrendingUp } from 'lucide-react';
import type { Tribe } from '../App';

interface TribeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tribe: {
    name: Tribe;
    motto: string;
    description: string;
    color: string;
    gradient: string;
    icon: React.ComponentType<any>;
    memberCount: number;
    totalXP: number;
    rank: number;
  } | null;
  onJoin?: () => void;
}

const topStudents = {
  Luminary: [
    { name: 'Otabek R.', xp: 1200 },
    { name: 'Dilnoza T.', xp: 1100 },
    { name: 'Azizbek M.', xp: 980 },
    { name: 'Madina N.', xp: 950 },
    { name: 'Jasur S.', xp: 900 },
  ],
  Vanguard: [
    { name: 'Davron T.', xp: 1150 },
    { name: 'Kamola H.', xp: 1050 },
    { name: 'Sardor K.', xp: 920 },
    { name: 'Zilola A.', xp: 880 },
    { name: 'Bobur M.', xp: 850 },
  ],
  Oracle: [
    { name: 'Aziza R.', xp: 1300 },
    { name: 'Shohista B.', xp: 1080 },
    { name: 'Ulugbek N.', xp: 960 },
    { name: 'Feruza S.', xp: 910 },
    { name: 'Rustam O.', xp: 870 },
  ],
  Forge: [
    { name: 'Bekzod E.', xp: 1180 },
    { name: 'Laylo K.', xp: 1020 },
    { name: 'Jamshid R.', xp: 940 },
    { name: 'Nigora T.', xp: 890 },
    { name: 'Timur A.', xp: 860 },
  ],
};

const rankText: Record<number, string> = {
  1: '1-o\'rin',
  2: '2-o\'rin',
  3: '3-o\'rin',
  4: '4-o\'rin',
};

export default function TribeInfoModal({ isOpen, onClose, tribe, onJoin }: TribeInfoModalProps) {
  if (!tribe) return null;

  const Icon = tribe.icon;
  const students = topStudents[tribe.name] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="pointer-events-auto w-full max-w-md max-h-[90vh] overflow-auto"
            >
              <Card className="bg-slate-800/95 border-2 backdrop-blur-lg relative overflow-hidden" style={{ borderColor: `${tribe.color}40` }}>
                {/* Background glow */}
                <div className="absolute inset-0 opacity-10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tribe.gradient}`} />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900/50 hover:bg-slate-900 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* Content */}
                <div className="relative p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    {/* Animated Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${tribe.gradient} rounded-full blur-2xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <div className={`relative bg-gradient-to-r ${tribe.gradient} p-6 rounded-3xl`}>
                          <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Tribe Name */}
                    <h2 className={`text-4xl mb-2 bg-gradient-to-r ${tribe.gradient} bg-clip-text text-transparent`}>
                      {tribe.name}
                    </h2>
                    <p className="text-slate-400 italic mb-4">"{tribe.motto}"</p>
                    <p className="text-slate-300">{tribe.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-3 bg-slate-900/50 border-slate-700 text-center">
                      <Users className="w-5 h-5 mx-auto mb-1" style={{ color: tribe.color }} />
                      <div className="text-white">{tribe.memberCount}</div>
                      <div className="text-xs text-slate-400">A'zolar</div>
                    </Card>
                    <Card className="p-3 bg-slate-900/50 border-slate-700 text-center">
                      <Trophy className="w-5 h-5 mx-auto mb-1" style={{ color: tribe.color }} />
                      <div className="text-white">{tribe.totalXP.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Jami XP</div>
                    </Card>
                    <Card className="p-3 bg-slate-900/50 border-slate-700 text-center">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1" style={{ color: tribe.color }} />
                      <div className="text-white">{rankText[tribe.rank]}</div>
                      <div className="text-xs text-slate-400">Reyting</div>
                    </Card>
                  </div>

                  {/* Top 5 Students */}
                  <div>
                    <h3 className="text-white mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Top 5 Talabalar
                    </h3>
                    <div className="space-y-2">
                      {students.map((student, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <Card className="p-3 bg-slate-900/40 border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${idx < 3 ? `bg-gradient-to-r ${tribe.gradient}` : 'bg-slate-700'}`}
                              >
                                {idx + 1}
                              </div>
                              <span className="text-slate-300">{student.name}</span>
                            </div>
                            <span className="text-white">{student.xp} XP</span>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {onJoin && (
                      <Button
                        onClick={() => {
                          onJoin();
                          onClose();
                        }}
                        className={`flex-1 bg-gradient-to-r ${tribe.gradient} hover:opacity-90 border-0`}
                      >
                        Qo'shilish
                      </Button>
                    )}
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      Yopish
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
