import React, { useEffect, useRef } from "react";
import { TreeSpecimen } from "../use-tree-theme";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "history",
  "education",
  "awards",
  "contact",
] as const;

type SceneTone =
  | "barkCrevice"
  | "barkDeep"
  | "bark"
  | "barkLight"
  | "moss"
  | "leafDeep"
  | "leaf"
  | "gold"
  | "coral"
  | "rose"
  | "violet"
  | "sky"
  | "lantern"
  | "lanternCore"
  | "rune"
  | "runeGlow"
  | "forestFar"
  | "aurora"
  | "waterfall"
  | "spore"
  | "ambient";

type Palette = Record<SceneTone, string>;

type SectionAnchor = {
  top: number;
  height: number;
  side: "left" | "right";
  index: number;
};

type CurvePoints = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

// Color mapping definitions for offscreen raster scene
const SCENE_TONES: Record<SceneTone, { css: string; rgb: [number, number, number] }> = {
  barkCrevice: { css: "rgb(18, 14, 10)", rgb: [18, 14, 10] },
  barkDeep: { css: "rgb(58, 40, 28)", rgb: [58, 40, 28] },
  bark: { css: "rgb(138, 94, 58)", rgb: [138, 94, 58] },
  barkLight: { css: "rgb(212, 164, 106)", rgb: [212, 164, 106] },
  moss: { css: "rgb(26, 122, 64)", rgb: [26, 122, 64] },
  leafDeep: { css: "rgb(16, 90, 44)", rgb: [16, 90, 44] },
  leaf: { css: "rgb(40, 214, 108)", rgb: [40, 214, 108] },
  gold: { css: "rgb(245, 192, 44)", rgb: [245, 192, 44] },
  coral: { css: "rgb(238, 86, 48)", rgb: [238, 86, 48] },
  rose: { css: "rgb(224, 64, 142)", rgb: [224, 64, 142] },
  violet: { css: "rgb(142, 88, 242)", rgb: [142, 88, 242] },
  sky: { css: "rgb(54, 186, 246)", rgb: [54, 186, 246] },
  lantern: { css: "rgb(251, 160, 24)", rgb: [251, 160, 24] },
  lanternCore: { css: "rgb(255, 248, 216)", rgb: [255, 248, 216] },
  rune: { css: "rgb(32, 208, 236)", rgb: [32, 208, 236] },
  runeGlow: { css: "rgb(12, 162, 230)", rgb: [12, 162, 230] },
  forestFar: { css: "rgb(52, 74, 66)", rgb: [52, 74, 66] },
  aurora: { css: "rgb(42, 140, 156)", rgb: [42, 140, 156] },
  waterfall: { css: "rgb(175, 232, 248)", rgb: [175, 232, 248] },
  spore: { css: "rgb(186, 202, 196)", rgb: [186, 202, 196] },
  ambient: { css: "rgb(82, 102, 92)", rgb: [82, 102, 92] },
};

const CANOPY_TONES: SceneTone[] = ["moss", "leaf", "gold", "sky", "violet", "rose", "coral"];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / Math.max(0.0001, end - start));
  return progress * progress * (3 - 2 * progress);
};

const seeded = (seed: number) => {
  const value = Math.sin(seed * 91.73 + 17.19) * 43758.5453;
  return value - Math.floor(value);
};

const AsciiTreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const scene = document.createElement("canvas");
    const sceneContext = scene.getContext("2d", { willReadFrequently: true });
    if (!sceneContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let density = Math.min(2, window.devicePixelRatio || 1);

    // High-Density Monospace Grid (~2.5x higher resolution)
    let cellWidth = width <= 680 ? 4.2 : 3.8;
    let cellHeight = width <= 680 ? 7.2 : 6.8;
    let columns = Math.ceil(width / cellWidth);
    let rows = Math.ceil(height / cellHeight);

    let animationFrame: number | null = null;
    let lastFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let sectionAnchors: SectionAnchor[] = [];
    let isDark = document.documentElement.classList.contains("dark");
    let currentSpecimen: TreeSpecimen =
      (document.documentElement.getAttribute("data-tree-specimen") as TreeSpecimen) ||
      "spirit-oak";

    let palette: Palette = {
      barkCrevice: "#181510",
      barkDeep: "#38342c",
      bark: "#5c574c",
      barkLight: "#878172",
      moss: "#2b7548",
      leafDeep: "#1a5c36",
      leaf: "#22c55e",
      gold: "#c98816",
      coral: "#cf533c",
      rose: "#b64573",
      violet: "#6b5594",
      sky: "#3b7e9e",
      lantern: "#fbbf24",
      lanternCore: "#fffbeb",
      rune: "#38bdf8",
      runeGlow: "#0284c7",
      forestFar: "#334155",
      aurora: "#0ea5e9",
      waterfall: "#a5f3fc",
      spore: "#7e8781",
      ambient: "#597564",
    };

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      const token = (name: string, fallback: string) =>
        styles.getPropertyValue(name).trim() || fallback;
      isDark = document.documentElement.classList.contains("dark");
      currentSpecimen =
        (document.documentElement.getAttribute("data-tree-specimen") as TreeSpecimen) ||
        "spirit-oak";

      palette = {
        barkCrevice: token("--tree-crevice", palette.barkCrevice),
        barkDeep: token("--bark-deep", palette.barkDeep),
        bark: token("--bark", palette.bark),
        barkLight: token("--bark-light", palette.barkLight),
        moss: token("--tree-moss", palette.moss),
        leafDeep: token("--growth-muted", palette.leafDeep),
        leaf: token("--growth-bright", palette.leaf),
        gold: token("--tree-gold", palette.gold),
        coral: token("--tree-coral", palette.coral),
        rose: token("--tree-rose", palette.rose),
        violet: token("--tree-violet", palette.violet),
        sky: token("--tree-sky", palette.sky),
        lantern: token("--tree-lantern", palette.lantern),
        lanternCore: token("--tree-lantern-core", palette.lanternCore),
        rune: token("--tree-rune", palette.rune),
        runeGlow: token("--tree-rune-glow", palette.runeGlow),
        forestFar: token("--tree-forest-far", palette.forestFar),
        aurora: token("--tree-sky", palette.aurora),
        waterfall: token("--tree-sky", palette.waterfall),
        spore: token("--tree-spore", palette.spore),
        ambient: token("--ink-faint", palette.ambient),
      };
    };

    const measureSections = () => {
      const scrollTop = window.scrollY;
      sectionAnchors = SECTION_IDS.flatMap((id, index) => {
        const section = document.getElementById(id);
        if (!section) return [];
        const bounds = section.getBoundingClientRect();
        return [
          {
            top: bounds.top + scrollTop,
            height: bounds.height,
            side: section.dataset.treeSide === "right" ? "right" : "left",
            index,
          },
        ];
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      density = Math.min(2, window.devicePixelRatio || 1);
      cellWidth = width <= 680 ? 4.2 : 3.8;
      cellHeight = width <= 680 ? 7.2 : 6.8;
      columns = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / cellHeight);

      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      context.textAlign = "center";
      context.textBaseline = "middle";
      scene.width = columns;
      scene.height = rows;
      measureSections();
      readPalette();
    };

    const drawCurve = (
      points: CurvePoints,
      tone: SceneTone,
      lineWidth: number,
      alpha = 1,
      progress = 1,
    ) => {
      const visibleProgress = clamp(progress);
      if (alpha <= 0.01 || visibleProgress <= 0.01) return;

      sceneContext.globalAlpha = alpha;
      sceneContext.strokeStyle = SCENE_TONES[tone].css;
      sceneContext.lineWidth = lineWidth;
      sceneContext.lineCap = "round";
      sceneContext.lineJoin = "round";

      if (visibleProgress < 0.995) {
        const distances = [0, 2, 4].reduce((total, index) => {
          const x = points[index + 2] - points[index];
          const y = points[index + 3] - points[index + 1];
          return total + Math.hypot(x, y);
        }, 0);
        sceneContext.setLineDash([
          Math.max(0.25, distances * visibleProgress),
          distances + 2,
        ]);
      }

      sceneContext.beginPath();
      sceneContext.moveTo(points[0], points[1]);
      sceneContext.bezierCurveTo(
        points[2],
        points[3],
        points[4],
        points[5],
        points[6],
        points[7],
      );
      sceneContext.stroke();
      sceneContext.setLineDash([]);
      sceneContext.globalAlpha = 1;
    };

    // Tiered Cloud-Canopy Clump
    const drawCloudCanopy = (
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
      primaryTone: SceneTone,
      accentTone: SceneTone,
      seed: number,
      wind: number,
      alpha: number,
      growth: number,
    ) => {
      const scale = smoothstep(0.18, 0.95, growth);
      if (scale <= 0.01) return;

      // Base shadow layer
      sceneContext.fillStyle = SCENE_TONES.leafDeep.css;
      sceneContext.globalAlpha = alpha * 0.68;
      sceneContext.beginPath();
      sceneContext.ellipse(x + wind * 0.4, y + radiusY * 0.25, radiusX * 0.9 * scale, radiusY * 0.6 * scale, 0, 0, Math.PI * 2);
      sceneContext.fill();

      // Multi-Lobe Tiered Cloud
      const lobeCount = 24;
      for (let i = 0; i < lobeCount; i += 1) {
        const angle = seeded(seed + i * 4.3) * Math.PI * 2;
        const dist = Math.sqrt(seeded(seed + i * 7.7));
        const lobeX = x + Math.cos(angle) * radiusX * dist + wind * (0.15 + i * 0.01);
        const lobeY = y + Math.sin(angle) * radiusY * 0.6 * dist;
        const rx = radiusX * (0.2 + seeded(seed + i * 11.1) * 0.26) * scale;
        const ry = radiusY * (0.16 + seeded(seed + i * 13.5) * 0.22) * scale;

        const isHighlight = lobeY < y - radiusY * 0.08 && seeded(seed + i * 9.1) > 0.4;
        const isAccent = seeded(seed + i * 17.3) > 0.72;
        const tone = isAccent ? accentTone : isHighlight ? "leaf" : primaryTone;

        sceneContext.fillStyle = SCENE_TONES[tone].css;
        sceneContext.globalAlpha = alpha * (0.5 + seeded(seed + i * 5.7) * 0.44);
        sceneContext.beginPath();
        sceneContext.ellipse(lobeX, lobeY, Math.max(1.0, rx), Math.max(0.8, ry), angle * 0.2, 0, Math.PI * 2);
        sceneContext.fill();
      }

      // Hanging Moss Tendrils beneath the cloud shelf
      const tendrilCount = 7;
      sceneContext.strokeStyle = SCENE_TONES.moss.css;
      sceneContext.lineWidth = 1.0;
      for (let j = 0; j < tendrilCount; j += 1) {
        const tx = x - radiusX * 0.55 + (radiusX * 1.1 * j) / (tendrilCount - 1);
        const ty = y + radiusY * 0.3 + seeded(seed + j * 19) * radiusY * 0.16;
        const tlen = (radiusY * 0.35 + seeded(seed + j * 23) * radiusY * 0.5) * scale;
        sceneContext.globalAlpha = alpha * (0.35 + seeded(seed + j * 31) * 0.35);
        sceneContext.beginPath();
        sceneContext.moveTo(tx, ty);
        sceneContext.quadraticCurveTo(tx + wind * 0.5 + (seeded(seed + j) - 0.5) * 3.5, ty + tlen * 0.5, tx + wind * 0.9, ty + tlen);
        sceneContext.stroke();
      }
      sceneContext.globalAlpha = 1;
    };

    // Glowing Lantern / Bioluminescent Rune Orb
    const drawLantern = (
      x: number,
      y: number,
      radius: number,
      wind: number,
      alpha: number,
      isRune = false,
      time = 0,
    ) => {
      const pulse = 0.82 + Math.sin(time * 0.002 + x * 0.05 + y * 0.05) * 0.18;
      const lx = x + wind * 0.7;
      const ly = y;

      // Hanging cord for lanterns
      if (!isRune) {
        sceneContext.strokeStyle = SCENE_TONES.barkCrevice.css;
        sceneContext.lineWidth = 0.75;
        sceneContext.globalAlpha = alpha * 0.65;
        sceneContext.beginPath();
        sceneContext.moveTo(lx, ly - radius * 2.8);
        sceneContext.lineTo(lx, ly - radius * 0.7);
        sceneContext.stroke();
      }

      // Outer Glow Halo
      sceneContext.fillStyle = isRune ? SCENE_TONES.runeGlow.css : SCENE_TONES.lantern.css;
      sceneContext.globalAlpha = alpha * (isRune ? 0.34 : 0.28) * pulse;
      sceneContext.beginPath();
      sceneContext.arc(lx, ly, radius * (isRune ? 2.6 : 3.2), 0, Math.PI * 2);
      sceneContext.fill();

      // Mid Glow
      sceneContext.fillStyle = isRune ? SCENE_TONES.rune.css : SCENE_TONES.lantern.css;
      sceneContext.globalAlpha = alpha * (isRune ? 0.74 : 0.82) * pulse;
      sceneContext.beginPath();
      sceneContext.arc(lx, ly, radius * 1.25, 0, Math.PI * 2);
      sceneContext.fill();

      // White-hot core
      sceneContext.fillStyle = isRune ? SCENE_TONES.rune.css : SCENE_TONES.lanternCore.css;
      sceneContext.globalAlpha = alpha * 0.96;
      sceneContext.beginPath();
      sceneContext.arc(lx, ly, Math.max(0.7, radius * 0.6), 0, Math.PI * 2);
      sceneContext.fill();
      sceneContext.globalAlpha = 1;
    };

    // Deep Atmospheric Background Layer with Specimen-Specific Particles
    const drawAtmosphere = (time: number, wind: number, fade: number) => {
      // 1. Aurora / Celestial Sky Haze
      sceneContext.fillStyle = SCENE_TONES.aurora.css;
      const skyGlows = [
        [0.70, 0.10, 48, 0.12],
        [0.32, 0.08, 36, 0.09],
        [0.88, 0.22, 42, 0.11],
        [0.15, 0.18, 32, 0.08],
      ];
      skyGlows.forEach(([gx, gy, gr, ga]) => {
        sceneContext.globalAlpha = fade * ga * (isDark ? 1.0 : 0.65);
        sceneContext.beginPath();
        sceneContext.arc(columns * gx, rows * gy, gr, 0, Math.PI * 2);
        sceneContext.fill();
      });

      // 2. Distant Forest Silhouettes
      sceneContext.fillStyle = SCENE_TONES.forestFar.css;
      const treeCount = 28;
      for (let i = 0; i < treeCount; i += 1) {
        const tx = columns * (0.01 + (i / (treeCount - 1)) * 0.98);
        const th = rows * (0.16 + seeded(i * 13 + 5) * 0.24);
        const ty = rows * 0.54 + seeded(i * 17 + 2) * rows * 0.16;
        const tw = 5 + seeded(i * 29) * 7;
        sceneContext.globalAlpha = fade * (isDark ? 0.09 : 0.06) * (0.6 + seeded(i * 31) * 0.4);

        sceneContext.beginPath();
        sceneContext.moveTo(tx, ty - th);
        sceneContext.lineTo(tx + tw, ty);
        sceneContext.lineTo(tx - tw, ty);
        sceneContext.closePath();
        sceneContext.fill();
      }

      // 3. Subtle background grid coordinates
      sceneContext.fillStyle = SCENE_TONES.ambient.css;
      const gridStep = 24;
      for (let x = 12; x < columns; x += gridStep) {
        for (let y = 10; y < rows; y += gridStep) {
          const tickAlpha = 0.024 + Math.sin(time * 0.0005 + x * 0.08 + y * 0.06) * 0.01;
          sceneContext.globalAlpha = fade * tickAlpha;
          sceneContext.beginPath();
          sceneContext.arc(x, y, 0.4, 0, Math.PI * 2);
          sceneContext.fill();
        }
      }

      // 4. Waterfall & Cascading River Spray at Base
      const waterfalls = [
        [0.44, 0.88, 22],
        [0.88, 0.86, 18],
        [0.65, 0.94, 26],
      ];
      sceneContext.fillStyle = SCENE_TONES.waterfall.css;
      waterfalls.forEach(([wfxScale, wfyScale, spread]) => {
        const wfx = columns * (width <= 680 ? wfxScale * 0.8 : wfxScale);
        const wfy = rows * wfyScale;
        for (let w = 0; w < 12; w += 1) {
          const wx = wfx + (seeded(w * 17 + spread) - 0.5) * spread;
          const wy = wfy + seeded(w * 23 + spread) * rows * 0.14;
          const wr = 1.0 + seeded(w * 31 + spread) * 3.2;
          sceneContext.globalAlpha = fade * (0.07 + seeded(w * 43) * 0.16) * (isDark ? 1.0 : 0.8);
          sceneContext.beginPath();
          sceneContext.ellipse(wx, wy, wr * 1.6, wr * 0.7, 0, 0, Math.PI * 2);
          sceneContext.fill();
        }
      });

      // 5. Specimen-Specific Particle Shaders (Spores vs Sakura Petals vs Cyber Sparks vs Ginkgo Leaves)
      const particleTone =
        currentSpecimen === "sakura"
          ? "rose"
          : currentSpecimen === "bio-cypress"
          ? "sky"
          : currentSpecimen === "ginkgo"
          ? "gold"
          : "spore";

      sceneContext.fillStyle = SCENE_TONES[particleTone].css;
      const particleCount = 110;
      for (let index = 0; index < particleCount; index += 1) {
        const originX = columns * (0.01 + seeded(index + 3) * 0.98);
        const originY = rows * seeded(index + 15);

        // Specimen-Specific Particle Motion
        let x = originX;
        let y = originY;
        if (currentSpecimen === "sakura") {
          // Drifting sakura petal flutter with gentle horizontal gusts
          const sway = Math.sin(time * 0.0006 + index * 2.1) * (4.5 + seeded(index * 7) * 5.0);
          x = originX + sway + wind * 1.2;
          y = (originY + time * (0.00022 + seeded(index + 45) * 0.00015)) % (rows + 12) - 6;
        } else if (currentSpecimen === "bio-cypress") {
          // Rapid vertical cyber spark flutter
          const jitter = (seeded(index * 99 + Math.floor(time * 0.003)) - 0.5) * 1.8;
          x = originX + jitter + wind * 0.4;
          y = (originY - time * 0.00018) % (rows + 8);
          if (y < 0) y += rows + 8;
        } else if (currentSpecimen === "ginkgo") {
          // Swaying falling autumn ginkgo leaf
          const swing = Math.sin(time * 0.00045 + index * 1.5) * 6.0;
          x = originX + swing + wind * 0.8;
          y = (originY + time * 0.00018) % (rows + 10) - 5;
        } else {
          // Default Spirit Oak Spores
          const drift = Math.sin(time * 0.00028 + index * 1.7) * (2.2 + seeded(index + 25) * 3.4);
          x = originX + drift + wind * 0.65;
          y = (originY + time * (0.00015 + seeded(index + 45) * 0.00009)) % (rows + 8) - 4;
        }

        sceneContext.globalAlpha = fade * (0.12 + seeded(index + 55) * 0.42);
        sceneContext.beginPath();
        sceneContext.arc(x, y, 0.25 + seeded(index + 65) * 0.45, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    // Draw Monumental Cathedral Spirit Tree
    const drawHeroSpiritTree = (time: number, scrollTop: number) => {
      const fade = 1;
      const compact = width <= 680;
      const scrollGrowth = smoothstep(0, height * 0.8, scrollTop);
      const growth = 0.92 + scrollGrowth * 0.08;
      const wind =
        Math.sin(time * 0.00045) * (compact ? 0.8 : 1.4) +
        Math.sin(time * 0.00022 + 1.8) * 0.7 +
        pointerX * (compact ? 0.5 : 1.3) +
        pointerY * 0.22;

      const baseX = columns * (compact ? 0.74 : 0.70);
      const baseY = rows * 1.15;
      const forkX = columns * (compact ? 0.72 : 0.67);
      const forkY = rows * 0.42;

      drawAtmosphere(time, wind, fade);

      // Sprawling Buttressed Cathedral Roots at Base (spanning x=0.38 to x=0.98)
      const buttressRoots: Array<[number, number, number, SceneTone, number]> = [
        [-46, -26, 7.5, "barkDeep", 0.38],
        [-34, -18, 8.2, "moss", 0.42],
        [-24, -12, 9.0, "bark", 0.46],
        [-14, -6, 9.5, "barkLight", 0.48],
        [14, 6, 9.5, "barkLight", 0.48],
        [24, 12, 9.0, "bark", 0.46],
        [36, 20, 8.5, "moss", 0.42],
        [48, 28, 7.8, "barkDeep", 0.38],
        [60, 36, 6.8, "barkDeep", 0.34],
      ];

      buttressRoots.forEach(([baseOffset, midOffset, rWidth, rTone, growthThresh]) => {
        const x0 = baseX + (compact ? baseOffset * 0.55 : baseOffset);
        const x1 = columns * 0.70 + (compact ? midOffset * 0.55 : midOffset);
        const x2 = forkX + (compact ? baseOffset * 0.15 : baseOffset * 0.22);
        const curve: CurvePoints = [x0, baseY, x1, rows * 0.85, x2, rows * 0.62, forkX, forkY];
        drawCurve(curve, rTone, compact ? rWidth * 0.65 : rWidth, fade * 0.96, smoothstep(0.01, growthThresh, growth));
      });

      // 12 Braided Trunk Pillars with Gnarled Bark Striations
      const trunkPillars: Array<{ dx: number; bend: number; tone: SceneTone; width: number; tone2: SceneTone }> = [
        { dx: -28, bend: -14, tone: "moss", width: 6.2, tone2: "barkDeep" },
        { dx: -21, bend: -9, tone: "barkDeep", width: 6.8, tone2: "bark" },
        { dx: -15, bend: -6, tone: "bark", width: 7.2, tone2: "barkLight" },
        { dx: -9, bend: -3, tone: "barkLight", width: 6.8, tone2: "bark" },
        { dx: -3, bend: 0, tone: "barkCrevice", width: 6.0, tone2: "barkDeep" },
        { dx: 3, bend: 2, tone: "barkCrevice", width: 6.0, tone2: "barkDeep" },
        { dx: 9, bend: 4, tone: "barkLight", width: 7.0, tone2: "bark" },
        { dx: 15, bend: 8, tone: "bark", width: 7.4, tone2: "barkDeep" },
        { dx: 22, bend: 13, tone: "barkDeep", width: 7.0, tone2: "moss" },
        { dx: 29, bend: 18, tone: "moss", width: 6.4, tone2: "barkDeep" },
        { dx: 36, bend: 24, tone: "barkDeep", width: 5.8, tone2: "bark" },
      ];

      trunkPillars.forEach((p) => {
        const x0 = baseX + (compact ? p.dx * 0.55 : p.dx);
        const x1 = columns * 0.69 + (compact ? p.bend * 0.55 : p.bend);
        const x2 = columns * 0.72 + (compact ? p.dx * 0.35 : p.dx * 0.45);
        const x3 = forkX + (compact ? p.dx * 0.22 : p.dx * 0.32);

        const curve: CurvePoints = [x0, baseY, x1, rows * 0.86, x2, rows * 0.64, x3, forkY];
        drawCurve(curve, p.tone, compact ? p.width * 0.65 : p.width, fade * 0.96, smoothstep(0.02, 0.46, growth));
        drawCurve(
          [curve[0] + 1, curve[1], curve[2] + 0.5, curve[3], curve[4] + 1, curve[5], curve[6] + 0.5, curve[7]],
          p.tone2,
          compact ? p.width * 0.3 : p.width * 0.38,
          fade * 0.85,
          smoothstep(0.04, 0.5, growth),
        );
      });

      // Climbing Spiraling Vines
      const vineCurves: Array<[CurvePoints, SceneTone]> = [
        [[baseX - 22, baseY, columns * 0.74, rows * 0.84, columns * 0.66, rows * 0.66, forkX - 6, forkY], "gold"],
        [[baseX + 24, baseY, columns * 0.66, rows * 0.82, columns * 0.78, rows * 0.65, forkX + 8, forkY], "moss"],
        [[baseX - 8, baseY, columns * 0.62, rows * 0.88, columns * 0.74, rows * 0.68, forkX + 2, forkY], "gold"],
      ];
      vineCurves.forEach(([vPoints, vTone]) => {
        drawCurve(vPoints, vTone, compact ? 1.2 : 2.0, fade * 0.92, smoothstep(0.08, 0.54, growth));
      });

      // Bioluminescent Cyan Runes along Trunk
      const runePositions = [
        [columns * 0.68, rows * 0.88, 2.0],
        [columns * 0.70, rows * 0.78, 1.8],
        [columns * 0.72, rows * 0.68, 1.6],
        [columns * 0.69, rows * 0.58, 2.2],
        [columns * 0.71, rows * 0.48, 1.8],
      ];
      runePositions.forEach(([rx, ry, rrad]) => {
        drawLantern(rx, ry, compact ? rrad * 0.8 : rrad, wind, fade, true, time);
      });

      // Grand Overarching Boughs (Framing the whole viewport)
      const grandBoughs: Array<[CurvePoints, number, SceneTone, number]> = [
        [[forkX, rows * 0.48, columns * 0.45, rows * 0.38, columns * 0.24, rows * 0.24, columns * 0.06, rows * 0.12], 8.5, "barkDeep", 0.90],
        [[forkX - 4, rows * 0.46, columns * 0.42, rows * 0.30, columns * 0.22, rows * 0.18, columns * 0.08, rows * 0.26], 6.5, "bark", 0.86],
        [[forkX - 6, rows * 0.44, columns * 0.52, rows * 0.28, columns * 0.38, rows * 0.14, columns * 0.26, rows * 0.04], 6.2, "barkDeep", 0.84],
        [[forkX, rows * 0.42, columns * 0.68, rows * 0.24, columns * 0.64, rows * 0.12, columns * 0.60, rows * 0.02], 7.0, "barkDeep", 0.80],
        [[forkX + 4, rows * 0.42, columns * 0.78, rows * 0.24, columns * 0.84, rows * 0.10, columns * 0.88, rows * 0.02], 6.5, "bark", 0.82],
        [[forkX + 6, rows * 0.46, columns * 0.84, rows * 0.38, columns * 0.96, rows * 0.28, columns * 1.04, rows * 0.14], 8.8, "barkDeep", 0.90],
        [[forkX + 8, rows * 0.50, columns * 0.88, rows * 0.46, columns * 0.98, rows * 0.44, columns * 1.06, rows * 0.32], 6.8, "moss", 0.84],
        [[forkX + 6, rows * 0.54, columns * 0.82, rows * 0.56, columns * 0.92, rows * 0.58, columns * 1.02, rows * 0.50], 5.5, "bark", 0.80],
      ];
      grandBoughs.forEach(([points, bWidth, tone, threshold], index) => {
        drawCurve(
          points.map((val, pidx) => (pidx % 2 === 0 && pidx > 1 ? val + wind * (0.1 + index * 0.015) : val)) as CurvePoints,
          tone,
          compact ? bWidth * 0.65 : bWidth,
          fade,
          smoothstep(0.16, threshold, growth),
        );
      });

      // Panoramic Canopy Ceiling Shelves
      const cloudShelves: Array<[number, number, number, number, SceneTone, SceneTone, number]> = [
        [0.08, 0.10, 32, 20, "leaf", "gold", 11],
        [0.18, 0.14, 38, 22, "moss", "gold", 23],
        [0.10, 0.24, 28, 18, "leaf", "coral", 37],
        [0.26, 0.08, 42, 24, "leaf", "gold", 49],
        [0.38, 0.06, 44, 26, "leaf", "coral", 61],
        [0.52, 0.04, 46, 26, "moss", "gold", 73],
        [0.64, 0.03, 48, 28, "leaf", "gold", 87],
        [0.76, 0.05, 46, 26, "moss", "sky", 99],
        [0.86, 0.04, 44, 24, "leaf", "gold", 113],
        [0.96, 0.08, 42, 24, "leaf", "rose", 127],
        [1.02, 0.18, 40, 22, "violet", "sky", 141],
        [0.94, 0.28, 38, 22, "leaf", "gold", 155],
        [0.98, 0.40, 34, 20, "coral", "leaf", 169],
        [0.92, 0.50, 30, 18, "leaf", "gold", 183],
        [0.46, 0.22, 34, 20, "moss", "leaf", 197],
        [0.60, 0.24, 36, 22, "leaf", "coral", 211],
        [0.78, 0.22, 38, 22, "coral", "leaf", 225],
        [0.72, 0.34, 32, 18, "leaf", "gold", 239],
      ];
      cloudShelves.forEach(([cx, cy, rx, ry, prime, acc, seed]) => {
        if (compact && cx < 0.28) return;
        drawCloudCanopy(
          columns * cx,
          rows * cy,
          compact ? rx * 0.65 : rx,
          compact ? ry * 0.65 : ry,
          prime,
          acc,
          seed,
          wind,
          fade * 0.94,
          growth,
        );
      });

      // Constellation of 42+ Glowing Lanterns
      const lanterns: Array<[number, number, number]> = [
        [0.06, 0.14, 2.8],
        [0.12, 0.10, 3.2],
        [0.16, 0.20, 2.6],
        [0.10, 0.28, 2.4],
        [0.22, 0.12, 3.4],
        [0.26, 0.22, 2.8],
        [0.32, 0.10, 3.6],
        [0.38, 0.18, 2.6],
        [0.44, 0.08, 3.2],
        [0.48, 0.24, 2.4],
        [0.54, 0.06, 4.0],
        [0.58, 0.16, 3.0],
        [0.62, 0.04, 3.8],
        [0.66, 0.14, 3.4],
        [0.70, 0.08, 4.2],
        [0.74, 0.20, 3.2],
        [0.78, 0.06, 3.6],
        [0.82, 0.16, 3.0],
        [0.86, 0.08, 3.8],
        [0.90, 0.22, 3.2],
        [0.94, 0.12, 3.6],
        [0.98, 0.24, 3.0],
        [0.92, 0.34, 3.4],
        [0.98, 0.44, 2.8],
        [0.88, 0.46, 2.6],
        [0.94, 0.54, 2.4],
        [0.56, 0.28, 2.8],
        [0.64, 0.32, 3.0],
        [0.72, 0.36, 2.8],
        [0.80, 0.32, 3.2],
        [0.52, 0.72, 2.6],
        [0.82, 0.74, 2.8],
        [0.46, 0.88, 3.0],
        [0.90, 0.86, 2.8],
      ];
      lanterns.forEach(([lx, ly, lr]) => {
        if (compact && lx < 0.32) return;
        drawLantern(columns * lx, rows * ly, compact ? lr * 0.75 : lr, wind, fade, false, time);
      });

      // Grand Commit Fork Rune Node
      drawLantern(forkX, rows * 0.44, compact ? 2.6 : 3.8, wind, fade, true, time);
    };

    // Draw the World-Scale Document Tree through sections to roots
    const drawWorldTree = (time: number, scrollTop: number, documentHeight: number) => {
      const compact = width <= 680;
      const wind =
        Math.sin(time * 0.00042 + scrollTop * 0.00018) * (compact ? 0.6 : 1.2) +
        Math.sin(time * 0.00019 + 2.4) * 0.5 +
        pointerX * (compact ? 0.3 : 0.7) +
        pointerY * 0.12;

      // Section waypoints that guide the trunk curve
      const waypoints = [
        { y: height * 0.8, x: compact ? 0.78 : 0.70 },
        ...sectionAnchors.map((section) => ({
          y: section.top + Math.min(84, section.height * 0.08),
          x: compact ? 0.08 : section.side === "left" ? 0.80 : 0.20,
        })),
        { y: documentHeight - height * 0.35, x: compact ? 0.1 : 0.5 },
      ].sort((a, b) => a.y - b.y);

      const trunkXAt = (worldY: number) => {
        if (compact) {
          const handoff = smoothstep(height * 0.75, height * 1.4, worldY);
          const x = 0.78 + (0.08 - 0.78) * handoff;
          return columns * (x + Math.sin(worldY * 0.0018) * 0.015 * handoff);
        }
        const first = waypoints[0];
        const last = waypoints[waypoints.length - 1];
        if (worldY <= first.y) return columns * first.x;
        if (worldY >= last.y) return columns * last.x;
        for (let index = 0; index < waypoints.length - 1; index += 1) {
          const current = waypoints[index];
          const next = waypoints[index + 1];
          if (worldY < current.y || worldY > next.y) continue;
          const progress = smoothstep(current.y, next.y, worldY);
          const organicDrift = Math.sin(worldY * 0.003 + index * 1.8) * 0.014;
          return columns * (current.x + (next.x - current.x) * progress + organicDrift);
        }
        return columns * last.x;
      };

      const toScreenRow = (worldY: number) => (worldY - scrollTop) / cellHeight;
      const segmentSize = Math.max(280, height * 0.34);
      const firstSegment = Math.max(
        height * 0.75,
        Math.floor((scrollTop - height * 0.6) / segmentSize) * segmentSize,
      );
      const lastSegment = Math.min(
        documentHeight + height * 0.25,
        scrollTop + height * 1.6,
      );

      // Render Continuous Braided Spine Trunk through the document
      for (let worldY = firstSegment; worldY < lastSegment; worldY += segmentSize) {
        const nextWorldY = Math.min(worldY + segmentSize + 1, documentHeight + height * 0.25);
        const y0 = toScreenRow(worldY);
        const y1 = toScreenRow(nextWorldY);
        const x0 = trunkXAt(worldY);
        const x1 = trunkXAt(nextWorldY);
        const segmentIndex = Math.floor(worldY / segmentSize);
        const bend = (seeded(segmentIndex * 13 + 7) - 0.5) * (compact ? 3.0 : 7.5);

        // 6 Intertwined Braided Pillars
        const sectionPillars: Array<{ offset: number; tone: SceneTone; width: number }> = [
          { offset: -12, tone: "moss", width: 5.0 },
          { offset: -6, tone: "barkDeep", width: 5.8 },
          { offset: 0, tone: "barkCrevice", width: 5.2 },
          { offset: 6, tone: "barkLight", width: 6.0 },
          { offset: 12, tone: "bark", width: 5.6 },
          { offset: 18, tone: "moss", width: 4.8 },
        ];

        sectionPillars.forEach((sp, pidx) => {
          const poff = compact ? sp.offset * 0.55 : sp.offset;
          const ripple = Math.sin(segmentIndex * 2.2 + pidx) * (compact ? 0.6 : 1.4);
          drawCurve(
            [
              x0 + poff,
              y0,
              x0 + bend + poff * 0.5 + ripple + wind * 0.15,
              y0 + (y1 - y0) * 0.34,
              x1 - bend + poff * 0.7 - ripple + wind * 0.24,
              y0 + (y1 - y0) * 0.68,
              x1 + poff,
              y1,
            ],
            sp.tone,
            compact ? sp.width * 0.7 : sp.width,
            0.96,
          );
        });

        // Glowing Rune in Trunk Fissure
        const knotWorldY = worldY + segmentSize * (0.42 + seeded(segmentIndex + 18) * 0.26);
        const knotY = toScreenRow(knotWorldY);
        const knotX = trunkXAt(knotWorldY);
        if (seeded(segmentIndex + 7) > 0.35) {
          drawLantern(knotX, knotY, compact ? 1.6 : 2.4, wind, 0.95, true, time);
        }
      }

      // Render Section Anchor Limbs & Cloud Clearings
      sectionAnchors.forEach((section) => {
        const worldY = section.top + Math.min(84, section.height * 0.08);
        const screenY = toScreenRow(worldY);
        if (screenY < -48 || screenY > rows + 48) return;

        const sectionGrowth = 1 - smoothstep(rows * 0.78, rows * 1.06, screenY);
        const trunkX = trunkXAt(worldY);
        const endX = compact
          ? columns * 0.18
          : columns * (section.side === "left" ? 0.52 : 0.48);
        const endY = screenY - (compact ? 3.5 : 8.0 + (section.index % 2) * 3.0);
        const primeTone = CANOPY_TONES[section.index % CANOPY_TONES.length];
        const accentTone = CANOPY_TONES[(section.index + 2) % CANOPY_TONES.length];

        // Heavy bough connecting trunk to section
        drawCurve(
          [
            trunkX,
            screenY,
            trunkX + (endX - trunkX) * 0.28,
            screenY - 1.5,
            trunkX + (endX - trunkX) * 0.7,
            endY + 2.0,
            endX,
            endY,
          ],
          section.index % 2 === 0 ? "bark" : "barkDeep",
          compact ? 3.2 : 5.0,
          0.98,
          sectionGrowth,
        );

        if (sectionGrowth > 0.05) {
          // Cloud-Canopy Shelf at section clearing
          drawCloudCanopy(
            endX,
            endY - 2.0,
            compact ? 16.0 : 30.0,
            compact ? 10.0 : 18.0,
            primeTone,
            accentTone,
            section.index * 37 + 13,
            wind,
            sectionGrowth * 0.94,
            1,
          );
          // Hanging Lantern at section bough
          drawLantern(endX, endY + 4.0, compact ? 2.0 : 3.0, wind, sectionGrowth, false, time);
        }

        // Section Commit Rune Node
        drawLantern(trunkX, screenY, compact ? 1.8 : 2.8, wind, sectionGrowth, true, time);
      });

      // Sprawling Footer Buttress Roots & Waterfall Spray
      const rootStart = documentHeight - height * 0.95;
      if (scrollTop + height > rootStart - height * 0.3) {
        const rootX = trunkXAt(rootStart);
        const rootY = toScreenRow(rootStart);
        const rootEndY = toScreenRow(documentHeight + height * 0.15);
        const rootEnds = compact
          ? [0.02, 0.22, 0.45, 0.72, 0.98]
          : [0.01, 0.08, 0.20, 0.36, 0.52, 0.68, 0.84, 0.98];

        rootEnds.forEach((endFraction, index) => {
          const endX = columns * endFraction;
          const direction = endX < rootX ? -1 : 1;
          drawCurve(
            [
              rootX,
              rootY,
              rootX + direction * 22 * (0.85 + index * 0.12),
              rootY + (rootEndY - rootY) * 0.26,
              endX - direction * columns * 0.06,
              rootY + (rootEndY - rootY) * 0.68,
              endX,
              rootEndY,
            ],
            index % 2 === 0 ? "barkDeep" : "bark",
            compact ? 3.0 : 5.2,
            0.96,
          );
          drawCloudCanopy(endX, rootEndY - 4, 20, 11, "moss", "gold", index * 19, wind, 0.88, 1);
        });
      }
    };

    const nearestTone = (red: number, green: number, blue: number): SceneTone => {
      let nearest: SceneTone = "spore";
      let nearestDistance = Number.POSITIVE_INFINITY;
      (Object.entries(SCENE_TONES) as Array<[SceneTone, (typeof SCENE_TONES)[SceneTone]]>).forEach(
        ([tone, value]) => {
          const distance =
            (red - value.rgb[0]) ** 2 +
            (green - value.rgb[1]) ** 2 +
            (blue - value.rgb[2]) ** 2;
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = tone;
          }
        },
      );
      return nearest;
    };

    // Sample high-density offscreen raster buffer and map into crisp ASCII characters
    const renderAscii = () => {
      const pixels = sceneContext.getImageData(0, 0, columns, rows).data;
      context.clearRect(0, 0, width, height);
      context.font = `600 ${Math.round(cellHeight * 0.92)}px "JetBrains Mono", "SFMono-Regular", Consolas, monospace`;

      const alphaAt = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= columns || y >= rows) return 0;
        return pixels[(y * columns + x) * 4 + 3] / 255;
      };

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.028) continue;

          const tone = nearestTone(pixels[index], pixels[index + 1], pixels[index + 2]);
          let character = ".";

          if (tone === "lanternCore") {
            character = "@";
          } else if (tone === "lantern") {
            character = alpha > 0.65 ? "●" : alpha > 0.35 ? "o" : "*";
          } else if (tone === "rune") {
            character = alpha > 0.65 ? "●" : alpha > 0.35 ? "o" : "+";
          } else if (tone === "runeGlow") {
            character = alpha > 0.45 ? "*" : "~";
          } else if (tone === "leaf" || tone === "moss" || tone === "leafDeep") {
            // Specimen-Specific leaf characters
            if (currentSpecimen === "sakura") {
              character = alpha > 0.72 ? "✿" : alpha > 0.45 ? "*" : alpha > 0.22 ? "+" : "~";
            } else if (currentSpecimen === "bio-cypress") {
              character = alpha > 0.72 ? "█" : alpha > 0.45 ? "▓" : alpha > 0.22 ? "▒" : "░";
            } else if (currentSpecimen === "ginkgo") {
              character = alpha > 0.72 ? "o" : alpha > 0.45 ? "●" : alpha > 0.22 ? "*" : ".";
            } else {
              character = alpha > 0.75 ? "@" : alpha > 0.48 ? "*" : alpha > 0.22 ? "+" : ".";
            }
          } else if (tone === "gold") {
            character = alpha > 0.68 ? "o" : alpha > 0.3 ? "*" : ".";
          } else if (tone === "coral") {
            character = alpha > 0.62 ? "%" : alpha > 0.28 ? "*" : ".";
          } else if (tone === "rose") {
            character = alpha > 0.62 ? "@" : alpha > 0.28 ? "+" : ".";
          } else if (tone === "violet") {
            character = alpha > 0.6 ? "~" : alpha > 0.26 ? "+" : ".";
          } else if (tone === "sky") {
            character = alpha > 0.58 ? "+" : ".";
          } else if (tone === "aurora") {
            character = alpha > 0.5 ? "~" : ".";
          } else if (tone === "forestFar") {
            character = alpha > 0.4 ? "^" : ":";
          } else if (tone === "waterfall") {
            character = alpha > 0.55 ? "~" : alpha > 0.28 ? ":" : "·";
          } else if (tone === "spore") {
            if (currentSpecimen === "sakura") {
              character = alpha > 0.35 ? "✿" : "·";
            } else if (currentSpecimen === "bio-cypress") {
              character = alpha > 0.35 ? "⚡" : ":";
            } else if (currentSpecimen === "ginkgo") {
              character = alpha > 0.35 ? "o" : "·";
            } else {
              character = alpha > 0.4 ? ":" : "·";
            }
          } else if (tone === "ambient") {
            character = "·";
          } else {
            // Bark, Crevice & structural wood texturing
            const horizontalGradient = alphaAt(x + 1, y) - alphaAt(x - 1, y);
            const verticalGradient = alphaAt(x, y + 1) - alphaAt(x, y - 1);
            if (tone === "barkCrevice") {
              character = alpha > 0.6 ? "█" : alpha > 0.3 ? "▓" : "#";
            } else if (Math.abs(horizontalGradient) > Math.abs(verticalGradient) * 1.3) {
              character = "|";
            } else if (Math.abs(verticalGradient) > Math.abs(horizontalGradient) * 1.3) {
              character = "-";
            } else if (horizontalGradient * verticalGradient > 0) {
              character = "/";
            } else if (horizontalGradient * verticalGradient < 0) {
              character = "\\";
            } else {
              character = alpha > 0.78 ? "█" : alpha > 0.55 ? "▓" : alpha > 0.32 ? "#" : ":";
            }
          }

          context.globalAlpha = clamp(
            alpha * 1.4,
            0.12,
            tone === "barkDeep" || tone === "barkCrevice" ? 0.98 : 0.94,
          );
          context.fillStyle = palette[tone];
          context.fillText(character, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight);
        }
      }
      context.globalAlpha = 1;
    };

    const draw = (time: number) => {
      animationFrame = null;
      if (document.visibilityState === "hidden") return;
      if (!reducedMotion.matches && time - lastFrame < 28) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;

      pointerX += (targetPointerX - pointerX) * 0.08;
      pointerY += (targetPointerY - pointerY) * 0.08;

      sceneContext.clearRect(0, 0, columns, rows);
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const motionTime = reducedMotion.matches ? 0 : time;

      drawWorldTree(motionTime, scrollTop, documentHeight);
      if (scrollTop < height * 1.4) {
        sceneContext.save();
        sceneContext.translate(0, -scrollTop / cellHeight);
        drawHeroSpiritTree(motionTime, scrollTop);
        sceneContext.restore();
      }

      renderAscii();

      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (animationFrame === null && document.visibilityState === "visible") {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const restart = () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      start();
    };

    const handlePointer = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      targetPointerX = (event.clientX / Math.max(1, width)) * 2 - 1;
      targetPointerY = (event.clientY / Math.max(1, height)) * 2 - 1;
    };

    const handleScroll = () => {
      measureSections();
      if (reducedMotion.matches) restart();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      } else {
        start();
      }
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        pointerX = 0;
        pointerY = 0;
        targetPointerX = 0;
        targetPointerY = 0;
      }
      restart();
    };

    const themeObserver = new MutationObserver(() => {
      readPalette();
      restart();
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      restart();
    });

    const handleSpecimenChange = () => {
      readPalette();
      restart();
    };

    resize();
    start();
    resizeObserver.observe(document.body);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-tree-specimen"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("tree-specimen-change", handleSpecimenChange);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("tree-specimen-change", handleSpecimenChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-shader-canvas"
      aria-hidden="true"
    />
  );
};

export default AsciiTreeCanvas;
