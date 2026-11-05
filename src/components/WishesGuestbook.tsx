import React, { useState, useEffect } from 'react';
import { Heart, Send, MessageCircleHeart, Sparkles } from 'lucide-react';
import { OrnateDivider } from './OrnateDivider';

interface Wish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: 'w-1',
    name: 'Dr. Sameer & Family',
    relationship: 'Family Elder',
    message: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ. May Allah shower His bounties and infinite peace upon your sacred union. Zayan & Ayisha, you both make an exquisite couple!',
    timestamp: '2 hours ago',
    likes: 18,
  },
  {
    id: 'w-2',
    name: 'Rinsha Rasheed',
    relationship: 'Cousin & Bridesmaid',
    message: 'Cannot wait for the Mylanchi Raavu night! To my dearest Ayisha, seeing you step into this next phase with such joy fills our hearts. May your new home be filled with laughter and endless Barakah!',
    timestamp: '5 hours ago',
    likes: 24,
  },
  {
    id: 'w-3',
    name: 'Fahad & Nabeel',
    relationship: "Groom's Close Friends",
    message: 'Heartiest congratulations Zayan brother! Wishing both of you a lifetime of happiness, shared dreams, adventures, and prosperity. Kozhikode is ready for the grandest feast!',
    timestamp: '1 day ago',
    likes: 15,
  },
  {
    id: 'w-4',
    name: 'Amina Khaleel',
    relationship: 'Family Well-Wisher',
    message: 'SubhanAllah, such a divine pairing. May Allah protect you both from evil eyes and keep your hearts united in love and piety forever. Mubarak!',
    timestamp: '1 day ago',
    likes: 12,
  },
];

export const WishesGuestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('royal_wedding_wishes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_WISHES;
  });

  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [message, setMessage] = useState('');
  const [hasAddedRecently, setHasAddedRecently] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('royal_wedding_wishes', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const quickDuas = [
    'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    'May Allah bless your union with endless love, peace & Barakah.',
    'Heartfelt Mubarak! Wishing you both a joyous and blessed married life.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: `w-${Date.now()}`,
      name: authorName.trim(),
      relationship: relationship.trim() || 'Well-Wisher',
      message: message.trim(),
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
    };

    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setMessage('');
    setHasAddedRecently(true);
    setTimeout(() => setHasAddedRecently(false), 5000);
  };

  const handleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const liked = !w.userLiked;
          return {
            ...w,
            likes: liked ? w.likes + 1 : Math.max(0, w.likes - 1),
            userLiked: liked,
          };
        }
        return w;
      })
    );
  };

  return (
    <section id="wishes" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#06281E] text-[#FDFBF7]">
      {/* Background accents */}
      <div className="absolute inset-0 bg-arabesque-dark opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircleHeart className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-sans-body uppercase text-xs tracking-[0.25em] text-[#D4AF37] font-semibold">
              Prayers & Du'as
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7]">
            Guest Blessings & Wishes
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#FDFBF7]/80 mt-2">
            Leave your warmest blessings and heartfelt Du'as for Zayan & Ayisha.
          </p>
          <OrnateDivider variant="gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl dark-gold-glass border border-[#D4AF37]/50 p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            
            <h3 className="font-cinzel text-xl font-bold text-[#FDFBF7] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Send Your Blessing</span>
            </h3>

            {hasAddedRecently && (
              <div className="mb-4 p-3 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-xs text-[#FDFBF7] font-medium flex items-center gap-2 animate-fadeIn">
                <span>✨ Your blessing has been added to the guestbook!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Maryam & Family"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-[#FDFBF7] placeholder-white/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  Relationship to the Couple
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#06281E] border border-[#D4AF37]/40 text-[#FDFBF7] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm cursor-pointer"
                >
                  <option value="Family Member">Family Member</option>
                  <option value="Childhood Friend">Childhood Friend</option>
                  <option value="College / School Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Well-Wisher">Well-Wisher</option>
                </select>
              </div>

              {/* Quick Du'a suggestions */}
              <div>
                <span className="block text-[11px] font-sans-body uppercase tracking-wider text-white/60 mb-1.5">
                  Tap to add quick Du'a:
                </span>
                <div className="space-y-1.5">
                  {quickDuas.map((dua, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMessage((prev) => (prev ? `${prev} ${dua}` : dua))}
                      className="block w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 text-xs text-[#FDFBF7]/90 border border-white/10 transition-colors cursor-pointer truncate"
                    >
                      {dua}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  Your Message or Du'a
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your prayers, blessings, and congratulations..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-[#FDFBF7] placeholder-white/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#06281E] font-bold text-sm hover:bg-[#F3E5AB] transition-colors shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Post Blessing</span>
              </button>
            </form>
          </div>

          {/* Wishes Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-4 max-h-[620px] overflow-y-auto pr-1 custom-scrollbar">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="relative rounded-xl bg-[#0A3C2F]/80 border border-[#D4AF37]/30 p-5 shadow-lg transition-all duration-300 hover:border-[#D4AF37]/70"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#06281E] border border-[#D4AF37] flex items-center justify-center font-cinzel text-sm font-bold text-[#D4AF37]">
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-base font-semibold text-[#FDFBF7]">
                        {w.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#D4AF37]/80">
                        <span>{w.relationship}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-white/50">{w.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(w.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
                      w.userLiked
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-black/30 border-white/10 text-white/70 hover:border-[#D4AF37]/50'
                    }`}
                    aria-label={`Like wish from ${w.name}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        w.userLiked ? 'fill-rose-400 text-rose-400' : 'text-[#D4AF37]'
                      }`}
                    />
                    <span className="tabular-nums font-medium">{w.likes}</span>
                  </button>
                </div>

                <p className="font-cormorant text-base sm:text-lg text-white/95 leading-relaxed pl-13">
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
