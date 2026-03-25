import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CalendarDays, Trophy, Settings, LogOut } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    photo: null,
  });
  const navigate = useNavigate();

  const imageUrl = useMemo(() => {
    if (!user?.profilePhoto) return '';
    return `${API_BASE_URL}${user.profilePhoto}`;
  }, [user]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userInfo);
    if (parsedUser.role !== 'user') {
      navigate('/admin-dashboard');
      return;
    }

    setUser(parsedUser);
    setProfileForm((prev) => ({
      ...prev,
      name: parsedUser.name || '',
      email: parsedUser.email || '',
    }));

    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const merged = { ...parsedUser, ...data };
          localStorage.setItem('userInfo', JSON.stringify(merged));
          setUser(merged);
          setProfileForm((prev) => ({ ...prev, name: merged.name, email: merged.email }));
        }
      } catch {
        // Keep existing local data if profile load fails.
      }
    };
    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!user?.token) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', profileForm.name);
      formData.append('email', profileForm.email);
      if (profileForm.currentPassword) formData.append('currentPassword', profileForm.currentPassword);
      if (profileForm.newPassword) formData.append('newPassword', profileForm.newPassword);
      if (profileForm.photo) formData.append('photo', profileForm.photo);

      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Profile update failed');

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setProfileForm({
        name: data.name || '',
        email: data.email || '',
        currentPassword: '',
        newPassword: '',
        photo: null,
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-700 px-6 py-4 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Campus Society</h1>
            <p className="text-sm text-blue-100">Welcome back, {user.name}</p>
          </div>
          <div className="relative flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-indigo-800"
            >
              Logout
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="h-11 w-11 overflow-hidden rounded-full border-2 border-white/70 bg-white/20"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-100 bg-white p-2 text-gray-700 shadow-xl">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <Settings size={16} /> Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-700 p-10 text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">Your Student Home</h2>
          <p className="max-w-2xl text-blue-100">
            Explore clubs, track events, and grow your campus network from one place.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Users className="mb-3 text-indigo-600" />
            <h3 className="text-lg font-semibold">Joined Communities</h3>
            <p className="mt-2 text-sm text-gray-600">View clubs you follow and discover new communities.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <CalendarDays className="mb-3 text-indigo-600" />
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
            <p className="mt-2 text-sm text-gray-600">Keep track of campus events and workshops.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Trophy className="mb-3 text-indigo-600" />
            <h3 className="text-lg font-semibold">Your Achievements</h3>
            <p className="mt-2 text-sm text-gray-600">Showcase your milestones and participation.</p>
          </div>
        </section>
      </main>

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
            <p className="mb-4 text-sm text-gray-500">Update your details and change password.</p>
            {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
            {success && <p className="mb-3 text-sm text-green-600">{success}</p>}
            <form onSubmit={handleProfileSave} className="space-y-3">
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Full name"
                className="w-full rounded-md border px-3 py-2"
                required
              />
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                className="w-full rounded-md border px-3 py-2"
                required
              />
              <input
                type="password"
                value={profileForm.currentPassword}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Current password (required to change password)"
                className="w-full rounded-md border px-3 py-2"
              />
              <input
                type="password"
                value={profileForm.newPassword}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder="New password"
                className="w-full rounded-md border px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileForm((prev) => ({ ...prev, photo: e.target.files?.[0] || null }))}
                className="w-full rounded-md border px-3 py-2"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="rounded-md border px-4 py-2 text-sm"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
