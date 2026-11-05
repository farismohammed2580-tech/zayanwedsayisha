import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const timerIdsRef = useRef<number[]>([]);
  const activeNodesRef = useRef<{ stop?: () => void; disconnect?: () => void }[]>([]);

  // Authentic Arabic Maqam Hijaz in D (D, Eb, F#, G, A, Bb, C, D)
  // Frequencies in Hz:
  const HIJAZ = {
    D2: 73.42, // Sub drone
    A2: 110.00, // Low fifth
    D3: 146.83, // Root tonic
    Eb3: 155.56, // Half-step minor second (signature Hijaz)
    Fsharp3: 185.00, // Augmented second / major third
    G3: 196.00, // Fourth
    A3: 220.00, // Fifth
    Bb3: 233.08, // Minor sixth
    C4: 261.63, // Minor seventh
    D4: 293.66, // Octave
    Eb4: 311.13, // Upper Eb
    Fsharp4: 369.99, // Upper F#
    G4: 392.00, // Upper G
    A4: 440.00, // Upper A
  };

  // Synthesize an authentic acoustic Oud (العُوْد) pluck with dual-string detuning and wooden cavity filter
  const playOudPluck = (
    ctx: AudioContext,
    destination: AudioNode,
    freq: number,
    delayMs: number,
    intensity = 0.22
  ) => {
    const timerId = window.setTimeout(() => {
      if (!isPlayingRef.current) return;

      const now = ctx.currentTime;

      // Wooden body filter (formant resonance of an Arabic oud)
      const bodyFilter = ctx.createBiquadFilter();
      bodyFilter.type = 'lowpass';
      bodyFilter.frequency.setValueAtTime(1600, now);
      bodyFilter.Q.setValueAtTime(2.2, now);

      const noteGain = ctx.createGain();

      // Oud string 1 (triangle wave for hollow wooden pluck)
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Oud string 2 (slightly detuned by +3 cents for traditional paired course chorusing)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.0025, now);

      // Attack & decay envelope
      const attack = 0.015;
      const decay = 2.4;

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(intensity, now + attack);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc1.connect(bodyFilter);
      osc2.connect(bodyFilter);
      bodyFilter.connect(noteGain);
      noteGain.connect(destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + decay);
      osc2.stop(now + decay);

      activeNodesRef.current.push(osc1, osc2, noteGain);
    }, delayMs);

    timerIdsRef.current.push(timerId);
  };

  // Synthesize an Arabic Ney flute (الناي) breathy sustained tone with vibrato
  const playNeyFlute = (
    ctx: AudioContext,
    destination: AudioNode,
    freq: number,
    delayMs: number,
    durationMs: number
  ) => {
    const timerId = window.setTimeout(() => {
      if (!isPlayingRef.current) return;

      const now = ctx.currentTime;
      const durSec = durationMs / 1000;

      // Ney oscillator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle vibrato LFO (Arabic ney expressiveness)
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.setValueAtTime(4.8, now); // 4.8 Hz vibrato
      vibratoGain.gain.setValueAtTime(freq * 0.012, now); // ~1.2% pitch modulation
      vibrato.connect(osc.frequency);
      vibrato.start(now);
      vibrato.stop(now + durSec);

      // Ney tone filter
      const neyFilter = ctx.createBiquadFilter();
      neyFilter.type = 'bandpass';
      neyFilter.frequency.setValueAtTime(freq * 1.5, now);
      neyFilter.Q.setValueAtTime(1.8, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.35); // Slow breathy attack
      gain.gain.setValueAtTime(0.11, now + durSec - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec); // Gentle breath release

      osc.connect(neyFilter);
      neyFilter.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + durSec);

      activeNodesRef.current.push(osc, vibrato, gain);
    }, delayMs);

    timerIdsRef.current.push(timerId);
  };

  // Soft Duff / frame drum beat (Dumm pulse) for celebratory Arabic cadence
  const playDuffBeat = (ctx: AudioContext, destination: AudioNode, delayMs: number) => {
    const timerId = window.setTimeout(() => {
      if (!isPlayingRef.current) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(destination);

      osc.start(now);
      osc.stop(now + 0.5);

      activeNodesRef.current.push(osc, gain);
    }, delayMs);

    timerIdsRef.current.push(timerId);
  };

  const startAmbientLoop = (ctx: AudioContext, masterGain: GainNode) => {
    // 1. Deep Royal Oud & Tanpura drone on D & A (Root and Fifth)
    const droneD = ctx.createOscillator();
    const droneDGain = ctx.createGain();
    droneD.type = 'triangle';
    droneD.frequency.setValueAtTime(HIJAZ.D2, ctx.currentTime);
    droneDGain.gain.setValueAtTime(0.045, ctx.currentTime);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(320, ctx.currentTime);

    droneD.connect(droneFilter);
    droneFilter.connect(droneDGain);
    droneDGain.connect(masterGain);
    droneD.start();

    // Secondary drone on A2 (Fifth harmonic)
    const droneA = ctx.createOscillator();
    const droneAGain = ctx.createGain();
    droneA.type = 'sine';
    droneA.frequency.setValueAtTime(HIJAZ.A2, ctx.currentTime);
    droneAGain.gain.setValueAtTime(0.035, ctx.currentTime);
    droneA.connect(droneAGain);
    droneAGain.connect(masterGain);
    droneA.start();

    activeNodesRef.current.push(droneD, droneA);

    // 2. Beautiful Maqam Hijaz Melodic Cycle
    // This classic Arabic progression gracefully weaves between Oud plucks, Ney flute sighs, and soft Duff beats
    const playArabicCycle = () => {
      if (!isPlayingRef.current) return;

      // Phrase 1: The Iconic Hijaz Opening (D -> Eb -> F# -> G -> F# -> Eb -> D)
      playDuffBeat(ctx, masterGain, 0);
      playOudPluck(ctx, masterGain, HIJAZ.D3, 200, 0.25);
      playOudPluck(ctx, masterGain, HIJAZ.Eb3, 1100, 0.22);
      playOudPluck(ctx, masterGain, HIJAZ.Fsharp3, 1900, 0.26); // The majestic augmented interval!
      playOudPluck(ctx, masterGain, HIJAZ.G3, 2900, 0.24);

      // Ney flute enters with emotional sustained ornament
      playNeyFlute(ctx, masterGain, HIJAZ.A3, 3600, 2600);
      playDuffBeat(ctx, masterGain, 4200);

      playOudPluck(ctx, masterGain, HIJAZ.Bb3, 5000, 0.2);
      playOudPluck(ctx, masterGain, HIJAZ.A3, 6200, 0.23);
      playOudPluck(ctx, masterGain, HIJAZ.Fsharp3, 7400, 0.25);
      playOudPluck(ctx, masterGain, HIJAZ.Eb3, 8500, 0.21);

      // Phrase 2: Ascending celebration (D4 octave sparkle & cadence)
      playDuffBeat(ctx, masterGain, 9600);
      playOudPluck(ctx, masterGain, HIJAZ.D4, 9800, 0.26);
      playOudPluck(ctx, masterGain, HIJAZ.Eb4, 10700, 0.2);
      playOudPluck(ctx, masterGain, HIJAZ.Fsharp4, 11600, 0.24);

      // Ney counter-melody
      playNeyFlute(ctx, masterGain, HIJAZ.D4, 12400, 3200);
      playDuffBeat(ctx, masterGain, 13800);

      playOudPluck(ctx, masterGain, HIJAZ.G4, 13600, 0.2);
      playOudPluck(ctx, masterGain, HIJAZ.Fsharp4, 14800, 0.22);
      playOudPluck(ctx, masterGain, HIJAZ.Eb4, 15900, 0.19);
      playOudPluck(ctx, masterGain, HIJAZ.D4, 17000, 0.25);

      // Resolving back home to D3 tonic with dual harmonic resonance
      playOudPluck(ctx, masterGain, HIJAZ.A3, 18200, 0.2);
      playOudPluck(ctx, masterGain, HIJAZ.D3, 19500, 0.28);
      playDuffBeat(ctx, masterGain, 19500);

      // Loop after 21.5 seconds of serene, royal Arabic melody
      const loopTimer = window.setTimeout(() => {
        if (isPlayingRef.current) {
          playArabicCycle();
        }
      }, 21500);

      timerIdsRef.current.push(loopTimer);
    };

    playArabicCycle();
  };

  const startPlaying = () => {
    if (isPlayingRef.current) return;
    setHasInteracted(true);

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
    isPlayingRef.current = true;
    setIsPlaying(true);

    startAmbientLoop(ctx, masterGain);
  };

  const stopPlaying = () => {
    isPlayingRef.current = false;
    timerIdsRef.current.forEach(clearTimeout);
    timerIdsRef.current = [];

    activeNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {
        // ignore
      }
    });
    activeNodesRef.current = [];

    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  useEffect(() => {
    const handleStartMusic = () => {
      startPlaying();
    };

    window.addEventListener('start-royal-wedding-music', handleStartMusic);

    return () => {
      window.removeEventListener('start-royal-wedding-music', handleStartMusic);
    };
  }, [volume]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopPlaying();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating golden audio widget */}
      <div className="group relative flex items-center">
        {/* Subtle expand on hover for volume & track name */}
        <div className="hidden sm:flex items-center gap-3 mr-3 px-4 py-2 rounded-full dark-gold-glass text-[#D4AF37] text-xs shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-cinzel text-xs text-[#FDFBF7] font-semibold tracking-wide whitespace-nowrap">
              {isPlaying ? 'Arabic Oud & Ney (مقام حجاز)' : 'Royal Arabic Music'}
            </span>
            <span className="text-[10px] text-[#D4AF37]/80 font-sans-body">
              {isPlaying ? 'Playing Maqam Hijaz Wedding Theme' : 'Tap to Play Arabic Ambience'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-[#D4AF37]/30">
            <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-[#D4AF37]/30 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              aria-label="Arabic Ambience volume"
            />
          </div>
        </div>

        {/* Main Floating Button */}
        <button
          onClick={toggleMusic}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full border border-[#D4AF37] transition-all duration-500 shadow-xl cursor-pointer ${
            isPlaying
              ? 'bg-[#06281E] text-[#D4AF37] shadow-[#D4AF37]/30 ring-2 ring-[#D4AF37]/40 ring-offset-2 ring-offset-[#06281E]'
              : 'bg-[#0A3C2F] text-[#FDFBF7] hover:border-[#F9E79F] hover:text-[#D4AF37]'
          }`}
          title={isPlaying ? 'Pause Arabic Wedding Music' : 'Play Arabic Royal Wedding Theme'}
          aria-label={isPlaying ? 'Pause Arabic Music' : 'Play Arabic Music'}
        >
          {/* Subtle spinning vinyl border effect when playing */}
          <div
            className={`absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40 transition-transform duration-1000 ${
              isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
            }`}
          />

          <div className="flex flex-col items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-1 h-5 mb-0.5">
                <span className="w-1 bg-[#D4AF37] rounded-full animate-bar-1" />
                <span className="w-1 bg-[#D4AF37] rounded-full animate-bar-2" />
                <span className="w-1 bg-[#D4AF37] rounded-full animate-bar-3" />
                <span className="w-1 bg-[#D4AF37] rounded-full animate-bar-4" />
              </div>
            ) : (
              <div className="relative">
                <Music className="w-5 h-5 text-[#D4AF37]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                </span>
              </div>
            )}
            <span className="text-[9px] font-cinzel tracking-widest text-[#D4AF37]/90 uppercase">
              {isPlaying ? 'Arabic' : 'Audio'}
            </span>
          </div>
        </button>

        {/* First time subtle invite tag */}
        {!hasInteracted && !isPlaying && (
          <div className="absolute right-16 top-2 hidden sm:flex items-center gap-1.5 whitespace-nowrap bg-[#06281E]/95 text-[#D4AF37] border border-[#D4AF37]/40 text-xs px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none animate-bounce font-cormorant text-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tap for Arabic Ambience · موسيقى ملكية</span>
          </div>
        )}
      </div>
    </div>
  );
};
