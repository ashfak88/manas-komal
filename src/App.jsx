import * as React from "react";
import * as Jsx from "react/jsx-runtime";
import confetti from "canvas-confetti";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Credit from "./Credit";

const cx = (...args) =>
  args
    .filter((e, idx, arr) => !!e && e.trim() !== "" && arr.indexOf(e) === idx)
    .join(" ")
    .trim();

const kebabCase = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const camelCase = (e) =>
  e.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, t, n) => (n ? n.toUpperCase() : t.toLowerCase()));
const pascalCase = (e) => {
  const t = camelCase(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const hasAria = (e) => {
  for (const t in e) {
    if (t.startsWith("aria-") || t === "role" || t === "title") return true;
  }
  return false;
};

const createIcon = (name, iconNode) => {
  const Component = React.forwardRef(
    (
      {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = "",
        children,
        ...rest
      },
      ref,
    ) =>
      React.createElement(
        "svg",
        {
          ref,
          ...svgBase,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
          className: cx("lucide", `lucide-${kebabCase(pascalCase(name))}`, `lucide-${name}`, className),
          ...(!children && !hasAria(rest) && { "aria-hidden": "true" }),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  );
  Component.displayName = pascalCase(name);
  return Component;
};

const IconCalendarPlus = createIcon("calendar-plus", [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  [
    "path",
    {
      d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
      key: "1glfrc",
    },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
]);

const IconChevronDown = createIcon("chevron-down", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);

const IconClock = createIcon("clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
]);

const IconHeart = createIcon("heart", [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0",
    },
  ],
]);

const IconMapPin = createIcon("map-pin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);

const IconNavigation = createIcon("navigation", [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }],
]);

const IconSparkles = createIcon("sparkles", [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr",
    },
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
]);

const IconPhone = createIcon("phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "18ioyo",
    },
  ],
]);

const IconMusic = createIcon("music", [
  ["path", { d: "M9 18V5l12-2v13", key: "148f3p" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fq0q9" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1n0dcf" }],
]);

const IconSun = createIcon("sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "197v0" }],
  ["path", { d: "M12 20v2", key: "11y6e1" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "1e1y1v" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "1t0lcf" }],
  ["path", { d: "M2 12h2", key: "1t1e6d" }],
  ["path", { d: "M20 12h2", key: "1bpw96" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1d5e3s" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "19h7v4" }],
]);

const IconShirt = createIcon("shirt", [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "3v8t0w",
    },
  ],
]);

const IconVolume2 = createIcon("volume-2", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "148f3p" }],
  ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07", key: "148f3q" }],
  ["path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14", key: "148f3r" }],
]);

const IconVolumeX = createIcon("volume-x", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "148f3s" }],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "148f3t" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "148f3u" }],
]);

