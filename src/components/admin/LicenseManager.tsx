import { useState, useEffect } from 'react';
import { ShieldCheck, UserPlus } from 'lucide-react';

const API_LICENSES = '/api/admin-licenses';

type License = {
  id: number;
  email: string;
  license_key: string;
  plan: string;
  hwid: string | null;
  is_active: boolean;
  created_at: string;
};

export default function LicenseManager({ password }: { password: string }) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New user form
  const [showNew, setShowNew] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  
  useEffect(() => {
    fetchLicenses();
  }, []);

  async function fetchLicenses() {
    setLoading(true);
    try {
      const res = await fetch(API_LICENSES, {
        headers: { 'x-admin-password': password }
      });
      const data = await res.json();
      if (data.licenses) {
        setLicenses(data.licenses);
      } else {
        setError(data.error || 'Failed to load licenses');
      }
    } catch (err) {
      setError('Network error loading licenses');
    }
    setLoading(false);
  }

  function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) key += '-';
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail) return;
    
    try {
      const key = generateKey();
      const res = await fetch(API_LICENSES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action: 'create', email: newEmail, license_key: key })
      });
      const data = await res.json();
      if (data.license) {
        setLicenses([data.license, ...licenses]);
        setShowNew(false);
        setNewEmail('');
      } else {
        alert(data.error || 'Failed to add user');
      }
    } catch (err) {
      alert('Network error');
    }
  }

  async function handleAction(action: string, id: number, extra?: any) {
    if (action === 'delete' && !confirm('Are you sure you want to delete this license?')) return;
    if (action === 'reset_hwid' && !confirm('Reset Hardware ID? This allows the user to activate on a new PC.')) return;
    
    try {
      const res = await fetch(API_LICENSES, {
        method: action === 'delete' ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action, id, ...extra })
      });
      const data = await res.json();
      if (data.success) {
        if (action === 'delete') {
          setLicenses(licenses.filter(l => l.id !== id));
        } else {
          // Optimistic update
          setLicenses(licenses.map(l => {
            if (l.id === id) {
              if (action === 'reset_hwid') return { ...l, hwid: null };
              if (action === 'update_hwid') return { ...l, hwid: extra.hwid };
              if (action === 'toggle_active') return { ...l, is_active: extra.is_active };
            }
            return l;
          }));
        }
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (err) {
      alert('Network error');
    }
  }

  function handleManualHWID(id: number) {
    const hwid = prompt('Enter the new Machine ID (HWID):');
    if (hwid !== null) {
      handleAction('update_hwid', id, { hwid });
    }
  }

  if (loading) return <div className="text-white/40 text-center py-20">Loading licenses...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold mb-1">Users &amp; Licenses</h2>
          <p className="text-white/40 text-sm">Manage activations, transfer licenses, or revoke access.</p>
        </div>
        <button 
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 bg-[#ddb8ff] text-[#2c0051] px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">{error}</div>}

      {showNew && (
        <form onSubmit={handleAddUser} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8 flex gap-4 items-end animate-in fade-in slide-in-from-top-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">User Email</label>
            <input 
              type="email" 
              required
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ddb8ff]/50"
              placeholder="customer@email.com"
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap">
            Generate Key
          </button>
        </form>
      )}

      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] border-b border-white/10 text-white/40 uppercase tracking-widest text-[10px] font-bold">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">License Key</th>
              <th className="p-4">Machine ID (HWID)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {licenses.map(lic => (
              <tr key={lic.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-medium">{lic.email}</td>
                <td className="p-4">
                  <code className="text-[#ddb8ff] font-bold tracking-widest">{lic.license_key}</code>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {lic.hwid ? (
                      <span className="flex items-center gap-1.5 text-white/50 font-mono text-xs cursor-pointer hover:text-white" onClick={() => handleManualHWID(lic.id)} title="Click to edit HWID">
                        <ShieldCheck size={14} className="text-green-400" />
                        {lic.hwid.substring(0, 16)}...
                      </span>
                    ) : (
                      <span className="text-white/20 text-xs italic cursor-pointer hover:text-white hover:underline" onClick={() => handleManualHWID(lic.id)} title="Click to manually enter HWID">
                        Not activated yet (Click to edit)
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  {lic.is_active ? (
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-500/20">Active</span>
                  ) : (
                    <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-red-500/20">Revoked</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleAction('toggle_active', lic.id, { is_active: !lic.is_active })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors ${
                      lic.is_active 
                        ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20' 
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                    }`}
                  >
                    {lic.is_active ? "Revoke" : "Restore"}
                  </button>
                  <button 
                    onClick={() => handleAction('delete', lic.id)}
                    title="Delete User"
                    className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {licenses.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30">No licenses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
