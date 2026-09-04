import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About Bhumi Drishti</h1>
        <p className="text-lg text-slate-600">Intelligent Land Acquisition Management Platform.</p>
        <a href="/" className="mt-8 inline-block text-emerald-600 hover:underline">Back to Home</a>
      </div>
    </div>
  );
}
