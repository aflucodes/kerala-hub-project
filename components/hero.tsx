'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSubmitClick?: () => void;
}

export function Hero({ searchQuery = '', setSearchQuery, onSubmitClick }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔗 Put your Google Form URL here if you have one directly:
  const googleFormUrl = "https://forms.gle/Q6FkQSdqiHEwHMCMA";

  return (
    <div className="relative w-full">
      {/* Top Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 bg-[#0B0F17]/80 backdrop-blur-md border-b border-white/5">
        <Link 
          href="/" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
            </svg>
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Kerala <span className="text-emerald-400">Campus Hub</span>
            </span>
            <span className="mt-1 text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
              Student Startup Support
            </span>
          </div>
        </Link>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-[#0F172A] border border-white/10 p-2 shadow-2xl z-50">
              <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl transition-all">Home</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl transition-all">About Us</Link>
              <Link href="/how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl transition-all">How It Works</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl transition-all">Contact Us</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-12 pb-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
          <span>🎓</span> Built for Kerala's student innovators
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          Kerala <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">Campus Hub</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mb-8">
          Discover Local Hackathons, IEDC Grants, and Student Micro-Projects.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
          {/* Active Input */}
          <div className="relative flex-1 w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search hackathons, grants, projects, notes..." 
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
            />
          </div>

          {/* Submit Button */}
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onSubmitClick}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-all text-sm shrink-0 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <span>+</span> Submit an Event or Project
          </a>
        </div>
      </div>
    </div>
  );
}