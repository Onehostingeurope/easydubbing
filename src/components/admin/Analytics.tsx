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
          {/* Simple SVG World Map Outline */}
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <path fill="currentColor" d="M141.2,125.7c0,0-1.8-3.4-3.5-2.2c-1.8,1.1-2.9,3.7-2.9,3.7s-2.1,3.2-1.7,4.8c0.4,1.6,4.5,2.7,4.5,2.7s1.4,1.1,1.1,1.8 c-0.3,0.6-0.3,3.7-0.3,3.7s0.1,1.7,1.8,1.8c1.6,0.1,2.5,0.5,2.5,0.5s0.6-1.5,1.7-1.9C145.4,140.2,141.2,125.7,141.2,125.7z M204.3,95.3c0,0-1-1.6-2.5-1c-1.6,0.6-5.8,1.4-5.8,1.4s-1.8,1-1.9,1.7c-0.1,0.8,0.7,1.3,0.7,1.3s1,1.1,1.6,0.7 c0.6-0.4,2.2-2.3,2.2-2.3S199.9,96.3,204.3,95.3z M271,76.5c-0.3-1-1.9-1.3-1.9-1.3s-1.8-0.9-1.9-0.2c-0.1,0.8-0.1,1.5-0.1,1.5 s-0.7,0.3-0.7,0.9c0,0.6,0.4,1,1,0.9c0.7-0.1,1.3-1,1.3-1s1.3-0.1,2.1,0C271.6,77.4,271.3,77.5,271,76.5z M474.3,109.1 c-0.1-0.9-1-0.9-1-0.9s-1.4,0-1.3,0.8c0.1,0.9,0.3,1.6,0.3,1.6s0.3,1,1.1,0.9c0.8-0.1,0.9-0.9,0.9-0.9S474.5,110.1,474.3,109.1z M521.8,103.5c-0.1-1-1.1-1-1.1-1s-1.2-0.2-1.2,0.6c0,0.8,0,1.9,0,1.9s0.5,1.2,1.2,1c0.8-0.2,1.2-1.4,1.2-1.4 S522,104.5,521.8,103.5z M186,133.7c0,0-0.4,2-1.6,2.2c-1.1,0.3-3.1,1.1-3.1,1.1s-1.4,0.1-1,1.1c0.4,1,1.7,1,1.7,1s0.8-0.3,1-0.9 c0.2-0.6,0.7-1.4,0.7-1.4S185.9,134.6,186,133.7z M204.1,180.4c0,0-1.5,1.9-3.2,1.9c-1.6,0-3.3-0.9-3.3-0.9s-1.8-1.5-1-2.4 c0.7-0.9,2.5-1.1,2.5-1.1s1.5-0.1,2.2,0.9C202,179.8,204.1,180.4,204.1,180.4z M170.8,261.2c0,0-1.1,2-2.5,2.1 c-1.5,0.1-2.7-0.5-2.7-0.5s-2.1-1.3-1.4-2.5c0.7-1.3,3-1.6,3-1.6s1.6-0.3,2.2,0.8C170.1,260.6,170.8,261.2,170.8,261.2z M177.1,304.7c0,0-1,2.2-2.5,2.4c-1.4,0.1-3.1-0.2-3.1-0.2s-1.8-1.4-1.1-2.6c0.7-1.2,2.8-1.7,2.8-1.7s1.3-0.4,2,0.6 C176.1,304.1,177.1,304.7,177.1,304.7z M193.3,356c0,0-1.8,2.7-3.6,2.7c-1.8,0-3.6-1.5-3.6-1.5s-1.9-2.2-0.6-3.7 c1.2-1.5,3.9-1.9,3.9-1.9s2.1-0.3,2.8,1.4C192.9,354.7,193.3,356,193.3,356z M474.9,78.2c0,0-0.7,0.7-1.5,0.6 c-0.8-0.1-2-0.4-2-0.4s-1.2-0.9-0.8-1.7c0.4-0.8,1.8-0.8,1.8-0.8s1-0.2,1.5,0.4C474.4,76.9,474.9,78.2,474.9,78.2z M486.2,228.3 c0,0-1,1.1-2.2,1.1c-1.2,0-2.4-0.9-2.4-0.9s-1.5-1.6-0.8-2.6c0.7-1,2.5-1.1,2.5-1.1s1.3-0.1,1.9,0.7C485.7,226.3,486.2,228.3,486.2,228.3z M523.5,191.1c0,0-1.3,1.4-2.8,1.4c-1.5,0-3.1-1.1-3.1-1.1s-1.8-1.7-0.9-2.9c0.9-1.2,3-1.4,3-1.4s1.6-0.1,2.3,1 C522.6,189,523.5,191.1,523.5,191.1z M539.5,232.3c0,0-1.4,2.2-3.1,2.3c-1.8,0.1-3.4-1.1-3.4-1.1s-2.3-2-1.2-3.4 c1.1-1.4,3.7-1.5,3.7-1.5s1.7-0.1,2.5,1.2C538.7,231,539.5,232.3,539.5,232.3z M622.6,261c0,0-0.9,1.6-2.3,1.8c-1.4,0.2-2.8-0.8-2.8-0.8 s-1.9-1.4-1.1-2.5c0.8-1,2.8-1.1,2.8-1.1s1.3-0.2,2,0.8C621.8,260.1,622.6,261,622.6,261z M852.3,277.8c0,0-1.2,2-2.7,2.2 c-1.5,0.2-3-0.6-3-0.6s-2-1.7-1-3c1-1.3,3.3-1.2,3.3-1.2s1.7-0.1,2.4,1.1C851.9,277.5,852.3,277.8,852.3,277.8z M828.6,357.7 c0,0-2.8,3.9-5.4,3.9c-2.6,0-5.4-2.3-5.4-2.3s-3-3.3-1.2-5.4c1.8-2.1,5.8-2.4,5.8-2.4s3-0.4,4.2,2 C827.8,355.2,828.6,357.7,828.6,357.7z M861,387.6c0,0-1.4,2.2-3,2.2c-1.5,0-3-1.3-3-1.3s-1.8-1.8-0.8-3.1c1-1.3,3.2-1.2,3.2-1.2 s1.6-0.1,2.3,1C860.4,386.3,861,387.6,861,387.6z M107.1,105.7c-0.1-2-1.5-2.6-1.5-2.6s-1.5-1.1-0.9-2.5c0.6-1.4,3.1-0.9,3.1-0.9 s1.7-0.1,2.3,1.4c0.6,1.4-0.1,3-0.1,3S109.2,106.3,107.1,105.7z M484.7,21.9c0,0-3.7-2.6-4.5-4.4c-0.8-1.8,0.5-3.3,0.5-3.3 s1.9-2,3.7-1.3c1.8,0.7,2.5,2.7,2.5,2.7s1.4,1.6,0.3,3.3C486.2,20.7,484.7,21.9,484.7,21.9z M455,40.1c0,0-3.3-1.1-3.6-2.5 c-0.3-1.4,1.3-2.3,1.3-2.3s1.7-1.1,2.8-0.3c1.1,0.8,1.2,2.3,1.2,2.3s0.6,1.2-0.4,2.2C455.4,40.5,455,40.1,455,40.1z M528.2,34.8 c0,0-2-1.2-2.3-2.4c-0.3-1.2,1-2,1-2s1.4-1.1,2.3-0.5c0.9,0.7,1,2.1,1,2.1s0.5,1.1-0.2,1.9C529.2,34.8,528.2,34.8,528.2,34.8z M565.6,39.7c0,0-1.7-1.3-1.9-2.2c-0.2-1,0.7-1.7,0.7-1.7s1-1,1.9-0.5c0.8,0.5,1,1.7,1,1.7s0.4,0.9-0.2,1.6 C566.5,39.3,565.6,39.7,565.6,39.7z M836.7,203.4c0,0-1.8-1.2-2-2.1c-0.2-0.9,0.8-1.5,0.8-1.5s1.2-0.8,1.9-0.3 c0.7,0.5,0.8,1.6,0.8,1.6s0.3,0.9-0.3,1.5C837.2,203.1,836.7,203.4,836.7,203.4z M92.5,88.9c0,0,3.3-12.7,5-16.7 c1.7-4,7-5.9,7-5.9s8.8-1.5,10.6-0.3c1.8,1.2,6.4,7,6.4,7s3.8,7.3,7,9.1c3.2,1.8,9.7,2.2,9.7,2.2s7,0.5,9.4,0.8 c2.4,0.3,7,2,7,2s1.7,0.6,1.4,2c-0.3,1.4-1.2,3-1.2,3s-1.8,2.8-5,3.6c-3.2,0.8-7,2.2-7,2.2s-2.1,1-3.6,1.3c-1.5,0.3-2.6,2-2.6,2 s-0.7,1.3-1.9,1.8c-1.2,0.5-3.3,1.4-3.3,1.4s-4.3,1.3-4.8,3c-0.5,1.7,1,2.8,1,2.8s1.6,0.9,2,1.7c0.4,0.8-1,3.4-1,3.4 s-1,1.4-2.2,2.3c-1.2,0.9-1.9,1.7-1.9,1.7s-0.7,0.8-1.7,1c-1,0.2-3.2-0.2-3.2-0.2s-1.8-0.3-2.8,1.2c-1,1.5,0.2,4.8,0.2,4.8 s1.3,2.6,1,3.9c-0.3,1.3-1.7,3-1.7,3s-0.8,1.6-1.5,3.2c-0.7,1.6-1,3.1-1,3.1s-0.3,0.9,0.7,1.6c1,0.7,2.7,2.5,2.7,2.5s2,2.3,1,3.9 c-1,1.6-3.8,4-3.8,4s-1.4,1.4-2,3.3c-0.6,1.9-1.4,4.2-1.4,4.2s-0.7,1.4-2,2c-1.3,0.6-5.8,1.4-5.8,1.4s-2.3,1.2-3.5,3.1 c-1.2,1.9-2.3,3-2.3,3s-0.7,0.6-1,0.4c-0.3-0.2-2.1-1.1-2.1-1.1s-3.5-1.6-5.2-4c-1.7-2.4-4-5-4-5s-1-1.7,0-2.8c1-1.1,3.2-2.2,3.2-2.2 s1.4-0.9,1.6-1.9c0.2-1-0.2-3.3-0.2-3.3s-0.4-1.8,0.3-3.7c0.7-1.9,0.5-3.6,0.5-3.6s0.1-2,1-3.6c0.9-1.6,3.6-4.5,3.6-4.5 s1.6-2,1-4.2c-0.6-2.2-2.6-5.6-2.6-5.6s-1-1.8,0.1-3.2c1.1-1.4,4.5-3.9,4.5-3.9s1.8-1.5,2.1-3.3c0.3-1.8,0.8-3.4,0.8-3.4 s0.5-1.5,0-3.3c-0.5-1.8-1.4-4.8-1.4-4.8s-0.5-1.5,0.7-3.1c1.2-1.6,3.1-3.9,3.1-3.9s1.1-1.3,0.6-2.7c-0.5-1.4-1.4-3.4-1.4-3.4 s-0.7-1.6,0.3-3.6C90.3,92.5,92.5,88.9,92.5,88.9z M287,171c0,0-1.8-0.9-3.4-1.7c-1.6-0.8-3.7-2-3.7-2s-1.4-1-1.1-1.9 c0.3-0.9,1-1.2,1-1.2s1.4-0.5,3.3-0.7c1.9-0.2,4.8-1,4.8-1s2-0.5,3.7-0.7c1.7-0.2,3.4-0.5,3.4-0.5s2.2-0.3,3.7,0.7 c1.5,1,3.8,3,3.8,3s1.2,1.3,1.4,2.5c0.2,1.2-0.8,2.7-0.8,2.7s-1,1.5-2.7,2.5c-1.7,1-3.2,1.7-3.2,1.7s-1.8,0.8-3.7,0.8 c-1.9,0-5.8-0.5-5.8-0.5S286.2,171.6,287,171z M341.3,55.5c0,0,13.7-3,21-3c7.3,0,13.2-1.4,13.2-1.4s7.2-1.8,11.3-4.6 c4.1-2.8,10.6-6.4,10.6-6.4s4.4-2.8,5.9-4.8c1.5-2,10.6-11.4,10.6-11.4s2.6-2.6,3.6-3.8c1-1.2,6.7-6,6.7-6s2.5-2.5,4.2-3.9 c1.7-1.4,5.4-3.2,5.4-3.2s1.4-0.9,2.8,0.2c1.4,1.1,2.8,3.4,2.8,3.4s0.6,1.5-0.2,2.6c-0.8,1.1-2.2,2.8-2.2,2.8s-1.3,1.4-1.4,2.8 c-0.1,1.4,0,3.3,0,3.3s-0.1,1.2-1.4,2c-1.3,0.8-3.4,2.6-3.4,2.6s-1.8,1.3-2.6,2.9c-0.8,1.6-1,3.4-1,3.4s-0.4,1.2-2,2.2 c-1.6,1-3.2,2-3.2,2s-1.8,1.1-1.9,2.3c-0.1,1.2,1.2,3,1.2,3s1,1.6-0.3,3c-1.3,1.4-3.3,3.7-3.3,3.7s-1.2,1.2-1.1,2.8 c0.1,1.6,0.3,3.2,0.3,3.2s0.1,1.3,1.2,2.4c1.1,1.1,3.4,3,3.4,3s1.2,1.1,1.3,2.5c0.1,1.4,0,3.7,0,3.7s-0.2,1.4-1.8,2.3 c-1.6,0.9-4,2-4,2s-1.8,0.8-2.5,2.1c-0.7,1.3-1.6,3-1.6,3s-0.7,1.7-2,2.5c-1.3,0.8-3.7,1.9-3.7,1.9s-1.4,0.7-1.3,2 c0.1,1.3,0.8,3.4,0.8,3.4s0.8,1.4,0,2.9c-0.8,1.5-2,3.3-2,3.3s-1.2,1.3-1.8,2.7c-0.6,1.4-1,3.3-1,3.3s-0.4,1.7,0.7,2.8 c1.1,1.1,3,2.4,3,2.4s1.2,1,1,2.5c-0.2,1.5-0.7,3.6-0.7,3.6s-0.3,1.5-1.5,2.5c-1.2,1-2.8,2.1-2.8,2.1s-1.8,1.1-1.6,2.7 c0.2,1.6,1.2,3.6,1.2,3.6s0.9,1.5,2.1,2.3c1.2,0.8,3.8,2.4,3.8,2.4s1.4,0.8,1.5,2.2c0.1,1.4,0.5,3.6,0.5,3.6s0.3,1.4-0.8,2.6 c-1.1,1.2-3.1,3-3.1,3s-1.7,1.3-2,3.2c-0.3,1.9-0.8,4.7-0.8,4.7s-0.5,1.7-1.6,2.6c-1.1,0.9-3.2,1.9-3.2,1.9s-1.3,1-1,2.5 c0.3,1.5,0.8,3.8,0.8,3.8s0.2,1.4-0.8,2.7c-1,1.3-2.6,3.3-2.6,3.3s-1.2,1.5-1,3c0.2,1.5,1.2,3.7,1.2,3.7s1.1,1.5,2.3,2.4 c1.2,0.9,4.4,2.5,4.4,2.5s1.8,0.9,2,2.3c0.2,1.4-0.2,3.8-0.2,3.8s-0.3,1.4-1.3,2.5c-1,1.1-2.6,2.9-2.6,2.9s-1.3,1.3-1.8,2.8 c-0.5,1.5-1.2,4.6-1.2,4.6s-0.6,1.5-2,2.4c-1.4,0.9-4,2.4-4,2.4s-1.5,1.1-1.6,2.7c-0.1,1.6,0.3,4,0.3,4s0.2,1.2-0.8,2.3 c-1,1.1-2.4,2.3-2.4,2.3s-1.1,1.3-0.8,2.7c0.3,1.4,0.6,3.3,0.6,3.3s0.5,1.7,1.7,2.5c1.2,0.8,2.8,1.4,2.8,1.4s1.8,1.1,1.4,2.7 c-0.4,1.6-1,3.4-1,3.4s-0.4,1.4-1.6,2.2c-1.2,0.8-2.6,1.4-2.6,1.4s-1.7,1-2.1,2.5c-0.4,1.5-1,3.3-1,3.3s-0.5,1.3,0.3,2.4 c0.8,1.1,2,2.5,2,2.5s1,1,0.5,2.2c-0.5,1.2-1.3,3-1.3,3s-0.8,1.4-2.2,2.1c-1.4,0.7-3.8,1.7-3.8,1.7s-1.9,1-2,2.5 c-0.1,1.5,0,3.5,0,3.5s0.2,1.6,1.3,2.5c1.1,0.9,2.6,1.6,2.6,1.6s1.6,1,1.3,2.5c-0.3,1.5-0.7,3.1-0.7,3.1s-0.5,1.4-1.7,2 c-1.2,0.6-2.8,1.4-2.8,1.4s-1.5,1-1.6,2.5c-0.1,1.5,0,3.3,0,3.3s0,1.3-1.2,2.1c-1.2,0.8-2.5,1.3-2.5,1.3s-1.8,1-1.4,2.6 c0.4,1.6,0.8,2.9,0.8,2.9s0.5,1.6,2.2,2.2c1.7,0.6,3.6,1,3.6,1s1.3,0.4,2.4-0.1c1.1-0.5,3.3-1.9,3.3-1.9s1.4-0.8,2.8-0.3 c1.4,0.5,3.4,1.7,3.4,1.7s1.3,1,1.3,2.5c0,1.5-0.1,3.2-0.1,3.2s-0.2,1.7-1.3,2.5c-1.1,0.8-2.8,1.8-2.8,1.8s-1.6,1.1-2.1,2.8 c-0.5,1.7-1.3,4.4-1.3,4.4s-0.4,1.5,0.7,2.5c1.1,1,2.8,2,2.8,2s1.4,1,1.3,2.6c-0.1,1.6-0.3,3.7-0.3,3.7s-0.2,1.6,0.8,2.6 c1,1,2.6,2.1,2.6,2.1s1.1,1,1.2,2.5c0.1,1.5-0.1,3.6-0.1,3.6s-0.2,1.6-1.5,2.5c-1.3,0.9-3.2,1.8-3.2,1.8s-1.8,1-2.6,2.3 c-0.8,1.3-2.1,3-2.1,3s-0.8,1.4-2.2,2.1c-1.4,0.7-3.9,1.7-3.9,1.7s-1.7,0.9-2.3,2.4c-0.6,1.5-1.4,3.2-1.4,3.2s-0.6,1.4-2.2,1.8 c-1.6,0.4-4,0.7-4,0.7s-1.8,0.3-2.6,1.7c-0.8,1.4-1.8,3.2-1.8,3.2s-0.7,1.3-1.9,2c-1.2,0.7-3,1.4-3,1.4s-1.5,0.8-1.7,2.3 c-0.2,1.5-0.6,3.6-0.6,3.6s-0.3,1.6-1.7,2.3c-1.4,0.7-3.8,1.5-3.8,1.5s-1.8,0.8-2.3,2.2c-0.5,1.4-1.4,3.3-1.4,3.3s-0.8,1.3-2.2,1.8 c-1.4,0.5-3.9,0.9-3.9,0.9s-1.5,0.4-2.1,1.9c-0.6,1.5-1.4,3.4-1.4,3.4s-0.5,1.4-1.8,2C489,451,487,452,487,452s-1.5,1-1.7,2.6 c-0.2,1.6-0.7,3.8-0.7,3.8s-0.4,1.4-1.7,2.2c-1.3,0.8-3,1.6-3,1.6s-1.6,1-1.6,2.5c0,1.5,0,3,0,3s0.2,1.5-1,2.5c-1.2,1-2.9,2-2.9,2 s-1.3,1-1.4,2.5c-0.1,1.5-0.3,3.3-0.3,3.3s-0.3,1.6-1.7,2.3c-1.4,0.7-3.3,1.5-3.3,1.5s-1.7,0.9-1.8,2.5c-0.1,1.6,0,3.3,0,3.3 s0.2,1.5,1.4,2.5c1.2,1,2.8,2.2,2.8,2.2s1.4,1.1,1.6,2.7c0.2,1.6,0.6,3.6,0.6,3.6s0.2,1.4-1,2.6c-1.2,1.2-2.7,2.4-2.7,2.4 s-1.3,1.1-1.3,2.6c0,1.5,0.3,3,0.3,3s0.4,1.5,1.6,2.5c1.2,1,2.8,2.2,2.8,2.2s1.4,1.2,1.7,2.8c0.3,1.6,0.9,3.6,0.9,3.6 s0.3,1.4-0.8,2.6c-1.1,1.2-2.6,2.5-2.6,2.5s-1.3,1.3-1,2.9c0.3,1.6,1.2,4,1.2,4s0.7,1.4,1.9,2.4c1.2,1,3,2,3,2s1.3,1,1.3,2.6 c0,1.6-0.2,3.3-0.2,3.3s-0.3,1.6-1.7,2.4c-1.4,0.8-3.4,1.7-3.4,1.7s-1.7,1-1.6,2.6c0.1,1.6,0.5,3.2,0.5,3.2s0.4,1.4,1.7,2.2 c1.3,0.8,3,1.7,3,1.7s1.4,0.9,1.6,2.4c0.2,1.5,0.6,3,0.6,3s0.3,1.4-0.8,2.6c-1.1,1.2-2.5,2.5-2.5,2.5s-1.3,1.3-1.1,2.8 c0.2,1.5,0.7,3.2,0.7,3.2s0.4,1.4,1.7,2.4c1.3,1,2.9,2,2.9,2s1.3,1,1.6,2.5c0.3,1.5,1,3,1,3s0.5,1.5-0.6,2.6 c-1.1,1.1-2.6,2.2-2.6,2.2s-1.4,1.1-1.7,2.6c-0.3,1.5-0.9,3.4-0.9,3.4s-0.5,1.4-1.8,2.2c-1.3,0.8-3.1,1.7-3.1,1.7s-1.5,0.8-2.2,2.2 c-0.7,1.4-1.6,3.4-1.6,3.4s-0.6,1.4-2.1,2c-1.5,0.6-3.7,1.3-3.7,1.3s-1.5,0.7-1.8,2.2c-0.3,1.5-1,3.4-1,3.4s-0.5,1.4-1.9,2.1 c-1.4,0.7-3.4,1.5-3.4,1.5s-1.7,0.8-2.1,2.3c-0.4,1.5-1.1,3.4-1.1,3.4s-0.6,1.4-2.1,2.1c-1.5,0.7-3.7,1.4-3.7,1.4s-1.5,0.8-2,2.2 c-0.5,1.4-1.4,3.2-1.4,3.2s-0.8,1.4-2.3,1.9c-1.5,0.5-3.8,1-3.8,1s-1.5,0.5-2.2,1.9c-0.7,1.4-1.7,3.2-1.7,3.2s-0.6,1.3-2,2 c-1.4,0.7-3.3,1.3-3.3,1.3s-1.5,0.7-2.1,2.1c-0.6,1.4-1.4,3-1.4,3s-0.7,1.3-2.1,1.9c-1.4,0.6-3.4,1.3-3.4,1.3s-1.6,0.8-2.3,2.2 c-0.7,1.4-1.6,3.2-1.6,3.2s-0.7,1.4-2.2,2.1c-1.5,0.7-3.6,1.4-3.6,1.4s-1.5,0.8-2,2.3c-0.5,1.5-1.2,3.3-1.2,3.3s-0.6,1.4-2,2.2 c-1.4,0.8-3.4,1.6-3.4,1.6s-1.7,1-1.7,2.5c0,1.5,0,3.3,0,3.3s0.2,1.5-1,2.5c-1.2,1-2.9,2.1-2.9,2.1s-1.4,1.2-1.4,2.8 c0,1.6,0.2,3.3,0.2,3.3s0.3,1.6-0.8,2.7c-1.1,1.1-2.7,2.4-2.7,2.4s-1.4,1.2-1.1,2.8c0.3,1.6,1.1,3.4,1.1,3.4s0.5,1.5,1.8,2.5 c1.3,1,3.1,2.1,3.1,2.1s1.3,1,1.6,2.5c0.3,1.5,0.8,3,0.8,3s0.5,1.4-0.6,2.5c-1.1,1.1-2.7,2.2-2.7,2.2s-1.5,1.1-1.9,2.6 c-0.4,1.5-1,3.3-1,3.3s-0.6,1.4-2,2c-1.4,0.6-3.3,1.4-3.3,1.4s-1.5,0.8-2,2.2c-0.5,1.4-1.1,3.2-1.1,3.2s-0.5,1.4-1.9,2 c-1.4,0.6-3.3,1.4-3.3,1.4s-1.5,0.7-2.1,2.1c-0.6,1.4-1.2,3-1.2,3s-0.7,1.4-2,2.1c-1.3,0.7-3.1,1.4-3.1,1.4s-1.4,0.7-2.1,2.1 c-0.7,1.4-1.4,3-1.4,3s-0.7,1.4-2.2,2.1c-1.5,0.7-3.7,1.5-3.7,1.5s-1.5,0.8-2,2.3c-0.5,1.5-1.2,3.4-1.2,3.4s-0.7,1.4-2.1,2.1 c-1.4,0.7-3.4,1.5-3.4,1.5s-1.5,0.8-2.2,2.2c-0.7,1.4-1.4,3-1.4,3s-0.6,1.3-2,2.1c-1.4,0.8-3.4,1.7-3.4,1.7s-1.5,0.8-2.1,2.3 c-0.6,1.5-1.4,3.3-1.4,3.3s-0.6,1.4-2.1,2.1c-1.5,0.7-3.6,1.5-3.6,1.5s-1.5,0.8-2,2.3c-0.5,1.5-1.1,3.3-1.1,3.3s-0.6,1.4-2.1,2 c-1.5,0.6-3.5,1.4-3.5,1.4s-1.6,0.8-2.2,2.2c-0.6,1.4-1.4,3.1-1.4,3.1s-0.6,1.4-1.9,2.1c-1.3,0.7-3.2,1.5-3.2,1.5s-1.6,0.8-2.2,2.2 c-0.6,1.4-1.3,3.2-1.3,3.2s-0.7,1.4-2,2.1C352,55.5,349,56,349,56S346,55.5,341.3,55.5z"/>
          </svg>
          
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

