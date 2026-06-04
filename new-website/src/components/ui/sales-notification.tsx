import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface Sale {
  name: string;
  location: string;
  plan: string;
  time: string;
}

const BrazilianCities = [
  'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Curitiba - PR',
  'Porto Alegre - RS', 'Salvador - BA', 'Fortaleza - CE', 'Brasília - DF',
  'Recife - PE', 'Goiânia - GO', 'Campinas - SP', 'Florianópolis - SC',
  'Vitória - ES', 'Manaus - AM', 'Natal - RN', 'João Pessoa - PB',
  'Maceió - AL', 'São Luís - MA', 'Teresina - PI', 'Campo Grande - MS',
  'Cuiabá - MT', 'Aracaju - SE', 'Ribeirão Preto - SP', 'Londrina - PR',
  'Joinville - SC', 'Juiz de Fora - MG', 'Niterói - RJ', 'Belém - PA'
];

const BrazilianNames = [
  'Lucas M.', 'Mariana S.', 'Guilherme F.', 'Beatriz R.', 'Felipe A.',
  'Camila O.', 'Thiago N.', 'Amanda C.', 'Rodrigo P.', 'Jéssica L.',
  'Matheus V.', 'Isabella G.', 'Gabriel D.', 'Larissa T.', 'Bruno B.',
  'Fernanda K.', 'Rafael C.', 'Letícia M.', 'Gustavo H.', 'Gabriela S.',
  'Daniel R.', 'Juliana F.', 'Leonardo A.', 'Patricia P.', 'Henrique S.',
  'Carolina Z.', 'Eduardo L.', 'Vanessa B.', 'Marcelo M.', 'Aline D.'
];

const Plans = [
  'Plano Pro Alavancagem 2.0',
  'Plano Pro Alavancagem 2.0', // Duplicado para maior probabilidade
  'Plano Pro Alavancagem 2.0',
  'Plano Básico'
];

const TimeAgo = [
  'acabou de comprar',
  'há 30 segundos',
  'há 45 segundos',
  'há 1 minuto',
  'há 2 minutos'
];

export function SalesNotification() {
  const [currentSale, setCurrentSale] = useState<Sale | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Função para gerar uma venda aleatória
    const generateRandomSale = (): Sale => {
      const name = BrazilianNames[Math.floor(Math.random() * BrazilianNames.length)];
      const location = BrazilianCities[Math.floor(Math.random() * BrazilianCities.length)];
      const plan = Plans[Math.floor(Math.random() * Plans.length)];
      const time = TimeAgo[Math.floor(Math.random() * TimeAgo.length)];
      return { name, location, plan, time };
    };

    // Função para gerenciar o loop de exibição das notificações
    const showNotificationCycle = () => {
      const nextSale = generateRandomSale();
      setCurrentSale(nextSale);
      setIsVisible(true);

      // Oculta a notificação após 5 segundos
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return hideTimeout;
    };

    // A primeira notificação aparece após 6 segundos
    const initialDelay = setTimeout(() => {
      showNotificationCycle();
    }, 6000);

    // Intervalo recorrente de ciclo a cada 18 segundos (5s visível + 13s invisível)
    const interval = setInterval(() => {
      showNotificationCycle();
    }, 18000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!currentSale) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-[99999] max-w-[320px] w-[calc(100%-2rem)] bg-zinc-950/90 border border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out transform flex items-center gap-3.5 select-none ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      {/* Círculo do Ícone */}
      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative">
        <ShoppingBag className="w-5 h-5 text-primary animate-pulse" />
        {/* Ponto verde piscante de atividade ao vivo */}
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full animate-ping"></span>
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full"></span>
      </div>

      {/* Conteúdo do Texto */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-white truncate">
          {currentSale.name} <span className="font-normal text-white/60">de</span> {currentSale.location}
        </p>
        <p className="text-xs text-white/80 mt-0.5 truncate">
          Adquiriu o <span className="text-primary font-semibold">{currentSale.plan}</span>
        </p>
        <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5 mt-1">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          {currentSale.time}
        </p>
      </div>
    </div>
  );
}
