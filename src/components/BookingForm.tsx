'use client';

import React, { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';

type BookingStep = 'form' | 'confirm' | 'success';

const TIME_SLOTS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
] as const;

interface BookingData {
  date: string;
  timeSlot: string;
  wechat: string;
  email: string;
  notes: string;
}

const INITIAL_DATA: BookingData = {
  date: '',
  timeSlot: '',
  wechat: '',
  email: '',
  notes: '',
};

export default function BookingForm() {
  const [step, setStep] = useState<BookingStep>('form');
  const [formData, setFormData] = useState<BookingData>(INITIAL_DATA);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  function updateField<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationError('');
  }

  function handleSubmit() {
    if (!formData.date) {
      setValidationError('请选择预约日期');
      return;
    }
    if (!formData.timeSlot) {
      setValidationError('请选择时间段');
      return;
    }
    if (!formData.wechat.trim() && !formData.email.trim()) {
      setValidationError('请至少填写一种联系方式（微信或邮箱）');
      return;
    }
    setValidationError('');
    setSubmitError('');
    setStep('confirm');
  }

  async function handleConfirm() {
    setIsSubmitting(true);
    setSubmitError('');

    const { error } = await supabase.from('bookings').insert({
      date: formData.date,
      time_slot: formData.timeSlot,
      wechat: formData.wechat || null,
      email: formData.email || null,
      notes: formData.notes || null,
    });

    if (error) {
      if (error.code === '23505') {
        setSubmitError('该时间段已被预约，请选择其他时间');
        setStep('form');
      } else {
        setSubmitError('提交失败，请稍后重试');
      }
      setIsSubmitting(false);
      return;
    }

    // 发送管理员通知邮件，失败不阻断用户流程
    await fetch('/api/booking-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: formData.date,
        timeSlot: formData.timeSlot,
        wechat: formData.wechat,
        email: formData.email,
        notes: formData.notes,
      }),
    }).catch(() => {});

    setIsSubmitting(false);
    setStep('success');
  }

  function handleReset() {
    setFormData(INITIAL_DATA);
    setValidationError('');
    setSubmitError('');
    setStep('form');
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${year} 年 ${month} 月 ${day} 日`;
  }

  /* ─── FORM STEP ─── */
  if (step === 'form') {
    return (
      <div className="border-4 border-black bg-white shadow-neo-8 overflow-hidden">
        {/* Header */}
        <div className="bg-black px-6 py-3 flex items-center gap-3">
          <div className="w-3 h-3 bg-volt border-2 border-volt" />
          <span className="tech-label text-white text-xs">BOOK A SESSION</span>
        </div>

        <div className="p-8 flex flex-col gap-6">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">预约日期 / DATE</label>
            <input
              type="date"
              min={minDate}
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="border-4 border-black p-3 font-mono text-black outline-none focus:shadow-neo-4 transition-shadow bg-white"
            />
          </div>

          {/* Time Slots */}
          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">时间段 / TIME SLOT</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => updateField('timeSlot', slot)}
                  className={`border-4 border-black p-3 font-mono text-sm font-bold transition-all ${
                    formData.timeSlot === slot
                      ? 'bg-volt text-black shadow-none translate-x-1 translate-y-1'
                      : 'bg-white text-black shadow-neo-4 hover:-translate-x-0.5 hover:-translate-y-0.5'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* WeChat */}
          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">微信号 / WECHAT</label>
            <input
              type="text"
              placeholder="YOUR WECHAT ID"
              value={formData.wechat}
              onChange={(e) => updateField('wechat', e.target.value)}
              className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">邮箱 / EMAIL</label>
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow bg-white"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="tech-label text-black text-xs">备注 / NOTES</label>
            <textarea
              rows={4}
              placeholder="有什么想提前说明的？"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="border-4 border-black p-3 font-mono text-black placeholder:text-gray-400 outline-none focus:shadow-neo-4 transition-shadow resize-none bg-white"
            />
          </div>

          {/* Validation / Submit Error */}
          {(validationError || submitError) && (
            <p className="font-mono text-sm text-white border-4 border-black bg-black px-4 py-3">
              ✗ {validationError || submitError}
            </p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-black text-white border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:bg-volt hover:text-black transition-colors self-start"
          >
            SUBMIT BOOKING →
          </button>
        </div>
      </div>
    );
  }

  /* ─── CONFIRM STEP ─── */
  if (step === 'confirm') {
    return (
      <div className="border-4 border-black bg-white shadow-neo-8 overflow-hidden">
        {/* Header */}
        <div className="bg-black px-6 py-3 flex items-center gap-3">
          <div className="w-3 h-3 bg-volt border-2 border-volt" />
          <span className="tech-label text-white text-xs">CONFIRM YOUR BOOKING</span>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <p className="font-mono text-black text-sm uppercase">
            请确认以下预约信息是否正确：
          </p>

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            <div className="border-4 border-black p-4 bg-gray-50">
              <span className="tech-label text-gray-400 text-xs block mb-1">预约日期</span>
              <span className="font-mono font-bold text-black text-lg">{formatDate(formData.date)}</span>
            </div>
            <div className="border-4 border-black p-4 bg-gray-50">
              <span className="tech-label text-gray-400 text-xs block mb-1">时间段</span>
              <span className="font-mono font-bold text-black text-lg">{formData.timeSlot}</span>
            </div>
            {formData.wechat && (
              <div className="border-4 border-black p-4 bg-gray-50">
                <span className="tech-label text-gray-400 text-xs block mb-1">微信号</span>
                <span className="font-mono font-bold text-black text-lg">{formData.wechat}</span>
              </div>
            )}
            {formData.email && (
              <div className="border-4 border-black p-4 bg-gray-50">
                <span className="tech-label text-gray-400 text-xs block mb-1">邮箱</span>
                <span className="font-mono font-bold text-black text-lg">{formData.email}</span>
              </div>
            )}
            {formData.notes && (
              <div className="border-4 border-black p-4 bg-gray-50">
                <span className="tech-label text-gray-400 text-xs block mb-1">备注</span>
                <span className="font-mono text-black">{formData.notes}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setStep('form')}
              disabled={isSubmitting}
              className="bg-white text-black border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:-translate-x-1 hover:-translate-y-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← BACK TO EDIT
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="bg-black text-white border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:bg-volt hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SUBMITTING...' : 'CONFIRM BOOKING ✓'}
            </button>
          </div>

          {submitError && (
            <p className="font-mono text-sm text-white border-4 border-black bg-black px-4 py-3">
              ✗ {submitError}
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ─── SUCCESS MODAL ─── */
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={handleReset} />

      {/* Modal Card */}
      <div className="relative border-8 border-black bg-white shadow-neo-8 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-volt px-6 py-4 flex items-center gap-3 border-b-4 border-black">
          <div className="w-4 h-4 bg-black border-2 border-black" />
          <span className="tech-label text-black text-sm">BOOKING CONFIRMED</span>
        </div>

        <div className="p-8 flex flex-col items-center gap-6 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 border-4 border-black bg-volt flex items-center justify-center shadow-neo-4">
            <span className="font-ranchers text-4xl text-black">✓</span>
          </div>

          <h3 className="font-ranchers text-4xl text-black uppercase">预约成功!</h3>

          <p className="font-mono text-sm text-gray-600">
            你的预约请求已提交。确认邮件将发送至你的邮箱，请注意查收。
          </p>

          <div className="border-4 border-black bg-gray-50 p-4 w-full">
            <span className="tech-label text-gray-400 text-xs block mb-1">预约详情</span>
            <span className="font-mono font-bold text-black block">
              {formatDate(formData.date)}
            </span>
            <span className="font-mono text-black block">{formData.timeSlot}</span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="bg-black text-white border-4 border-black px-8 py-4 font-ranchers text-2xl uppercase shadow-neo-4 hover:bg-volt hover:text-black transition-colors w-full"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
