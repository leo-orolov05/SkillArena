import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { MessageCircle, ThumbsUp, Send, Trophy, Users, Lightbulb } from 'lucide-react';
import type { User } from '../App';

interface ForumScreenProps {
  user: User;
}

const mockPosts = [
  {
    id: 1,
    author: 'Aziza Rahimova',
    tribe: 'Oracle',
    content: 'Yakuniy loyihamiz uchun machine learning modelini yaratib tugatdim! Sun\'iy intellekt tadqiqotida hamkorlik qilishga qiziqasizmi?',
    category: 'Loyihalar',
    likes: 24,
    comments: 8,
    time: '2 soat oldin',
  },
  {
    id: 2,
    author: 'Davron Tursunov',
    tribe: 'Vanguard',
    content: 'Kelasi oy hackathon tashkil qilyapmiz! Barcha qabilalardan jamoa rahbarlari kerak. Kim ishtirok etadi?',
    category: 'Raqobatlar',
    likes: 45,
    comments: 12,
    time: '5 soat oldin',
  },
  {
    id: 3,
    author: 'Malika Karimova',
    tribe: 'Luminary',
    content: 'Yangi UI/UX dizayn portfoliomni baham ko\'rish quvonchli! Ko\'rib chiqing va fikrlaringizni bildiring!',
    category: 'Umumiy',
    likes: 31,
    comments: 6,
    time: '1 kun oldin',
  },
  {
    id: 4,
    author: 'Bekzod Ergashev',
    tribe: 'Forge',
    content: 'Robototexnika klubimiz yangi a\'zolar qidiryapti! Har chorshanba uchrashuvlar. Qurish ishlarini yaxshi ko\'rsangiz, qo\'shiling!',
    category: 'Klublar',
    likes: 18,
    comments: 5,
    time: '1 kun oldin',
  },
];

const getTribeColor = (tribe: string) => {
  const colors: Record<string, string> = {
    Luminary: 'text-amber-400',
    Vanguard: 'text-blue-400',
    Oracle: 'text-green-400',
    Forge: 'text-red-400',
  };
  return colors[tribe] || 'text-purple-400';
};

export default function ForumScreen({ user }: ForumScreenProps) {
  const [activeTab, setActiveTab] = useState('umumiy');
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = activeTab === 'umumiy' 
    ? mockPosts 
    : mockPosts.filter(post => post.category.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-transparent p-4 space-y-4 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Forum
        </h1>
        <p className="text-slate-400">Bog'lanish, baham ko'rish va birga o'sish</p>
      </motion.div>

      {/* New Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 bg-slate-800/60 border border-slate-700">
          <Textarea
            placeholder="G'oyalaringiz, loyihalaringiz yoki savollaringizni baham ko'ring..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white mb-3 min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
              onClick={() => setNewPost('')}
            >
              <Send className="w-4 h-4 mr-2" />
              Yuborish
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-slate-800/60 border border-slate-700 p-1">
            <TabsTrigger value="umumiy" className="flex-1 data-[state=active]:bg-purple-600">
              <Lightbulb className="w-4 h-4 mr-1" />
              Umumiy
            </TabsTrigger>
            <TabsTrigger value="raqobatlar" className="flex-1 data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-1" />
              Raqobatlar
            </TabsTrigger>
            <TabsTrigger value="loyihalar" className="flex-1 data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-1" />
              Loyihalar
            </TabsTrigger>
            <TabsTrigger value="klublar" className="flex-1 data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-1" />
              Klublar
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Posts Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <Card className="p-4 bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-colors">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-white">{post.author}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={getTribeColor(post.tribe)}>{post.tribe}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{post.time}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-slate-300 mb-4">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-slate-400 hover:text-white ${likedPosts.has(post.id) ? 'text-purple-400' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-purple-400' : ''}`} />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
