"use client";

import { useEffect, useMemo, useState } from "react";

type MoodId = "serene" | "nostalgic" | "uplifting" | "mystic";

type MoodDetail = {
  label: string;
  gradient: string;
  description: string;
  lexicon: [string, string, string, string];
  tagline: string;
};

const MOODS: Record<MoodId, MoodDetail> = {
  serene: {
    label: "Serene Glow",
    gradient: "from-sky-500/20 via-cyan-400/10 to-emerald-400/20",
    description: "Pastel pads, soft arpeggios, and steady breathing.",
    lexicon: ["hushed", "silken", "glowing", "gentle"],
    tagline: "slow-blooming auroras",
  },
  nostalgic: {
    label: "Nostalgic Rain",
    gradient: "from-amber-400/20 via-rose-500/20 to-indigo-600/30",
    description: "Retrowave drizzle soaked in sepia-toned memories.",
    lexicon: ["amber", "rain-specked", "tender", "faded"],
    tagline: "rain-lit memories",
  },
  uplifting: {
    label: "Uplifting Pulse",
    gradient: "from-emerald-400/30 via-sky-300/20 to-yellow-300/30",
    description: "Bright syncopation and hopeful leaps toward dawn.",
    lexicon: ["bright", "buoyant", "sparkling", "charged"],
    tagline: "sunrise crescendos",
  },
  mystic: {
    label: "Mystic Nocturne",
    gradient: "from-purple-500/30 via-fuchsia-500/20 to-slate-800/80",
    description: "Noir whispers, hovering drones, neon smoke.",
    lexicon: ["shadowed", "hypnotic", "neon", "celestial"],
    tagline: "moon-dyed reveries",
  },
};

type PerspectiveId = "first" | "second" | "collective";

type PerspectiveDetail = {
  label: string;
  subject: string;
  possessive: string;
  partnerPossessive: string;
  collective: string;
  duoLine: string;
};

const PERSPECTIVES: Record<PerspectiveId, PerspectiveDetail> = {
  first: {
    label: "I → You",
    subject: "I",
    possessive: "my",
    partnerPossessive: "your",
    collective: "us",
    duoLine: "You and I",
  },
  second: {
    label: "You → Me",
    subject: "You",
    possessive: "your",
    partnerPossessive: "my",
    collective: "us",
    duoLine: "You and I",
  },
  collective: {
    label: "We ↔ World",
    subject: "We",
    possessive: "our",
    partnerPossessive: "their",
    collective: "us",
    duoLine: "We",
  },
};

type SongSpec = {
  title: string;
  mood: MoodId;
  energy: number;
  complexity: number;
  perspective: PerspectiveId;
  setting: string;
  imagery: string;
  spark: string;
  hook: string;
};

type SongSection = {
  section: string;
  tagline: string;
  lines: string[];
};

const TITLE_SUGGESTIONS = [
  "Sochwave Skyline",
  "Echoes of Soch",
  "Soch Mein Safar",
  "Neon Soch Lullaby",
  "Soch ka Savera",
  "Orbiting Soch",
] as const;

const SETTING_SUGGESTIONS = [
  "midnight rooftops above Karachi",
  "a metro car sliding through dawn fog",
  "monsoon streets reflecting broken neon",
  "quiet terraces lined with bougainvillea",
  "desert winds humming beyond Lahore",
] as const;

const IMAGERY_SUGGESTIONS = [
  "silver threads of rain",
  "shadowed vinyl crackles",
  "lantern light caught in puddles",
  "constellations stitched from cassette tape",
  "firefly halos under overpasses",
] as const;

const SPARK_SUGGESTIONS = [
  "a whisper on the edge of sleep",
  "echoes from an unanswered call",
  "the tremor after letting go",
  "a promise scribbled in notebook margins",
  "the hush before the drop hits",
] as const;

const HOOK_SUGGESTIONS = [
  "Soch banegi sur, soch banegi savera",
  "Soch ki lehron pe, hum likhenge falak",
  "Soch ko dhadkan banao, Soch ko roshni",
  "Soch ki raah pe, dil chale nayi kahani",
  "Soch chale sitaron se bhi door",
] as const;

