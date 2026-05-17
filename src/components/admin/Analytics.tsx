import { BarChart3, Download, Globe2, Users, ArrowUpRight } from 'lucide-react';

export default function Analytics() {
  // Note: These are mocked for the UI until tracking is implemented in Supabase
  const stats = [
    { label: 'Total Downloads', value: '14,208', change: '+12%', icon: Download, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Licenses', value: '3,842', change: '+5%', icon: Key, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Unique Users', value: '4,102', change: '+8%', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Countries Reached', value: '84', change: '+2', icon: Globe2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const topCountries = [
    { country: 'United States', code: '🇺🇸', users: 1240, percentage: 32 },
    { country: 'France', code: '🇫🇷', users: 850, percentage: 22 },
    { country: 'Germany', code: '🇩🇪', users: 540, percentage: 14 },
    { country: 'United Kingdom', code: '🇬🇧', users: 410, percentage: 11 },
    { country: 'Spain', code: '🇪🇸', users: 280, percentage: 7 },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold mb-1">Platform Analytics</h2>
        <p className="text-white/40 text-sm">Overview of downloads, active users, and global reach.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
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
              <h3 className="text-3xl font-black font-['Plus_Jakarta_Sans'] text-white">{stat.value}</h3>
              
              {/* Decorative glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Globe2 className="text-[#ddb8ff]" size={18} />
            Top Demographics
          </h3>
          <div className="space-y-5">
            {topCountries.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.code}</span>
                    <span className="font-medium">{c.country}</span>
                  </div>
                  <div className="text-white/50 text-xs">
                    <strong className="text-white">{c.users}</strong> users
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

        {/* Recent Activity (Mocked) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#ddb8ff]" size={18} />
            Live Activity Stream
          </h3>
          <div className="space-y-4">
            {[
              { time: 'Just now', action: 'New installation', details: 'Windows 11', country: '🇫🇷' },
              { time: '5m ago', action: 'License activated', details: 'Pro Plan', country: '🇩🇪' },
              { time: '12m ago', action: 'Download started', details: 'Setup.exe', country: '🇺🇸' },
              { time: '18m ago', action: 'Hardware ID reset', details: 'Admin action', country: '🇬🇧' },
              { time: '1h ago', action: 'New purchase', details: 'Lifetime Plan', country: '🇪🇸' },
            ].map((act, i) => (
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

// Quick mock component for Key icon since it wasn't imported from lucide-react in Analytics initially
function Key(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}
