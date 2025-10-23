import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Swords, GraduationCap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (firstName: string, lastName: string, age: number) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [hemisLogin, setHemisLogin] = useState('');
  const [hemisPassword, setHemisPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewUser && firstName && lastName && age && hemisLogin && hemisPassword) {
      onLogin(firstName, lastName, parseInt(age));
    } else if (!isNewUser && hemisLogin && hemisPassword) {
      // Mock existing user login
      onLogin('Javohir', 'Karimov', 21);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Swords className="w-16 h-16 text-amber-400 relative z-10" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            SkillArena
          </h1>
          <p className="text-slate-400 mb-2">Bilim arenasiga xush kelibsiz</p>
          <p className="text-purple-400">Sarguzashtingni boshlashga tayyormisan?</p>
        </div>

        <Card className="p-6 bg-slate-800/50 border-2 border-purple-500/20 backdrop-blur-sm shadow-xl shadow-purple-500/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* HEMIS Login Button */}
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0"
              size="lg"
              onClick={() => {
                // Mock HEMIS login
                onLogin('Student', 'User', 20);
              }}
            >
              <GraduationCap className="mr-2 w-5 h-5" />
              HEMIS orqali kirish
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">Yoki</span>
              </div>
            </div>

            {/* Toggle New User */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                className="text-purple-400 hover:text-purple-300"
                onClick={() => setIsNewUser(!isNewUser)}
              >
                {isNewUser ? 'Akkauntingiz bormi?' : 'Yangi foydalanuvchi? Ro\'yxatdan o\'ting'}
              </Button>
            </div>

            {isNewUser && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300">Ism</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-purple-500"
                      placeholder="Javohir"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300">Familiya</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-purple-500"
                      placeholder="Karimov"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="age" className="text-slate-300">Yosh</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="bg-slate-900/50 border-slate-600 text-white focus:border-purple-500"
                    placeholder="20"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="hemisLogin" className="text-slate-300">HEMIS login</Label>
              <Input
                id="hemisLogin"
                value={hemisLogin}
                onChange={(e) => setHemisLogin(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white focus:border-purple-500"
                placeholder="student@university.uz"
              />
            </div>

            <div>
              <Label htmlFor="hemisPassword" className="text-slate-300">Parol</Label>
              <Input
                id="hemisPassword"
                type="password"
                value={hemisPassword}
                onChange={(e) => setHemisPassword(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 border-0"
              size="lg"
            >
              {isNewUser ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