const DEFAULT_SPEC: SongSpec = {
  title: "Sochwave Skyline",
  mood: "nostalgic",
  energy: 62,
  complexity: 58,
  perspective: "first",
  setting: "midnight rooftops above Karachi",
  imagery: "silver threads of rain",
  spark: "a whisper on the edge of sleep",
  hook: "Soch banegi sur, soch banegi savera",
};

function describeTempo(energy: number) {
  if (energy < 30) return "slow-drifting";
  if (energy < 55) return "ember-steady";
  if (energy < 75) return "midnight-glide";
  if (energy < 90) return "starlit rush";
  return "comet-fire sprint";
}

function describeDynamics(complexity: number) {
  if (complexity < 30) return "minimal hush";
  if (complexity < 55) return "layered echoes";
  if (complexity < 75) return "syncopated swells";
  return "kaleidoscopic surges";
}

function describeContour(mood: MoodDetail, energy: number) {
  const tone = mood.lexicon[0];
  if (energy < 40) {
    return `${tone} drift`;
  }
  if (energy < 70) {
    return `${tone} bloom`;
  }
  return `${tone} blaze`;
}

function normalizeMotif(hook: string) {
  const trimmed = hook.trim();
  if (!trimmed) {
    return "Soch banegi sur, Soch banegi savera";
  }
  const hasSoch = trimmed.toLowerCase().includes("soch");
  return hasSoch ? trimmed : `Soch ${trimmed}`;
}

function composeSong(spec: SongSpec): SongSection[] {
  const mood = MOODS[spec.mood];
  const perspective = PERSPECTIVES[spec.perspective];
  const tempoDescriptor = describeTempo(spec.energy);
  const dynamicDescriptor = describeDynamics(spec.complexity);
  const contourDescriptor = describeContour(mood, spec.energy);
  const setting = spec.setting.trim() || "open midnight skies";
  const imagery = spec.imagery.trim() || "neon droplets hanging in air";
  const spark = spec.spark.trim() || "a hush between fast heartbeats";
  const motif = normalizeMotif(spec.hook);
  const title = spec.title.trim() || "Untitled Soch";

  const verseOne: SongSection = {
    section: "Verse I",
    tagline: "Soch sketches the night",
    lines: [
      `${perspective.subject} trace ${setting} with Soch, ${mood.lexicon[0]} sketches against the dusk.`,
      `Thoughts flow in ${tempoDescriptor} patterns, painting ${imagery} across the skyline.`,
      `Every breath keeps ${spark} tucked beneath ${perspective.possessive} ribs.`,
      `Soch whispers "${motif}" into ${mood.tagline}.`,
    ],
  };

  const preChorus: SongSection = {
    section: "Pre-Chorus",
    tagline: "The pulse gathers",
    lines: [
      `Let the ${dynamicDescriptor} rise, Soch counting sparks in steady sync.`,
      `${perspective.subject} feel ${mood.lexicon[2]} tremors waking in the dark.`,
      `Together we cup ${spark} like ${mood.lexicon[1]} lanterns.`,
      `Hold the breath before the spill of light.`,
    ],
  };

  const chorus: SongSection = {
    section: "Chorus",
    tagline: "Soch becomes anthem",
    lines: [
      `Soch anthem: ${motif}.`,
      `Orbit ${mood.tagline} with hearts in ${tempoDescriptor} motion.`,
      `${perspective.duoLine} ride the ${tempoDescriptor} tide.`,
      `${title} keeps calling from ${setting}.`,
    ],
  };

  const verseTwo: SongSection = {
    section: "Verse II",
    tagline: "Memory loops and climbs",
    lines: [
      `Loop ${imagery} through ${dynamicDescriptor}, let echoes shimmer long.`,
      `${perspective.subject} stitch ${spark} into verses floating toward tomorrow.`,
      `Soch redraws horizons in ${mood.lexicon[3]} gradients.`,
      `We drift in ${contourDescriptor}, never losing the trail.`,
    ],
  };

  const bridge: SongSection = {
    section: "Bridge",
    tagline: "Thought becomes fire",
    lines: [
      `Soch samples starlight, bending it into ${dynamicDescriptor} waves.`,
      `${perspective.subject} release ${mood.lexicon[1]} vows into the humid air.`,
      `The city exhales, gifting back ${spark}.`,
      `Between beats, Soch scripts a dawn directive.`,
    ],
  };

  const outro: SongSection = {
    section: "Outro",
    tagline: "Echoes stay luminous",
    lines: [
      `Let Soch fade to ${mood.lexicon[0]} static, still warm on the palms.`,
      `Leave ${setting} glowing for ${perspective.collective}.`,
      `Repeat: ${motif}.`,
    ],
  };

  return [verseOne, preChorus, chorus, verseTwo, bridge, chorus, outro];
}

