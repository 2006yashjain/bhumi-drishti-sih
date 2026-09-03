import Link from 'next/link';
import { AlertCircle, ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-rose-600" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Information Not Found</h1>
      <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
        The public project information or notice you are looking for could not be found or may not be available for public access.
      </p>
      <Link href="/public" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1.5" /> Return to Public Portal
      </Link>
    </div>
  );
}
