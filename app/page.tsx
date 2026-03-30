"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const examples = [
  { before: "/examples/1before.jpg", after: "/examples/1after.jpg" },
];

export default function Home() {
  const blobRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [currentExample, setCurrentExample] = useState(0);

  useEffect(() => {
    if (examples.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();

    const blobs = [
      { baseX: 35, baseY: 40, r: 120, speeds: [0.0003, 0.00017, 0.00011], amplitudes: [180, 90, 45] },
      { baseX: 65, baseY: 55, r: 100, speeds: [0.00025, 0.00013, 0.00009], amplitudes: [160, 70, 35] },
      { baseX: 50, baseY: 30, r: 140, speeds: [0.00035, 0.00019, 0.00007], amplitudes: [140, 100, 50] },
      { baseX: 25, baseY: 65, r: 90, speeds: [0.00028, 0.00015, 0.00012], amplitudes: [170, 80, 40] },
      { baseX: 75, baseY: 35, r: 110, speeds: [0.00032, 0.00014, 0.0001], amplitudes: [150, 85, 42] },
      { baseX: 45, baseY: 70, r: 130, speeds: [0.00022, 0.00018, 0.00008], amplitudes: [130, 95, 55] },
    ];

    function animate() {
      const t = Date.now() - startTime;
      blobs.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x =
          (blob.baseX / 100) * vw +
          Math.sin(t * blob.speeds[0]) * blob.amplitudes[0] +
          Math.sin(t * blob.speeds[1] + 1.3) * blob.amplitudes[1] +
          Math.sin(t * blob.speeds[2] + 2.7) * blob.amplitudes[2];
        const y =
          (blob.baseY / 100) * vh +
          Math.cos(t * blob.speeds[0] * 0.8 + 0.5) * blob.amplitudes[0] * 0.7 +
          Math.cos(t * blob.speeds[1] * 1.1 + 2.1) * blob.amplitudes[1] * 0.6 +
          Math.cos(t * blob.speeds[2] * 0.9 + 3.8) * blob.amplitudes[2] * 0.8;
        el.setAttribute("cx", String(x));
        el.setAttribute("cy", String(y));
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f4f8]">
      <svg className="fixed inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              ref={(el) => { blobRefs.current[i] = el; }}
              r={[120, 100, 140, 90, 110, 130][i]}
              fill={["rgba(135,196,240,0.7)","rgba(160,210,245,0.6)","rgba(110,180,235,0.65)","rgba(145,205,250,0.6)","rgba(120,190,240,0.7)","rgba(140,200,245,0.55)"][i]}
              cx="50%" cy="50%"
            />
          ))}
        </g>
      </svg>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 md:px-10 py-5">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 19.02L12 15.77L7.09 19.02L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" fill="#0a0a0a" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#0a0a0a]">HeadStart</span>
          </div>
          <button className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]/20 flex items-center justify-center hover:border-[#0a0a0a]/40 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </button>
        </nav>

        <main className="flex flex-col items-center justify-center px-6 text-center pt-16 md:pt-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0a0a0a] max-w-3xl leading-[1.1]">
            Professional headshots,<br />
            <span className="relative inline-block">
              in minutes
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 8C50 2 100 4 150 6C200 8 250 3 298 7" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#0a0a0a]/60 max-w-xl leading-relaxed">
            Upload a selfie. AI does the rest. Get studio-quality LinkedIn headshots without the studio.
          </p>
          <button className="mt-10 bg-[#0a0a0a] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#0a0a0a]/85 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-black/10">
            Get your headshots now
          </button>
          <p className="mt-4 text-sm text-[#0a0a0a]/40">
            No subscription · One-time payment · Done in 5 minutes
          </p>
        </main>

        <section className="mt-24 md:mt-32 pb-24 px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">
            See the difference
          </h2>
          <p className="text-center text-[#0a0a0a]/50 mb-12 text-lg">
            From phone selfie to professional headshot
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10 border border-black/5">
                  <Image src={examples[currentExample].before} alt="Before — selfie photo" fill className="object-cover transition-opacity duration-700" sizes="(max-width: 768px) 100vw, 400px" priority />
                </div>
                <span className="mt-4 inline-block bg-[#0a0a0a]/8 text-[#0a0a0a]/70 text-sm font-medium px-4 py-1.5 rounded-full">
                  Before — phone selfie
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10 border border-black/5">
                  <Image src={examples[currentExample].after} alt="After — AI headshot" fill className="object-cover transition-opacity duration-700" sizes="(max-width: 768px) 100vw, 400px" priority />
                </div>
                <span className="mt-4 inline-block bg-[#0a0a0a] text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  After — AI headshot
                </span>
              </div>
            </div>
            {examples.length > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {examples.map((_, i) => (
                  <button key={i} onClick={() => setCurrentExample(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentExample ? "bg-[#0a0a0a] scale-110" : "bg-[#0a0a0a]/20 hover:bg-[#0a0a0a]/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}