function AuroraBackground({ className = "", intensity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute -top-1/3 left-[-20%] h-[80%] w-[90%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.55 0.13 160 / 0.55), transparent 65%)",
          animation: "aurora-drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[-25%] h-[75%] w-[85%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.8 0.12 85 / 0.5), transparent 65%)",
          animation: "aurora-drift 24s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[10%] h-[70%] w-[80%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.52 0.16 18 / 0.4), transparent 65%)",
          animation: "aurora-drift 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: "radial-gradient(oklch(0.98 0.02 92 / 0.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}

function FloatingPetals({ count = 14, burst = false }) {
  const petals = React.useMemo(
    () =>
      Array.from({ length: count }, (_, n) => ({
        id: n,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: burst ? Math.random() * 0.4 : Math.random() * 12,
        duration: (burst ? 3.2 : 11) + Math.random() * 6,
        drift: (Math.random() - 0.5) * 140,
        spin: 180 + Math.random() * 540,
        hue: Math.random() > 0.5 ? "oklch(0.78 0.115 85)" : "oklch(0.62 0.13 18)",
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count, burst],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-8%]"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.62,
            borderRadius: "60% 10% 60% 10%",
            background: petal.hue,
            opacity: petal.opacity,
          }}
          initial={{ y: "-10vh", x: 0, rotate: 0 }}
          animate={{ y: "115vh", x: petal.drift, rotate: petal.spin }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: burst ? 0 : Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

const WEDDING_DATA = {
  groom: {
    name: "Manas",
    fullName: "Manas Patil",
    parents: {
      father: "Prof. Gopal Patil",
      mother: "Mrs. Kalpana Patil",
    },
    line: "Son of Prof. Gopal Patil & Mrs. Kalpana Patil",
    image: "/images/groom.png",
    bio: "An SAP professional by day, an explorer by heart, and a chai enthusiast always.",
  },
  bride: {
    name: "Komal",
    fullName: "Komal Chaudhari",
    parents: {
      father: "Dyaneshwar Chaudhari",
      mother: "Mangala Chaudhari",
    },
    line: "Daughter of Mr. Dyaneshwar Chaudhari & Mrs. Mangala Chaudhari",
    image: "/images/bride.png",
    bio: "An MBA graduate and professional chef, who loves exploring new places, hosting loved ones, and serving happiness one plate at a time.",
  },
  dateISO: "2026-12-03T07:30:00+05:30",
  endISO: "2026-12-03T15:00:00+05:30",
  dateLabel: "02-03 Dec 2026",
  muhurthamDateLabel: "Thursday, 3 December 2026",
  timeLabel: "Wedding Celebrations · 2 Days",
  muhurthamLabel: "The Sacred Union · 7:30 AM",
  venue: {
    name: "Miwa Banquets",
    address: "Miwa Banquets, Wakad, Pune, Maharashtra",
    tagline: "No hassle, all celebrations under one roof - MIWA Banquets, Wakad, Pune",
    mapUrl: "https://maps.app.goo.gl/mBraodxMrpCRErxb6?g_st=iw",
  },
  days: [
    {
      dayNumber: "Day 1",
      dateLabel: "Wednesday, 02 Dec 2026",
      events: [
        {
          id: "d1-e1",
          name: "The Auspicious Beginning",
          time: "07:30 AM",
          icon: IconSun,
          venue: "Miwa Banquets, Wakad, Pune",
        },
        {
          id: "d1-e2",
          name: "The Yellow Affair",
          subtitle: "Haldi Ceremony",
          time: "10:30 AM",
          icon: IconSun,
          venue: "Miwa Banquets, Wakad, Pune",
          theme: "Yellow & Festive Pastels",
        },
        {
          id: "d1-e3",
          name: "Shimmer & Shenanigans",
          subtitle: "Sangeet & Celebration",
          time: "05:30 PM",
          icon: IconMusic,
          venue: "Miwa Banquets, Wakad, Pune",
          theme: "Glamour, Glitz & Festive Indian Wear",
        },
      ],
    },
    {
      dayNumber: "Day 2",
      dateLabel: "Thursday, 03 Dec 2026",
      events: [
        {
          id: "d2-e1",
          name: "The Sacred Union",
          subtitle: "Auspicious Wedding Muhurtham",
          time: "07:30 AM",
          icon: IconHeart,
          venue: "Miwa Banquets, Wakad, Pune",
          highlight: true,
          theme: "Traditional Ethnic Wear",
        },
        {
          id: "d2-e2",
          name: "The Royal Procession",
          subtitle: "Baraat & Welcome",
          time: "11:00 AM",
          icon: IconSparkles,
          venue: "Miwa Banquets, Wakad, Pune",
          theme: "Maharashtrian Royalty",
        },
        {
          id: "d2-e3",
          name: "The Forever Vows",
          subtitle: "Pheras & Reception",
          time: "12:30 PM",
          icon: IconHeart,
          venue: "Miwa Banquets, Wakad, Pune",
          highlight: true,
          theme: "Vibrant Ethnic",
        },
      ],
    },
  ],
  rsvps: [
    { name: "Prof. Gopal Mansingh Patil", phone: "7350182082" },
    { name: "Mrs. Kalpana Gopal Patil", phone: "7798426237" },
    { name: "Mr. Siddharth ji Sainath Kunden", phone: "9970039397" },
    { name: "Dr. Darshana Siddharth Kunden", phone: "9503279701" },
  ],
};

function HeroSection() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });
  const bgShift = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const garlandShift = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);
  const textShift = useTransform(smoothProgress, [0, 1], ["0%", "26%"]);
  const coupleShift = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const opacityFade = useTransform(smoothProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100svh] min-h-[620px] max-h-[900px] w-full flex-col items-center justify-between overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 30%, #1a4f32 0%, #0d2e1c 55%, #06190f 100%)",
      }}
    >
      {/* Subtle background glow */}
      <motion.div
        aria-hidden="true"
        style={{
          y: bgShift,
          background: "radial-gradient(ellipse at 50% 35%, rgba(212, 175, 55, 0.16), transparent 70%)",
        }}
        className="pointer-events-none absolute inset-0 m-auto h-[60%] w-[110%] rounded-full blur-3xl"
      />

      {/* Floating Petals matching theme */}
      <FloatingPetals count={10} />

      {/* Top Traditional Marigold & Mango Leaves Garland Toran across the top */}
      <motion.div
        style={{ y: garlandShift }}
        className="pointer-events-none absolute -top-1 sm:-top-2 left-1/2 z-20 w-[112%] sm:w-[104%] max-w-none -translate-x-1/2 select-none"
      >
        <img
          src="/images/garland.png"
          alt="Traditional wedding toran garland"
          className="w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Main Content Area - Generous top padding (pt-32 sm:pt-36) so text NEVER overrides garland */}
      <motion.div
        style={{ y: textShift, opacity: opacityFade }}
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center pt-32 sm:pt-36 pb-1 text-center px-4"
      >
        {/* Subtitle / Invitation Line - delicate original size in clean white with subtle shadow */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white text-[0.6rem] sm:text-[0.65rem] tracking-[0.42em] uppercase font-light mb-3 sm:mb-4"
          style={{
            letterSpacing: "0.42em",
            color: "#ffffff",
            textShadow: "0 1px 3px rgba(0,0,0,0.7)",
          }}
        >
          Together with their families
        </motion.p>

        {/* Groom & Bride Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1
            className="text-gold-foil font-normal tracking-wide text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 6.5vw, 2.85rem)",
              lineHeight: 1.12,
              filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.45))",
            }}
          >
            {WEDDING_DATA.groom.name}
          </h1>

          <span
            className="my-0.5 sm:my-1"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              color: "#f9e7b9",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            and
          </span>

          <h2
            className="text-gold-foil font-normal tracking-wide text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 6.5vw, 2.85rem)",
              lineHeight: 1.12,
              filter: "drop-shadow(0 2px 14px rgba(212, 175, 55, 0.45))",
            }}
          >
            {WEDDING_DATA.bride.name}
          </h2>
        </motion.div>

        {/* Delicate Golden Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="my-3 sm:my-3.5 h-[1px] w-24 sm:w-32"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(232, 202, 120, 0.85) 50%, transparent)",
          }}
        />

        {/* Date: 02 · 12 · 2026 - original elegant small size in white */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="text-white text-[0.7rem] sm:text-[0.75rem] tracking-[0.32em] font-light"
          style={{
            letterSpacing: "0.32em",
            color: "#ffffff",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          02 · 12 · 2026
        </motion.p>

        {/* Venue Location - original delicate small size in clean white */}
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white text-[0.58rem] sm:text-[0.62rem] tracking-[0.32em] uppercase mt-1.5 font-light"
          style={{
            letterSpacing: "0.32em",
            color: "#ffffff",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          Miwa Banquets, Wakad, Pune
        </motion.p>
      </motion.div>

      {/* Couple Portrait - Decreased size and placed at the bottom */}
      <motion.div
        style={{ y: coupleShift, opacity: opacityFade }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex-1 flex items-end justify-center pointer-events-none select-none overflow-hidden"
      >
        <div className="relative w-full max-w-[200px] sm:max-w-[230px] h-full max-h-[290px] sm:max-h-[330px] flex items-end justify-center pb-8">
          <img
            src="/images/hero-couple.jpg"
            alt="Manas and Komal in wedding attire"
            className="w-auto h-full max-h-[280px] sm:max-h-[320px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 92%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 92%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
            }}
          />
        </div>
      </motion.div>

      {/* Subtle Scroll Down Prompt at the very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: opacityFade }}
        className="pointer-events-none absolute bottom-2 z-20 flex flex-col items-center text-[#f7e098]/85"
      >
        <span className="text-[0.48rem] tracking-[0.4em] uppercase font-light">Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <IconChevronDown className="h-3 w-3" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function ParallaxWrap({ children, speed = 40, scaleRange, className = "" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const yVal = useTransform(smooth, [0, 1], [speed, -speed]);
  const scaleVal = useTransform(smooth, [0, 0.5, 1], [scaleRange?.[0] ?? 1, scaleRange?.[1] ?? 1, scaleRange?.[0] ?? 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: yVal, scale: scaleVal }}>{children}</motion.div>
    </div>
  );
}

const revealVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="rule-gold w-16" />
      {label ? (
        <span className="font-sans text-[0.65rem] tracking-[0.42em] text-gold uppercase font-medium">
          {label}
        </span>
      ) : (
        <span className="text-gold text-sm">✦</span>
      )}
      <span className="rule-gold w-16" />
    </div>
  );
}

function PersonCard({ person, role }) {
  return (
    <FadeIn className="relative">
      <div className="bg-[#FAF7F0] border border-gold/45 shadow-luxe relative overflow-hidden rounded-[2.25rem] px-6 sm:px-8 py-8 min-h-[250px] flex flex-col justify-center items-center">
        {/* Subtle decorative inner border */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[1.75rem] border border-gold/20" />
        
        <div className="relative z-10 flex flex-col items-center text-center w-full">
          {/* Role badge */}
          <span className="bg-primary text-gold border border-gold/40 text-[0.65rem] tracking-[0.25em] uppercase font-semibold px-4 py-1 rounded-full shadow-xs whitespace-nowrap mb-2">
            {role}
          </span>

          {/* Full Name */}
          <h3 className="text-primary font-display mt-1 text-2xl sm:text-3xl font-medium leading-tight tracking-wide">
            {person.fullName}
          </h3>

          {/* Bio / Two Lines About Him or Her */}
          {person.bio && (
            <p className="text-muted-foreground mt-2.5 max-w-xs text-xs sm:text-[0.82rem] leading-relaxed italic px-2">
              &ldquo;{person.bio}&rdquo;
            </p>
          )}

          {/* Ornate Divider */}
          <div className="my-3.5 flex items-center justify-center gap-2.5 w-full">
            <span className="rule-gold w-16 opacity-80" />
            <span className="text-gold text-xs leading-none">✦</span>
            <span className="rule-gold w-16 opacity-80" />
          </div>

          {/* Parents info box with clean 2-column key/value alignment */}
          <div className="w-full max-w-[320px] bg-secondary/60 border border-gold/25 rounded-2xl py-3 px-4 shadow-xs">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-center gap-2 text-left">
                <span className="text-muted-foreground uppercase tracking-wider text-[0.65rem] font-bold shrink-0 min-w-[50px] text-right">
                  Father:
                </span>
                <span className="text-foreground font-semibold text-xs sm:text-sm">
                  {person.parents.father}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-left">
                <span className="text-muted-foreground uppercase tracking-wider text-[0.65rem] font-bold shrink-0 min-w-[50px] text-right">
                  Mother:
                </span>
                <span className="text-foreground font-semibold text-xs sm:text-sm">
                  {person.parents.mother}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CoupleSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div className="relative mx-auto max-w-md">
        <FadeIn className="text-center">
          <SectionDivider label="The Couple" />
          <h2 className="text-primary mt-5 text-4xl font-light">Two Hearts, One Journey</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm leading-relaxed">
            Prof. Gopal Patil & Mrs. Kalpana Patil cordially invite you to celebrate the wedding of their son with love and joy.
          </p>
        </FadeIn>

        {/* Beautiful Ornate Archival Couple Portrait with Clean Luxury Frame */}
        <FadeIn delay={0.1} className="mt-9">
          <div className="relative mx-auto max-w-[340px] sm:max-w-[360px]">
            {/* Inner Gold Inset Frame on Photo */}
            <div className="relative overflow-hidden rounded-[2.25rem] border-2 border-gold/45 p-1.5 bg-gradient-to-tr from-[#C5A059] via-[#F9E8B2] to-[#D4AF37] shadow-luxe">
              <div className="relative overflow-hidden rounded-[2rem] bg-emerald-ink">
                <img
                  src="/images/couple.jpg"
                  alt="Manas and Komal"
                  className="h-[400px] sm:h-[440px] w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                
                {/* Thin Inner Golden Inset Border for Archival Look */}
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-gold/35 shadow-[inset_0_0_15px_rgba(0,0,0,0.35)]" />

                {/* Subtle romantic vignette at bottom */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-ink/90 via-transparent to-black/15" />
                
                {/* Overlay names badge */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <div className="inline-flex items-center justify-center gap-2 mb-1">
                    <span className="rule-gold w-6 opacity-75" />
                    <span className="text-gold-soft text-[0.62rem] tracking-[0.35em] uppercase font-semibold">
                      Forever Begins
                    </span>
                    <span className="rule-gold w-6 opacity-75" />
                  </div>
                  <h3
                    className="text-ivory mt-1 text-2xl sm:text-[1.75rem] font-light tracking-wide drop-shadow-sm"
                    style={{ fontFamily: "'Cinzel Decorative', serif" }}
                  >
                    {WEDDING_DATA.groom.name}{" "}
                    <span className="text-gold font-normal" style={{ fontFamily: "'Alex Brush', cursive" }}>&</span>{" "}
                    {WEDDING_DATA.bride.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 space-y-8">
          <ParallaxWrap speed={26}>
            <PersonCard person={WEDDING_DATA.groom} role="The Groom" />
          </ParallaxWrap>
          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-5xl">&</span>
          </div>
          <ParallaxWrap speed={-26}>
            <PersonCard person={WEDDING_DATA.bride} role="The Bride" />
          </ParallaxWrap>
        </div>
      </div>
    </section>
  );
}

const weddingTimestamp = new Date(WEDDING_DATA.dateISO).getTime();

function calculateTimeLeft() {
  const diff = Math.max(0, weddingTimestamp - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBox({ value, label }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="border-gold/25 bg-emerald-ink/40 relative flex flex-col items-center overflow-hidden rounded-2xl border px-2 py-4 backdrop-blur-sm">
      <div className="relative h-11 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-foil font-display absolute inset-0 flex items-center justify-center text-4xl font-light tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-ivory/55 mt-2 text-[0.55rem] tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>
  );
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft);

  React.useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-emerald-ink relative overflow-hidden px-5 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/mandala-texture.jpg')",
          backgroundSize: "140%",
          backgroundPosition: "center",
        }}
      />
      <div className="from-emerald-ink via-emerald-ink/60 to-emerald-ink absolute inset-0 bg-gradient-to-b" />
      <div className="relative mx-auto max-w-md text-center">
        <FadeIn>
          <SectionDivider label="Counting down" />
          <h2 className="text-ivory mt-5 text-4xl font-light">
            Until we say{" "}
            <span className="font-script text-gold-foil">forever</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-9 grid grid-cols-4 gap-2.5">
            <CountdownBox value={timeLeft.days} label="Days" />
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <CountdownBox value={timeLeft.minutes} label="Mins" />
            <CountdownBox value={timeLeft.seconds} label="Secs" />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-ivory/65 mt-6 text-xs tracking-[0.25em] uppercase font-light">
            {WEDDING_DATA.muhurthamDateLabel} · 07:30 AM
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function formatIcsDate(isoString) {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadIcsCalendar() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Manas & Komal Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(WEDDING_DATA.dateISO)}`,
    `DTEND:${formatIcsDate(WEDDING_DATA.endISO)}`,
    `SUMMARY:${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} Wedding`,
    `LOCATION:${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`,
    `DESCRIPTION:Together with the Patil family, Manas & Komal invite you to celebrate their wedding ceremonies at Miwa Banquets, Wakad, Pune.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `manas-komal-wedding.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

function triggerWeddingPopperBlast() {
  const goldAndRoseColors = ["#E6CA65", "#D4AF37", "#FFFFFF", "#F9E8B2", "#C5A059", "#2E5A44"];

  // Burst from left side
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 65,
    origin: { x: 0.15, y: 0.65 },
    colors: goldAndRoseColors,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Burst from right side
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 65,
    origin: { x: 0.85, y: 0.65 },
    colors: goldAndRoseColors,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Center celebratory starburst
  confetti({
    particleCount: 40,
    spread: 100,
    origin: { x: 0.5, y: 0.6 },
    colors: ["#E6CA65", "#FFFFFF", "#E8A87C"],
    ticks: 220,
    gravity: 0.9,
    scalar: 1.25,
    disableForReducedMotion: true,
  });
}

function FunctionsSection() {
  const blastTriggered = React.useRef(false);

  return (
    <section className="relative px-4 sm:px-6 py-20 bg-background/50">
      <div className="mx-auto max-w-lg">
        {/* Celebration & Dates Header */}
        <FadeIn className="text-center">
          <SectionDivider label="Wedding Itinerary" />
          <h2 className="text-primary mt-5 text-4xl font-light">
            The Celebration
          </h2>
          <div className="inline-flex items-center justify-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-secondary/80 border border-gold/35 shadow-xs">
            <IconCalendarPlus className="h-3.5 w-3.5 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              02-03 Dec 2026
            </span>
          </div>
          <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-sm">
            Join us in the celebrations and rituals across our two joyful days.
          </p>
        </FadeIn>

        {/* Day-wise Wedding Itinerary with generous spacing between Day 1 & Day 2 */}
        <div className="mt-14 space-y-24">
          {WEDDING_DATA.days.map((dayGroup, groupIdx) => (
            <div key={dayGroup.dayNumber} className="space-y-7">
              {/* Day Badge & Date Header */}
              <FadeIn delay={0.05}>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="bg-primary text-gold border border-gold/50 px-5 py-1.5 rounded-full text-xs font-semibold tracking-[0.28em] uppercase shadow-sm">
                    {dayGroup.dayNumber}
                  </span>
                  <h3 className="text-primary font-display mt-3 text-2xl sm:text-3xl font-medium tracking-wide">
                    {dayGroup.dateLabel}
                  </h3>
                  <div className="rule-gold mt-3 w-32 opacity-80" />
                </div>
              </FadeIn>

              {/* Event Cards for this Day */}
              <div className="space-y-8 pt-2">
                {dayGroup.events.map((fn, idx) => {
                  const Icon = fn.icon;
                  const isWedding = fn.highlight;
                  return (
                    <motion.div
                      key={fn.id}
                      variants={revealVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
                      transition={{ delay: idx * 0.08 }}
                      onViewportEnter={() => {
                        if (isWedding && !blastTriggered.current) {
                          blastTriggered.current = true;
                          // Trigger festive popper blast when wedding ceremony card enters viewport
                          triggerWeddingPopperBlast();
                        }
                      }}
                    >
                      <div
                        className={`bg-[#FAF7F0] shadow-luxe overflow-hidden rounded-[2rem] border transition-all duration-300 ${
                          isWedding
                            ? "border-gold/70 ring-2 ring-gold/40 shadow-gold"
                            : "border-gold/45 hover:border-gold/65"
                        }`}
                      >
                        {/* Top Bar with Consistent Emerald Deep Luxury Gradient on All Cards */}
                        <div
                          style={{
                            padding: "18px 20px",
                            borderBottom: "1px solid rgba(212, 175, 55, 0.35)",
                            background: "linear-gradient(135deg, oklch(33% 0.072 158), oklch(21.5% 0.05 160))",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", minWidth: 0, flex: 1 }}>
                              <span
                                style={{
                                  display: "grid",
                                  placeItems: "center",
                                  width: "42px",
                                  height: "42px",
                                  minWidth: "42px",
                                  borderRadius: "50%",
                                  border: "1px solid rgba(212, 175, 55, 0.4)",
                                  backgroundColor: "rgba(212, 175, 55, 0.2)",
                                  color: "var(--gold-soft)",
                                  marginTop: "2px",
                                }}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <h3
                                  style={{
                                    fontFamily: "Cormorant Garamond, serif",
                                    fontSize: "1.4rem",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    color: "#FAF7F0",
                                    margin: 0,
                                  }}
                                >
                                  {fn.name}
                                </h3>
                                {fn.subtitle && (
                                  <p
                                    style={{
                                      fontFamily: "'Alex Brush', cursive",
                                      fontSize: "1.15rem",
                                      color: "var(--gold-soft)",
                                      margin: "2px 0 0 0",
                                      lineHeight: 1.1,
                                    }}
                                  >
                                    ({fn.subtitle})
                                  </p>
                                )}
                              </div>
                            </div>

                            <div style={{ flexShrink: 0, marginTop: "2px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "5px 12px",
                                  borderRadius: "9999px",
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.03em",
                                  whiteSpace: "nowrap",
                                  lineHeight: 1.2,
                                  backgroundColor: "var(--gold)",
                                  color: "var(--emerald-ink)",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                }}
                              >
                                {fn.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-6 space-y-4">
                          {/* Theme / Dress Code Card if specified */}
                          {fn.theme && (
                            <div className="bg-secondary/50 border border-gold/25 rounded-2xl p-3.5 shadow-xs">
                              <div className="flex items-center gap-2">
                                <IconShirt className="h-4 w-4 text-gold shrink-0" />
                                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gold uppercase">
                                  Theme / Dress Code:
                                </span>
                                <span className="text-foreground text-xs font-semibold">
                                  {fn.theme}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const weddingOverviewItems = [
  { icon: IconSparkles, label: "The Ceremony", value: WEDDING_DATA.muhurthamLabel },
  { icon: IconClock, label: "Day & Date", value: `${WEDDING_DATA.dateLabel}` },
  { icon: IconMapPin, label: "Venue", value: WEDDING_DATA.venue.name },
];

function CelebrationSection() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <FadeIn className="text-center">
          <SectionDivider label="Main Wedding" />
          <h2 className="text-primary mt-5 text-4xl font-light">
            The Celebration
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <p className="text-gold/80 text-[0.6rem] tracking-[0.45em] uppercase">
                Save the date
              </p>
              <p className="text-ivory font-display mt-2 text-5xl font-light">
                02 · 03
              </p>
              <p className="text-ivory/85 text-sm tracking-[0.35em] uppercase">
                December 2026
              </p>
              <p className="text-gold/90 text-xs tracking-[0.25em] uppercase mt-1 font-light">
                The Sacred Union · 07:30 AM
              </p>
            </div>
            <div className="divide-gold/15 divide-y">
              {weddingOverviewItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4">
                  <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                      {label}
                    </p>
                    <p className="text-foreground truncate text-sm font-medium">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pt-2 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={downloadIcsCalendar}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-4 text-xs tracking-[0.3em] uppercase font-medium cursor-pointer"
              >
                <IconCalendarPlus className="h-4 w-4" />
                Add to calendar
              </motion.button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="border-gold/30 bg-card shadow-luxe mt-6 overflow-hidden rounded-[2rem] border">
            <div className="relative">
              <img
                src="/images/map-preview.jpg"
                alt={`Map to ${WEDDING_DATA.venue.name}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-48 w-full object-cover"
              />
              <div className="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
            <div className="px-6 pt-3 pb-6 text-center">
              {/* Highlight Tagline */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary border border-gold/35 mb-3">
                <span className="text-gold font-semibold text-xs tracking-wider">
                  No hassle, all celebrations under one roof
                </span>
              </div>
              <p className="text-primary text-xl font-medium">
                {WEDDING_DATA.venue.name}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed max-w-xs mx-auto font-medium">
                {WEDDING_DATA.venue.address}
              </p>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={WEDDING_DATA.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <IconNavigation className="h-4 w-4" />
                Get directions
              </motion.a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="border-gold/30 bg-card/80 shadow-luxe mt-6 overflow-hidden rounded-[2rem] border p-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-gold mb-2">
              <IconPhone className="h-4 w-4" />
              <span className="text-[0.65rem] tracking-[0.35em] uppercase font-semibold">
                RSVP & Contacts
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Please feel free to connect with us for any assistance or travel guidance:
            </p>
            <div className="mt-5 space-y-2.5">
              {WEDDING_DATA.rsvps.map((rsvp) => (
                <div
                  key={rsvp.phone}
                  className="bg-secondary/60 hover:bg-secondary/90 border border-gold/30 text-foreground px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="text-left min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {rsvp.name}
                    </p>
                  </div>
                  <a
                    href={`tel:${rsvp.phone}`}
                    className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 shrink-0 border border-gold/25"
                  >
                    <IconPhone className="h-3 w-3 text-gold" />
                    {rsvp.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-emerald-ink relative overflow-hidden px-5 pt-20 pb-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('/images/mandala-texture.jpg')",
          backgroundSize: "120%",
          backgroundPosition: "top center",
        }}
      />
      <AuroraBackground intensity={0.5} />
      <div className="from-emerald-ink/70 via-emerald-ink/85 to-emerald-ink absolute inset-0 bg-gradient-to-b" />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -left-8 w-36 opacity-30"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -right-8 w-36 -scale-x-100 opacity-30"
      />
      <div className="relative mx-auto max-w-md text-center">
        <FadeIn>
          <SectionDivider label="With love" />
          <p className="font-script text-gold-foil mt-6 text-4xl leading-snug">
            Come bless our beginning
          </p>
          <p className="text-ivory/70 mx-auto mt-5 max-w-sm text-sm leading-relaxed">
            Your presence and blessings are our greatest gifts as we embark on this sacred journey of love and togetherness.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-9 flex flex-col items-center">
            <span className="rule-gold w-28" />
            <p className="text-ivory mt-6 text-3xl sm:text-4xl font-light" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
              {WEDDING_DATA.groom.name}{" "}
              <span className="text-gold" style={{ fontFamily: "'Alex Brush', cursive" }}>&</span>{" "}
              {WEDDING_DATA.bride.name}
            </p>
            <p className="text-ivory/50 mt-2 text-[0.65rem] tracking-[0.25em] uppercase">
              DECEMBER 2 & 3 · 2026 · WAKAD, PUNE
            </p>
          </div>
        </FadeIn>
        <p className="text-ivory/35 mt-12 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.3em] uppercase">
          Made with <IconHeart className="text-gold h-3 w-3 fill-current" /> for our families & friends
        </p>
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.35em] opacity-70">
        <Credit />
      </div>
    </footer>
  );
}

function EnvelopeOpener({ onOpen }) {
  const [opening, setOpening] = React.useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[-1, 1].map((direction) => (
        <motion.div
          key={direction}
          className="bg-emerald-ink absolute inset-y-0 w-[51%] overflow-hidden z-10"
          style={{ [direction === -1 ? "left" : "right"]: 0 }}
          animate={opening ? { x: `${direction * 105}%` } : { x: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <AuroraBackground intensity={0.55} />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/images/mandala-texture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: direction === -1 ? "right center" : "left center",
            }}
          />
          <div
            className="absolute inset-y-0 w-[2px]"
            style={{
              [direction === -1 ? "right" : "left"]: 0,
              background: "var(--gradient-gold)",
            }}
          />
        </motion.div>
      ))}
      <FloatingPetals count={10} />
      <AnimatePresence>
        {!opening && (
          <motion.div
            className="relative z-20 flex flex-col items-center px-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold/80 text-[0.55rem] tracking-[0.5em] uppercase">
              A wedding invitation
            </span>
            <h1 className="text-gold-foil mt-5 text-4xl sm:text-5xl leading-tight font-light" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
              {WEDDING_DATA.groom.name}
              <span className="text-gold/80 mx-2 text-2xl sm:text-3xl" style={{ fontFamily: "'Alex Brush', cursive" }}>&</span>
              {WEDDING_DATA.bride.name}
            </h1>
            <span className="rule-gold mt-6 w-32" />
            <motion.button
              onClick={() => {
                if (!opening) {
                  setOpening(true);
                  onOpen();
                }
              }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mt-12 grid h-28 w-28 place-items-center cursor-pointer select-none"
              aria-label="Open the invitation"
            >
              <motion.span
                className="border-gold/40 absolute inset-0 rounded-full border pointer-events-none"
                animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="shadow-gold grid h-20 w-20 place-items-center rounded-full pointer-events-none"
                style={{ backgroundImage: "var(--gradient-gold)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.4,
                  ease: "easeInOut",
                }}
              >
                <span className="font-medium text-emerald-ink text-2xl tracking-normal flex items-center justify-center" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                  <span>{WEDDING_DATA.groom.name[0]}</span>
                  <span className="text-base mx-0.5 opacity-75" style={{ fontFamily: "'Alex Brush', cursive" }}>&</span>
                  <span>{WEDDING_DATA.bride.name[0]}</span>
                </span>
              </motion.span>
            </motion.button>
            <motion.p
              className="text-ivory/60 mt-8 text-[0.6rem] tracking-[0.4em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left"
      style={{ scaleX: scale, backgroundImage: "var(--gradient-gold)" }}
    />
  );
}

function MusicPlayer({ shouldPlay, onToggle, isMuted }) {
  const playerRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const checkIntervalRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const pendingPlayRef = React.useRef(false);

  const START_TIME = 64; // 1:04 in seconds (64s)
  const END_TIME = 300;  // 5:00 in seconds (300s)

  const executePlay = (player) => {
    if (!player) return;
    try {
      if (typeof player.unMute === "function") {
        player.unMute();
      }
      if (typeof player.setVolume === "function") {
        player.setVolume(100);
      }
      if (typeof player.seekTo === "function") {
        const cur = player.getCurrentTime?.();
        if (cur === undefined || cur < START_TIME || cur >= END_TIME) {
          player.seekTo(START_TIME, true);
        }
      }
      if (typeof player.playVideo === "function") {
        player.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn("YouTube play attempt:", e);
    }
  };

  const safePlay = () => {
    pendingPlayRef.current = true;
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      executePlay(playerRef.current);
    }
  };

  React.useEffect(() => {
    // Expose direct trigger on window for immediate synchronous user gesture handling
    window.__playWeddingMusic = () => {
      safePlay();
    };

    // Ensure YouTube IFrame Player API is loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current || !window.YT || !window.YT.Player) return;
      try {
        playerRef.current = new window.YT.Player("youtube-audio-player", {
          height: "100%",
          width: "100%",
          videoId: "ehP54Fsk_4g",
          playerVars: {
            autoplay: 1,
            mute: 1, // Pre-buffer silently immediately so playback is instantaneous upon seal click
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: START_TIME,
          },
          events: {
            onReady: (event) => {
              try {
                // Seek to exactly 1:04 (64s)
                event.target.seekTo(START_TIME, true);
                if (pendingPlayRef.current || shouldPlay) {
                  executePlay(event.target);
                } else {
                  // Preload buffer silently then pause at 1:04
                  event.target.mute();
                  event.target.playVideo();
                  setTimeout(() => {
                    if (!pendingPlayRef.current) {
                      event.target.pauseVideo();
                      event.target.seekTo(START_TIME, true);
                    }
                  }, 800);
                }
              } catch (e) {
                console.warn(e);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                if (pendingPlayRef.current || shouldPlay) {
                  setIsPlaying(true);
                }
                if (!checkIntervalRef.current) {
                  checkIntervalRef.current = setInterval(() => {
                    try {
                      const current = playerRef.current?.getCurrentTime();
                      if (current !== undefined && (current >= END_TIME || current < START_TIME - 2)) {
                        playerRef.current.seekTo(START_TIME, true);
                      }
                    } catch (e) {
                      console.warn(e);
                    }
                  }, 400);
                }
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                if (event.data === window.YT.PlayerState.ENDED) {
                  playerRef.current?.seekTo(START_TIME, true);
                  playerRef.current?.playVideo();
                }
              }
            },
          },
        });
      } catch (err) {
        console.warn("Error creating YT Player:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === "function") prevReady();
        initPlayer();
      };
    }

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      try {
        playerRef.current?.destroy();
      } catch (e) {}
    };
  }, []);

  // Sync play/pause with shouldPlay and isMuted
  React.useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (shouldPlay && !isMuted) {
        safePlay();
      } else if (typeof playerRef.current.pauseVideo === "function") {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [shouldPlay, isMuted]);

  return (
    <>
      {/* Hidden YouTube IFrame */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          bottom: "-200px",
          right: "-200px",
          width: "200px",
          height: "200px",
          opacity: 0.001,
          pointerEvents: "none",
          zIndex: -50,
          overflow: "hidden",
        }}
      >
        <div id="youtube-audio-player" />
      </div>

      {/* Floating Audio Toggle Pill */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={onToggle}
        aria-label={isPlaying && !isMuted ? "Pause Wedding Song" : "Play Wedding Song"}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-3.5 py-2.5 shadow-gold backdrop-blur-md cursor-pointer border border-gold/40 text-gold bg-emerald-ink/90 transition-all select-none"
      >
        {isPlaying && !isMuted ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="flex items-center justify-center text-gold"
            >
              <IconMusic className="h-4 w-4" />
            </motion.span>
            <span className="text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-gold-soft hidden sm:inline">
              Music On
            </span>
            <IconVolume2 className="h-3.5 w-3.5 text-gold-soft" />
          </>
        ) : (
          <>
            <IconVolumeX className="h-4 w-4 text-ivory/70" />
            <span className="text-[0.68rem] tracking-[0.2em] uppercase font-medium text-ivory/70 hidden sm:inline">
              Play Music
            </span>
          </>
        )}
      </motion.button>
    </>
  );
}

export default function WeddingApp() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showOpener, setShowOpener] = React.useState(true);
  const [musicActive, setMusicActive] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    // 1. Immediately invoke music trigger directly inside user click handler
    try {
      if (typeof window.__playWeddingMusic === "function") {
        window.__playWeddingMusic();
      }
    } catch (e) {
      console.warn("Could not play on click:", e);
    }

    setMusicActive(true);
    setIsOpen(true);

    // Remove opener from DOM after the sliding doors finish parting
    window.setTimeout(() => setShowOpener(false), 1200);
  };

  const toggleMusic = () => {
    setMusicActive((prev) => !prev);
  };

  return (
    <Jsx.Fragment>
      {/* Music player mounted at root so it pre-initializes and handles click gesture instantly */}
      <MusicPlayer
        shouldPlay={isOpen && musicActive}
        isMuted={!musicActive}
        onToggle={toggleMusic}
      />
      <AnimatePresence>
        {showOpener && <EnvelopeOpener key="opener" onOpen={handleOpen} />}
      </AnimatePresence>
      {isOpen && <ScrollProgress />}
      <main className="bg-background mx-auto w-full max-w-[520px] overflow-hidden">
        <HeroSection />
        <CoupleSection />
        <CountdownSection />
        <FunctionsSection />
        <CelebrationSection />
        <FooterSection />
      </main>
    </Jsx.Fragment>
  );
}
