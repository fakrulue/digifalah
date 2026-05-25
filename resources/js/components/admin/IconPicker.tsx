import { Search, TrendingUp, Globe, Layout, MessageSquare, Target, Zap, Shield, BarChart, Users, Mail, Smartphone, ShoppingBag, CreditCard, Code, Cpu, Layers, Share2, MousePointer2, Image, Video, Settings, Database, Cloud, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Search, TrendingUp, Globe, Layout, MessageSquare, Target, Zap, Shield, 
  BarChart, Users, Mail, Smartphone, ShoppingBag, CreditCard, Code, 
  Cpu, Layers, Share2, MousePointer2, Image, Video, Settings, Database, Cloud, PenSquare
};

const COMMON_ICONS = Object.keys(ICON_MAP);

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState('');
  
  const filteredIcons = COMMON_ICONS.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-muted/20 p-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search icons..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
        {filteredIcons.map((name) => {
          const Icon = ICON_MAP[name];
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`flex aspect-square items-center justify-center rounded-lg transition-all ${
                value === name 
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                : 'bg-white text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              title={name}
            >
              {Icon && <Icon className="h-5 w-5" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Selected:</span>
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-border shadow-sm">
           {value && ICON_MAP[value] ? (
             <>
               {(() => {
                 const SelectedIcon = ICON_MAP[value];
                 return <SelectedIcon className="h-4 w-4 text-primary" />;
               })()}
               <span className="text-sm font-bold text-gray-900">{value}</span>
             </>
           ) : (
             <span className="text-xs text-muted-foreground italic">None selected</span>
           )}
        </div>
      </div>
    </div>
  );
}
