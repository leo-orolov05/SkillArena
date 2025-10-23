import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Users, Crown, Plus, Shield } from 'lucide-react';
import type { User } from '../App';

interface ClubsScreenProps {
  user: User;
}

interface Club {
  id: number;
  name: string;
  founder: string;
  founderTribe: string;
  description: string;
  memberCount: number;
  emblem: string;
}

const getTribeColor = (tribe: string) => {
  const colors: Record<string, string> = {
    Luminary: '#FACC15',
    Vanguard: '#3B82F6',
    Oracle: '#22C55E',
    Forge: '#EF4444',
  };
  return colors[tribe] || '#FACC15';
};

const getTribeGradient = (tribe: string) => {
  const gradients: Record<string, string> = {
    Luminary: 'from-amber-500 to-yellow-400',
    Vanguard: 'from-blue-600 to-blue-400',
    Oracle: 'from-green-600 to-emerald-400',
    Forge: 'from-red-600 to-orange-500',
  };
  return gradients[tribe] || 'from-purple-500 to-amber-500';
};

const mockClubs: Club[] = [
  {
    id: 1,
    name: 'Code Wizards',
    founder: 'Aziza Rahimova',
    founderTribe: 'Oracle',
    description: 'Murakkab algoritmlarni yechuvchi va innovatsion dasturiy ta\'minot yaratuvchi dasturchilar jamoasi.',
    memberCount: 24,
    emblem: '🧙‍♂️',
  },
  {
    id: 2,
    name: 'Design Rebels',
    founder: 'Malika Karimova',
    founderTribe: 'Luminary',
    description: 'UI/UX dizaynda yangiliklar yaratuvchi va foydalanuvchi-markazli tajribalar ishlab chiquvchilar.',
    memberCount: 18,
    emblem: '🎨',
  },
  {
    id: 3,
    name: 'Leadership Squad',
    founder: 'Davron Tursunov',
    founderTribe: 'Vanguard',
    description: 'Seminarlar, jamoa qurish va mentorlik dasturlari orqali yetakchilik ko\'nikmalarini rivojlantirish.',
    memberCount: 32,
    emblem: '⚔️',
  },
  {
    id: 4,
    name: 'Robotics Engineers',
    founder: 'Bekzod Ergashev',
    founderTribe: 'Forge',
    description: 'Avtonom robotlar, dronlar va IoT qurilmalarini qurish. Apparat ishqibozlari xush kelibsiz!',
    memberCount: 21,
    emblem: '🤖',
  },
  {
    id: 5,
    name: 'Research Collective',
    founder: 'Nilufar Ahmadova',
    founderTribe: 'Oracle',
    description: 'AI, ma\'lumotlar tahlili va innovatsiyalarda hamkorlikdagi tadqiqotlar orqali ilmiy mukammallik.',
    memberCount: 15,
    emblem: '🔬',
  },
];

export default function ClubsScreen({ user }: ClubsScreenProps) {
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [joinedClubs, setJoinedClubs] = useState<Set<number>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newClubDescription, setNewClubDescription] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const isMVP = user.xp >= 2000; // MVPs have 2000+ XP

  const handleJoinRequest = (clubId: number) => {
    setJoinedClubs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clubId)) {
        newSet.delete(clubId);
      } else {
        newSet.add(clubId);
      }
      return newSet;
    });
  };

  const handleCreateClub = () => {
    if (newClubName && newClubDescription) {
      const newClub: Club = {
        id: clubs.length + 1,
        name: newClubName,
        founder: `${user.firstName} ${user.lastName}`,
        founderTribe: user.tribe || 'Luminary',
        description: newClubDescription,
        memberCount: 1,
        emblem: '⭐',
      };
      setClubs([newClub, ...clubs]);
      setNewClubName('');
      setNewClubDescription('');
      setIsCreateDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl text-white mb-2 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
            Klublar
          </h1>
          <p className="text-slate-400">O'xshash fikrli chempionlar bilan birga harakat qiling</p>
        </div>
        {isMVP && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 border-0">
                <Crown className="w-4 h-4 mr-2" />
                Klub yaratish
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-2 border-amber-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Klubingizni yarating
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="clubName" className="text-slate-300">Klub nomi</Label>
                  <Input
                    id="clubName"
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white"
                    placeholder="Klub nomini kiriting"
                  />
                </div>
                <div>
                  <Label htmlFor="clubDescription" className="text-slate-300">Ta'rif</Label>
                  <Textarea
                    id="clubDescription"
                    value={newClubDescription}
                    onChange={(e) => setNewClubDescription(e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white min-h-[100px]"
                    placeholder="Klubingizning maqsadi va faoliyatini tasvirlab bering"
                  />
                </div>
                <Button
                  onClick={handleCreateClub}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 border-0"
                >
                  Klub yaratish
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>

      {/* MVP Banner */}
      {isMVP && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/50">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-white mb-1">🎉 Siz MVPsiz!</p>
                <p className="text-sm text-amber-300">Endi o'z klubingizni yaratib boshqarishingiz mumkin</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Clubs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-4"
      >
        {clubs.map((club, idx) => {
          const tribeGradient = getTribeGradient(club.founderTribe);
          const isJoined = joinedClubs.has(club.id);

          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <Card className="p-5 bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-all h-full flex flex-col">
                {/* Club Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tribeGradient} flex items-center justify-center shrink-0`}>
                    <span className="text-3xl">{club.emblem}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl text-white mb-1">{club.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-3 h-3" style={{ color: getTribeColor(club.founderTribe) }} />
                      <span className="text-slate-400">{club.founder}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-4 flex-1">{club.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{club.memberCount} a'zo</span>
                  </div>
                  <Button
                    onClick={() => handleJoinRequest(club.id)}
                    variant={isJoined ? "outline" : "default"}
                    size="sm"
                    className={isJoined 
                      ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/10" 
                      : `bg-gradient-to-r ${tribeGradient} hover:opacity-90 border-0`
                    }
                  >
                    {isJoined ? (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        So'ralgan
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" />
                        A'zo bo'lish
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State for Non-MVP */}
      {!isMVP && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 bg-slate-800/40 border border-slate-700 text-center">
            <Crown className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl text-slate-400 mb-2">Klub yaratish uchun MVP bo'ling</h3>
            <p className="text-slate-500">Klub yaratish imkoniyatini ochish uchun 2000 XP ga erishing</p>
            <div className="mt-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-amber-600 border-0 text-white">
                {user.xp} / 2000 XP
              </Badge>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
