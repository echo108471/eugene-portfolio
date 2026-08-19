import React, { useEffect, useRef } from "react";
import { TreeSpecimen } from "../use-tree-theme";

const SECTION_IDS = [
  "about",
  "metrics",
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
  id: string;
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
            id,
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

    // Draw an organic tree branch with natural bark striations and depth
    const drawOrganicBranch = (
      points: CurvePoints,
      widthBase: number,
      widthTip: number,
      wind = 0,
      alpha = 0.98,
    ) => {
      const p: CurvePoints = [
        points[0],
        points[1],
        points[2] + wind * 0.15,
        points[3],
        points[4] + wind * 0.35,
        points[5],
        points[6] + wind * 0.65,
        points[7],
      ];

      const avgWidth = (widthBase + widthTip) * 0.5;

      // 1. Deep wood core shadow
      drawCurve(p, "barkDeep", avgWidth * 1.1, alpha * 0.96);

      // 2. Main bark body
      drawCurve(p, "bark", avgWidth * 0.85, alpha * 0.98);

      // 3. Lit bark ridge on top edge
      const litPoints: CurvePoints = [
        p[0] - 0.6,
        p[1] - 0.6,
        p[2] - 0.5,
        p[3] - 0.5,
        p[4] - 0.4,
        p[5] - 0.4,
        p[6] - 0.3,
        p[7] - 0.3,
      ];
      drawCurve(litPoints, "barkLight", avgWidth * 0.35, alpha * 0.88);

      // 4. Shaded moss underside
      const mossPoints: CurvePoints = [
        p[0] + 0.7,
        p[1] + 0.7,
        p[2] + 0.6,
        p[3] + 0.6,
        p[4] + 0.5,
        p[5] + 0.5,
        p[6] + 0.4,
        p[7] + 0.4,
      ];
      drawCurve(mossPoints, "moss", avgWidth * 0.3, alpha * 0.75);
    };

    // Organic Leaf Cloud Canopy Clump
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
    ) => {
      if (alpha <= 0.01) return;

      // Base shadow layer
      sceneContext.fillStyle = SCENE_TONES.leafDeep.css;
      sceneContext.globalAlpha = alpha * 0.7;
      sceneContext.beginPath();
      sceneContext.ellipse(x + wind * 0.3, y + radiusY * 0.22, radiusX * 0.9, radiusY * 0.6, 0, 0, Math.PI * 2);
      sceneContext.fill();

      // Multi-Lobe Tiered Cloud
      const lobeCount = 20;
      for (let i = 0; i < lobeCount; i += 1) {
        const angle = seeded(seed + i * 4.3) * Math.PI * 2;
        const dist = Math.sqrt(seeded(seed + i * 7.7));
        const lobeX = x + Math.cos(angle) * radiusX * dist + wind * (0.12 + i * 0.01);
        const lobeY = y + Math.sin(angle) * radiusY * 0.58 * dist;
        const rx = radiusX * (0.24 + seeded(seed + i * 11.1) * 0.26);
        const ry = radiusY * (0.20 + seeded(seed + i * 13.5) * 0.22);

        const isHighlight = lobeY < y - radiusY * 0.06 && seeded(seed + i * 9.1) > 0.35;
        const isAccent = seeded(seed + i * 17.3) > 0.72;
        const tone = isAccent ? accentTone : isHighlight ? "leaf" : primaryTone;

        sceneContext.fillStyle = SCENE_TONES[tone].css;
        sceneContext.globalAlpha = alpha * (0.52 + seeded(seed + i * 5.7) * 0.44);
        sceneContext.beginPath();
        sceneContext.ellipse(lobeX, lobeY, Math.max(1.0, rx), Math.max(0.8, ry), angle * 0.2, 0, Math.PI * 2);
        sceneContext.fill();
      }

      // Hanging Moss Tendrils beneath the cloud shelf
      const tendrilCount = 6;
      sceneContext.strokeStyle = SCENE_TONES.moss.css;
      sceneContext.lineWidth = 1.0;
      for (let j = 0; j < tendrilCount; j += 1) {
        const tx = x - radiusX * 0.5 + (radiusX * j) / (tendrilCount - 1);
        const ty = y + radiusY * 0.28 + seeded(seed + j * 19) * radiusY * 0.16;
        const tlen = radiusY * 0.35 + seeded(seed + j * 23) * radiusY * 0.5;
        sceneContext.globalAlpha = alpha * (0.35 + seeded(seed + j * 31) * 0.35);
        sceneContext.beginPath();
        sceneContext.moveTo(tx, ty);
        sceneContext.quadraticCurveTo(tx + wind * 0.4 + (seeded(seed + j) - 0.5) * 3.0, ty + tlen * 0.5, tx + wind * 0.8, ty + tlen);
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
      const pulse = 0.84 + Math.sin(time * 0.002 + x * 0.05 + y * 0.05) * 0.16;
      const lx = x + wind * 0.6;
      const ly = y;

      // Hanging cord for lanterns
      if (!isRune) {
        sceneContext.strokeStyle = SCENE_TONES.barkCrevice.css;
        sceneContext.lineWidth = 0.8;
        sceneContext.globalAlpha = alpha * 0.65;
        sceneContext.beginPath();
        sceneContext.moveTo(lx, ly - radius * 2.8);
        sceneContext.lineTo(lx, ly - radius * 0.6);
        sceneContext.stroke();
      }

      // Outer Glow Halo
      sceneContext.fillStyle = isRune ? SCENE_TONES.runeGlow.css : SCENE_TONES.lantern.css;
      sceneContext.globalAlpha = alpha * (isRune ? 0.35 : 0.28) * pulse;
      sceneContext.beginPath();
      sceneContext.arc(lx, ly, radius * (isRune ? 2.6 : 3.4), 0, Math.PI * 2);
      sceneContext.fill();

      // Mid Glow
      sceneContext.fillStyle = isRune ? SCENE_TONES.rune.css : SCENE_TONES.lantern.css;
      sceneContext.globalAlpha = alpha * (isRune ? 0.75 : 0.82) * pulse;
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

    // Continuous Multi-Plane Atmosphere Across Entire Scroll Height
    const drawAtmosphere = (time: number, wind: number, fade: number, scrollTop: number) => {
      // 1. Celestial Aurora Sky Haze & Parallax Glow Waves
      sceneContext.fillStyle = SCENE_TONES.aurora.css;
      const skyGlows = [
        [0.65, 0.12, 58, 0.15],
        [0.25, 0.10, 48, 0.12],
        [0.85, 0.28, 52, 0.14],
        [0.18, 0.55, 46, 0.10],
        [0.82, 0.75, 50, 0.12],
      ];
      skyGlows.forEach(([gx, gy, gr, ga]) => {
        sceneContext.globalAlpha = fade * ga * (isDark ? 1.0 : 0.65);
        sceneContext.beginPath();
        sceneContext.arc(columns * gx, rows * gy, gr, 0, Math.PI * 2);
        sceneContext.fill();
      });

      // 2. Continuous Parallax Distant Ancient Forest Silhouettes Across the Document
      sceneContext.fillStyle = SCENE_TONES.forestFar.css;
      const treeCount = 42;
      for (let i = 0; i < treeCount; i += 1) {
        const tx = columns * (0.01 + (i / (treeCount - 1)) * 0.98);
        const parallaxY = (i * 197.3 - scrollTop * 0.18) % (rows * 1.4);
        const ty = (parallaxY < -rows * 0.2 ? parallaxY + rows * 1.4 : parallaxY);
        const th = rows * (0.14 + seeded(i * 13 + 5) * 0.24);
        const tw = 4 + seeded(i * 29) * 8;
        sceneContext.globalAlpha = fade * (isDark ? 0.085 : 0.055) * (0.6 + seeded(i * 31) * 0.4);

        sceneContext.beginPath();
        sceneContext.moveTo(tx, ty - th);
        sceneContext.lineTo(tx + tw, ty);
        sceneContext.lineTo(tx - tw, ty);
        sceneContext.closePath();
        sceneContext.fill();
      }

      // 3. Specimen-Specific Particle Shaders (Spores / Sakura Petals / Matrix Sparks / Ginkgo Leaves)
      const particleTone =
        currentSpecimen === "sakura"
          ? "rose"
          : currentSpecimen === "bio-cypress"
          ? "sky"
          : currentSpecimen === "ginkgo"
          ? "gold"
          : "spore";

      sceneContext.fillStyle = SCENE_TONES[particleTone].css;
      const particleCount = 140;
      for (let index = 0; index < particleCount; index += 1) {
        const originX = columns * (0.01 + seeded(index + 3) * 0.98);
        const originY = rows * seeded(index + 15 + Math.floor(scrollTop * 0.0008));

        let x = originX;
        let y = originY;
        if (currentSpecimen === "sakura") {
          const sway = Math.sin(time * 0.0006 + index * 2.1) * (5.5 + seeded(index * 7) * 6.0);
          x = originX + sway + wind * 1.4;
          y = (originY + time * (0.00024 + seeded(index + 45) * 0.00018)) % (rows + 16) - 8;
        } else if (currentSpecimen === "bio-cypress") {
          const jitter = (seeded(index * 99 + Math.floor(time * 0.003)) - 0.5) * 2.2;
          x = originX + jitter + wind * 0.5;
          y = (originY - time * 0.00022) % (rows + 12);
          if (y < 0) y += rows + 12;
        } else if (currentSpecimen === "ginkgo") {
          const swing = Math.sin(time * 0.00045 + index * 1.5) * 7.5;
          x = originX + swing + wind * 0.9;
          y = (originY + time * 0.00022) % (rows + 14) - 7;
        } else {
          const drift = Math.sin(time * 0.00028 + index * 1.7) * (3.0 + seeded(index + 25) * 4.0);
          x = originX + drift + wind * 0.75;
          y = (originY + time * (0.00018 + seeded(index + 45) * 0.00012)) % (rows + 12) - 6;
        }

        sceneContext.globalAlpha = fade * (0.14 + seeded(index + 55) * 0.46);
        sceneContext.beginPath();
        sceneContext.arc(x, y, 0.28 + seeded(index + 65) * 0.55, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    // PROCEDURAL ASYMMETRICAL ANCIENT TREE (Natural Branching Architecture)
    const drawUnifiedWorldTree = (time: number, scrollTop: number, documentHeight: number) => {
      const compact = width <= 680;
      const wind =
        Math.sin(time * 0.00045 + scrollTop * 0.00015) * (compact ? 0.8 : 1.4) +
        Math.sin(time * 0.00022 + 1.8) * 0.7 +
        pointerX * (compact ? 0.5 : 1.2) +
        pointerY * 0.22;

      const toScreenRow = (worldY: number) => (worldY - scrollTop) / cellHeight;

      // Draw continuous multi-plane atmosphere
      drawAtmosphere(time, wind, 1, scrollTop);

      // ─────────────────────────────────────────────────────────────────────────────
      // 1. DYNAMIC ASYMMETRICAL TRUNK SPINE (Oscillating organically down the page)
      // ─────────────────────────────────────────────────────────────────────────────
      // Derive waypoints dynamically from measured section anchors with fallback defaults
      const dynamicWaypoints: Array<{ y: number; x: number }> = [
        { y: 0, x: compact ? 0.64 : 0.58 },
        { y: Math.min(500, height * 0.55), x: compact ? 0.66 : 0.60 },
      ];

      if (sectionAnchors.length > 0) {
        sectionAnchors.forEach((sec, idx) => {
          const isLeft = sec.side === "left";
          // Trunk curves toward the opposite side to balance the section card, weaving back and forth
          const targetX = isLeft
            ? compact ? 0.70 : 0.64 + (idx % 2 === 0 ? 0.03 : -0.02)
            : compact ? 0.30 : 0.36 + (idx % 2 === 0 ? -0.03 : 0.02);
          const midY = sec.top + sec.height * 0.45;
          dynamicWaypoints.push({ y: sec.top, x: targetX });
          dynamicWaypoints.push({ y: midY, x: targetX + (isLeft ? 0.02 : -0.02) });
        });
      } else {
        // Fallback default waypoints if anchors not yet measured
        dynamicWaypoints.push(
          { y: 900, x: compact ? 0.70 : 0.65 },
          { y: 1800, x: compact ? 0.30 : 0.35 },
          { y: 2700, x: compact ? 0.70 : 0.65 },
          { y: 3600, x: compact ? 0.30 : 0.35 },
          { y: 4500, x: compact ? 0.68 : 0.62 },
          { y: 5400, x: compact ? 0.32 : 0.38 },
        );
      }

      dynamicWaypoints.push(
        { y: Math.max(1000, documentHeight - 600), x: compact ? 0.50 : 0.50 },
        { y: documentHeight, x: compact ? 0.50 : 0.50 },
      );

      const spineWaypoints = dynamicWaypoints.sort((a, b) => a.y - b.y);

      const trunkXAt = (worldY: number) => {
        const first = spineWaypoints[0];
        const last = spineWaypoints[spineWaypoints.length - 1];
        if (worldY <= first.y) return columns * first.x;
        if (worldY >= last.y) return columns * last.x;
        for (let index = 0; index < spineWaypoints.length - 1; index += 1) {
          const current = spineWaypoints[index];
          const next = spineWaypoints[index + 1];
          if (worldY < current.y || worldY > next.y) continue;
          const progress = smoothstep(current.y, next.y, worldY);
          const organicWiggle = Math.sin(worldY * 0.0022 + index * 2.3) * (compact ? 0.012 : 0.022);
          return columns * (current.x + (next.x - current.x) * progress + organicWiggle);
        }
        return columns * last.x;
      };

      // Render the living trunk core along visible segments
      const segmentSize = Math.max(200, height * 0.25);
      const firstSegment = Math.max(0, Math.floor((scrollTop - height * 0.8) / segmentSize) * segmentSize);
      const lastSegment = Math.min(documentHeight, scrollTop + height * 1.8);

      for (let worldY = firstSegment; worldY < lastSegment; worldY += segmentSize) {
        const nextWorldY = Math.min(worldY + segmentSize + 2, documentHeight);
        const y0 = toScreenRow(worldY);
        const y1 = toScreenRow(nextWorldY);
        const x0 = trunkXAt(worldY);
        const x1 = trunkXAt(nextWorldY);
        const segmentIndex = Math.floor(worldY / segmentSize);
        const naturalBend = (seeded(segmentIndex * 17 + 3) - 0.5) * (compact ? 5.0 : 11.0);

        // Trunk width tapers naturally from 16px at root base to 8px at canopy top
        const depthProgress = clamp(worldY / Math.max(1, documentHeight));
        const trunkWidth = (compact ? 7.0 : 10.5) + depthProgress * (compact ? 6.0 : 9.5);

        // Organic trunk multi-pass (3 distinct wood striations with natural grain)
        const trunkCurve: CurvePoints = [
          x0,
          y0,
          x0 + naturalBend + wind * 0.12,
          y0 + (y1 - y0) * 0.35,
          x1 - naturalBend + wind * 0.22,
          y0 + (y1 - y0) * 0.65,
          x1,
          y1,
        ];

        drawOrganicBranch(trunkCurve, trunkWidth, trunkWidth * 0.95, wind, 0.98);

        // Spiraling emerald/golden climbing vine with foliage nodules
        const vineOffset = Math.sin(segmentIndex * 1.5) * (trunkWidth * 0.72);
        drawCurve(
          [
            x0 - vineOffset,
            y0,
            x0 + naturalBend * 0.4 + vineOffset,
            y0 + (y1 - y0) * 0.5,
            x1 - naturalBend * 0.4 - vineOffset,
            y0 + (y1 - y0) * 0.8,
            x1 + vineOffset,
            y1,
          ],
          segmentIndex % 2 === 0 ? "gold" : "moss",
          compact ? 1.6 : 2.5,
          0.94,
        );

        // Climbing ivy leaves on the trunk
        if (seeded(segmentIndex * 19 + 7) > 0.3) {
          const leafX = x0 + (seeded(segmentIndex) - 0.5) * trunkWidth * 0.8;
          const leafY = y0 + (y1 - y0) * 0.5;
          drawCloudCanopy(leafX, leafY, compact ? 10 : 16, compact ? 6 : 10, "leaf", "gold", segmentIndex * 31, wind, 0.88);
        }

        // Glowing spirit rune in ancient bark knot
        const runeWorldY = worldY + segmentSize * (0.35 + seeded(segmentIndex + 11) * 0.3);
        const runeScreenY = toScreenRow(runeWorldY);
        const runeX = trunkXAt(runeWorldY);
        if (seeded(segmentIndex + 9) > 0.22) {
          drawLantern(runeX, runeScreenY, compact ? 2.2 : 3.2, wind, 0.96, true, time);
        }
      }

      // ─────────────────────────────────────────────────────────────────────────────
      // 2. ASYMMETRICAL HERO CANOPY BRANCHES (worldY = 0 to 750)
      // ─────────────────────────────────────────────────────────────────────────────
      if (scrollTop < height * 1.5) {
        const forkWorldY = 420;
        const forkScreenY = toScreenRow(forkWorldY);
        const forkX = trunkXAt(forkWorldY);

        // Primary Asymmetric Limbs branching off the fork
        const heroBranches: Array<{
          curve: CurvePoints;
          widthBase: number;
          widthTip: number;
          foliage: { x: number; y: number; rx: number; ry: number; prime: SceneTone; acc: SceneTone; seed: number };
          lanterns: Array<{ x: number; y: number; radius: number }>;
        }> = [
          // 1. The Great High Western Bough (Sweeping high up and across over the headline)
          {
            curve: [forkX, forkScreenY, columns * 0.44, toScreenRow(220), columns * 0.22, toScreenRow(120), columns * 0.08, toScreenRow(60)],
            widthBase: 13.0,
            widthTip: 5.0,
            foliage: { x: columns * 0.08, y: toScreenRow(55), rx: 42, ry: 26, prime: "leaf", acc: "gold", seed: 101 },
            lanterns: [
              { x: columns * 0.08, y: toScreenRow(78), radius: 4.4 },
              { x: columns * 0.16, y: toScreenRow(128), radius: 3.6 },
            ],
          },
          // 1b. High Western Sub-branch
          {
            curve: [columns * 0.32, toScreenRow(160), columns * 0.24, toScreenRow(100), columns * 0.18, toScreenRow(70), columns * 0.16, toScreenRow(35)],
            widthBase: 7.0,
            widthTip: 3.0,
            foliage: { x: columns * 0.16, y: toScreenRow(30), rx: 36, ry: 22, prime: "moss", acc: "gold", seed: 107 },
            lanterns: [{ x: columns * 0.16, y: toScreenRow(52), radius: 3.8 }],
          },
          // 2. Central High Vaulting Limb (Crown of the Tree)
          {
            curve: [forkX + 2, forkScreenY - 4, columns * 0.62, toScreenRow(200), columns * 0.54, toScreenRow(90), columns * 0.48, toScreenRow(20)],
            widthBase: 10.5,
            widthTip: 4.0,
            foliage: { x: columns * 0.48, y: toScreenRow(15), rx: 46, ry: 28, prime: "leaf", acc: "coral", seed: 123 },
            lanterns: [{ x: columns * 0.48, y: toScreenRow(38), radius: 4.6 }],
          },
          // 3. Eastern Canopy Bough (Arching over and supporting the Telemetry HUD)
          {
            curve: [forkX + 6, forkScreenY, columns * 0.78, toScreenRow(280), columns * 0.90, toScreenRow(180), columns * 0.96, toScreenRow(90)],
            widthBase: 12.0,
            widthTip: 4.5,
            foliage: { x: columns * 0.96, y: toScreenRow(85), rx: 40, ry: 24, prime: "leaf", acc: "gold", seed: 139 },
            lanterns: [
              { x: columns * 0.96, y: toScreenRow(108), radius: 4.2 },
              { x: columns * 0.88, y: toScreenRow(188), radius: 3.4 },
            ],
          },
          // 3b. Eastern Mid-Limb (Right Flank)
          {
            curve: [columns * 0.82, toScreenRow(240), columns * 0.92, toScreenRow(280), columns * 1.02, toScreenRow(260), columns * 1.06, toScreenRow(220)],
            widthBase: 7.5,
            widthTip: 3.2,
            foliage: { x: columns * 1.04, y: toScreenRow(215), rx: 34, ry: 20, prime: "violet", acc: "sky", seed: 149 },
            lanterns: [{ x: columns * 1.04, y: toScreenRow(238), radius: 3.6 }],
          },
          // 4. Lower Bower Limb (Curves down-left to cradle the hero text)
          {
            curve: [forkX - 4, forkScreenY + 10, columns * 0.45, toScreenRow(360), columns * 0.30, toScreenRow(340), columns * 0.18, toScreenRow(300)],
            widthBase: 9.0,
            widthTip: 3.5,
            foliage: { x: columns * 0.18, y: toScreenRow(295), rx: 32, ry: 20, prime: "moss", acc: "gold", seed: 157 },
            lanterns: [{ x: columns * 0.18, y: toScreenRow(318), radius: 3.8 }],
          },
        ];

        heroBranches.forEach((hb) => {
          if (compact && hb.foliage.x < columns * 0.2) return;
          drawOrganicBranch(hb.curve, compact ? hb.widthBase * 0.7 : hb.widthBase, compact ? hb.widthTip * 0.7 : hb.widthTip, wind, 0.98);
          drawCloudCanopy(
            hb.foliage.x,
            hb.foliage.y,
            compact ? hb.foliage.rx * 0.7 : hb.foliage.rx,
            compact ? hb.foliage.ry * 0.7 : hb.foliage.ry,
            hb.foliage.prime,
            hb.foliage.acc,
            hb.foliage.seed,
            wind,
            0.96,
          );
          hb.lanterns.forEach((l) => {
            drawLantern(l.x, l.y, compact ? l.radius * 0.8 : l.radius, wind, 0.98, false, time);
          });
        });
      }

      // ─────────────────────────────────────────────────────────────────────────────
      // 3. CONTINUOUS FULL-HEIGHT SECTION CANOPY & GUTTER ARBORETUM
      // ─────────────────────────────────────────────────────────────────────────────
      // For EVERY section across the document, frame both the left and right gutters
      // with lush multi-tiered branching, cascading moss, and glowing lanterns!
      sectionAnchors.forEach((section) => {
        const topWorldY = section.top;
        const midWorldY = section.top + section.height * 0.5;
        const bottomWorldY = section.top + section.height * 0.95;

        const screenY = toScreenRow(topWorldY + Math.min(90, section.height * 0.1));
        const midScreenY = toScreenRow(midWorldY);
        const bottomScreenY = toScreenRow(bottomWorldY);

        if (bottomScreenY < -120 || screenY > rows + 120) return;

        const trunkX = trunkXAt(topWorldY + 60);
        const midTrunkX = trunkXAt(midWorldY);
        const isLeft = section.side === "left";

        const primeTone = CANOPY_TONES[section.index % CANOPY_TONES.length];
        const accentTone = CANOPY_TONES[(section.index + 2) % CANOPY_TONES.length];
        const tertiaryTone = CANOPY_TONES[(section.index + 4) % CANOPY_TONES.length];

        // ── A. PRIMARY GUTTER BOUGH (Sweeps deep into the primary outer margin: 0.05-0.22 on left or 0.78-0.95 on right) ──
        const primaryGutterX = isLeft
          ? columns * (compact ? 0.12 : 0.14)
          : columns * (compact ? 0.88 : 0.86);
        const primaryGutterY = screenY - (compact ? 6.0 : 12.0 + (section.index % 3) * 4.0);
        const primaryDipY = screenY + (section.index % 2 === 0 ? -6.0 : 6.0);

        const primaryBranch: CurvePoints = [
          trunkX,
          screenY,
          trunkX + (primaryGutterX - trunkX) * 0.35,
          primaryDipY,
          trunkX + (primaryGutterX - trunkX) * 0.72,
          primaryGutterY + 4.0,
          primaryGutterX,
          primaryGutterY,
        ];

        drawOrganicBranch(primaryBranch, compact ? 7.0 : 11.0, compact ? 3.0 : 4.5, wind, 0.98);

        // Sub-fork 1 on Primary Gutter Bough
        const subTwig1End: [number, number] = [
          primaryGutterX + (isLeft ? -columns * 0.08 : columns * 0.08),
          primaryGutterY - 14,
        ];
        drawOrganicBranch(
          [
            trunkX + (primaryGutterX - trunkX) * 0.6,
            primaryDipY * 0.5 + primaryGutterY * 0.5,
            trunkX + (primaryGutterX - trunkX) * 0.8,
            primaryGutterY - 4,
            subTwig1End[0],
            subTwig1End[1] + 4,
            subTwig1End[0],
            subTwig1End[1],
          ],
          compact ? 4.0 : 6.0,
          compact ? 1.8 : 2.8,
          wind,
          0.96,
        );

        // Sub-fork 2 (Drooping lower twig)
        const subTwig2End: [number, number] = [
          primaryGutterX + (isLeft ? columns * 0.04 : -columns * 0.04),
          primaryGutterY + 22,
        ];
        drawOrganicBranch(
          [
            primaryGutterX,
            primaryGutterY,
            primaryGutterX + (isLeft ? -4 : 4),
            primaryGutterY + 10,
            subTwig2End[0] + (isLeft ? 4 : -4),
            subTwig2End[1] - 8,
            subTwig2End[0],
            subTwig2End[1],
          ],
          compact ? 3.0 : 4.5,
          compact ? 1.4 : 2.0,
          wind,
          0.92,
        );

        // Lush Cloud Canopies in Primary Gutter
        drawCloudCanopy(
          primaryGutterX,
          primaryGutterY - 3.0,
          compact ? 28.0 : 48.0,
          compact ? 16.0 : 28.0,
          primeTone,
          accentTone,
          section.index * 41 + 17,
          wind,
          0.96,
        );

        drawCloudCanopy(
          subTwig1End[0],
          subTwig1End[1] - 2.0,
          compact ? 22.0 : 36.0,
          compact ? 12.0 : 20.0,
          accentTone,
          tertiaryTone,
          section.index * 47 + 23,
          wind,
          0.94,
        );

        drawCloudCanopy(
          subTwig2End[0],
          subTwig2End[1] - 2.0,
          compact ? 16.0 : 26.0,
          compact ? 10.0 : 16.0,
          "moss",
          primeTone,
          section.index * 53 + 29,
          wind,
          0.90,
        );

        // Hanging Amber Lanterns in Primary Gutter
        drawLantern(primaryGutterX, primaryGutterY + 10.0, compact ? 3.2 : 4.2, wind, 0.98, false, time);
        drawLantern(subTwig1End[0], subTwig1End[1] + 8.0, compact ? 2.6 : 3.6, wind, 0.96, false, time);
        drawLantern(subTwig2End[0], subTwig2End[1] + 8.0, compact ? 2.2 : 3.0, wind, 0.94, false, time);

        // ── B. COUNTER-BALANCING OPPOSITE GUTTER BOUGH (Ensures BOTH sides of the screen are framed with foliage!) ──
        const oppositeGutterX = isLeft
          ? columns * (compact ? 0.88 : 0.86)
          : columns * (compact ? 0.12 : 0.14);
        const oppositeGutterY = midScreenY - (compact ? 4.0 : 10.0 + (section.index % 2) * 6.0);

        const counterBranch: CurvePoints = [
          midTrunkX,
          midScreenY - 8,
          midTrunkX + (oppositeGutterX - midTrunkX) * 0.4,
          midScreenY + (section.index % 2 === 0 ? 8.0 : -8.0),
          midTrunkX + (oppositeGutterX - midTrunkX) * 0.75,
          oppositeGutterY + 3.0,
          oppositeGutterX,
          oppositeGutterY,
        ];

        drawOrganicBranch(counterBranch, compact ? 6.0 : 9.5, compact ? 2.5 : 3.8, wind, 0.96);

        // Counter Sub-twig
        const counterSubTwigEnd: [number, number] = [
          oppositeGutterX + (isLeft ? columns * 0.06 : -columns * 0.06),
          oppositeGutterY - 12,
        ];
        drawOrganicBranch(
          [
            midTrunkX + (oppositeGutterX - midTrunkX) * 0.7,
            oppositeGutterY + 2,
            oppositeGutterX,
            oppositeGutterY - 4,
            counterSubTwigEnd[0],
            counterSubTwigEnd[1] + 3,
            counterSubTwigEnd[0],
            counterSubTwigEnd[1],
          ],
          compact ? 3.5 : 5.0,
          compact ? 1.6 : 2.4,
          wind,
          0.92,
        );

        // Foliage in Counter Gutter
        drawCloudCanopy(
          oppositeGutterX,
          oppositeGutterY - 2.0,
          compact ? 24.0 : 40.0,
          compact ? 14.0 : 24.0,
          accentTone,
          primeTone,
          section.index * 59 + 31,
          wind,
          0.94,
        );

        drawCloudCanopy(
          counterSubTwigEnd[0],
          counterSubTwigEnd[1] - 2.0,
          compact ? 18.0 : 30.0,
          compact ? 10.0 : 18.0,
          primeTone,
          tertiaryTone,
          section.index * 61 + 37,
          wind,
          0.90,
        );

        // Hanging Lantern in Counter Gutter
        drawLantern(oppositeGutterX, oppositeGutterY + 8.0, compact ? 2.8 : 3.8, wind, 0.96, false, time);
        drawLantern(counterSubTwigEnd[0], counterSubTwigEnd[1] + 8.0, compact ? 2.2 : 3.0, wind, 0.94, false, time);

        // ── C. SECTION TRUNK NODE RUNE (Glowing Spirit Core at Section Junction) ──
        drawLantern(trunkX, screenY, compact ? 2.6 : 3.6, wind, 0.98, true, time);
        drawLantern(midTrunkX, midScreenY, compact ? 2.2 : 3.0, wind, 0.94, true, time);
      });

      // ─────────────────────────────────────────────────────────────────────────────
      // 4. ASYMMETRICAL BUTTRESS ROOTS & WATERFALL ABYSS (Footer / Contact)
      // ─────────────────────────────────────────────────────────────────────────────
      const rootStartWorldY = documentHeight - 950;
      if (scrollTop + height > rootStartWorldY - 250) {
        const rootX = trunkXAt(rootStartWorldY);
        const rootY = toScreenRow(rootStartWorldY);
        const rootEndY = toScreenRow(documentHeight + 120);

        // Asymmetrical Natural Root Anchors Sprawling Outward across the entire base
        const rootAnchors: Array<{ endFrac: number; width: number; tone: SceneTone }> = [
          { endFrac: 0.02, width: 9.5, tone: "barkDeep" },
          { endFrac: 0.14, width: 8.2, tone: "bark" },
          { endFrac: 0.26, width: 10.5, tone: "barkDeep" },
          { endFrac: 0.38, width: 8.0, tone: "moss" },
          { endFrac: 0.50, width: 9.0, tone: "bark" },
          { endFrac: 0.62, width: 10.8, tone: "barkDeep" },
          { endFrac: 0.74, width: 8.8, tone: "bark" },
          { endFrac: 0.86, width: 9.2, tone: "barkDeep" },
          { endFrac: 0.98, width: 7.5, tone: "barkDeep" },
        ];

        rootAnchors.forEach((ra, rIndex) => {
          const endX = columns * ra.endFrac;
          const direction = endX < rootX ? -1 : 1;
          const rootPoints: CurvePoints = [
            rootX,
            rootY,
            rootX + direction * 32 * (0.8 + rIndex * 0.12),
            rootY + (rootEndY - rootY) * 0.26,
            endX - direction * columns * 0.06,
            rootY + (rootEndY - rootY) * 0.66,
            endX,
            rootEndY,
          ];
          drawOrganicBranch(rootPoints, compact ? ra.width * 0.75 : ra.width, compact ? ra.width * 0.45 : ra.width * 0.55, wind, 0.98);
          drawCloudCanopy(endX, rootEndY - 8, compact ? 22 : 34, compact ? 12 : 20, "moss", "gold", rIndex * 23, wind, 0.94);
          drawLantern(endX, rootEndY + 8.0, compact ? 2.6 : 3.8, wind, 0.96, false, time);
        });

        // Subterranean Waterfall Spray & River Mist
        const waterfalls = [
          [0.18, rootStartWorldY + 100, 36],
          [0.38, rootStartWorldY + 160, 42],
          [0.50, rootStartWorldY + 200, 48],
          [0.68, rootStartWorldY + 150, 40],
          [0.84, rootStartWorldY + 110, 38],
        ];
        sceneContext.fillStyle = SCENE_TONES.waterfall.css;
        waterfalls.forEach(([wfxScale, wfyWorld, spread]) => {
          const wfx = columns * wfxScale;
          const wfy = toScreenRow(wfyWorld);
          for (let w = 0; w < 20; w += 1) {
            const wx = wfx + (seeded(w * 17 + spread) - 0.5) * spread;
            const wy = wfy + seeded(w * 23 + spread) * rows * 0.25;
            const wr = 1.4 + seeded(w * 31 + spread) * 4.2;
            sceneContext.globalAlpha = (0.10 + seeded(w * 43) * 0.22) * (isDark ? 1.0 : 0.85);
            sceneContext.beginPath();
            sceneContext.ellipse(wx, wy, wr * 2.0, wr * 0.9, 0, 0, Math.PI * 2);
            sceneContext.fill();
          }
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

      // Draw the Organic Procedural Tree with Asymmetric Natural Branching
      drawUnifiedWorldTree(motionTime, scrollTop, documentHeight);

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
