"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Zap,
  Layers,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

// --- Individual Event Card Component ---
const EventCard = ({
  title,
  description,
  link,
  icon: Icon,
  platform,
  date,
  format,
  accentColor,
  accentGlow,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isFeatured = title === "CodeArena";

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-[380px] sm:h-[420px] [perspective:1200px]"
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        {/* --- FRONT SIDE --- */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] border-2 backdrop-blur-2xl p-6 sm:p-8 [backface-visibility:hidden] shadow-2xl overflow-hidden
          ${isFeatured ? "border-purple-500/50 bg-purple-950/20 shadow-purple-500/20" : "border-white/10 bg-[#0a0a0a]/40 shadow-black"}`}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Scanning laser — CodeArena only */}
          {isFeatured && (
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent z-0 opacity-50 shadow-[0_0_15px_purple]"
            />
          )}

          {/* Nebula glow */}
          <div
            className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none ${accentGlow}`}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon with orbital ring */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={`absolute -inset-4 border-2 border-dashed rounded-full opacity-30 ${isFeatured ? "border-purple-400" : "border-white/20"}`}
              />
              <div
                className={`relative p-5 rounded-full border shadow-2xl
                ${isFeatured ? "bg-purple-500/10 border-purple-500/30" : "bg-white/5 border-white/10"}`}
              >
                <Icon
                  size={36}
                  strokeWidth={1}
                  className={accentColor}
                />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter text-center leading-none">
              {title}
            </h3>

            <div
              className={`h-[2px] w-12 my-4 rounded-full ${isFeatured ? "bg-purple-500 shadow-[0_0_15px_#a855f7]" : "bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"}`}
            />

            <span
              className={`text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 ${isFeatured ? "text-purple-300" : "text-zinc-500"}`}
            >
              <Sparkles size={10} />{" "}
              {isFeatured ? "Main Mission" : "Side Quest"}
            </span>

            <button
              onClick={handleFlip}
              className={`mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer
              ${isFeatured ? "text-purple-300 border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20" : "text-zinc-400 border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              View Mission <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] bg-[#070707] border-2 border-white/20 p-6 sm:p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl overflow-hidden">
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4">
            Mission Briefing
          </span>

          {/* Structured info */}
          <div className="space-y-2 mb-5 w-full max-w-[260px]">
            {[
              { label: "Platform", value: platform },
              { label: "Date", value: date },
              { label: "Format", value: format },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between text-[10px] sm:text-xs border-b border-white/5 pb-1"
              >
                <span className="text-zinc-500 font-bold uppercase tracking-wider">
                  {row.label}
                </span>
                <span className="text-white font-semibold">{row.value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-light mb-5">
            {description}
          </p>

          <a
            href={link}
            data-mission-link="true"
            target={link.startsWith("http") ? "_blank" : "_self"}
            rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95
            ${isFeatured ? "bg-purple-600/20 border-purple-500 hover:bg-purple-500" : "bg-white/5 border-white/10 hover:bg-white hover:text-black"}`}
          >
            Register Now <ChevronRight size={14} />
          </a>

          <button
            className="mt-3 flex items-center gap-1.5 text-[9px] text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors cursor-pointer"
            onClick={handleFlip}
          >
            <RotateCcw size={10} /> Tap to flip back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Custom Navigation Arrows ---
const NavButton = ({ direction, onClick, disabled }) => {
  const ArrowIcon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
        ${disabled
          ? "border-white/5 text-zinc-700 cursor-not-allowed"
          : "border-purple-500/40 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-90"
        }`}
    >
      <ArrowIcon size={20} />
    </button>
  );
};

// --- Dot Indicators ---
const DotIndicators = ({ total, current }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`rounded-full transition-all duration-500 ${
          i === current
            ? "w-6 h-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            : "w-2 h-2 bg-white/10 hover:bg-white/20"
        }`}
      />
    ))}
  </div>
);

// --- Main Events Section ---
const Events = () => {
  const sectionRef = useRef(null);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const eventData = [
    {
      title: "Logic Loop",
      icon: Terminal,
      platform: "UpToSkills",
      date: "5 April",
      format: "DSA Quiz",
      accentColor: "text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]",
      accentGlow: "bg-cyan-600",
      description:
        "Test your algorithmic speed and precision in a high-stakes competitive quiz gauntlet.",
      link: "/codearena",
    },
    {
      title: "CodeArena",
      icon: Zap,
      platform: "Codeforces",
      date: "5 April",
      format: "ICPC-Style CP",
      accentColor: "text-purple-400 drop-shadow-[0_0_8px_#a855f7]",
      accentGlow: "bg-purple-600",
      description:
        "Solve the complex, optimize the simple, and dominate the live global leaderboard in a timed coding battle.",
      link: "https://unstop.com/o/1cJ2LFR?utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Logged_out_userhttps://share.google/JZJwkBcHxZVeJOoh4",
    },
    {
      title: "Vibe Code Arena",
      icon: Layers,
      platform: "HackerEarth",
      date: "25 Mar – 4 Apr",
      format: "AI Prompting",
      accentColor: "text-pink-400 drop-shadow-[0_0_8px_#f472b6]",
      accentGlow: "bg-pink-600",
      description:
        "Leverage the power of LLMs to build at the speed of thought in this AI-powered coding competition.",
      link: "/codearena",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent px-4 sm:px-6 py-16 sm:py-24 md:py-32"
    >
      {/* Background ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-white/10" />
            <span className="text-xs font-bold text-purple-400 uppercase tracking-[0.5em]">
              Sector :: Missions
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white">
            Our <span className="text-purple-500">Events</span>
          </h2>

          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl font-light text-zinc-500 text-sm sm:text-base md:text-xl">
            Choose your battleground. From pure logic to full-stack endurance.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {eventData.map((event, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 sm:pl-6 basis-[85%] sm:basis-[70%] md:basis-1/3"
                >
                  <EventCard
                    title={event.title}
                    icon={event.icon}
                    description={event.description}
                    link={event.link}
                    platform={event.platform}
                    date={event.date}
                    format={event.format}
                    accentColor={event.accentColor}
                    accentGlow={event.accentGlow}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
            <NavButton direction="prev" onClick={scrollPrev} disabled={!api} />
            <DotIndicators total={count} current={current} />
            <NavButton direction="next" onClick={scrollNext} disabled={!api} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;