import React from 'react';
import ContactForm from '@/components/ContactForm';
import BookingForm from '@/components/BookingForm';

export default function Home() {
  const courses = [
    {
      tag: 'NEW',
      title: '课程名称 01',
      desc: '这里是课程的简短介绍，说明这门课程的核心内容、适合人群和学习成果。',
      link: '#',
    },
    {
      tag: 'HOT',
      title: '课程名称 02',
      desc: '这里是课程的简短介绍，说明这门课程的核心内容、适合人群和学习成果。',
      link: '#',
    },
    {
      tag: 'CLASSIC',
      title: '课程名称 03',
      desc: '这里是课程的简短介绍，说明这门课程的核心内容、适合人群和学习成果。',
      link: '#',
    },
  ];

  const columns = [
    { title: '专栏文章标题 01', date: '2026-02-10', desc: '简短说明这篇专栏的核心观点或主题。', link: '#' },
    { title: '专栏文章标题 02', date: '2026-01-18', desc: '简短说明这篇专栏的核心观点或主题。', link: '#' },
    { title: '专栏文章标题 03', date: '2025-12-05', desc: '简短说明这篇专栏的核心观点或主题。', link: '#' },
    { title: '专栏文章标题 04', date: '2025-11-20', desc: '简短说明这篇专栏的核心观点或主题。', link: '#' },
  ];

  return (
    <div className="w-full flex flex-col">

      {/* ─────────────────────────────────────────
          HERO — 首屏个人标语
      ───────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[88vh] bg-dark-grey text-white px-8 overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Sticker Badge */}
        <div className="bg-white text-black px-6 py-2 border-4 border-black font-mono font-bold uppercase rotate-[-2deg] mb-8 shadow-neo-4 z-10 text-sm">
          RESEARCHER · EDUCATOR · CREATOR
        </div>

        {/* Massive Name / Tagline */}
        <h1 className="ranchers-title text-[80px] md:text-[150px] text-center drop-shadow-[8px_8px_0px_#000000] z-10 leading-none mb-6">
          YOUR<br />NAME HERE
        </h1>

        {/* Sub-tagline */}
        <p className="text-xl md:text-2xl italic font-sans text-volt mt-2 mb-12 text-center tracking-widest z-10 max-w-2xl">
          在这里用一句话描述你的身份与研究方向，让访客瞬间了解你是谁。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center z-10">
          <a
            href="#about"
            className="bg-volt text-black border-4 border-black px-10 py-4 font-mono font-extrabold uppercase shadow-neo-4 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
          >
            ABOUT ME →
          </a>
          <a
            href="#courses"
            className="bg-white text-black border-4 border-black px-10 py-4 font-mono font-extrabold uppercase shadow-neo-4 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
          >
            MY COURSES →
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT ME
      ───────────────────────────────────────── */}
      <section id="about" className="relative bg-white border-y-8 border-black flex flex-col md:flex-row overflow-hidden">
        {/* Left: Photo placeholder */}
        <div className="w-full md:w-[420px] min-h-[480px] bg-dark-grey border-r-8 border-black flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {/* Replace with <Image> when you have a real photo */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-12">
            <div className="w-48 h-48 bg-volt border-4 border-black shadow-neo-8 flex items-center justify-center">
              <span className="font-ranchers text-6xl text-black">YN</span>
            </div>
            <span className="tech-label text-gray-500 text-xs mt-4">YOUR PHOTO HERE</span>
          </div>
          {/* Decorative vertical text */}
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-volt border-l-4 border-black flex items-center justify-center">
            <span className="vertical-text font-mono font-extrabold text-black uppercase text-xs tracking-[0.2em]">ABOUT ME</span>
          </div>
        </div>

        {/* Right: Bio Content */}
        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
          <span className="tech-label text-gray-400 mb-3 text-xs">IDENTIFICATION / 关于我</span>
          <h2 className="font-ranchers text-6xl md:text-8xl text-black leading-none mb-8">YOUR NAME</h2>

          <p className="font-sans text-lg text-black leading-relaxed mb-6 max-w-2xl">
            在这里写你的个人简介。介绍你的研究领域、教育背景和核心专长。这段文字将帮助访客快速了解你的身份和你所做的事情。
          </p>
          <p className="font-sans text-lg text-black leading-relaxed mb-10 max-w-2xl">
            你可以在这里继续描述你的工作方向、价值观或研究成果。让每一个访客都能感受到你的专业与热情。
          </p>

          {/* Stats / Tags */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-volt border-4 border-black px-6 py-3 rotate-1 shadow-neo-4 font-mono font-extrabold uppercase text-black text-sm">
              UNIVERSITY / INSTITUTION
            </div>
            <div className="bg-black border-4 border-black px-6 py-3 rotate-[-1deg] shadow-neo-4 font-mono font-extrabold uppercase text-volt text-sm">
              YOUR FIELD
            </div>
            <div className="bg-white border-4 border-black px-6 py-3 rotate-1 shadow-neo-4 font-mono font-extrabold uppercase text-black text-sm">
              N+ YEARS EXP.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          COURSES — 课程介绍
      ───────────────────────────────────────── */}
      <section id="courses" className="bg-dark-grey p-12 md:p-20 w-full flex flex-col border-b-8 border-black">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-volt pb-6 gap-4">
            <div>
              <span className="tech-label text-volt text-xs mb-2 block">EDUCATION / 课程</span>
              <h2 className="font-ranchers text-6xl md:text-7xl text-white uppercase leading-none">MY COURSES</h2>
            </div>
            <p className="font-mono text-gray-400 text-sm uppercase max-w-xs">
              精心设计的课程，帮助你快速掌握核心技能。
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {courses.map((course, i) => (
              <div key={i} className="relative bg-white border-8 border-black p-8 shadow-neo-white-8 flex flex-col group overflow-hidden">
                {/* Watermark number */}
                <div className="absolute -bottom-8 -right-2 font-ranchers text-[120px] leading-none text-black opacity-[0.04] select-none group-hover:opacity-[0.08] transition-opacity">
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Tag */}
                <div className="absolute -top-4 -left-4 bg-volt border-2 border-black px-4 py-1 rotate-[-4deg] font-mono font-extrabold uppercase text-black text-xs z-20">
                  {course.tag}
                </div>
                <h3 className="font-ranchers text-4xl text-black mb-4 uppercase mt-4 leading-tight">{course.title}</h3>
                <p className="font-sans text-black leading-relaxed mb-8 text-sm flex-1">{course.desc}</p>
                <a
                  href={course.link}
                  className="inline-block border-4 border-black bg-white text-black px-6 py-3 font-mono font-extrabold uppercase text-sm shadow-neo-4 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  VIEW DETAILS →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          PHOTOS — 照片墙
      ───────────────────────────────────────── */}
      <section id="photos" className="bg-white border-b-8 border-black p-12 md:p-20 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <span className="tech-label text-gray-400 text-xs mb-2 block">GALLERY / 照片</span>
            <h2 className="font-ranchers text-5xl md:text-6xl text-black uppercase leading-none">PHOTO WALL</h2>
          </div>

          {/* Sticker-style photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'CONFERENCE 2025', rotate: '-rotate-2' },
              { label: 'LAB RESEARCH',   rotate: 'rotate-1' },
              { label: 'KEYNOTE SPEECH', rotate: '-rotate-1' },
              { label: 'FIELDWORK',      rotate: 'rotate-2' },
              { label: 'WORKSHOP',       rotate: 'rotate-1' },
              { label: 'TEAM PHOTO',     rotate: '-rotate-2' },
              { label: 'TEACHING',       rotate: 'rotate-2' },
              { label: 'AWARDS',         rotate: '-rotate-1' },
            ].map((photo, i) => (
              <div
                key={i}
                className={`aspect-square bg-gray-200 border-4 border-black shadow-neo-4 overflow-hidden ${photo.rotate} relative group cursor-pointer`}
              >
                {/* Placeholder content – replace bg-gray-200 with next/image */}
                <div className="absolute inset-0 bg-dark-grey opacity-0 group-hover:opacity-80 transition-opacity duration-200 flex items-end p-3">
                  <span className="font-mono text-volt text-xs font-bold uppercase">{photo.label}</span>
                </div>
                {/* Photo index watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="font-ranchers text-6xl text-black">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          COLUMNS — 专栏介绍与链接
      ───────────────────────────────────────── */}
      <section id="columns" className="bg-dark-grey border-b-8 border-black p-12 md:p-20 w-full">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-16">
            <span className="tech-label text-volt text-xs mb-2 block">WRITING / 专栏</span>
            <h2 className="font-ranchers text-6xl md:text-7xl text-white uppercase leading-none">MY COLUMNS</h2>
          </div>

          {/* Column List */}
          <div className="flex flex-col gap-6">
            {columns.map((col, i) => (
              <a
                href={col.link}
                key={i}
                className="group flex items-center justify-between border-4 border-black p-6 bg-white hover:bg-volt transition-colors shadow-neo-4 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-1">
                  <span className="tech-label text-gray-400 text-xs group-hover:text-black">{col.date}</span>
                  <span className="text-2xl md:text-3xl font-extrabold text-black uppercase leading-tight">{col.title}</span>
                  <span className="font-sans text-gray-500 text-sm mt-1 group-hover:text-black">{col.desc}</span>
                </div>
                <div className="w-12 h-12 border-4 border-black flex-shrink-0 flex items-center justify-center font-bold text-xl ml-6 group-hover:bg-black group-hover:text-white transition-colors">
                  →
                </div>
              </a>
            ))}
          </div>

          {/* More columns link */}
          <div className="mt-10 flex justify-end">
            <a href="#" className="tech-label text-gray-500 text-xs hover:text-volt transition-colors">
              VIEW ALL COLUMNS →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          BOOKING — 预约
      ───────────────────────────────────────── */}
      <section id="booking" className="bg-white border-b-8 border-black p-12 md:p-20 w-full">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-16">
            <span className="tech-label text-gray-400 text-xs mb-2 block">RESERVATION / 预约</span>
            <h2 className="font-ranchers text-6xl md:text-8xl text-black uppercase leading-none">BOOK A SESSION</h2>
            <p className="font-mono text-gray-500 mt-4 uppercase text-sm max-w-lg">
              选择你方便的时间，预约一对一咨询或课程。
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CONTACT ME
      ───────────────────────────────────────── */}
      <section id="contact" className="bg-white border-b-8 border-black p-12 md:p-20 w-full">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="mb-16">
            <span className="tech-label text-gray-400 text-xs mb-2 block">REACH OUT / 联系我</span>
            <h2 className="font-ranchers text-6xl md:text-8xl text-black uppercase leading-none">
              CONTACT ME
            </h2>
            <p className="font-mono text-gray-500 mt-4 uppercase text-sm max-w-lg">
              有合作邀约、课程咨询或媒体采访？请通过以下方式与我联系。
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-wrap gap-4 mb-16">
            {[
              { label: 'EMAIL', value: 'your@email.com', href: 'mailto:your@email.com' },
              { label: 'TWITTER / X', value: '@yourhandle', href: '#' },
              { label: 'LINKEDIN', value: 'linkedin.com/in/you', href: '#' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="border-4 border-black px-6 py-4 bg-white shadow-neo-4 hover:bg-volt hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col gap-1"
              >
                <span className="tech-label text-gray-400 text-xs">{item.label}</span>
                <span className="font-mono font-bold text-black text-sm">{item.value}</span>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────── */}
      <footer className="bg-black border-t-4 border-black px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-ranchers text-2xl text-volt uppercase">YOUR NAME</span>
        <span className="tech-label text-gray-600 text-xs">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        <div className="flex gap-6">
          <a href="#about" className="font-mono text-gray-500 text-xs uppercase hover:text-volt transition-colors">ABOUT</a>
          <a href="#courses" className="font-mono text-gray-500 text-xs uppercase hover:text-volt transition-colors">COURSES</a>
          <a href="#columns" className="font-mono text-gray-500 text-xs uppercase hover:text-volt transition-colors">COLUMNS</a>
          <a href="#booking" className="font-mono text-gray-500 text-xs uppercase hover:text-volt transition-colors">BOOKING</a>
          <a href="#contact" className="font-mono text-gray-500 text-xs uppercase hover:text-volt transition-colors">CONTACT</a>
        </div>
      </footer>

    </div>
  );
}
