"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, User, Map, AlertCircle, FileText, Search, Info } from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/public', icon: <Map className="w-4 h-4 mr-1.5" /> },
    { name: 'Projects', href: '/public#search', icon: <Search className="w-4 h-4 mr-1.5" /> },
    { name: 'Process', href: '/public/process', icon: <Info className="w-4 h-4 mr-1.5" /> },
    { name: 'Notices', href: '/public#notices', icon: <FileText className="w-4 h-4 mr-1.5" /> },
    { name: 'Grievance', href: '/public/grievance', icon: <AlertCircle className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* PUBLIC HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center">
              <Link href="/public" className="flex items-center">
                <Map className="w-6 h-6 text-indigo-600 mr-2" />
                <div>
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">Bhumi Drishti</h1>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Public Portal</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`flex items-center text-sm font-medium ${pathname === link.href ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600 transition-colors'}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-xs font-semibold text-slate-500 border border-slate-200 rounded px-2 py-1 cursor-pointer hover:bg-slate-50">
                <Globe className="w-3.5 h-3.5 mr-1" /> EN / हिन्दी
              </div>
              <Link 
                href="/official/login" 
                className="flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded transition-colors"
              >
                <User className="w-3.5 h-3.5 mr-1.5" /> Official Portal
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-2">
                <Link 
                  href="/official/login" 
                  className="flex items-center px-3 py-2 rounded-md text-base font-bold text-indigo-700 bg-indigo-50"
                >
                  <User className="w-4 h-4 mr-2" /> Official Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-3">
                <Map className="w-6 h-6 text-indigo-400 mr-2" />
                <h2 className="text-xl font-bold text-white tracking-tight">Bhumi Drishti</h2>
              </div>
              <p className="text-sm text-slate-400 mb-4 max-w-md">
                Intelligent Land Acquisition Management. Providing transparent and accessible information to citizens and stakeholders.
              </p>
              <div className="inline-block bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded border border-slate-700 font-medium">
                Prototype / Demonstration System
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/public" className="hover:text-indigo-400 transition-colors">Search Projects</Link></li>
                <li><Link href="/public/process" className="hover:text-indigo-400 transition-colors">Acquisition Process</Link></li>
                <li><Link href="/public#notices" className="hover:text-indigo-400 transition-colors">Public Notices</Link></li>
                <li><Link href="/public/grievance" className="hover:text-indigo-400 transition-colors">File Grievance</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">System</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/official/login" className="hover:text-indigo-400 transition-colors flex items-center">Official Portal <User className="w-3 h-3 ml-1" /></Link></li>
                <li><span className="text-slate-500">Privacy Policy (Demo)</span></li>
                <li><span className="text-slate-500">Terms of Use (Demo)</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Bhumi Drishti Prototype. All rights reserved.</p>
            <p className="text-center md:text-right max-w-lg italic">
              Disclaimer: Public information shown in this prototype is synthetic and does not represent official government records. 
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
