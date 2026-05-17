import { useState, useEffect } from 'react';
import { BarChart3, Download, Globe2, Users, ArrowUpRight } from 'lucide-react';

export default function Analytics({ password }: { password?: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin-stats', {
      headers: { 'x-admin-password': password || sessionStorage.getItem('ed_admin_auth') || '' }
    })
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [password]);

  if (loading) {
    return <div className="text-white/40 text-center py-20">Loading live analytics...</div>;
  }

  if (!data || data.error) {
    return <div className="text-red-400 text-center py-20">Failed to load analytics.</div>;
  }

  const { stats, topCountries, recentActivity } = data;

  const statCards = [
    { label: 'Total Downloads', value: stats.downloads, change: 'Live', icon: Download, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Licenses', value: stats.activeLicenses, change: 'Live', icon: Key, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Unique Users', value: stats.uniqueUsers, change: 'Live', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Countries Reached', value: stats.countriesReached, change: 'Live', icon: Globe2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold mb-1">Platform Analytics</h2>
        <p className="text-white/40 text-sm">Real-time overview of downloads, active users, and global reach.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
                  <ArrowUpRight size={12} />
                  {stat.change}
                </div>
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black font-['Plus_Jakarta_Sans'] text-white">{stat.value.toLocaleString()}</h3>
              
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
            </div>
          );
        })}
      </div>

      {/* World Map Live View */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <Globe2 className="text-[#ddb8ff]" size={18} />
          Live Global Activity
          <span className="flex items-center gap-2 ml-4 text-[10px] uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Visitors (Retrievals)
          </span>
          <span className="flex items-center gap-2 ml-2 text-[10px] uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> App Installs & Activations
          </span>
        </h3>
        
        <div className="relative w-full aspect-[2/1] bg-black/20 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
          {/* Reliable World Map Image */}
          <div className="absolute inset-0 w-full h-full p-4 pointer-events-none">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
              alt="World Map" 
              className="w-full h-full object-contain opacity-[0.15] invert drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
            />
          </div>          
          {/* Glowing Dots from Live Activity */}
          {recentActivity.map((act: any, i: number) => {
            if (!act.rawCode) return null;
            
            // Define mapped coordinates (approximate % from top/left for top countries)
            const mapCoords: Record<string, { top: string, left: string }> = {
              'US': { top: '35%', left: '22%' },
              'CA': { top: '25%', left: '22%' },
              'GB': { top: '28%', left: '48%' },
              'FR': { top: '33%', left: '50%' },
              'DE': { top: '30%', left: '52%' },
              'ES': { top: '36%', left: '48%' },
              'IT': { top: '35%', left: '53%' },
              'RU': { top: '25%', left: '65%' },
              'CN': { top: '40%', left: '75%' },
              'JP': { top: '38%', left: '85%' },
              'IN': { top: '45%', left: '70%' },
              'BR': { top: '65%', left: '32%' },
              'AU': { top: '75%', left: '85%' },
              'AE': { top: '45%', left: '62%' },
              'SA': { top: '45%', left: '58%' },
              'ZA': { top: '75%', left: '55%' },
            };

            const coords = mapCoords[act.rawCode];
            if (!coords) return null;

            // Green for hwid_bound (installs), red for downloads/retrievals
            const isInstall = act.rawAction === 'hwid_bound';
            const colorClass = isInstall ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]';
            const ringClass = isInstall ? 'bg-green-500' : 'bg-red-500';

            return (
              <div 
                key={`dot-${i}`}
                className="absolute flex items-center justify-center group z-10"
                style={{ top: coords.top, left: coords.left }}
              >
                {/* Ping animation ring */}
                <div className={`absolute w-4 h-4 rounded-full opacity-75 animate-ping ${ringClass}`} style={{ animationDuration: '3s', animationDelay: `${i * 0.2}s` }} />
                {/* Core dot */}
                <div className={`w-2 h-2 rounded-full relative z-10 ${colorClass}`} />
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-2 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                  {act.country} {act.details} • {act.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Countries */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Globe2 className="text-[#ddb8ff]" size={18} />
            Top Demographics
          </h3>
          <div className="space-y-5">
            {topCountries.length === 0 ? (
               <p className="text-white/30 text-sm">No location data yet.</p>
            ) : topCountries.map((c: any, i: number) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.code}</span>
                    <span className="font-medium">{c.country}</span>
                  </div>
                  <div className="text-white/50 text-xs">
                    <strong className="text-white">{c.users}</strong> actions
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#ddb8ff]" size={18} />
            Live Activity Stream
          </h3>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
               <p className="text-white/30 text-sm">No recent activity.</p>
            ) : recentActivity.map((act: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg shrink-0">
                  {act.country}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{act.action}</p>
                  <p className="text-xs text-white/40 truncate">{act.details}</p>
                </div>
                <div className="text-xs font-mono text-white/30 whitespace-nowrap">
                  {act.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick mock component for Key icon
function Key(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

