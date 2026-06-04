import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mic } from 'lucide-react';

type Mode = 'light' | 'dark';

export interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  /** URL da imagem do print do WhatsApp (Ex: /img/print1.png) */
  screenshot?: string;
  /** Coloque o arquivo em public/audio/ e informe: audioUrl: '/audio/nome.ogg' */
  audioUrl?: string;
}

interface VoiceTestimonialProps {
  mode: Mode;
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

// ─── Barras de onda ──────────────────────────────────────────────────────────
const generateWaveVariants = (): Variants[] =>
  Array.from({ length: 22 }, () => ({
    initial: { scaleY: 1 },
    animate: {
      scaleY: [1, Math.random() * 1.8 + 0.5, 1],
      transition: {
        duration: Math.random() * 0.5 + 0.3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: Math.random() * 0.6,
      },
    },
  }));

const WAVE_VARIANTS = generateWaveVariants();
const WAVE_HEIGHTS = Array.from({ length: 22 }, () => Math.random() * 16 + 4);

// ─── Ícones ───────────────────────────────────────────────────────────────────
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
    </svg>
  );
}
function PauseIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
    </svg>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export const VoiceTestimonial: React.FC<VoiceTestimonialProps> = ({
  mode,
  testimonials,
  title = 'O que nossos alunos dizem',
  subtitle = 'Resultados reais de alunos que aplicaram o método.',
}) => {
  const isDark = mode === 'dark';
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Inicializa áudios ──
  useEffect(() => {
    audioRefs.current.forEach((a) => a?.pause());
    audioRefs.current = testimonials.map((t) => {
      if (!t.audioUrl) return null;
      const audio = new Audio(t.audioUrl);
      audio.addEventListener('ended', () => setPlayingIndex(null));
      return audio;
    });
    return () => { audioRefs.current.forEach((a) => a?.pause()); };
  }, [testimonials]);

  // ── Controle de áudio ──
  const handlePlay = (index: number) => {
    if (playingIndex !== null && playingIndex !== index) {
      const prev = audioRefs.current[playingIndex];
      if (prev) { prev.pause(); prev.currentTime = 0; }
    }
    audioRefs.current[index]?.play().catch(console.error);
    setPlayingIndex(index);
  };
  const handlePause = (index: number) => {
    const a = audioRefs.current[index];
    if (a) { a.pause(); a.currentTime = 0; }
    setPlayingIndex(null);
  };

  // ── Rola para centralizar um card específico ──
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[];
    const card = cards[index];
    if (!card) return;
    // Centro do card em relação ao scrollLeft
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = el.clientWidth / 2;
    el.scrollTo({ left: cardCenter - containerCenter, behavior: 'smooth' });
  }, []);

  // ── Detecta qual card está centralizado após scroll ──
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[];
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
    setCanPrev(closest > 0);
    setCanNext(closest < testimonials.length - 1);
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    // Estado inicial
    setCanNext(testimonials.length > 1);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, testimonials.length]);

  // ── Setas: navega para o próximo/anterior centralizado ──
  const scrollDir = (dir: 'prev' | 'next') => {
    const newIndex = dir === 'next'
      ? Math.min(activeIndex + 1, testimonials.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  return (
    <div className="w-full">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center justify-center pt-4 mb-10 px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-center text-muted-foreground text-base md:text-lg">{subtitle}</p>
      </div>

      {/* Wrapper */}
      <div className="relative group">
        {/* Seta esquerda */}
        <button
          onClick={() => scrollDir('prev')}
          disabled={!canPrev}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700/60
                     flex items-center justify-center text-white shadow-lg
                     hover:bg-primary/20 hover:border-primary/60
                     disabled:opacity-0 disabled:pointer-events-none
                     transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Seta direita */}
        <button
          onClick={() => scrollDir('next')}
          disabled={!canNext}
          aria-label="Próximo"
          className="absolute right-2 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700/60
                     flex items-center justify-center text-white shadow-lg
                     hover:bg-primary/20 hover:border-primary/60
                     disabled:opacity-0 disabled:pointer-events-none
                     transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Fades laterais */}
        <div className="absolute left-0 top-0 h-full w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: isDark ? 'linear-gradient(to right, hsl(var(--background)), transparent)' : 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 h-full w-12 md:w-20 z-10 pointer-events-none"
          style={{ background: isDark ? 'linear-gradient(to left, hsl(var(--background)), transparent)' : 'linear-gradient(to left, white, transparent)' }} />

        {/* ── Trilha scroll com snap CENTER ── */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            // Padding lateral = metade da largura do container menos metade do card
            // Isso permite que o primeiro e o último card cheguem ao centro
            paddingLeft: 'calc(50% - 150px)',
            paddingRight: 'calc(50% - 150px)',
          }}
        >
          {testimonials.map((testimonial, index) => {
            const isPlaying = playingIndex === index;
            const hasAudio = !!testimonial.audioUrl;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                data-card
                className={`flex-shrink-0 rounded-2xl p-4 flex flex-col gap-4 border transition-all duration-300
                  w-[280px] sm:w-[320px]
                  ${isDark ? 'bg-zinc-900/90 border-zinc-700/50' : 'bg-white border-zinc-200'}
                  ${hasAudio ? 'border-primary/25' : ''}
                  ${isActive ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'scale-95 opacity-60'}
                `}
                style={{ scrollSnapAlign: 'center' }}
              >
                {testimonial.screenshot ? (
                  /* Renderização do Print do WhatsApp */
                  <div className="w-full h-80 md:h-[400px] relative rounded-xl overflow-hidden bg-zinc-800/50 flex-shrink-0 border border-zinc-700/30">
                    <img 
                      src={testimonial.screenshot} 
                      alt="Print do Aluno" 
                      draggable={false}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  /* Renderização Original (Avatar + Texto) */
                  <>
                    {/* Avatar + nome */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'}
                        alt={testimonial.name || 'Aluno'}
                        draggable={false}
                        className="w-11 h-11 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-black'}`}>
                          {testimonial.name}
                        </span>
                        <span className={`text-xs truncate ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {testimonial.jobtitle}
                        </span>
                      </div>
                      {hasAudio && (
                        <span className="ml-auto flex-shrink-0 text-[9px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/30">
                          🎙 áudio
                        </span>
                      )}
                    </div>

                    {/* Texto */}
                    {testimonial.text && (
                      <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-slate-300' : 'text-zinc-700'}`}>
                        {testimonial.text}
                      </p>
                    )}
                  </>
                )}

                {/* Player */}
                <div className={`w-full h-11 rounded-xl flex items-center px-3 gap-2 border
                  ${isDark ? 'bg-zinc-800/80' : 'bg-slate-100'}
                  ${hasAudio ? 'border-primary/20' : isDark ? 'border-zinc-700/30' : 'border-zinc-200'}
                `}>
                  {hasAudio ? (
                    <button
                      onClick={() => isPlaying ? handlePause(index) : handlePlay(index)}
                      aria-label={isPlaying ? 'Pausar' : 'Reproduzir áudio'}
                      className="flex-shrink-0 focus:outline-none hover:opacity-80 transition-opacity"
                    >
                      {isPlaying ? <PauseIcon className="size-8 text-primary" /> : <PlayIcon className="size-8 text-primary" />}
                    </button>
                  ) : (
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700/30">
                      <Mic className="size-3.5 text-zinc-500" />
                    </div>
                  )}

                  <div className="flex items-center gap-[2px] flex-1 justify-center overflow-hidden">
                    {WAVE_VARIANTS.map((variant, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-sm ${hasAudio ? isDark ? 'bg-primary/60' : 'bg-primary/50' : isDark ? 'bg-zinc-600/40' : 'bg-zinc-300/60'}`}
                        style={{ width: '3px', height: `${WAVE_HEIGHTS[i]}px` }}
                        variants={variant}
                        initial="initial"
                        animate={isPlaying ? 'animate' : 'initial'}
                      />
                    ))}
                  </div>

                  <span className={`text-[9px] font-bold flex-shrink-0 uppercase tracking-wider ${hasAudio ? 'text-primary/60' : isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {hasAudio ? 'Áudio' : 'Sem áudio'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir para depoimento ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
