import { useState, useEffect } from 'react';
import { BarChart3, Download, Globe2, Users, ArrowUpRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
        
        <div className="relative w-full aspect-[2/1] bg-black/20 rounded-xl border border-white/5 overflow-hidden">
          <MapContainer 
            center={[20, 0]} 
            zoom={2} 
            minZoom={2} 
            maxZoom={18}
            style={{ height: '100%', width: '100%', background: '#09090b' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            />
            {recentActivity.map((act: any, i: number) => {
              if (!act.rawCode) return null;
              
              // Real Latitude/Longitude mapping
              const mapCoords: Record<string, [number, number]> = {
                'US': [37.0902, -95.7129], 'CA': [56.1304, -106.3468],
                'GB': [55.3781, -3.4360],  'FR': [46.2276, 2.2137],
                'DE': [51.1657, 10.4515],  'ES': [40.4637, -3.7492],
                'IT': [41.8719, 12.5674],  'RU': [61.5240, 105.3188],
                'CN': [35.8617, 104.1954], 'JP': [36.2048, 138.2529],
                'IN': [20.5937, 78.9629],  'BR': [-14.2350, -51.9253],
                'AU': [-25.2744, 133.7751],'AE': [23.4241, 53.8478],
                'SA': [23.8859, 45.0792],  'ZA': [-30.5595, 22.9375],
                'IL': [31.0461, 34.8516],  'TR': [38.9637, 35.2433],
                'NL': [52.1326, 5.2913],   'PL': [51.9194, 19.1451],
                'SE': [60.1282, 18.6435],  'MX': [23.6345, -102.5528],
                'AR': [-38.4161, -63.6167],'ID': [-0.7893, 113.9213],
                'MY': [4.2105, 101.9758],  'PH': [12.8797, 121.7740],
                'TH': [15.8700, 100.9925], 'VN': [14.0583, 108.2772],
                'EG': [26.8206, 30.8025],  'NG': [9.0820, 8.6753],
                'KE': [-0.0236, 37.9062],  'KR': [35.9078, 127.7669]
              };

              // Add a tiny random offset so dots in the same country don't overlap completely
              const baseCoords = mapCoords[act.rawCode];
              if (!baseCoords) return null;
              // Extract real coords if backend provided them in details string
              let finalLat = baseCoords[0] + (Math.random() - 0.5) * 2;
              let finalLng = baseCoords[1] + (Math.random() - 0.5) * 2;
              let cleanDetails = act.details;

              const geoMatch = typeof act.details === 'string' ? act.details.match(/\|GEO:([^,]+),([^|]+)/) : null;
              if (geoMatch) {
                finalLat = parseFloat(geoMatch[1]);
                finalLng = parseFloat(geoMatch[2]);
                cleanDetails = act.details.replace(/\|GEO:[^|]+/, '');
              }

              const isInstall = act.rawAction === 'hwid_bound';
              const colorClass = isInstall ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]';
              const ringClass = isInstall ? 'bg-green-500' : 'bg-red-500';

              const customIcon = new L.DivIcon({
                className: 'bg-transparent border-none',
                html: `
                  <div style="position: relative; width: 12px; height: 12px; display: flex; align-items: center; justify-content: center;">
                    <div class="absolute w-6 h-6 rounded-full opacity-75 animate-ping ${ringClass}" style="animation-duration: 3s; animation-delay: ${i * 0.2}s"></div>
                    <div class="w-3 h-3 rounded-full relative z-10 ${colorClass}"></div>
                  </div>
                `,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              });

              return (
                <Marker key={`dot-${i}`} position={[finalLat, finalLng]} icon={customIcon}>
                  <Popup className="custom-popup">
                    <div className="font-sans text-xs bg-black text-white p-1 rounded">
                      <strong className="text-[#ddb8ff]">{act.country}</strong><br/>
                      {cleanDetails}<br/>
                      <span className="text-white/40">{act.time}</span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
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
                  <p className="text-xs text-white/40 truncate">{typeof act.details === 'string' ? act.details.replace(/\|GEO:[^|]+/, '') : act.details}</p>
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

