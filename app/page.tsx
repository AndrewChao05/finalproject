'use client';

import React from 'react';

import Game from '../components/Game';

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <Game />
    </main>
  );
}