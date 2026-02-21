'use client';

import React, { useState } from 'react';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="border-4 border-black bg-white shadow-neo-8 overflow-hidden">
      {/* Form Header */}
      <div className="bg-black px-6 py-3 flex items-center gap-3">
        <div className="w-3 h-3 bg-volt border-2 border-volt" />
        <span className="tech-label text-white text-xs">SEND A MESSAGE</span>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="tech-label text-black text-xs">YOUR NAME</label>
          <input
            type="text"
            placeholder="YOUR NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="tech-label text-black text-xs">EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="YOUR@EMAIL.COM"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="tech-label text-black text-xs">MESSAGE</label>
          <textarea
            rows={5}
            placeholder="WRITE YOUR MESSAGE HERE..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow resize-none bg-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="bg-black text-white border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:bg-volt hover:text-black transition-colors self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE →'}
        </button>

        {status === 'success' && (
          <p className="font-mono text-sm text-black border-4 border-black bg-volt px-4 py-3">
            ✓ 消息已发送成功，我会尽快回复你！
          </p>
        )}
        {status === 'error' && (
          <p className="font-mono text-sm text-white border-4 border-black bg-black px-4 py-3">
            ✗ 发送失败，请稍后重试。
          </p>
        )}
      </div>
    </div>
  );
}
