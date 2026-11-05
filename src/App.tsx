/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Sparkles,
  Share2,
  CalendarPlus,
  ArrowRight,
  Check,
  ChevronDown,
} from 'lucide-react';

import { OrnateDivider } from './components/OrnateDivider';
import { GoldParticleCanvas } from './components/GoldParticleCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { CountdownTimer } from './components/CountdownTimer';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { WishesGuestbook } from './components/WishesGuestbook';
import { RoyalOpeningIntro } from './components/RoyalOpeningIntro';

// Couple royal portraits (Authentic Kerala Malabar Muslim Wedding Attire)
import groomImg from './assets/images/kerala_muslim_groom_1793874103430.jpg';
import brideImg from './assets/images/kerala_muslim_bride_1793874104118.jpg';

export default function App() {
  const [copiedLink, setCopiedLink] = useState(false);

  const weddingDateStr = 'Sunday, 27 December 2026';
  const weddingLocationStr = 'Calicut (Kozhikode), Kerala, India';

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Royal+Nikah+%26+Walima+of+Zayan+%26+Ayisha&dates=20261227T053000Z/20261227T170000Z&details=Join+us+for+the+Sacred+Nikah+and+Grand+Walima+reception+of+Zayan+and+Ayisha+in+Calicut%2C+Kerala.&location=Calicut%2C+Kerala%2C+India`;

  const handleOpenInvitation = () => {
    window.dispatchEvent(new CustomEvent('start-royal-wedding-music'));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Royal Nikah & Walima | Zayan & Ayisha',
          text: 'You are cordially invited to celebrate the Royal Nikah & Walima of Zayan & Ayisha in Calicut, Kerala.',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Royal Nikah//Zayan and Ayisha Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:The Royal Nikah & Walima - Zayan & Ayisha',
      'DESCRIPTION:You are warmly invited to the Sacred Nikah & Grand Walima Reception of Zayan & Ayisha.',
      'LOCATION:Calicut, Kozhikode, Kerala, India',
      'DTSTART:20261227T053000Z',
      'DTEND:20261227T170000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Zayan_Ayisha_Royal_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1A2E26] overflow-x-hidden font-sans-body">
      {/* Royal Wedding Opening Entrance Animation */}
      <RoyalOpeningIntro onOpen={handleOpenInvitation} />

      {/* Floating Ambient Music Audio Player */}
      <AudioPlayer />

      {/* Top Bar Navigation (Clean 3-zone contract) */}
      <header className="sticky top-0 z-40 w-full bg-[#06281E]/95 backdrop-blur-md border-b border-[#D4AF37]/30 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Wordmark */}
          <a
            href="#hero"
            className="font-cinzel text-base sm:text-lg tracking-wider text-[#D4AF37] hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>ZAYAN & AYISHA</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em] font-semibold text-[#FDFBF7]/80">
            <a href="#couple" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              The Couple
            </a>
            <a href="#itinerary" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              Itinerary
            </a>
            <a href="#gallery" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              Gallery
            </a>
            <a href="#rsvp" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              RSVP
            </a>
            <a href="#wishes" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0">
              Du'a & Wishes
            </a>
          </nav>

          {/* Zone 3: Primary CTA (Hidden on mobile view, shown on sm+) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#rsvp"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#06281E] bg-[#D4AF37] rounded-full hover:bg-[#F3E5AB] transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Confirm RSVP</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 bg-[#06281E] text-[#FDFBF7] overflow-hidden"
      >
        {/* Floating Gold Particle Shimmer Canvas */}
        <GoldParticleCanvas />

        {/* Layered Islamic Geometric Arabesque Background Pattern */}
        <div className="absolute inset-0 bg-arabesque-dark opacity-35 pointer-events-none" />

        {/* Ambient Radial Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#145643]/50 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-10 inset-x-0 mx-auto w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Ornate Outer Filigree Frame for Hero */}
        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          {/* Bismillah Calligraphy & Translation */}
          <div className="mb-6 animate-subtle-float">
            <h1
              className="font-amiri text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] tracking-normal mb-3 leading-relaxed drop-shadow-md"
              dir="rtl"
              lang="ar"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </h1>
            <p className="font-cormorant italic text-sm sm:text-base text-[#FDFBF7]/85 tracking-wide max-w-md mx-auto">
              "In the name of Allah, the Most Gracious, the Most Merciful"
            </p>
          </div>

          <OrnateDivider variant="gold" className="my-2" />

          {/* Parental Invitation Lead */}
          <p className="font-sans-body uppercase text-[11px] sm:text-xs tracking-[0.3em] text-[#D4AF37] font-semibold mt-2 mb-4">
            Together with their families
          </p>

          {/* Couple Names */}
          <div className="my-2">
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDFBF7]">
              <span className="block sm:inline">Zayan</span>
              <span className="font-cormorant italic font-normal text-3xl sm:text-5xl text-[#D4AF37] mx-2 sm:mx-4">
                &
              </span>
              <span className="block sm:inline">Ayisha</span>
            </h2>
          </div>

          <p className="font-cinzel-classic uppercase text-xs sm:text-sm tracking-[0.25em] text-[#D4AF37] font-medium mt-3 mb-6">
            The Royal Nikah & Walima Celebration
          </p>

          {/* Date & Location Marker */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-[#FDFBF7]/90 mb-10 font-cormorant">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <strong className="font-semibold text-[#FDFBF7]">{weddingDateStr}</strong>
            </span>
            <span className="hidden sm:inline text-[#D4AF37]/60">·</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>{weddingLocationStr}</span>
            </span>
          </div>

          {/* Real-Time Live Countdown Timer */}
          <div className="w-full mb-10">
            <div className="text-center mb-3">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans-body font-semibold">
                Countdown to the Blessed Union
              </span>
            </div>
            <CountdownTimer targetDate="2026-12-27T11:00:00+05:30" />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#rsvp"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#06281E] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F3E5AB] transition-all shadow-xl hover:shadow-[#D4AF37]/30 flex items-center justify-center gap-2"
            >
              <span>Confirm Your Attendance</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#itinerary"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#D4AF37]/60 text-[#FDFBF7] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D4AF37]/15 transition-all flex items-center justify-center gap-2"
            >
              <span>View Itinerary</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#couple"
          aria-label="Scroll to couple section"
          className="absolute bottom-4 inset-x-0 mx-auto w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F3E5AB] transition-colors animate-bounce"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </section>

      {/* ========================================================
          OUR STORY / THE COUPLE SECTION
          ======================================================== */}
      <section id="couple" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 bg-arabesque opacity-60 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans-body uppercase text-xs tracking-[0.25em] text-[#0A3C2F] font-semibold">
              By Grace of the Almighty
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#06281E] mt-2 mb-3">
              The Bride & Groom
            </h2>
            <p className="font-cormorant italic text-lg sm:text-xl text-[#0A3C2F]/80">
              Two souls brought together in destined love and everlasting companionship.
            </p>
            <OrnateDivider />
          </div>

          {/* Quranic Verse Callout Card */}
          <div className="max-w-2xl mx-auto mb-16 p-8 sm:p-10 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-lg text-center relative overflow-hidden">
            {/* Top gold bar */}
            <div className="absolute top-0 inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <p className="font-amiri text-2xl sm:text-3xl text-[#06281E] mb-3 leading-loose" dir="rtl" lang="ar">
              وَخَلَقْنَاكُمْ أَزْوَاجًا
            </p>
            <p className="font-cinzel text-lg sm:text-xl text-[#0A3C2F] font-semibold tracking-wide">
              "And We created you in pairs"
            </p>
            <span className="font-sans-body text-xs text-[#C5A059] uppercase tracking-widest mt-2 block font-medium">
              Surah An-Naba · [78:8]
            </span>
          </div>

          {/* Two Royal Arched Portrait Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 max-w-4xl mx-auto">
            {/* Groom Card */}
            <div className="flex flex-col items-center text-center group">
              {/* Islamic Arched Frame Container */}
              <div className="relative p-2.5 rounded-[190px_190px_16px_16px] bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="relative w-64 sm:w-72 h-84 sm:h-96 rounded-[180px_180px_12px_12px] overflow-hidden bg-[#0A3C2F]">
                  <img
                    src={groomImg}
                    alt="Zayan Ahmed - The Groom"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06281E]/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>
              </div>

              {/* Groom Bio */}
              <div className="mt-6">
                <span className="font-sans-body uppercase text-[11px] tracking-[0.25em] text-[#0A3C2F] font-semibold">
                  The Groom
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#06281E] mt-1 mb-1">
                  Zayan Ahmed
                </h3>
                <p className="font-cormorant italic text-sm sm:text-base text-[#0A3C2F]/80">
                  Son of Dr. Tariq & Mrs. Mumthaz Ahmed
                </p>
                <p className="font-sans-body text-xs sm:text-sm text-neutral-600 mt-3 max-w-xs leading-relaxed">
                  Architect and designer based between Dubai & Kozhikode. Dedicated to preserving heritage craft, family warmth, and thoughtful living.
                </p>
              </div>
            </div>

            {/* Bride Card */}
            <div className="flex flex-col items-center text-center group">
              {/* Islamic Arched Frame Container */}
              <div className="relative p-2.5 rounded-[190px_190px_16px_16px] bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="relative w-64 sm:w-72 h-84 sm:h-96 rounded-[180px_180px_12px_12px] overflow-hidden bg-[#0A3C2F]">
                  <img
                    src={brideImg}
                    alt="Ayisha Fathima - The Bride"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06281E]/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>
              </div>

              {/* Bride Bio */}
              <div className="mt-6">
                <span className="font-sans-body uppercase text-[11px] tracking-[0.25em] text-[#0A3C2F] font-semibold">
                  The Bride
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#06281E] mt-1 mb-1">
                  Ayisha Fathima
                </h3>
                <p className="font-cormorant italic text-sm sm:text-base text-[#0A3C2F]/80">
                  Daughter of Mr. K.P. Rasheed & Mrs. Jameela Rasheed
                </p>
                <p className="font-sans-body text-xs sm:text-sm text-neutral-600 mt-3 max-w-xs leading-relaxed">
                  Doctor & educator with a passion for literature, calligraphy, and community wellbeing. Radiant with grace and warmth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ITINERARY & EVENTS TIMELINE
          ======================================================== */}
      <TimelineSection />

      {/* ========================================================
          PHOTO GALLERY & LIGHTBOX
          ======================================================== */}
      <GallerySection />

      {/* ========================================================
          INTERACTIVE RSVP & WHATSAPP
          ======================================================== */}
      <RsvpSection />

      {/* ========================================================
          WISHES & DU'A GUESTBOOK (LIVE REEL)
          ======================================================== */}
      <WishesGuestbook />

      {/* ========================================================
          FOOTER & CALENDAR INTEGRATION
          ======================================================== */}
      <footer className="relative bg-[#041A14] text-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Couple Monogram / Star */}
          <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37] bg-[#06281E]/60 shadow-lg">
            <span className="font-cinzel text-lg font-bold">Z & A</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FDFBF7] tracking-wide mb-2">
            Zayan & Ayisha
          </h3>

          <p className="font-cormorant italic text-base sm:text-lg text-[#D4AF37] mb-6">
            "With love, prayers & blessings from our families"
          </p>

          <p className="text-xs sm:text-sm text-[#FDFBF7]/70 max-w-md mx-auto mb-8 leading-relaxed font-sans-body">
            Dr. Tariq & Mrs. Mumthaz Ahmed<br />
            Mr. K.P. Rasheed & Mrs. Jameela Rasheed<br />
            & All Family Members
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            {/* Add to Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06281E] border border-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06281E] transition-all cursor-pointer shadow-sm"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </a>

            {/* Download Apple/Outlook .ICS */}
            <button
              onClick={handleDownloadICS}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06281E] border border-[#D4AF37]/60 text-xs font-semibold text-[#FDFBF7] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Download iCal / .ICS</span>
            </button>

            {/* Share Invitation */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06281E] border border-[#D4AF37]/60 text-xs font-semibold text-[#FDFBF7] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Share Invitation</span>
                </>
              )}
            </button>
          </div>

          <OrnateDivider variant="gold" className="my-2 opacity-50" />

          {/* Discreet copyright text */}
          <div className="text-[11px] text-[#FDFBF7]/50 font-sans-body mt-4">
            <p>The Royal Nikah & Walima · Kozhikode, Kerala · December 2026</p>
          </div>

          {/* Footer Branding & Promotion Badge */}
          <div className="w-full mt-10 pt-6 border-t border-amber-500/20 text-center text-xs text-stone-400 font-sans-body">
            <p className="mb-2 text-stone-300/80">Crafted with elegance for Zayan & Ayisha</p>
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-stone-400">
              <span>Designed by</span>
              <a
                href="https://wa.me/918606810450"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              >
                brandwithfaris
              </a>
              <span className="text-amber-500/60" aria-hidden="true">•</span>
              <a
                href="https://wa.me/918606810450"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-300 transition-colors"
              >
                Get your invite
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
