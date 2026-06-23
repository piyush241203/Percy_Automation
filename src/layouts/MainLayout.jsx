import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StableSelectorWrapper from '../components/StableSelectorWrapper';

export default function MainLayout() {
  return (
    <StableSelectorWrapper testId="app-body" className="min-flex flex flex-col min-h-screen bg-slate-950 text-slate-100 ambient-gradient font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col justify-start">
        <Outlet />
      </main>
      <Footer />
    </StableSelectorWrapper>
  );
}
