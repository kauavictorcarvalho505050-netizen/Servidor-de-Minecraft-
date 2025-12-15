import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface ServerFeature {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface PlayerStats {
  time: string;
  players: number;
}

export interface Rule {
  id: number;
  title: string;
  content: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  image: string;
  features: string[];
  category: 'vip' | 'cash' | 'unban';
  bestValue?: boolean;
}

export type ClanRole = 'Líder' | 'Oficial' | 'Membro';

export interface ClanMember {
  username: string;
  role: ClanRole;
  joinedAt: string;
}

export interface ClanMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  rank: ClanRole;
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  description: string;
  level: number;
  bank: number;
  members: ClanMember[];
  messages: ClanMessage[];
  createdAt: string;
}

export interface User {
  username: string;
  email: string;
  cash: number;
  rank: string; // 'Membro', 'VIP', etc.
  clanId?: string;
}

export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}