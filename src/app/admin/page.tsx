'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

type BookingStatus = 'pending' | 'confirmed' | 'completed';

interface Booking {
  id: string;
  date: string;
  time_slot: string;
  wechat: string | null;
  email: string | null;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: '待确认',
  confirmed: '已确认',
  completed: '已完成',
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: 'bg-white text-black',
  confirmed: 'bg-volt text-black',
  completed: 'bg-black text-volt',
};

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? '';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '';

/* ─── LOGIN VIEW ─── */
function LoginView({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', '1');
      onSuccess();
    } else {
      setError('用户名或密码错误');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className="min-h-screen bg-dark-grey flex items-center justify-center p-8">
      <div className="w-full max-w-md border-4 border-black bg-white shadow-neo-8 overflow-hidden">
        {/* Header */}
        <div className="bg-black px-6 py-4 flex items-center gap-3">
          <div className="w-3 h-3 bg-volt border-2 border-volt" />
          <span className="tech-label text-white text-xs">ADMIN LOGIN</span>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-ranchers text-4xl text-black uppercase leading-none">BOOKING</span>
            <span className="font-ranchers text-4xl text-black uppercase leading-none">MANAGEMENT</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">用户名 / USERNAME</label>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">密码 / PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
            />
          </div>

          {error && (
            <p className="font-mono text-sm text-white border-4 border-black bg-black px-4 py-3">
              ✗ {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            className="bg-black text-white border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:bg-volt hover:text-black transition-colors"
          >
            LOGIN →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MANAGEMENT VIEW ─── */
function ManagementView({ onLogout }: { onLogout: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true })
      .order('time_slot', { ascending: true });

    if (error) {
      setLoadError('加载失败，请刷新重试');
    } else {
      setBookings(data as Booking[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function handleStatusChange(id: string, newStatus: BookingStatus) {
    setUpdatingId(id);

    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    }
    setUpdatingId(null);
  }

  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${year}/${month}/${day}`;
  }

  function formatCreatedAt(isoStr: string): string {
    const date = new Date(isoStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="min-h-screen bg-dark-grey p-6 md:p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10 border-b-4 border-volt pb-6">
        <div>
          <span className="tech-label text-volt text-xs block mb-1">ADMIN PANEL</span>
          <h1 className="font-ranchers text-5xl md:text-6xl text-white uppercase leading-none">
            BOOKINGS
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={fetchBookings}
            className="border-4 border-white text-white px-5 py-3 font-mono font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors"
          >
            REFRESH
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="bg-volt text-black border-4 border-black px-5 py-3 font-ranchers text-xl uppercase shadow-neo-4 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 mb-10">
        {(['pending', 'confirmed', 'completed'] as BookingStatus[]).map((s) => {
          const count = bookings.filter((b) => b.status === s).length;
          return (
            <div
              key={s}
              className={`border-4 border-black px-6 py-3 flex flex-col gap-1 ${STATUS_STYLES[s]}`}
            >
              <span className="tech-label text-xs opacity-60">{STATUS_LABELS[s]}</span>
              <span className="font-ranchers text-3xl leading-none">{count}</span>
            </div>
          );
        })}
        <div className="border-4 border-white text-white px-6 py-3 flex flex-col gap-1">
          <span className="tech-label text-xs opacity-60">全部</span>
          <span className="font-ranchers text-3xl leading-none">{bookings.length}</span>
        </div>
      </div>

      {/* Content */}
      {isLoading && (
        <p className="font-mono text-volt text-sm uppercase">LOADING...</p>
      )}

      {loadError && (
        <p className="font-mono text-sm text-white border-4 border-black bg-black px-4 py-3 inline-block">
          ✗ {loadError}
        </p>
      )}

      {!isLoading && !loadError && bookings.length === 0 && (
        <div className="border-4 border-white p-12 text-center">
          <span className="font-ranchers text-4xl text-gray-600 uppercase">NO BOOKINGS YET</span>
        </div>
      )}

      {!isLoading && bookings.length > 0 && (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border-4 border-black bg-white shadow-neo-4 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-black px-5 py-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-ranchers text-volt text-xl">
                    {formatDate(booking.date)}
                  </span>
                  <span className="tech-label text-white text-xs">
                    {booking.time_slot}
                  </span>
                </div>
                <span className="tech-label text-gray-500 text-xs">
                  提交于 {formatCreatedAt(booking.created_at)}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 flex-1">
                  {booking.wechat && (
                    <div className="flex flex-col gap-0.5">
                      <span className="tech-label text-gray-400 text-xs">微信号</span>
                      <span className="font-mono font-bold text-black text-sm">{booking.wechat}</span>
                    </div>
                  )}
                  {booking.email && (
                    <div className="flex flex-col gap-0.5">
                      <span className="tech-label text-gray-400 text-xs">邮箱</span>
                      <span className="font-mono font-bold text-black text-sm">{booking.email}</span>
                    </div>
                  )}
                  {booking.notes && (
                    <div className="flex flex-col gap-0.5">
                      <span className="tech-label text-gray-400 text-xs">备注</span>
                      <span className="font-mono text-black text-sm max-w-sm">{booking.notes}</span>
                    </div>
                  )}
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="tech-label text-gray-400 text-xs">状态</span>
                  <div className="relative">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value as BookingStatus)
                      }
                      disabled={updatingId === booking.id}
                      className={`border-4 border-black px-4 py-2 font-mono font-bold text-sm uppercase outline-none cursor-pointer appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${STATUS_STYLES[booking.status]}`}
                    >
                      <option value="pending">待确认</option>
                      <option value="confirmed">已确认</option>
                      <option value="completed">已完成</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none font-bold text-xs">
                      ▾
                    </span>
                  </div>
                  {updatingId === booking.id && (
                    <span className="tech-label text-gray-400 text-xs">更新中...</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── ROOT PAGE ─── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === '1') {
      setAuthed(true);
    }
    setChecked(true);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem('admin_authed');
    setAuthed(false);
  }

  // Avoid flash of login screen on already-authed session
  if (!checked) return null;

  if (!authed) {
    return <LoginView onSuccess={() => setAuthed(true)} />;
  }

  return <ManagementView onLogout={handleLogout} />;
}
