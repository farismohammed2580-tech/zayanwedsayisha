import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Sparkles, Heart, Utensils } from 'lucide-react';
import { OrnateDivider } from './OrnateDivider';

interface EventItem {
  id: string;
  number: string;
  title: string;
  arabicName: string;
  tagline: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  dressCode: string;
  mapUrl: string;
  icon: React.ReactNode;
  highlights: string[];
}

export const TimelineSection: React.FC = () => {
  const events: EventItem[] = [
    {
      id: 'mylanchi',
      number: '01',
      title: 'Mylanchi Raavu',
      arabicName: 'ليلة الحناء · The Henna Night',
      tagline: 'Traditional Malabar Henna, Melodies & Family Feasting',
      date: 'Friday, 25 December 2026',
      time: '06:30 PM Onwards',
      venueName: 'The Heritage Coconut Grove & Lawn',
      venueAddress: 'Near Beach Road, Calicut (Kozhikode), Kerala',
      dressCode: 'Vibrant Traditional Festive / Mustard & Emerald Green',
      mapUrl: 'https://maps.google.com/?q=Calicut+Beach+Road+Kozhikode+Kerala',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      highlights: [
        'Intricate Bridal Mehndi artistry',
        'Traditional Mappila & Sufi wedding songs (Oppana)',
        'Traditional Malabar tea & delicacies',
      ],
    },
    {
      id: 'nikah',
      number: '02',
      title: 'The Sacred Nikah',
      arabicName: 'عقد النكاح · The Sacred Union',
      tagline: 'The Solemnization of Marriage under Divine Grace',
      date: 'Sunday, 27 December 2026',
      time: '11:00 AM Sharp (Muhurtham)',
      venueName: 'Grand Royal Court & Juma Pavilion',
      venueAddress: 'Mananchira Square Enclave, Calicut, Kerala',
      dressCode: 'Royal Ivory, Champagne Gold & Dignified Formal Attire',
      mapUrl: 'https://maps.google.com/?q=Mananchira+Kozhikode+Kerala',
      icon: <Heart className="w-6 h-6 text-[#D4AF37]" />,
      highlights: [
        'Solemnization & Khutbah-e-Nikah',
        'Blessing invocation by respected Ulema',
        'Royal Nikah Dastarkhwan Traditional Feast',
      ],
    },
    {
      id: 'walima',
      number: '03',
      title: 'The Grand Walima',
      arabicName: 'وليمة العرس · The Royal Reception',
      tagline: 'A Majestic Evening of Celebration, Hospitality & Love',
      date: 'Sunday, 27 December 2026',
      time: '07:00 PM to 10:30 PM',
      venueName: 'The Grand Royal Pavilion Ballroom',
      venueAddress: 'Kadavu Riverfront Resort, Calicut Bypass, Kerala',
      dressCode: 'Regal Formal Evening Attire / Sherwani & Designer Couture',
      mapUrl: 'https://maps.google.com/?q=The+Raviz+Kadavu+Kozhikode+Kerala',
      icon: <Utensils className="w-6 h-6 text-[#D4AF37]" />,
      highlights: [
        'Groom & Bride Royal Grand Entrance',
        'Live Acoustic Sitar & Violin Symphony',
        'Grand 5-Course Royal Malabar & Mughal Banquet',
      ],
    },
  ];

  return (
    <section id="itinerary" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-sans-body uppercase text-xs tracking-[0.25em] text-[#0A3C2F] font-semibold">
            Program & Itinerary
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#06281E] mt-2 mb-3">
            Wedding Celebrations
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#0A3C2F]/80">
            We cordially invite you to grace each auspicious occasion with your prayers and presence.
          </p>
          <OrnateDivider />
        </div>

        {/* 3 Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative flex flex-col justify-between rounded-2xl bg-white border border-[#D4AF37]/35 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1.5"
            >
              {/* Top Accent arch banner */}
              <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              <div>
                {/* Event Index & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-lg text-[#06281E]/40">
                      {event.number}
                    </span>
                    <span className="text-[#06281E]/20">·</span>
                    <span className="font-amiri text-sm text-[#0A3C2F] font-semibold">
                      {event.arabicName}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#06281E]/5 border border-[#D4AF37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {event.icon}
                  </div>
                </div>

                {/* Event Title */}
                <h3 className="font-cinzel text-2xl font-bold text-[#06281E] tracking-tight group-hover:text-[#0A3C2F] transition-colors">
                  {event.title}
                </h3>
                <p className="font-cormorant italic text-base text-[#0A3C2F]/80 mt-1 mb-5">
                  {event.tagline}
                </p>

                {/* Schedule Details */}
                <div className="space-y-3.5 py-4 border-y border-[#D4AF37]/20 text-sm">
                  <div className="flex items-start gap-3 text-[#06281E]">
                    <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-medium">{event.date}</span>
                  </div>

                  <div className="flex items-start gap-3 text-[#06281E]">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#0A3C2F]">{event.time}</span>
                  </div>

                  <div className="flex items-start gap-3 text-[#06281E]">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#06281E]">{event.venueName}</p>
                      <p className="text-xs text-neutral-600 mt-0.5">{event.venueAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Event Highlights list */}
                <div className="mt-5 mb-6">
                  <span className="text-[11px] font-sans-body uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                    Ceremony Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {event.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#06281E] text-[#FDFBF7] text-xs font-medium hover:bg-[#0A3C2F] transition-colors border border-[#D4AF37]/50 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
