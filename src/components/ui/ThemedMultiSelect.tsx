import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export interface Option {
  label: string;
  value: string;
}

interface ThemedMultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function ThemedMultiSelect({ options, value = [], onChange, placeholder = 'Select...', className = '' }: ThemedMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const removeValue = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optValue));
  };

  const selectedLabels = value.map(v => options.find(o => o.value === v)?.label).filter(Boolean);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="flex items-center justify-between w-full min-h-[38px] px-2 py-1.5 bg-white border border-slate-300 rounded-md shadow-sm cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-grow">
          {value.length === 0 ? (
            <span className="text-slate-400 px-1">{placeholder}</span>
          ) : (
            value.map(val => {
              const opt = options.find(o => o.value === val);
              if (!opt) return null;
              return (
                <span key={val} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                  {opt.label}
                  <button type="button" onClick={(e) => removeValue(e, val)} className="ml-1 inline-flex items-center p-0.5 rounded-sm hover:bg-emerald-200 focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50 ${isSelected ? 'bg-emerald-50 text-emerald-900 font-medium' : 'text-slate-700'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(opt.value);
                }}
              >
                <div className={`w-4 h-4 mr-2 rounded border flex items-center justify-center ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="flex-grow">{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
