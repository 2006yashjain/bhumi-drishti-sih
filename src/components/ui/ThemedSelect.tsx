import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Option {
  label: string;
  value: string;
}

interface ThemedSelectProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function ThemedSelect({ options, value, onChange, placeholder = 'Select...', className = '' }: ThemedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="flex items-center justify-between w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${!selectedOption ? 'text-slate-400' : 'text-slate-900'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50 ${opt.value === value ? 'bg-emerald-50 text-emerald-900 font-medium' : 'text-slate-700'}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              <span className="flex-grow">{opt.label}</span>
              {opt.value === value && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
