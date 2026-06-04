import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { cn } from '@/lib/utils'; 

// --- TYPES ---
interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle: string;
  videos: { src: string; poster: string; alt: string; }[];
}

const CarouselVideo = ({
  src,
  poster,
  alt,
  isPlaying,
  onPlayToggle,
  isCenter,
  onNavigate
}: {
  src: string;
  poster: string;
  alt: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
  isCenter: boolean;
  onNavigate: () => void;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch((err) => {
        console.log("Erro ao iniciar o vídeo:", err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl group cursor-pointer bg-black"
      onClick={() => {
        if (isCenter) {
          onPlayToggle();
        } else {
          onNavigate();
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="object-cover w-full h-full rounded-3xl"
        loop
        playsInline
      />
      {/* Botão de Play */}
      {!isPlaying && isCenter && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors rounded-3xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/95 flex items-center justify-center scale-100 hover:scale-110 transition-transform shadow-[0_0_20px_rgba(14,165,233,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-0.5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      {/* Botão de Pause sutil */}
      {isPlaying && isCenter && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30 rounded-3xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/95 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HERO SECTION COMPONENT ---
export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, videos, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(videos.length / 2));
    const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, [videos.length]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };
    
    React.useEffect(() => {
        if (playingIndex !== null) return;
        const timer = setInterval(() => {
            handleNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [handleNext, playingIndex]);

    React.useEffect(() => {
      setPlayingIndex(null);
    }, [currentIndex]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-x-hidden bg-background text-foreground p-4',
          className
        )}
        {...props}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(14,165,233,0.3),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Content */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-4xl">
              {title}
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          </div>

          {/* Main Showcase Section */}
          <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
            {/* Carousel Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
              {videos.map((video, index) => {
                const offset = index - currentIndex;
                const total = videos.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute w-48 h-[270px] md:w-64 md:h-[450px] transition-all duration-500 ease-in-out',
                      'flex items-center justify-center'
                    )}
                    style={{
                      transform: `
                        translateX(${(pos) * 55}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.8 : 0.6})
                        rotateY(${(pos) * -15}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.5 : 0,
                      filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                      visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                    }}
                  >
                    <CarouselVideo
                      src={video.src}
                      poster={video.poster}
                      alt={video.alt}
                      isPlaying={playingIndex === index}
                      isCenter={isCenter}
                      onPlayToggle={() => {
                        setPlayingIndex(playingIndex === index ? null : index);
                      }}
                      onNavigate={() => {
                        if (pos === 1) handleNext();
                        if (pos === -1) handlePrev();
                      }}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/50 backdrop-blur-sm border-primary/20"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/50 backdrop-blur-sm border-primary/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
