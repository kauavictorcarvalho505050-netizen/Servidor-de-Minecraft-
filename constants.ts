import { Rule, ServerFeature, StoreItem } from './types';

export const SERVER_IP = "jogar.brazinomc.com.br";
export const DISCORD_LINK = "https://discord.gg/pwwppcKt";
export const STORE_LINK = "https://loja.brazinomc.com.br";

export const FEATURES: ServerFeature[] = [
  {
    title: "Arena PvP",
    description: "Treine suas habilidades de combate em nossa arena aberta com kits personalizados e ping BR otimizado.",
    icon: "sword",
    image: "https://i.imgur.com/IIIdoYK.jpeg", 
  },
];

export const SERVER_RULES: Rule[] = [
  { id: 1, title: "Respeito Mútuo", content: "Trate todos os jogadores e a staff com respeito. Discurso de ódio não é tolerado." },
  { id: 2, title: "Sem Trapaças (Cheating)", content: "Uso de clientes hack, macros ou qualquer vantagem injusta resultará em banimento permanente." },
  { id: 3, title: "Chat Limpo", content: "Evite spam, flood ou divulgação de outros servidores no chat global." },
  { id: 4, title: "Fair Play", content: "Não abuse de bugs ou glitches. Reporte-os imediatamente para a staff." },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'vip-thor',
    name: 'VIP Thor',
    price: 15.00,
    category: 'vip',
    image: 'https://cdn-icons-png.flaticon.com/512/744/744922.png', // Placeholder iron/silver look
    features: [
      'Tag [Thor] no chat e tab',
      'Voar no Lobby',
      'Entrar em salas cheias (Prioridade Baixa)',
      '1.000 Cash de bônus',
      'Skin exclusiva'
    ]
  },
  {
    id: 'vip-odin',
    name: 'VIP Odin',
    price: 30.00,
    category: 'vip',
    image: 'https://cdn-icons-png.flaticon.com/512/179/179249.png', // Placeholder gold look
    features: [
      'Tag [Odin] no chat e tab',
      'Todos benefícios do Thor',
      'Reset de KDR (1x)',
      'Pets exclusivos no Lobby',
      '3.000 Cash de bônus',
      'Entrar em salas cheias (Prioridade Média)'
    ]
  },
  {
    id: 'vip-zeus',
    name: 'VIP Zeus',
    price: 50.00,
    category: 'vip',
    bestValue: true,
    image: 'https://cdn-icons-png.flaticon.com/512/390/390260.png', // Placeholder diamond/blue look
    features: [
      'Tag [Zeus] destacada',
      'Todos benefícios do Odin',
      'Voar em mapas de espera',
      'Criar clãs gratuitamente',
      'Acesso ao /nick (Beta)',
      '6.000 Cash de bônus',
      'Prioridade Alta na fila'
    ]
  },
  {
    id: 'cash-pack-1',
    name: '5.000 Cash',
    price: 10.00,
    category: 'cash',
    image: 'https://cdn-icons-png.flaticon.com/512/2460/2460494.png',
    features: ['Moeda cosmética global', 'Compre caixas misteriosas', 'Desbloqueie kits']
  },
  {
    id: 'cash-pack-2',
    name: '15.000 Cash',
    price: 25.00,
    category: 'cash',
    bestValue: true,
    image: 'https://cdn-icons-png.flaticon.com/512/2460/2460494.png',
    features: ['Moeda cosmética global', 'Bônus de +10% incluso', 'Compre caixas misteriosas']
  }
];