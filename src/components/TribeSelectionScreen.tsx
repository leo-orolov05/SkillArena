import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sun, Sword, Eye, Hammer } from 'lucide-react';
import TribeInfoModal from './TribeInfoModal';
import type { Tribe } from '../App';

interface TribeSelectionScreenProps {
  onSelectTribe: (tribe: Tribe) => void;
}

export const tribes = [
  {
    name: 'Luminary' as Tribe,
    motto: 'Innovatsiya yo\'lini yoritamiz',
    description: 'Ijodkorlar, yaratuvchilar, innovatorlar',
    color: '#FACC15',
    gradient: 'from-amber-500 to-yellow-400',
    icon: Sun,
    glow: 'shadow-amber-500/50',
    memberCount: 42,
    totalXP: 8450,
    rank: 1,
  },
  {
    name: 'Vanguard' as Tribe,
    motto: 'Jasorat va vizyon bilan yetakchilik qilamiz',
    description: 'Liderlar, tashkilotchilar, motivatorlar',
    color: '#3B82F6',
    gradient: 'from-blue-600 to-blue-400',
    icon: Sword,
    glow: 'shadow-blue-500/50',
    memberCount: 38,
    totalXP: 8100,
    rank: 2,
  },
  {
    name: 'Oracle' as Tribe,
    motto: 'Har bir sinovda donolik izlaymiz',
    description: 'Mutafakkirlar, strateglar, tadqiqotchilar',
    color: '#22C55E',
    gradient: 'from-green-600 to-emerald-400',
    icon: Eye,
    glow: 'shadow-green-500/50',
    memberCount: 35,
    totalXP: 7300,
    rank: 3,
  },
  {
    name: 'Forge' as Tribe,
    motto: 'Kelajakni o\'z qo\'llarimiz bilan quramiz',
    description: 'Quruvchilar, amaliyotchilar, muhandislar',
    color: '#EF4444',
    gradient: 'from-red-600 to-orange-500',
    icon: Hammer,
    glow: 'shadow-red-500/50',
    memberCount: 29,
    totalXP: 6900,
    rank: 4,
  },
];

export default function TribeSelectionScreen({ onSelectTribe }: TribeSelectionScreenProps) {
  const [selectedTribe, setSelectedTribe] = useState<typeof tribes[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 overflow-auto">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
            Qabilangizni tanlang
          </h1>
          <p className="text-xl text-slate-300">
            Har bir jangchi o'z yo'lini topadi. Qaysi biri sizni chaqirmoqda?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tribes.map((tribe, index) => {
            const Icon = tribe.icon;
            return (
              <motion.div
                key={tribe.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  onClick={() => setSelectedTribe(tribe)}
                  className={`p-6 bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600 transition-all backdrop-blur-sm shadow-2xl ${tribe.glow} hover:shadow-2xl group cursor-pointer`}
                >
                  <div className="text-center">
                    {/* Animated Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${tribe.gradient} rounded-full blur-2xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <div className={`relative bg-gradient-to-r ${tribe.gradient} p-4 rounded-2xl`}>
                          <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Tribe Name */}
                    <h3 className={`text-3xl mb-2 bg-gradient-to-r ${tribe.gradient} bg-clip-text text-transparent`}>
                      {tribe.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 mb-3">
                      {tribe.description}
                    </p>

                    {/* Motto */}
                    <p className="text-sm italic text-slate-500 mb-6">
                      "{tribe.motto}"
                    </p>

                    {/* View Details Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${tribe.gradient} hover:opacity-90 transition-opacity border-0`}
                    >
                      Batafsil ko'rish
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Random Assignment Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Button
            onClick={() => {
              const randomTribe = tribes[Math.floor(Math.random() * tribes.length)];
              onSelectTribe(randomTribe.name);
            }}
            variant="outline"
            className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
          >
            Tasodifiy tanlash ✨
          </Button>
        </motion.div>
      </div>

      {/* Tribe Info Modal */}
      <TribeInfoModal
        isOpen={!!selectedTribe}
        onClose={() => setSelectedTribe(null)}
        tribe={selectedTribe}
        onJoin={() => selectedTribe && onSelectTribe(selectedTribe.name)}
      />
    </div>
  );
}
