import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Clock, 
  Settings, 
  Menu, 
  Compass, 
  Moon, 
  Sun, 
  Bell, 
  Heart,
  ChevronRight,
  Search,
  Book,
  Smartphone
} from 'lucide-react';
import { AppState, PrayerTime } from './types';
import { getHijriDate, getBengaliDate, getPrayerTimes, getNextPrayer } from './lib/islamicUtils';
import { SURAHS, HADITHS, DAILY_AYATS } from './data';

// --- Components ---

const Navbar = ({ current, setView }: { current: AppState, setView: (v: AppState) => void }) => {
  const items = [
    { id: 'home', icon: Home, label: 'হোম' },
    { id: 'prayer', icon: Clock, label: 'নামাজ' },
    { id: 'quran', icon: BookOpen, label: 'কুরআন' },
    { id: 'tools', icon: Compass, label: 'টুলস' },
    { id: 'settings', icon: Menu, label: 'আরও' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="max-w-md mx-auto px-4 py-2 flex justify-between items-center text-[10px]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppState)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px] ${
              current === item.id ? 'text-gold scale-110' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <item.icon size={22} strokeWidth={current === item.id ? 2.5 : 2} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/50 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5 max-w-md mx-auto">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
        <Moon size={18} className="text-gold" />
      </div>
      <h1 className="text-xl font-serif font-bold text-gold gold-glow tracking-wide">
        🕌 NΛMΛZ
      </h1>
    </div>
    <div className="flex gap-4">
      <button className="text-zinc-400 hover:text-gold transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-zinc-950"></span>
      </button>
      <button className="text-zinc-400 hover:text-gold transition-colors">
        <Sun size={20} />
      </button>
    </div>
  </header>
);

// --- Page Views ---

const HomeView = ({ setView }: { setView: (v: AppState) => void }) => {
  const [time, setTime] = useState(new Date());
  const prayerTimes = getPrayerTimes();
  const nextPrayer = getNextPrayer(prayerTimes);
  const dailyAyat = DAILY_AYATS[time.getDate() % DAILY_AYATS.length];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="space-y-6 pb-24 px-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Live Clock Section */}
      <section className="text-center pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mx-4 relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-gold/60 text-xs font-semibold tracking-widest uppercase mb-2">{getBengaliDate(time)}</p>
            <h2 className="text-5xl font-bold text-white tracking-widest mb-2 font-mono">{timeString}</h2>
            <p className="text-zinc-400 text-sm font-medium">{getHijriDate(time)}</p>
          </div>
        </motion.div>
      </section>

      {/* Next Prayer Countdown */}
      <section className="px-4">
        <div className="bg-gradient-to-r from-islamic-green/30 to-zinc-900 border border-islamic-green/40 rounded-2xl p-6 flex justify-between items-center shadow-2xl shadow-islamic-green/5">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <Clock size={24} />
             </div>
             <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">পরবর্তী ওয়াক্ত</p>
                <h3 className="text-xl font-bold text-white leading-none">
                  {nextPrayer.nameBn} <span className="text-sm font-normal text-zinc-500">({nextPrayer.time})</span>
                </h3>
             </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">সময় বাকি</p>
            <p className="text-xl font-mono font-bold text-gold">০২:২৪:১০</p>
          </div>
        </div>
      </section>

      {/* Daily Content */}
      <section className="px-4 space-y-4">
        {/* Daily Ayat */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="glass-card p-6 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-gold" />
                <span className="text-gold text-[10px] font-bold uppercase tracking-widest">আজকের আয়াত</span>
            </div>
            <p className="text-[10px] text-zinc-600 font-medium">সূরা {dailyAyat.surah} • {dailyAyat.ayat}</p>
          </div>
          <p className="text-3xl font-arabic text-right text-white/95 mb-4 leading-relaxed tracking-wider">
            {dailyAyat.text}
          </p>
          <div className="border-l-2 border-gold/30 pl-4 py-1">
            <p className="text-base text-zinc-300 font-bengali leading-relaxed">
              "{dailyAyat.translation}"
            </p>
          </div>
        </motion.div>

        {/* Daily Hadith */}
        <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-5 border-t-2 border-t-gold/40">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest block mb-2">আজকের হাদিস</span>
                <p className="text-xs text-zinc-300 font-bengali leading-relaxed line-clamp-3 mb-2">
                    "{HADITHS[1].translationBn}"
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gold/60 font-medium">{HADITHS[1].source}</span>
                    <Heart size={12} className="text-gold/40" />
                </div>
            </div>
            <div className="glass-card p-5 bg-islamic-green/5 border-t-2 border-t-islamic-green/40">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest block mb-2">রমজান কাউন্টডাউন</span>
                <p className="text-xs text-zinc-300 font-bengali leading-relaxed mb-2">
                   পবিত্র রমজান শুরু হতে আর মাত্র
                </p>
                <p className="text-lg font-bold text-islamic-green">১১ মাস বাকি</p>
            </div>
        </div>
      </section>

      {/* Smart Tools */}
      <section className="px-4 pb-12">
         <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Smart Tools</h4>
            <ChevronRight size={14} className="text-zinc-700" />
         </div>
         <div className="grid grid-cols-4 gap-4">
            {[
              { id: 'qibla', icon: Compass, label: 'কিবলা', color: 'bg-red-500/10 text-red-500', border: 'border-red-500/20' },
              { id: 'tools', icon: Smartphone, label: 'তসবিহ', color: 'bg-blue-500/10 text-blue-500', border: 'border-blue-500/20' },
              { id: 'ramadan', icon: Sun, label: 'রমজান', color: 'bg-purple-500/10 text-purple-500', border: 'border-purple-500/20' },
              { id: 'quran', icon: Book, label: 'দোয়া', color: 'bg-emerald-500/10 text-emerald-500', border: 'border-emerald-500/20' },
            ].map((item, i) => (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                key={i} 
                onClick={() => setView((item.id as AppState) || 'home')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} ${item.border} border flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95`}>
                  <item.icon size={22} />
                </div>
                <span className="text-[10px] font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tighter">{item.label}</span>
              </motion.button>
            ))}
         </div>
      </section>
    </div>
  );
};

const QuranView = () => {
  const [search, setSearch] = useState('');
  
  const filteredSurahs = SURAHS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.nameBn.includes(search)
  );

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="সূরা বা আয়াত খুঁজুন..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all font-bengali"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredSurahs.map((surah) => (
          <motion.div 
            key={surah.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:bg-gold/5 active:bg-gold/10 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center font-bold text-gold text-lg border border-white/5 shadow-inner">
                {surah.id}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-0.5 font-bengali">{surah.nameBn}</h3>
                <p className="text-zinc-500 text-xs font-medium tracking-wide uppercase">{surah.name} • {surah.ayahs} আয়াত</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-gold/50 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gold/5 rounded-md">{surah.type === 'Meccan' ? 'মাক্কী' : 'মাদানী'}</span>
              <ChevronRight size={20} className="text-zinc-700 group-hover:text-gold translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PrayerTimeView = () => {
    const times = getPrayerTimes();
    
    return (
        <div className="px-4 pt-4 pb-24 space-y-6">
            <div className="text-center py-6 bg-gold/5 rounded-3xl border border-gold/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
                <h2 className="text-2xl font-bold text-white mb-1 font-serif">নামাজের সময়সূচী</h2>
                <p className="text-gold/60 text-xs font-semibold tracking-widest uppercase">DHAKA CITY • TODAY</p>
            </div>

            <div className="space-y-4">
                {times.map((prayer, i) => (
                    <div key={prayer.id} className="glass-card p-6 flex justify-between items-center group relative overflow-hidden transition-all duration-500 hover:border-gold/30">
                        <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
                             <Clock size={80} className="translate-x-4 translate-y-4" />
                        </div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-2 h-10 bg-zinc-800 rounded-full flex flex-col justify-center items-center overflow-hidden">
                                <div className={`w-full h-1/2 bg-gold transition-all duration-700 ${i === 0 ? 'h-full' : 'h-0'}`}></div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-0.5">{prayer.nameBn}</h3>
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">{prayer.name}</p>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <p className="text-3xl font-mono font-bold text-gold tracking-tighter mb-1">{prayer.time}</p>
                            <div className="flex items-center justify-end gap-1 text-zinc-600">
                                <Bell size={10} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Alarm ON</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Book size={20} className="text-gold" />
                 </div>
                 <p className="text-zinc-400 text-sm italic leading-relaxed font-serif">
                    “নিশ্চয়ই সালাত মানুষকে অশ্লীল ও মন্দ কাজ থেকে বিরত রাখে।” — (সূরা আনকাবুত: ৪৫)
                 </p>
            </div>
        </div>
    );
};

const ToolsView = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="px-4 pt-4 pb-24 space-y-6">
            <div className="text-center py-6">
                <h2 className="text-2xl font-bold text-white mb-1">স্মার্ট টুলস</h2>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Digital Islamic Assistant</p>
            </div>

            <div className="space-y-6">
                <div className="glass-card p-10 flex flex-col items-center gap-8 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="relative">
                        <div className="w-48 h-48 rounded-full border-2 border-gold/10 flex items-center justify-center relative">
                            <div className="w-40 h-40 rounded-full bg-gold/5 flex items-center justify-center border-4 border-gold/20 shadow-2xl shadow-gold/10">
                                <span className="text-7xl font-mono font-bold text-gold tracking-tighter">{count}</span>
                            </div>
                            <div className="absolute -bottom-2 px-4 py-1 bg-zinc-950 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-widest">
                                ডিজিটাল তসবিহ
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 w-full">
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCount(count + 1)}
                            className="flex-1 py-5 bg-gold text-zinc-950 text-xl font-black rounded-3xl shadow-lg shadow-gold/20 flex items-center justify-center gap-3"
                        >
                            <Smartphone size={24} />
                            সাবহানাল্লাহ্
                        </motion.button>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCount(0)}
                            className="px-6 py-5 bg-zinc-900 text-zinc-400 font-bold rounded-3xl border border-white/5"
                        >
                            রিসেট
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { icon: Compass, label: 'কিবলা কম্পাস', sub: 'সঠিক দিকনির্দেশনা', color: 'text-red-500', bg: 'bg-red-500/10' },
                        { icon: Smartphone, label: 'আল্লাহর ৯৯ নাম', sub: 'জিকির ও ফযিলত', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                        { icon: Book, label: 'দৈনন্দিন দোয়া', sub: 'সুন্নত আমল', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { icon: CalendarIcon, label: 'হিজরি ক্যালেন্ডার', sub: 'মাস ও তারিখ', color: 'text-gold', bg: 'bg-gold/10' },
                    ].map((tool, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            className="glass-card p-5 flex items-center gap-5 cursor-pointer active:bg-white/10"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} border border-white/5`}>
                                <tool.icon size={26} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold text-lg mb-0.5">{tool.label}</h4>
                                <p className="text-zinc-500 text-xs font-serif italic">{tool.sub}</p>
                            </div>
                            <ChevronRight className="text-zinc-800" size={20} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RamadanView = () => {
    // Sample Ramadan data for Dhaka
    const sehriTime = "০৪:২২";
    const iftarTime = "০৬:২৩";
    
    return (
        <div className="px-4 pt-4 pb-24 space-y-6">
            <div className="text-center py-6 bg-emerald-950/20 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
                <h2 className="text-2xl font-bold text-white mb-1 font-serif">রমজান ক্যালেন্ডার</h2>
                <p className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-[0.3em]">Ramadan 1447 • Dhaka</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">সেহরি শেষ</p>
                    <h3 className="text-3xl font-bold text-white font-mono">{sehriTime}</h3>
                    <p className="text-[10px] text-zinc-500 mt-2 font-medium">আজকের সময়</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-amber-500 bg-amber-500/5">
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">ইফতার শুরু</p>
                    <h3 className="text-3xl font-bold text-white font-mono">{iftarTime}</h3>
                    <p className="text-[10px] text-zinc-500 mt-2 font-medium">আজকের সময়</p>
                </div>
            </div>

            <div className="glass-card p-5">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-white font-bold">পূর্ণাঙ্গ সময়সূচী</h4>
                    <span className="text-zinc-500 text-xs">এপ্রিল ২০২১</span>
                </div>
                <div className="space-y-4">
                    {[
                        { day: '১', date: '১১ মার্চ', sehri: '০৪:৫২', iftar: '০৬:০৮' },
                        { day: '২', date: '১২ মার্চ', sehri: '০৪:৫১', iftar: '০৬:০৮' },
                        { day: '৩', date: '১৩ মার্চ', sehri: '০৪:৫০', iftar: '০৬:০৯' },
                        { day: '৪', date: '১৪ মার্চ', sehri: '০৪:৪৯', iftar: '০৬:০৯' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-400">
                                    {item.day}
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-300 font-medium">{item.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-6 text-xs">
                                <div className="text-right">
                                    <p className="text-zinc-600 font-bold uppercase tracking-tighter">সেহরি</p>
                                    <p className="text-white font-bold">{item.sehri}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-zinc-600 font-bold uppercase tracking-tighter">ইফতার</p>
                                    <p className="text-white font-bold">{item.iftar}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                 <h4 className="text-amber-500 font-bold text-sm mb-2">রোজার নিয়ত</h4>
                 <p className="text-zinc-400 text-xs leading-relaxed italic">
                    “নাওয়াইতু আন আসুমা গাদাম মিন শাহরি রামাদ্বানাল মুবারাকি ফারদ্বাল্লাকা ইয়া আল্লাহু ফাতাকাব্বাল মিন্নি ইন্নাকা আনতাস সামিউল আলিম।”
                 </p>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<AppState>('home');
  const [loading, setLoading] = useState(true);
  const [bgMode, setBgMode] = useState('night');

  useEffect(() => {
    // Determine background based on time
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) setBgMode('sunrise');
    else if (hour >= 8 && hour < 16) setBgMode('day');
    else if (hour >= 16 && hour < 19) setBgMode('sunset');
    else setBgMode('night');

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const getBgStyle = () => {
    switch (bgMode) {
      case 'sunrise': return 'from-amber-950/20 via-zinc-950 to-zinc-950';
      case 'day': return 'from-blue-900/10 via-zinc-950 to-zinc-950';
      case 'sunset': return 'from-orange-900/20 via-zinc-950 to-zinc-950';
      default: return 'from-zinc-950 via-zinc-950 to-zinc-950';
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-150"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[80vh] h-[80vh] border border-gold/5 rounded-full"
        />
        <motion.div 
          animate={{ scale: [0.9, 1, 0.9], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative z-10 w-32 h-32 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 mb-8"
        >
          <Moon size={64} className="text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </motion.div>
        <div className="text-center relative z-10">
            <h1 className="text-5xl font-serif font-black text-gold gold-glow tracking-[0.2em] mb-4">NΛMΛZ</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Islamic Smart Assistant</p>
            <div className="w-48 h-0.5 bg-zinc-900 rounded-full mx-auto overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-full bg-gold shadow-[0_0_10px_#D4AF37]"
              />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-gold/30`}>
      <div className={`fixed inset-0 bg-gradient-to-b ${getBgStyle()} pointer-events-none z-0`} />
      
      <Header />
      
      <main className="relative z-10 max-w-md mx-auto pt-24 pb-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {view === 'home' && <HomeView setView={setView} />}
            {view === 'quran' && <QuranView />}
            {view === 'prayer' && <PrayerTimeView />}
            {view === 'tools' && <ToolsView />}
            {view === 'ramadan' && <RamadanView />}
            {view === 'settings' && (
                <div className="px-6 py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                        <Smartphone size={40} className="text-zinc-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">সেটিংস ও অন্যান্য</h2>
                        <p className="text-zinc-500 text-sm font-serif">Islamic Smart Assistant v1.0.0<br/>Developed with Premium Design Standards</p>
                    </div>
                    <div className="w-full space-y-3">
                         {['অ্যাপ সম্পর্কে', 'ভাষা পরিবর্তন', 'প্রাইভেসি পলিসি', 'ফিডব্যাক'].map(item => (
                             <button key={item} className="w-full p-5 glass-card flex justify-between items-center group">
                                 <span className="text-zinc-300 font-medium">{item}</span>
                                 <ChevronRight size={18} className="text-zinc-700 group-hover:text-gold transition-colors" />
                             </button>
                         ))}
                    </div>
                    <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-black pt-10">© 2026 NAMAZ ECOSYSTEM</p>
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar current={view} setView={setView} />
      
      {/* Dynamic Interactive Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-gold/5 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-islamic-green/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
