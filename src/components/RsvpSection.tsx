import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Users, Sparkles } from 'lucide-react';
import { OrnateDivider } from './OrnateDivider';

export const RsvpSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendees, setAttendees] = useState<number>(2);
  const [attendingEvents, setAttendingEvents] = useState({
    mylanchi: true,
    nikah: true,
    walima: true,
  });
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleEvent = (key: 'mylanchi' | 'nikah' | 'walima') => {
    setAttendingEvents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const eventNames: string[] = [];
    if (attendingEvents.mylanchi) eventNames.push('Mylanchi Raavu (Dec 25)');
    if (attendingEvents.nikah) eventNames.push('The Sacred Nikah (Dec 27 Morning)');
    if (attendingEvents.walima) eventNames.push('The Grand Walima (Dec 27 Evening)');

    const message = [
      `Assalamu Alaikum! ✨`,
      `*Wedding RSVP Confirmation*`,
      `Couple: *Zayan & Ayisha*`,
      `Guest Name: *${guestName.trim()}*`,
      `Total Attendees: *${attendees}*`,
      `Attending Ceremonies:\n • ${eventNames.join('\n • ')}`,
      note.trim() ? `Note / Wishes: "${note.trim()}"` : '',
      `\nLooking forward to celebrating this blessed union! 🤍`,
    ]
      .filter(Boolean)
      .join('\n');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans-body uppercase text-xs tracking-[0.25em] text-[#0A3C2F] font-semibold">
            Honour Us With Your Presence
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#06281E] mt-2 mb-3">
            RSVP Confirmation
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#0A3C2F]/80">
            Please kindly let us know if you can join us by December 15, 2026.
          </p>
          <OrnateDivider />
        </div>

        {/* RSVP Card */}
        <div className="relative rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xl p-6 sm:p-10 md:p-12 overflow-hidden">
          {/* Top Gold Foil Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059]" />

          {isSubmitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0A3C2F]/10 border border-[#D4AF37] flex items-center justify-center text-[#0A3C2F] mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#0A3C2F]" />
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#06281E]">
                Jazakallah Khair, {guestName}!
              </h3>
              <p className="font-cormorant italic text-lg text-neutral-600 mt-2 max-w-md">
                Your RSVP confirmation was initiated via WhatsApp. We are deeply grateful and cannot wait to welcome you to our celebration!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 px-6 py-2.5 rounded-full border border-[#D4AF37] text-xs font-semibold uppercase tracking-wider text-[#06281E] hover:bg-[#06281E] hover:text-[#FDFBF7] transition-colors"
              >
                Modify Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppRSVP} className="space-y-6 sm:space-y-8">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#06281E] mb-2">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Faris Mohammed & Family"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm bg-neutral-50/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#06281E] mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm bg-neutral-50/50 transition-colors"
                  />
                </div>
              </div>

              {/* Number of Attendees selector */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06281E] mb-3">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>Number of Guests Attending</span>
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5, '6+'].map((num) => {
                    const val = typeof num === 'number' ? num : 6;
                    const isSelected = attendees === val;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAttendees(val)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? 'bg-[#06281E] text-[#D4AF37] border-[#D4AF37] shadow-md'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        {num} {typeof num === 'number' && num === 1 ? 'Guest' : 'Guests'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Events Attending checkboxes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#06281E] mb-3">
                  Which Celebrations Will You Attend?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'mylanchi', title: 'Mylanchi Raavu', date: 'Dec 25 · Eve' },
                    { key: 'nikah', title: 'The Sacred Nikah', date: 'Dec 27 · 11:00 AM' },
                    { key: 'walima', title: 'The Grand Walima', date: 'Dec 27 · 07:00 PM' },
                  ].map((evt) => {
                    const isChecked = attendingEvents[evt.key as 'mylanchi' | 'nikah' | 'walima'];
                    return (
                      <div
                        key={evt.key}
                        onClick={() => handleToggleEvent(evt.key as 'mylanchi' | 'nikah' | 'walima')}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'border-[#0A3C2F] bg-[#0A3C2F]/5'
                            : 'border-neutral-200 bg-neutral-50/50 opacity-60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div
                          className="mt-0.5 rounded text-[#0A3C2F] focus:ring-[#D4AF37] accent-[#0A3C2F] cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#06281E]">{evt.title}</p>
                          <p className="text-xs text-neutral-500">{evt.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note / Dietary requirements */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#06281E] mb-2">
                  Special Dietary Preference or Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Vegetarian request or warm wishes for the couple..."
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm bg-neutral-50/50 resize-none transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-w-[280px] mx-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#06281E] text-[#FDFBF7] font-semibold text-sm sm:text-base border border-[#D4AF37] shadow-xl hover:bg-[#0A3C2F] hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <MessageSquare className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Send RSVP via WhatsApp</span>
                  <Send className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-neutral-500 mt-3 font-sans-body">
                  Opens WhatsApp with your pre-formatted RSVP details ready to send.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
