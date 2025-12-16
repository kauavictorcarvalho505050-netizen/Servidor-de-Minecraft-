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

export interface User {
  username: string;
  email: string;
  cash: number;
  rank: string; // 'Membro', 'VIP', etc.
}

export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}