function sectionsToText(sections: SongSection[]) {
  return sections
    .map((section) => {
      const heading = `${section.section} — ${section.tagline}`;
      const body = section.lines.join("\n");
      return `${heading}\n${body}`;
    })
    .join("\n\n");
}

function randomPick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const [title, setTitle] = useState(DEFAULT_SPEC.title);
  const [mood, setMood] = useState<MoodId>(DEFAULT_SPEC.mood);
  const [energy, setEnergy] = useState(DEFAULT_SPEC.energy);
  const [complexity, setComplexity] = useState(DEFAULT_SPEC.complexity);
  const [perspective, setPerspective] = useState<PerspectiveId>(
    DEFAULT_SPEC.perspective,
  );
  const [setting, setSetting] = useState(DEFAULT_SPEC.setting);
  const [imagery, setImagery] = useState(DEFAULT_SPEC.imagery);
  const [spark, setSpark] = useState(DEFAULT_SPEC.spark);
  const [hook, setHook] = useState(DEFAULT_SPEC.hook);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const spec = useMemo<SongSpec>(
    () => ({
      title,
      mood,
      energy,
      complexity,
      perspective,
      setting,
      imagery,
      spark,
      hook,
    }),
    [title, mood, energy, complexity, perspective, setting, imagery, spark, hook],
  );

  const moodDetail = MOODS[mood];
  const perspectiveDetail = PERSPECTIVES[perspective];
  const sections = useMemo(() => composeSong(spec), [spec]);
  const songText = useMemo(() => sectionsToText(sections), [sections]);

  const bpm = useMemo(() => {
    const base = 78;
    const swing = (energy - 50) * 1.2;
    const value = Math.round(base + swing);
    return Math.min(Math.max(value, 58), 132);
  }, [energy]);

  useEffect(() => {
    if (copyState === "copied") {
      const timer = setTimeout(() => setCopyState("idle"), 2000);
      return () => clearTimeout(timer);
    }
    if (copyState === "error") {
      const timer = setTimeout(() => setCopyState("idle"), 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [copyState]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(songText);
      setCopyState("copied");
    } catch (error) {
      console.error("Unable to copy lyrics", error);
      setCopyState("error");
    }
  };

  const handleRandomize = () => {
    const nextMood = randomPick(Object.keys(MOODS) as MoodId[]);
    const nextPerspective = randomPick(
      Object.keys(PERSPECTIVES) as PerspectiveId[],
    );
    setTitle(randomPick(TITLE_SUGGESTIONS));
    setMood(nextMood);
    setEnergy(randomInRange(28, 92));
    setComplexity(randomInRange(25, 88));
    setPerspective(nextPerspective);
    setSetting(randomPick(SETTING_SUGGESTIONS));
    setImagery(randomPick(IMAGERY_SUGGESTIONS));
    setSpark(randomPick(SPARK_SUGGESTIONS));
    setHook(randomPick(HOOK_SUGGESTIONS));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:px-10 lg:px-12">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-8 pb-12 pt-14 shadow-2xl sm:px-12">
          <div
            className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${moodDetail.gradient} blur-3xl opacity-60`}
          />
          <div className="relative flex flex-col gap-6">
            <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-slate-100/80">
              <span>SochSong Studio</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Craft a Soch-infused song in real time
            </h1>
            <p className="max-w-2xl text-lg text-slate-200/90">
              Sculpt verses, choruses, and bridges that orbit around Soch. Dial
              in mood, energy, and imagery to watch the lyrics bloom instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleRandomize}
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/20"
              >
                Shuffle Vibe
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                {copyState === "copied"
                  ? "Lyrics Copied!"
                  : copyState === "error"
                    ? "Clipboard Blocked"
                    : "Copy Lyrics"}
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          <form className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300">
                Song Title
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-slate-950"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Sochwave Skyline"
              />
            </div>

            <div className="grid gap-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Mood Palette
              </span>
              <div className="grid grid-cols-1 gap-3">
                {(Object.entries(MOODS) as [MoodId, MoodDetail][]).map(
                  ([key, detail]) => (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${mood === key ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}`}
                    >
                      <input
                        type="radio"
                        name="mood"
                        value={key}
                        checked={mood === key}
                        onChange={() => setMood(key)}
                        className="mt-1"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {detail.label}
                        </p>
                        <p className="text-sm text-slate-300/80">
                          {detail.description}
                        </p>
                      </div>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-6">
              <div>
                <label className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-slate-300">
                  <span>Energy / Tempo</span>
                  <span className="text-xs text-slate-400">
                    {energy} · {describeTempo(energy)}
                  </span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={energy}
                  onChange={(event) => setEnergy(Number(event.target.value))}
                  className="mt-3 w-full accent-cyan-300"
                />
              </div>
              <div>
                <label className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-slate-300">
                  <span>Arrangement Depth</span>
                  <span className="text-xs text-slate-400">
                    {complexity} · {describeDynamics(complexity)}
                  </span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={complexity}
                  onChange={(event) =>
                    setComplexity(Number(event.target.value))
                  }
                  className="mt-3 w-full accent-fuchsia-300"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold uppercase tracking-wider text-slate-300">
                Narrative Perspective
              </span>
              <div className="mt-3 grid gap-3">
                {(Object.entries(PERSPECTIVES) as [PerspectiveId, PerspectiveDetail][]).map(
                  ([key, detail]) => (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition ${perspective === key ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}`}
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {detail.label}
                        </p>
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                          {detail.subject} voice
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="perspective"
                        value={key}
                        checked={perspective === key}
                        onChange={() => setPerspective(key)}
                        className="h-4 w-4"
                      />
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-5">
              <TextInputArea
                label="Setting"
                value={setting}
                onChange={setSetting}
                placeholder="midnight rooftops above Karachi"
              />
              <TextInputArea
                label="Imagery"
                value={imagery}
                onChange={setImagery}
                placeholder="silver threads of rain"
              />
              <TextInputArea
                label="Spark / Memory"
                value={spark}
                onChange={setSpark}
                placeholder="a whisper on the edge of sleep"
              />
              <TextInputArea
                label="Hook Phrase"
                value={hook}
                onChange={setHook}
                placeholder="Soch banegi sur, soch banegi savera"
              />
            </div>
          </form>

          <section className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${moodDetail.gradient} opacity-30`}
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h2 className="text-3xl font-semibold text-white">
                    {title || "Untitled Soch"}
                  </h2>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200">
                    {moodDetail.label}
                  </span>
                </div>
                <p className="text-sm text-slate-200/80">
                  {moodDetail.description}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoChip
                    label="Tempo"
                    value={`${bpm} BPM`}
                    hint={describeTempo(energy)}
                  />
                  <InfoChip
                    label="Arrangement"
                    value={describeDynamics(complexity)}
                    hint={`${complexity}/100 depth`}
                  />
                  <InfoChip
                    label="Perspective"
                    value={perspectiveDetail.label}
                    hint={`${perspectiveDetail.subject} voice`}
                  />
                  <InfoChip
                    label="Orbit"
                    value={moodDetail.tagline}
                    hint="Soch keeps the center"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-xl">
              {sections.map((section, index) => (
                <article
                  key={`${section.section}-${index}`}
                  className="space-y-2 rounded-2xl border border-white/5 bg-slate-950/40 p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {section.section}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      {section.tagline}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm leading-6 text-slate-100/90">
                    {section.lines.map((line, lineIndex) => (
                      <li key={`${section.section}-${lineIndex}`}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

type TextInputAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function TextInputArea({
  label,
  value,
  onChange,
  placeholder,
}: TextInputAreaProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={2}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-slate-950"
      />
    </label>
  );
}

type InfoChipProps = {
  label: string;
  value: string;
  hint?: string;
};

function InfoChip({ label, value, hint }: InfoChipProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        {label}
      </span>
      <span className="text-base font-medium text-white">{value}</span>
      {hint ? (
        <span className="text-xs text-slate-300/80">{hint}</span>
      ) : null}
    </div>
  );
}
