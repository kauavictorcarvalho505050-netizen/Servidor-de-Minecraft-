import { Rule, ServerFeature, StoreItem, Clan } from './types';

export const SERVER_IP = "jogar.brazinomc.com.br";
export const DISCORD_LINK = "https://discord.gg/brazinomc";
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
    id: 'vip-ferro',
    name: 'VIP Ferro',
    price: 15.00,
    category: 'vip',
    image: 'https://cdn-icons-png.flaticon.com/512/744/744922.png', // Placeholder iron
    features: [
      'Tag [Ferro] no chat e tab',
      'Voar no Lobby',
      'Entrar em salas cheias (Prioridade Baixa)',
      '1.000 Cash de bônus',
      'Skin exclusiva'
    ]
  },
  {
    id: 'vip-ouro',
    name: 'VIP Ouro',
    price: 30.00,
    category: 'vip',
    image: 'https://cdn-icons-png.flaticon.com/512/179/179249.png', // Placeholder gold
    features: [
      'Tag [Ouro] no chat e tab',
      'Todos benefícios do Ferro',
      'Reset de KDR (1x)',
      'Pets exclusivos no Lobby',
      '3.000 Cash de bônus',
      'Entrar em salas cheias (Prioridade Média)'
    ]
  },
  {
    id: 'vip-diamante',
    name: 'VIP Diamante',
    price: 50.00,
    category: 'vip',
    image: 'https://cdn-icons-png.flaticon.com/512/390/390260.png', // Placeholder diamond
    features: [
      'Tag [Diamante] destacada',
      'Voar em mapas de espera',
      'Criar clãs gratuitamente',
      'Acesso ao /nick (Beta)',
      '6.000 Cash de bônus',
      'Prioridade Alta na fila'
    ]
  },
  {
    id: 'mvp-brazino',
    name: 'MVP Brazino',
    price: 89.90,
    category: 'vip',
    bestValue: true,
    image: 'https://cdn-icons-png.flaticon.com/512/6941/6941697.png', // Placeholder crown
    features: [
      'Tag [MVP] com cores personalizáveis',
      'Todos os benefícios anteriores',
      'Acesso antecipado a novos jogos',
      'Multiplicador de Coins 3x',
      '15.000 Cash de bônus',
      'Prioridade Máxima na fila'
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

export const MOCK_CLANS: Clan[] = [
  {
    id: '1',
    name: 'Dragões do Nether',
    tag: 'DRG',
    description: 'Focados em dominação total no BedWars. Recrutamento aberto para nível 50+.',
    level: 15,
    bank: 45000,
    createdAt: '2023-11-15',
    members: [
      { username: 'DragonKing', role: 'Líder', joinedAt: '2023-11-15' },
      { username: 'FireMage', role: 'Oficial', joinedAt: '2023-11-20' },
      { username: 'Burner', role: 'Membro', joinedAt: '2023-12-01' },
    ],
    messages: [
      { id: '1', author: 'DragonKing', content: 'Treino hoje às 20h!', timestamp: '14:30', rank: 'Líder' },
      { id: '2', author: 'FireMage', content: 'Estarei lá.', timestamp: '14:35', rank: 'Oficial' },
    ]
  },
  {
    id: '2',
    name: 'Construtores Lendários',
    tag: 'BUILD',
    description: 'Para quem ama construir e criar no Survival.',
    level: 8,
    bank: 12500,
    createdAt: '2024-01-10',
    members: [
      { username: 'BobBuilder', role: 'Líder', joinedAt: '2024-01-10' },
      { username: 'BrickMaster', role: 'Membro', joinedAt: '2024-02-05' },
    ],
    messages: []
  },
  {
    id: '3',
    name: 'PVP Elite',
    tag: 'PVP',
    description: 'Só aceitamos os melhores do ranking.',
    level: 25,
    bank: 1000000,
    createdAt: '2023-05-20',
    members: [
      { username: 'KillerInstinct', role: 'Líder', joinedAt: '2023-05-20' },
    ],
    messages: []
  }
];