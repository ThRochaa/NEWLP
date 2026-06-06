import { useState, useEffect, useRef, useCallback } from 'react';
import { WandSparkles, Film, Sprout, Bot, Sparkles, Gift } from 'lucide-react';
import { HeroSection } from './components/ui/feature-carousel';
import { VoiceTestimonial } from './components/ui/voice-testimonial';
import { SalesNotification } from './components/ui/sales-notification';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './components/ui/carousel';

function Marquee() {
  return (
    <div className="h-[40px] flex items-center overflow-hidden border-b border-[hsla(199,89%,48%,0.1)] shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-background" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <div className="absolute top-0 left-0 w-[15%] h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }}></div>
      <div className="absolute top-0 right-0 w-[15%] h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }}></div>
      <div className="flex items-center gap-[120px] whitespace-nowrap animate-[marquee-scroll_35s_linear_infinite]">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-[120px]">
            <div className="flex items-center gap-2.5 text-white/50 hover:text-[#38bdf8] hover:-translate-y-px transition-all duration-300 cursor-default">
              <WandSparkles className="w-4 h-4 opacity-80" />
              <span className="uppercase tracking-[0.15em] text-xs font-semibold">objetos falantes</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/50 hover:text-[#38bdf8] hover:-translate-y-px transition-all duration-300 cursor-default">
              <Film className="w-4 h-4 opacity-80" />
              <span className="uppercase tracking-[0.15em] text-xs font-semibold">Veo 3</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/50 hover:text-[#38bdf8] hover:-translate-y-px transition-all duration-300 cursor-default">
              <Sprout className="w-4 h-4 opacity-80" />
              <span className="uppercase tracking-[0.15em] text-xs font-semibold">PACKS DE VÍDEOS</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/50 hover:text-[#38bdf8] hover:-translate-y-px transition-all duration-300 cursor-default">
              <Bot className="w-4 h-4 opacity-80" />
              <span className="uppercase tracking-[0.15em] text-xs font-semibold">Monetização de canais</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/50 hover:text-[#38bdf8] hover:-translate-y-px transition-all duration-300 cursor-default">
              <Sparkles className="w-4 h-4 opacity-80" />
              <span className="uppercase tracking-[0.15em] text-xs font-semibold">Prompts Prontos</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, rgb(14, 165, 233), transparent)' }}></div>
    </div>
  );
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

function TopTimer({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="flex justify-center mb-8 mt-8">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 font-mono text-sm text-primary font-bold shadow-[0_0_15px_rgba(14,165,233,0.3)]">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        OFERTA EXPIRA EM: {formatTime(timeLeft)}
      </div>
    </div>
  );
}

function Hero({ timeLeft }: { timeLeft: number }) {
  return (
    <section className="relative pt-16 pb-16 md:pt-20 md:pb-24 px-4 overflow-hidden">
      <TopTimer timeLeft={timeLeft} />
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          TRANSFORME <span className="text-gradient">IA</span> EM RENDA REAL
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubra o método simples que já ajudou milhares de iniciantes a criar vídeos virais, atrair clientes e gerar renda usando apenas o celular — <strong style={{ color: 'rgb(14, 165, 233)' }}>Mesmo sem aparecer</strong>.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="relative rounded-2xl overflow-hidden glow-primary">
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-2xl border-0"
              src="https://www.youtube.com/embed/hAUgDq4saWo?si=lcsCBr7aS5zko78X"
              title="Vídeo de Apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Mais de <strong className="text-foreground">3.000 alunos</strong> já estão aplicando esse método todos os dias.
        </p>
      </div>
      <div className="flex flex-col items-center mt-6 md:mt-8 gap-5 px-4">
        <a href="https://pay.cakto.com.br/3685yss_588880" className="btn-shine animate-float relative inline-flex items-center justify-center w-full sm:w-auto max-w-md px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-primary to-[hsl(210_100%_45%)] text-primary-foreground font-bold text-base sm:text-lg md:text-xl shadow-[0_0_40px_hsl(210_100%_56%/0.5)] hover:brightness-110 transition-all text-center leading-tight">
          ACESSAR AGORA
        </a>
      </div>

    </section>
  );
}
function IssoNaoEReal() {
  const videos = [
    {
      src: "/videos/IMG_1088.MP4",
      poster: "",
      alt: "Meu vídeo adicionado"
    },
    {
      src: "/videos/IMG_0383.MP4",
      poster: "",
      alt: "Vídeo 2"
    },
    {
      src: "/videos/IMG_1374.MOV",
      poster: "",
      alt: "Vídeo 3"
    },
    {
      src: "/videos/IMG_1375.MOV",
      poster: "",
      alt: "Vídeo 4"
    },
    {
      src: "/videos/IMG_1378.MOV",
      poster: "",
      alt: "Vídeo 5"
    },
    {
      src: "/videos/IMG_1381.MP4",
      poster: "",
      alt: "Vídeo 6"
    },
    {
      src: "/videos/IMG_1379.MOV",
      poster: "",
      alt: "Vídeo 7"
    }
  ];

  return (
    <HeroSection
      title={<>TUDO QUE VOCÊ PODE FAZER COM <span className="text-primary">IA</span></>}
      subtitle="A maioria das pessoas ainda não entendeu o que dá pra fazer com IA"
      videos={videos}
    />
  );
}

const BONUS_ITEMS = [
  { tag: "Kit Completo", title: "Diversas Ferramentas IAs", desc: "Acesso às melhores ferramentas de IA do mercado, inclusive ferramentas gratuitas para turbinar seus resultados", val: "R$ 450,00", icon: "🛠️" },
  { tag: "Biblioteca VIP", title: "Prompts Secretos", desc: "Receba acesso a um arsenal de Prompts prontos exclusivos testados e validados que geram resultados absurdos.", val: "R$ 300,00", icon: "🔑" },
  { tag: "Identidade Digital", title: "Criando seu Avatar Real", desc: "Crie um avatar hiper-realista seu para usar em conteúdos e vídeos", val: "R$ 150,00", icon: "🧑‍💻" },
  { tag: "Trends do Momento", title: "Trends Virais", desc: "Receba passo a passo exclusivo das trends do momento (Objetos falantes, personagens 3D e etc)", val: "R$150,00", icon: "🔥" },
  { tag: "Grupo Exclusivo", title: "Suporte Dedicado", desc: "Suporte exclusivo individual para dúvidas e orientação diária", val: "R$ 500,00", icon: "💬" },
  { tag: "2.000+ Vídeos", title: "Pack Viral Instantâneo", desc: "Arsenal de vídeos prontos para postar. Baixe, coloque música e monetize.", val: "R$ 99.00", icon: "🎬" }
];

function Bonus() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!api) return;
    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [api]);

  return (
    <section className="py-10 px-4 bg-secondary/30 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Gift className="w-4 h-4" />
          Bônus Exclusivos Pra Você
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Bônus de Lançamento</h2>
        <p className="text-muted-foreground text-lg">Ao garantir sua vaga hoje, você recebe bônus avaliados em mais de <strong className="text-foreground">R$ 1.500,00</strong> gratuitamente.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {BONUS_ITEMS.map((b, i) => (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="inline-block mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase">{b.tag}</div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{b.title}</h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{b.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="line-through text-muted-foreground text-sm">{b.val}</div>
                      <div className="text-emerald-400 font-bold text-sm bg-emerald-400/10 px-3 py-1 rounded-full">Grátis para você</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-6 h-2 bg-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]'
                  : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FORMAS_RENDA_ITEMS = [
  { tag: "E-commerce", title: "TikTok Shop", desc: "Venda produtos físicos com vídeos virais de IA sem aparecer. Sem câmera, sem estoque próprio.", icon: "🛒" },
  { tag: "Serviços", title: "Prestação de Serviço", desc: "Crie visuais de cinema para marcas de alto padrão e cobre como agência.", icon: "🎬" },
  { tag: "Mídia", title: "Canais Dark", desc: "Domine o YouTube com automação total de conteúdo. 100% IA, 0% rosto.", icon: "📺" },
  { tag: "Educação", title: "Infoprodutos", desc: "Lance treinamentos com materiais visuais de alta retenção criados por IA.", icon: "📚" },
];

function FormasRenda() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-renda-card]')) as HTMLElement[];
    const card = cards[index];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = Array.from(el.querySelectorAll('[data-renda-card]')) as HTMLElement[];
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
    setCanPrev(closest > 0);
    setCanNext(closest < FORMAS_RENDA_ITEMS.length - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollDir = (dir: 'prev' | 'next') => {
    scrollToIndex(dir === 'next'
      ? Math.min(activeIndex + 1, FORMAS_RENDA_ITEMS.length - 1)
      : Math.max(activeIndex - 1, 0));
  };

  return (
    <section className="py-10">
      <div className="text-center max-w-4xl mx-auto mb-16 px-4">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">Arraste para explorar</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">PRINCIPAIS FORMAS DE AUMENTAR A RENDA COM IA</h2>
        <p className="text-muted-foreground text-lg">Modelos validados para faturar com IA.</p>
      </div>

      {/* Carrossel */}
      <div className="relative group">
        {/* Seta esquerda */}
        <button onClick={() => scrollDir('prev')} disabled={!canPrev} aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-white shadow-lg hover:bg-primary/20 hover:border-primary/60 disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>

        {/* Seta direita */}
        <button onClick={() => scrollDir('next')} disabled={!canNext} aria-label="Próximo"
          className="absolute right-2 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-white shadow-lg hover:bg-primary/20 hover:border-primary/60 disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>

        {/* Fade esquerda */}
        <div className="absolute left-0 top-0 h-full w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        {/* Fade direita */}
        <div className="absolute right-0 top-0 h-full w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        {/* Trilha */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 pt-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50% - 150px)',
            paddingRight: 'calc(50% - 150px)',
          }}>
          {FORMAS_RENDA_ITEMS.map((item, i) => (
            <div
              key={i}
              data-renda-card
              onClick={() => scrollToIndex(i)}
              style={{ scrollSnapAlign: 'center' }}
              className={`flex-shrink-0 w-[280px] sm:w-[300px] p-8 rounded-2xl bg-card border flex flex-col justify-between cursor-pointer
                transition-all duration-300
                ${i === activeIndex
                  ? 'border-primary/50 scale-100 opacity-100 shadow-[0_0_30px_rgba(14,165,233,0.15)]'
                  : 'border-border/50 scale-95 opacity-50'
                }`}
            >
              <div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{item.tag}</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {FORMAS_RENDA_ITEMS.map((_, i) => (
          <button key={i} onClick={() => scrollToIndex(i)} aria-label={`Item ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'}`} />
        ))}
      </div>
    </section>
  );
}

export function Protocolo() {
  return (
    <section className="py-12 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15)_0%,transparent_70%)]"></div>
      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
        <div className="flex justify-center gap-4 text-[10px] uppercase tracking-widest text-primary mb-6 font-mono">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="inline-block px-3 py-1 mb-4 border border-red-500/30 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">ARQUIVOS SECRETOS</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">Protocolo de Arsenal ViralVeo</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto relative z-10">
        {[
          { title: "Grok", desc: "Acesso ao Grok" },
          { title: "Veo3 Pro", desc: "VPN Indetectável" },
          { title: "Nanobanana Pro", desc: "16:9, 9:16, 1:1" },
          { title: "Whisk IA", desc: "Seed Consistente" },
          { title: "Seedance", desc: "Monetização Dark" },
          { title: "Rastro Zero", desc: "Remoção de Logo" }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/60 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SimpleImageComparison({ src }: { src: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-80 rounded-xl overflow-hidden select-none group">
      <img src={src} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={src} alt="Antes" className="absolute inset-0 w-full h-full object-cover grayscale" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/30 backdrop-blur-sm flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />
    </div>
  );
}

function Fotorealismo() {
  return (
    <section className="py-10 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">FOTOS PROFISSIONAIS</h2>
        <h3 className="text-xl font-semibold mb-4 text-primary">Isso aqui substitui 100% estúdios e câmeras profissionais, programas de edição e profissionais .</h3>
        <p className="text-muted-foreground text-lg mb-2">Quem aprende isso não depende mais de ninguém pra criar conteúdo que chama atenção e vende...</p>
        <p className="text-muted-foreground text-sm">Arraste a barra para comparar a imagem original com o processamento da ViralVeo.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        <div className="w-full md:w-1/3">
          <SimpleImageComparison src="https://infinityia.cloud/assets/pele-after-TOzmiC7g.webp" />
        </div>
        <div className="w-full md:w-1/3">
          <SimpleImageComparison src="https://infinityia.cloud/assets/perfume-after-C-rgQ3Ku.webp" />
        </div>
        <div className="w-full md:w-1/3">
          <SimpleImageComparison src="https://infinityia.cloud/assets/girl-after-N6-YNQR6.webp" />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <a href="https://pay.cakto.com.br/3685yss_588880" className="btn-shine animate-float relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-gradient-to-r from-primary to-[hsl(210_100%_45%)] text-primary-foreground font-bold text-lg shadow-[0_0_40px_hsl(210_100%_56%/0.5)] hover:brightness-110 transition-all text-center">
          Quero Aprender
        </a>
      </div>
    </section>
  );
}

function Pricing({ timeLeft }: { timeLeft: number }) {
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-10 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.1)_0%,transparent_50%)]"></div>
      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
        <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-secondary/80 text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold border border-primary/30">Oferta por tempo limitado</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10 text-white uppercase">Quanto custa o<br /><span className="text-primary">Futuro?</span></h2>

        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-[#0a1526] border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
            <span className="text-3xl sm:text-4xl font-black text-white leading-none">{pad(h)}</span>
            <span className="text-[10px] sm:text-xs text-primary font-bold tracking-widest mt-2">HORAS</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-primary/50 pb-6 sm:pb-8">:</span>
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-[#0a1526] border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
            <span className="text-3xl sm:text-4xl font-black text-white leading-none">{pad(m)}</span>
            <span className="text-[10px] sm:text-xs text-primary font-bold tracking-widest mt-2">MIN</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-primary/50 pb-6 sm:pb-8">:</span>
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-[#0a1526] border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
            <span className="text-3xl sm:text-4xl font-black text-white leading-none">{pad(s)}</span>
            <span className="text-[10px] sm:text-xs text-primary font-bold tracking-widest mt-2">SEG</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto relative z-10">
        <div className="p-8 rounded-3xl bg-secondary/30 border border-white/10 w-full md:w-1/2 flex flex-col">
          <div className="text-xs font-semibold text-primary mb-2 tracking-widest uppercase">Future</div>
          <h3 className="text-2xl font-bold text-white mb-2">VIRALVEO BÁSICO</h3>
          <div className="mb-6 flex flex-col gap-1">
            <span className="line-through text-white/40">R$ 57</span>
            <span className="text-4xl font-black text-white">R$ 19,90</span>
          </div>
          <p className="text-white/60 mb-6 text-sm">Acesso essencial para quem está começando no mundo da IA.</p>
          <ul className="space-y-3 mb-8 text-sm flex-1">
            <li className="text-white/90 flex gap-2 items-start"><span>✔️</span> <span>Acesso aos Packs de vídeos prontos</span></li>
            <li className="text-white/90 flex gap-2 items-start"><span>✔️</span> <span>Acesso ao arsenal de prompts prontos</span></li>
            <li className="text-white/90 flex gap-2 items-start"><span>✔️</span> <span>Acesso aos agentes de prompts treinados</span></li>
            <li className="text-white/90 flex gap-2 items-start"><span>✔️</span> <span>Acesso ao treinamento canal dark viral</span></li>
            <li className="text-white/90 flex gap-2 items-start"><span>✔️</span> <span>Acesso às ferramentas IA Gratuitas</span></li>

            <li className="text-white/30 flex gap-2 items-start mt-4"><span>❌</span> <span>Acesso ao módulo Objetos e frutas falantes</span></li>
            <li className="text-white/30 flex gap-2 items-start"><span>❌</span> <span>Acesso ao módulo Personagens 3D</span></li>
            <li className="text-white/30 flex gap-2 items-start"><span>❌</span> <span>Acesso ao módulo Modelo realista</span></li>
            <li className="text-white/30 flex gap-2 items-start"><span>❌</span> <span>Acesso ao módulo FOTO IA</span></li>
            <li className="text-white/30 flex gap-2 items-start"><span>❌</span> <span>Acesso ao módulo monetização com IA</span></li>
          </ul>
          <a href="https://pay.cakto.com.br/3685yss_588880" className="inline-block text-center w-full py-4 rounded-xl border border-primary/50 text-primary font-bold hover:bg-primary/10 transition-colors">ASSINAR BÁSICO</a>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/20 to-primary/5 border border-primary relative w-full md:w-1/2 flex flex-col scale-100 md:scale-105 shadow-[0_0_50px_rgba(14,165,233,0.2)] glow-primary">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Escolhido pela IA</div>
          <div className="text-xs font-semibold text-primary mb-2 tracking-widest uppercase">Dominância</div>
          <h3 className="text-2xl font-bold text-white mb-2">PLANO PRO ALAVANCAGEM 2.0</h3>
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-mono text-sm font-bold border border-primary/30 self-start">
            ⏳ {formatTime(timeLeft)}
          </div>
          <div className="mb-6 flex flex-col gap-1">
            <span className="line-through text-white/40">R$ 197</span>
            <span className="text-4xl font-black text-white">R$ 49,90</span>
            <span className="text-primary text-sm font-semibold">12x de R$ 4,98</span>
          </div>
          <p className="text-white/60 mb-6 text-sm">O protocolo completo. Acesso vitalício, Criação ilimitada e Domínio total.</p>
          <ul className="space-y-3 mb-8 text-white text-sm flex-1 font-medium">
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso aos Packs de vídeos prontos</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao arsenal de prompts prontos</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso aos agentes de prompts treinados</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao treinamento canal dark viral</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso às ferramentas IA Gratuitas</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao módulo Objetos e frutas falantes</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao módulo Personagens 3D</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao módulo Modelo realista</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao módulo FOTO IA</span></li>
            <li className="flex gap-2 items-start"><span>✔️</span> <span>Acesso ao módulo Monetização com IA</span></li>
          </ul>
          <a href="https://pay.cakto.com.br/3685yss_588880" className="inline-block text-center w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-colors btn-shine overflow-hidden relative">DOMINAR AGORA</a>
        </div>
      </div>
    </section>
  );
}

const VOICE_TESTIMONIALS = [
  {
    // Salve seu print do WhatsApp na pasta public/prints/ e renomeie para print1.jpg (ou .png)
    screenshot: '/prints/print1.jpeg',
    audioUrl: '/audio/aluno-1.ogg', // Áudio correspondente na pasta public/audio/
  },
  {
    screenshot: '/prints/print2.jpeg',
    audioUrl: '/audio/aluno-2.ogg',
  },
  {
    screenshot: '/prints/print3.jpg',
    audioUrl: '/audio/aluno-3.ogg',
  },
  {
    screenshot: '/prints/print4.jpg',
    audioUrl: '/audio/aluno-4.ogg',
  },
  {
    screenshot: '/prints/print5.jpg',
    audioUrl: '/audio/aluno-5.ogg',
  }
];

function Resultados() {
  return (
    <section className="py-10 px-4">
      <div className="text-center max-w-4xl mx-auto mb-4">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">⭐ PROVAS REAIS</div>
      </div>
      <VoiceTestimonial
        mode="dark"
        testimonials={VOICE_TESTIMONIALS}
        title="Resultados de Alunos"
        subtitle="Confira os resultados que nossos alunos estão enviando agora mesmo."
      />
    </section>
  );
}

export function Modules() {
  return (
    <section className="py-10 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">Acesso Exclusivo</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Por dentro da Plataforma</h2>
        <p className="text-muted-foreground text-lg">Arraste para o lado ou aguarde para ver todos os módulos disponíveis.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {[
          { title: "Bem Vindos", img: "module-1-COmuxXc7" },
          { title: "Acesso ao Grok", img: "module-2-QsDxkz6W" },
          { title: "Seu Personagem no Grok", img: "module-3-D_N9U_c3" },
          { title: "Veo3 Ilimitado", img: "module-4-DIj0nJYw" }
        ].map((m, i) => (
          <div key={i} className="rounded-xl overflow-hidden relative group">
            <img src={`https://infinityia.cloud/assets/${m.img}.webp`} alt={m.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm">{m.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="py-10 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">Exclusividade Total</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">ViralVeo Services</h2>
        <p className="text-muted-foreground text-lg">Contrate nossos serviços</p>
      </div>
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-card border border-border/50 relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">DISPONÍVEL</div>
        <h3 className="text-2xl font-bold mb-2">PROJETO SOB MEDIDA</h3>
        <p className="text-muted-foreground mb-6">Orçamento baseado na complexidade da sua procura.</p>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-2 items-center"><span className="text-primary">✓</span> Criação de Vídeos Profissionais e de Alta Conversão</li>
          <li className="flex gap-2 items-center"><span className="text-primary">✓</span> Desenvolvimento de Influencer IA Própria</li>
          <li className="flex gap-2 items-center"><span className="text-primary">✓</span> Edição de Vídeos Longos com IA</li>
          <li className="flex gap-2 items-center"><span className="text-primary">✓</span> Consultoria de Implementação de Processos</li>
          <li className="flex gap-2 items-center"><span className="text-primary">✓</span> Suporte Prioritário 24/7</li>
        </ul>
        <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-colors">SOLICITAR ORÇAMENTO</button>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "A IA vai roubar meu emprego?",
    a: `Não. Mas quem aprende a usar IA pode facilmente substituir quem não aprende.
A verdade é simples: a Inteligência Artificial não tira vagas — ela muda o jogo.
Nosso objetivo é colocar você do lado de quem domina as ferramentas, cria oportunidades e usa a IA pra gerar renda, ao invés de ser impactado por ela.`
  },
  {
    q: "O que exatamente eu vou aprender no treinamento?",
    a: `Você vai aprender, na prática, como usar as IAs mais avançadas do mercado para:
• Criar vídeos virais para Instagram e TikTok
• Produzir imagens e conteúdos ultrarrealistas
• Criar influenciadores virtuais
• Gerar vídeos com aparência cinematográfica
• Automatizar processos e transformar isso em renda
Mesmo que você esteja começando do zero.`
  },
  {
    q: "Preciso pagar pelas ferramentas usadas no curso?",
    a: `Não.
Você vai aprender a usar ferramentas gratuitas (ou com planos acessíveis) que já são suficientes para criar conteúdos profissionais e começar.
Se quiser evoluir depois, mostramos também opções mais avançadas — mas não é obrigatório para ter resultados.`
  },
  {
    q: "O curso é teórico ou prático?",
    a: `100% prático.
Você vai ver exatamente o que fazer, com aulas diretas no formato “passo a passo”, mostrando a tela e cada clique.
Sem enrolação, sem teoria desnecessária.
A ideia é você assistir e já conseguir aplicar.`
  }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 bg-secondary/30">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">Mão de obra qualificada em Inteligência Artificial</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Dúvidas Frequentes</h2>
        <p className="text-muted-foreground text-lg">Perguntas que recebemos antes das pessoas ficarem ricas.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              onClick={() => toggleFaq(i)}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center font-bold">
                {item.q}
                <span className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getSecondsUntilMidnightBRT() {
  const now = new Date();
  const brtString = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
  const brtDate = new Date(brtString);
  const tomorrow = new Date(brtDate);
  tomorrow.setHours(24, 0, 0, 0);
  return Math.floor((tomorrow.getTime() - brtDate.getTime()) / 1000);
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilMidnightBRT());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 24 * 60 * 60; // Reset to 24 hours
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative font-sans">
      <Marquee />
      <main>
        <Hero timeLeft={timeLeft} />
        <IssoNaoEReal />
        <div className="text-center -mt-8 mb-12 relative z-10">
          <p className="text-base md:text-xl text-muted-foreground/80 max-w-3xl mx-auto px-4 font-medium italic">
            Enquanto alguns só assistem, outros estão usando isso pra criar vídeos virais e gerar renda todos os dias.
          </p>
        </div>
        <Bonus />
        <FormasRenda />
        <Fotorealismo />
        <Resultados />
        <Pricing timeLeft={timeLeft} />
        <Faq />
      </main>
      <footer className="py-10 text-center text-muted-foreground text-sm border-t border-border/50">
        © 2026 ViralVeo. Todos os direitos reservados.
      </footer>
      <SalesNotification />
    </div>
  );
}

export default App;
