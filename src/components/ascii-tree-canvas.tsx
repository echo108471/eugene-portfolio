import React, { useEffect, useRef } from "react";

const SECTION_IDS = [
  "metrics",
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
  | "barkDeep"
  | "bark"
  | "barkLight"
  | "moss"
  | "leaf"
  | "gold"
  | "coral"
  | "rose"
  | "violet"
  | "sky"
  | "node"
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
  barkDeep: { css: "rgb(64, 30, 20)", rgb: [64, 30, 20] },
  bark: { css: "rgb(150, 78, 36)", rgb: [150, 78, 36] },
  barkLight: { css: "rgb(228, 150, 60)", rgb: [228, 150, 60] },
  moss: { css: "rgb(32, 140, 70)", rgb: [32, 140, 70] },
  leaf: { css: "rgb(34, 215, 96)", rgb: [34, 215, 96] },
  gold: { css: "rgb(238, 198, 38)", rgb: [238, 198, 38] },
  coral: { css: "rgb(235, 68, 32)", rgb: [235, 68, 32] },
  rose: { css: "rgb(220, 36, 130)", rgb: [220, 36, 130] },
  violet: { css: "rgb(110, 58, 230)", rgb: [110, 58, 230] },
  sky: { css: "rgb(44, 172, 226)", rgb: [44, 172, 226] },
  node: { css: "rgb(34, 78, 242)", rgb: [34, 78, 242] },
  spore: { css: "rgb(205, 210, 208)", rgb: [205, 210, 208] },
  ambient: { css: "rgb(100, 115, 110)", rgb: [100, 115, 110] },
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
    let cellWidth = width <= 680 ? 6.2 : 6.0;
    let cellHeight = width <= 680 ? 10.2 : 10.4;
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

    let palette: Palette = {
      barkDeep: "#38342c",
      bark: "#5c574c",
      barkLight: "#878172",
      moss: "#2b7548",
      leaf: "#22c55e",
      gold: "#c98816",
      coral: "#cf533c",
      rose: "#b64573",
      violet: "#6b5594",
      sky: "#3b7e9e",
      node: "#0284c7",
      spore: "#7e8781",
      ambient: "#597564",
    };

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      const token = (name: string, fallback: string) =>
        styles.getPropertyValue(name).trim() || fallback;
      isDark = document.documentElement.classList.contains("dark");
      palette = {
        barkDeep: token("--bark-deep", palette.barkDeep),
        bark: token("--bark", palette.bark),
        barkLight: token("--bark-light", palette.barkLight),
        moss: token("--tree-moss", palette.moss),
        leaf: token("--growth-bright", palette.leaf),
        gold: token("--tree-gold", palette.gold),
        coral: token("--tree-coral", palette.coral),
        rose: token("--tree-rose", palette.rose),
        violet: token("--tree-violet", palette.violet),
        sky: token("--tree-sky", palette.sky),
        node: token("--accent", palette.node),
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
      cellWidth = width <= 680 ? 6.2 : 6.0;
      cellHeight = width <= 680 ? 10.2 : 10.4;
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

    const drawCanopyWash = (
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
      tone: SceneTone,
      seed: number,
      wind: number,
      alpha: number,
      growth: number,
    ) => {
      const scale = smoothstep(0.28, 0.95, growth);
      if (scale <= 0.01) return;

      sceneContext.fillStyle = SCENE_TONES[tone].css;
      const count = 22;
      for (let index = 0; index < count; index += 1) {
        const angle = seeded(seed + index * 3.7) * Math.PI * 2;
        const distance = Math.sqrt(seeded(seed + index * 7.1));
        const lobeX = x + Math.cos(angle) * radiusX * distance + wind * (0.15 + index * 0.008);
        const lobeY = y + Math.sin(angle) * radiusY * distance;
        const lobeRadiusX = radiusX * (0.28 + seeded(seed + index * 11.3) * 0.3) * scale;
        const lobeRadiusY = radiusY * (0.24 + seeded(seed + index * 13.9) * 0.28) * scale;
        sceneContext.globalAlpha = alpha * (0.48 + seeded(seed + index * 5.3) * 0.48);
        sceneContext.beginPath();
        sceneContext.ellipse(
          lobeX,
          lobeY,
          Math.max(0.75, lobeRadiusX),
          Math.max(0.6, lobeRadiusY),
          angle * 0.25,
          0,
          Math.PI * 2,
        );
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    const drawLeafCluster = (
      x: number,
      y: number,
      scale: number,
      wind: number,
      alpha: number,
      tone: SceneTone = "leaf",
      bloomTone?: SceneTone,
    ) => {
      const offsets = [
        [0, -2.5],
        [-3.2, -1.0],
        [3.2, -1.0],
        [-4.8, -3.2],
        [4.8, -3.4],
        [-2.0, -5.2],
        [2.0, -5.5],
        [-6.5, -1.8],
        [6.5, -1.8],
        [0, -7.0],
        [-3.5, 0.8],
        [3.5, 0.8],
      ];
      sceneContext.globalAlpha = alpha;
      sceneContext.fillStyle = SCENE_TONES[tone].css;
      offsets.forEach(([offsetX, offsetY], index) => {
        sceneContext.beginPath();
        sceneContext.ellipse(
          x + (offsetX + wind * (0.25 + index * 0.03)) * scale,
          y + offsetY * scale,
          Math.max(0.75, 2.2 * scale),
          Math.max(0.6, 1.2 * scale),
          (index - 5) * 0.36,
          0,
          Math.PI * 2,
        );
        sceneContext.fill();
      });
      if (bloomTone) {
        sceneContext.fillStyle = SCENE_TONES[bloomTone].css;
        sceneContext.beginPath();
        sceneContext.arc(x + wind * scale * 1.2, y - 7.5 * scale, 1.2 * scale, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    const drawTwig = (
      x: number,
      y: number,
      angle: number,
      length: number,
      branchWidth: number,
      depth: number,
      seed: number,
      wind: number,
      alpha: number,
      growth: number,
      toneIndex: number,
    ) => {
      const generation = 4 - depth;
      const stage = 0.12 + generation * 0.15 + seeded(seed) * 0.04;
      const branchProgress = smoothstep(stage, stage + 0.18, growth);
      if (branchProgress <= 0.01) return;

      const bend = (seeded(seed + 4.1) - 0.5) * 0.78;
      const windLift = wind * (0.14 + generation * 0.08);
      const endX = x + Math.cos(angle) * length + windLift;
      const endY = y + Math.sin(angle) * length;
      const points: CurvePoints = [
        x,
        y,
        x + Math.cos(angle + bend) * length * 0.38,
        y + Math.sin(angle + bend) * length * 0.35,
        x + Math.cos(angle - bend * 0.42) * length * 0.74 + windLift * 0.55,
        y + Math.sin(angle - bend * 0.42) * length * 0.72,
        endX,
        endY,
      ];
      drawCurve(points, depth >= 2 ? "barkDeep" : "bark", branchWidth, alpha, branchProgress);

      if (depth <= 0) {
        const leafProgress = smoothstep(stage + 0.08, stage + 0.22, growth);
        if (leafProgress > 0.01) {
          const tone = CANOPY_TONES[Math.abs(toneIndex) % CANOPY_TONES.length];
          drawLeafCluster(
            endX,
            endY,
            0.5 + seeded(seed + 8.3) * 0.38,
            wind,
            alpha * leafProgress * 0.95,
            tone,
            seeded(seed + 12.7) > 0.62 ? "gold" : undefined,
          );
        }
        return;
      }

      const spread = 0.36 + seeded(seed + 5.2) * 0.26;
      const nextLength = length * (0.66 + seeded(seed + 9.4) * 0.09);
      drawTwig(
        endX,
        endY,
        angle - spread,
        nextLength,
        Math.max(0.45, branchWidth * 0.65),
        depth - 1,
        seed + 19,
        wind,
        alpha,
        growth,
        toneIndex,
      );
      drawTwig(
        endX,
        endY,
        angle + spread * 0.84,
        nextLength * 0.95,
        Math.max(0.42, branchWidth * 0.6),
        depth - 1,
        seed + 37,
        wind,
        alpha,
        growth,
        toneIndex + 1,
      );
    };

    // Draw ambient background field
    const drawAmbient = (time: number, wind: number, fade: number) => {
      // 1. Subtle background grid ticks
      sceneContext.fillStyle = SCENE_TONES.ambient.css;
      const gridStep = 16;
      for (let x = 6; x < columns; x += gridStep) {
        for (let y = 6; y < rows; y += gridStep) {
          const tickAlpha = 0.038 + Math.sin(time * 0.0006 + x * 0.1 + y * 0.08) * 0.014;
          sceneContext.globalAlpha = fade * tickAlpha;
          sceneContext.beginPath();
          sceneContext.arc(x, y, 0.45, 0, Math.PI * 2);
          sceneContext.fill();
        }
      }

      // 2. Drifting living spores/particles across the entire view
      sceneContext.fillStyle = SCENE_TONES.spore.css;
      const sporeCount = 72;
      for (let index = 0; index < sporeCount; index += 1) {
        const originX = columns * (0.05 + seeded(index + 3) * 0.92);
        const originY = rows * seeded(index + 15);
        const drift = Math.sin(time * 0.00032 + index * 1.9) * (1.8 + seeded(index + 25) * 2.6);
        const x = originX + drift + wind * 0.65;
        const y = (originY + time * (0.00018 + seeded(index + 45) * 0.00012)) % (rows + 6) - 3;
        sceneContext.globalAlpha = fade * (0.12 + seeded(index + 55) * 0.35);
        sceneContext.beginPath();
        sceneContext.arc(x, y, 0.28 + seeded(index + 65) * 0.45, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    // Draw Hero Majestic ASCII Tree Crown
    const drawHeroTree = (time: number, scrollTop: number) => {
      const fade = 1;
      const compact = width <= 680;
      const scrollGrowth = smoothstep(0, height * 0.8, scrollTop);
      const growth = 0.88 + scrollGrowth * 0.12;
      const wind =
        Math.sin(time * 0.00048) * (compact ? 0.8 : 1.4) +
        Math.sin(time * 0.00021 + 1.9) * 0.7 +
        pointerX * (compact ? 0.5 : 1.3) +
        pointerY * 0.2;

      // Base location of the trunk
      const baseX = columns * (compact ? 0.78 : 0.74);
      const baseY = rows * 1.1;
      const forkX = columns * (compact ? 0.75 : 0.71);
      const forkY = rows * 0.46;

      // Immense ancient braided trunk width
      const trunkWidth = Math.max(
        compact ? 11.0 : 18.0,
        columns * (compact ? 0.11 : 0.088),
      );

      drawAmbient(time, wind, fade);

      // Atmospheric celestial glow field spanning canopy
      sceneContext.globalAlpha = fade * (isDark ? 0.18 : 0.14);
      sceneContext.fillStyle = SCENE_TONES[isDark ? "sky" : "gold"].css;
      sceneContext.beginPath();
      sceneContext.arc(columns * 0.72, rows * 0.16, compact ? 15 : 28, 0, Math.PI * 2);
      sceneContext.fill();
      sceneContext.globalAlpha = 1;

      // Draped Canopy Washes spanning across top from Left to Right
      const washes: Array<[number, number, number, number, SceneTone, number]> = [
        // Left arch washes framing top headline
        [0.22, 0.14, 0.12, 0.11, "moss", 7],
        [0.34, 0.10, 0.14, 0.12, "gold", 15],
        [0.48, 0.12, 0.16, 0.13, "leaf", 23],
        // Central & right massive crown washes
        [0.62, 0.08, 0.18, 0.14, "coral", 31],
        [0.74, 0.12, 0.18, 0.16, "leaf", 37],
        [0.86, 0.16, 0.17, 0.16, "moss", 41],
        [0.96, 0.26, 0.14, 0.18, "sky", 53],
        [0.85, 0.32, 0.17, 0.16, "violet", 67],
        [0.68, 0.28, 0.18, 0.16, "rose", 79],
        [0.52, 0.32, 0.15, 0.15, "leaf", 83],
        [0.90, 0.42, 0.13, 0.15, "gold", 97],
      ];
      washes.forEach(([x, y, radiusX, radiusY, tone, seed]) => {
        if (compact && x < 0.35) return;
        drawCanopyWash(
          columns * x,
          rows * y,
          columns * radiusX,
          rows * radiusY,
          tone,
          seed,
          wind,
          fade * (isDark ? 0.68 : 0.62),
          growth,
        );
      });

      // Massive Central Trunk Backbone
      const trunk: CurvePoints = [
        baseX,
        baseY,
        columns * 0.71,
        rows * 0.88,
        columns * 0.77,
        rows * 0.68,
        forkX,
        forkY,
      ];
      drawCurve(trunk, "barkDeep", trunkWidth, fade, smoothstep(0.01, 0.48, growth));

      // 9 Intertwined Braided Bark Ribbons
      const ribbons: Array<[number, CurvePoints, SceneTone, number]> = [
        [-0.45, [baseX - trunkWidth * 0.42, baseY, columns * 0.65, rows * 0.88, columns * 0.72, rows * 0.67, forkX - trunkWidth * 0.36, forkY], "bark", 0.28],
        [-0.30, [baseX - trunkWidth * 0.28, baseY, columns * 0.68, rows * 0.88, columns * 0.74, rows * 0.68, forkX - trunkWidth * 0.24, forkY], "barkLight", 0.18],
        [-0.15, [baseX - trunkWidth * 0.14, baseY, columns * 0.75, rows * 0.87, columns * 0.69, rows * 0.69, forkX - trunkWidth * 0.12, forkY], "bark", 0.24],
        [0.0, [baseX, baseY, columns * 0.70, rows * 0.85, columns * 0.78, rows * 0.67, forkX, forkY], "barkDeep", 0.32],
        [0.15, [baseX + trunkWidth * 0.14, baseY, columns * 0.73, rows * 0.84, columns * 0.75, rows * 0.66, forkX + trunkWidth * 0.12, forkY], "barkLight", 0.18],
        [0.30, [baseX + trunkWidth * 0.28, baseY, columns * 0.78, rows * 0.84, columns * 0.72, rows * 0.66, forkX + trunkWidth * 0.24, forkY], "bark", 0.24],
        [0.45, [baseX + trunkWidth * 0.42, baseY, columns * 0.74, rows * 0.85, columns * 0.82, rows * 0.68, forkX + trunkWidth * 0.36, forkY], "barkLight", 0.18],
        [-0.08, [baseX - trunkWidth * 0.08, baseY, columns * 0.69, rows * 0.86, columns * 0.76, rows * 0.68, forkX - trunkWidth * 0.06, forkY], "barkDeep", 0.2],
        [0.08, [baseX + trunkWidth * 0.08, baseY, columns * 0.74, rows * 0.83, columns * 0.74, rows * 0.66, forkX + trunkWidth * 0.06, forkY], "bark", 0.2],
      ];
      ribbons.forEach(([offset, points, tone, ribbonScale]) => {
        drawCurve(
          points.map((value, index) => (index % 2 === 0 ? value + offset * 1.6 : value)) as CurvePoints,
          tone,
          Math.max(1.2, trunkWidth * ribbonScale),
          fade * 0.96,
          smoothstep(0.04, 0.54, growth),
        );
      });

      // Primary Major Boughs branching outwards
      const boughs: Array<[CurvePoints, number, SceneTone, number]> = [
        // Left sweeping canopy bough extending over headline
        [
          [forkX, rows * 0.56, columns * 0.54, rows * 0.44, columns * 0.36, rows * 0.32, columns * 0.24, rows * 0.16],
          trunkWidth * 0.58,
          "barkDeep",
          0.88,
        ],
        // Left mid bough
        [
          [forkX - 2, rows * 0.52, columns * 0.58, rows * 0.38, columns * 0.48, rows * 0.24, columns * 0.42, rows * 0.10],
          trunkWidth * 0.52,
          "barkDeep",
          0.84,
        ],
        // Center crown rising vertical bough
        [
          [forkX, rows * 0.50, columns * 0.72, rows * 0.34, columns * 0.68, rows * 0.18, columns * 0.68, rows * 0.06],
          trunkWidth * 0.50,
          "bark",
          0.80,
        ],
        // Right sweeping primary bough
        [
          [forkX + 2, rows * 0.54, columns * 0.84, rows * 0.48, columns * 0.92, rows * 0.38, columns * 0.98, rows * 0.24],
          trunkWidth * 0.62,
          "barkDeep",
          0.88,
        ],
        // Right upper crown bough
        [
          [forkX + 1, rows * 0.46, columns * 0.82, rows * 0.32, columns * 0.90, rows * 0.16, columns * 0.96, rows * 0.08],
          trunkWidth * 0.48,
          "barkDeep",
          0.82,
        ],
        // Far left foliage arm
        [
          [forkX - 3, rows * 0.42, columns * 0.50, rows * 0.28, columns * 0.38, rows * 0.14, columns * 0.30, rows * 0.06],
          trunkWidth * 0.36,
          "bark",
          0.76,
        ],
        // Far right foliage arm
        [
          [forkX + 3, rows * 0.46, columns * 0.86, rows * 0.44, columns * 0.94, rows * 0.46, columns * 1.0, rows * 0.38],
          trunkWidth * 0.38,
          "bark",
          0.76,
        ],
      ];
      boughs.forEach(([points, branchWidth, tone, threshold], index) => {
        drawCurve(
          points.map((value, pointIndex) =>
            pointIndex % 2 === 0 && pointIndex > 1 ? value + wind * (0.09 + index * 0.014) : value,
          ) as CurvePoints,
          tone,
          Math.max(1.4, branchWidth),
          fade,
          smoothstep(0.22, threshold, growth),
        );
      });

      // Recursive Twig Clusters spanning across the crown & arch
      const twigOrigins: Array<[number, number, number, number, number]> = [
        [0.24, 0.16, -2.75, 18, 11],
        [0.30, 0.06, -2.45, 16, 17],
        [0.42, 0.10, -2.05, 18, 31],
        [0.68, 0.06, -1.55, 17, 47],
        [0.96, 0.08, -0.65, 18, 61],
        [0.98, 0.24, -0.12, 18, 73],
        [1.0, 0.38, 0.30, 15, 89],
        [0.50, 0.28, -2.85, 15, 101],
        [0.84, 0.34, 0.06, 15, 113],
      ];
      twigOrigins.forEach(([x, y, angle, length, seed], index) => {
        if (compact && x < 0.32) return;
        drawTwig(
          columns * x,
          rows * y,
          angle,
          compact ? length * 0.75 : length,
          compact ? 1.15 : 1.65,
          4,
          seed,
          wind,
          fade * 0.96,
          growth,
          index,
        );
      });

      // Luminous Commit Node at the main fork
      sceneContext.globalAlpha = fade;
      sceneContext.fillStyle = SCENE_TONES.node.css;
      sceneContext.beginPath();
      sceneContext.arc(forkX, rows * 0.56, compact ? 1.3 : 1.9, 0, Math.PI * 2);
      sceneContext.fill();
      sceneContext.globalAlpha = 1;
    };

    // Draw the World-Scale Document Tree through sections to roots
    const drawWorldTree = (time: number, scrollTop: number, documentHeight: number) => {
      const compact = width <= 680;
      const wind =
        Math.sin(time * 0.00042 + scrollTop * 0.00018) * (compact ? 0.5 : 1.0) +
        Math.sin(time * 0.00019 + 2.6) * 0.4 +
        pointerX * (compact ? 0.25 : 0.6) +
        pointerY * 0.1;

      // Section waypoints that guide the trunk curve
      const waypoints = [
        { y: height * 0.8, x: compact ? 0.8 : 0.74 },
        ...sectionAnchors.map((section) => ({
          y: section.top + Math.min(84, section.height * 0.08),
          x: compact ? 0.08 : section.side === "left" ? 0.82 : 0.18,
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
      const pageProgress = clamp(scrollTop / Math.max(1, documentHeight - height));

      // Substantial trunk thickness throughout document scroll (10-18 cells thick)
      const trunkWidth = compact
        ? 8.0 + Math.sin(pageProgress * Math.PI) * 1.8
        : columns * (0.075 + Math.sin(pageProgress * Math.PI) * 0.022);

      const segmentSize = Math.max(280, height * 0.34);
      const firstSegment = Math.max(
        height * 0.75,
        Math.floor((scrollTop - height * 0.6) / segmentSize) * segmentSize,
      );
      const lastSegment = Math.min(
        documentHeight + height * 0.25,
        scrollTop + height * 1.6,
      );

      // Render Continuous Trunk Segments
      for (let worldY = firstSegment; worldY < lastSegment; worldY += segmentSize) {
        const nextWorldY = Math.min(worldY + segmentSize + 1, documentHeight + height * 0.25);
        const y0 = toScreenRow(worldY);
        const y1 = toScreenRow(nextWorldY);
        const x0 = trunkXAt(worldY);
        const x1 = trunkXAt(nextWorldY);
        const segmentIndex = Math.floor(worldY / segmentSize);
        const bend = (seeded(segmentIndex * 13 + 7) - 0.5) * (compact ? 1.8 : 4.8);
        const points: CurvePoints = [
          x0,
          y0,
          x0 + bend + wind * 0.14,
          y0 + (y1 - y0) * 0.34,
          x1 - bend + wind * 0.22,
          y0 + (y1 - y0) * 0.68,
          x1,
          y1,
        ];

        // Central Core Wood
        drawCurve(points, "barkDeep", trunkWidth, 0.98);

        // Multiple Bark Ribbons for Braided Grain Look
        const ribbons: Array<[number, SceneTone, number]> = [
          [-0.40, "bark", 0.28],
          [-0.20, "barkLight", 0.14],
          [0.0, "barkDeep", 0.24],
          [0.20, "barkLight", 0.14],
          [0.40, "bark", 0.26],
          [-0.10, "bark", 0.16],
          [0.10, "barkLight", 0.12],
        ];
        ribbons.forEach(([offsetScale, tone, widthScale], ribbonIndex) => {
          const offset = trunkWidth * offsetScale;
          const ripple = Math.sin(segmentIndex * 2.2 + ribbonIndex) * (compact ? 0.45 : 0.95);
          drawCurve(
            [
              points[0] + offset,
              points[1],
              points[2] - offset * 0.5 + ripple,
              points[3],
              points[4] + offset * 0.65 - ripple,
              points[5],
              points[6] + offset,
              points[7],
            ],
            tone,
            Math.max(0.8, trunkWidth * widthScale),
            tone === "barkLight" ? 0.82 : 0.95,
          );
        });

        // Bark Knots and Rings
        const knotWorldY = worldY + segmentSize * (0.42 + seeded(segmentIndex + 18) * 0.26);
        const knotY = toScreenRow(knotWorldY);
        const knotX = trunkXAt(knotWorldY);
        sceneContext.globalAlpha = 0.75;
        sceneContext.strokeStyle = SCENE_TONES.barkLight.css;
        sceneContext.lineWidth = Math.max(0.75, trunkWidth * 0.085);
        sceneContext.beginPath();
        sceneContext.ellipse(
          knotX + (seeded(segmentIndex + 44) - 0.5) * trunkWidth * 0.5,
          knotY,
          Math.max(1.4, trunkWidth * 0.34),
          Math.max(1.0, trunkWidth * 0.18),
          seeded(segmentIndex + 61) * Math.PI,
          0,
          Math.PI * 2,
        );
        sceneContext.stroke();
        sceneContext.globalAlpha = 1;
      }

      // Render Section Anchor Limbs & Commit Waypoints
      sectionAnchors.forEach((section) => {
        const worldY = section.top + Math.min(84, section.height * 0.08);
        const screenY = toScreenRow(worldY);
        if (screenY < -32 || screenY > rows + 32) return;

        const sectionGrowth = 1 - smoothstep(rows * 0.78, rows * 1.06, screenY);
        const trunkX = trunkXAt(worldY);
        const endX = compact
          ? columns * 0.18
          : columns * (section.side === "left" ? 0.52 : 0.48);
        const endY = screenY - (compact ? 2.8 : 6.0 + (section.index % 2) * 2.0);
        const tone = toneForIndex(section.index);
        const branchWidth = compact ? 2.2 : Math.max(3.2, trunkWidth * 0.44);

        // Heavy bough connecting trunk to section
        drawCurve(
          [
            trunkX,
            screenY,
            trunkX + (endX - trunkX) * 0.28,
            screenY - 1.2,
            trunkX + (endX - trunkX) * 0.7,
            endY + 1.6,
            endX,
            endY,
          ],
          section.index % 2 === 0 ? "bark" : "barkDeep",
          branchWidth,
          0.98,
          sectionGrowth,
        );
        drawCurve(
          [
            trunkX,
            screenY,
            trunkX + (endX - trunkX) * 0.3,
            screenY,
            trunkX + (endX - trunkX) * 0.72,
            endY,
            endX,
            endY,
          ],
          "barkLight",
          Math.max(0.7, branchWidth * 0.24),
          0.8,
          sectionGrowth,
        );

        if (sectionGrowth > 0.05) {
          // Lush section canopy wash
          drawCanopyWash(
            endX,
            endY - 1.5,
            compact ? 6.5 : 13.0,
            compact ? 5.0 : 8.5,
            tone,
            section.index * 31 + 11,
            wind,
            sectionGrowth * 0.45,
            1,
          );
          // Delicate section twigs & leaves
          drawTwig(
            endX,
            endY,
            compact ? -0.25 : section.side === "left" ? -2.78 : -0.38,
            compact ? 8.0 : 18 + (section.index % 3) * 2.4,
            compact ? 1.1 : 1.55,
            compact ? 2 : 4,
            section.index * 41 + 23,
            wind,
            sectionGrowth * 0.95,
            1,
            section.index,
          );
          drawLeafCluster(
            endX,
            endY,
            compact ? 0.52 : 0.88,
            wind,
            sectionGrowth * 0.94,
            tone,
            section.index % 3 === 0 ? "gold" : undefined,
          );
        }

        // Section Commit Node Anchor
        sceneContext.globalAlpha = sectionGrowth;
        sceneContext.fillStyle = SCENE_TONES.node.css;
        sceneContext.beginPath();
        sceneContext.arc(trunkX, screenY, compact ? 0.95 : 1.45, 0, Math.PI * 2);
        sceneContext.fill();
        sceneContext.globalAlpha = 1;
      });

      // Intermediate Organic Sprigs
      const sprigSpacing = Math.max(380, height * 0.48);
      const firstSprig = Math.floor((scrollTop - height * 0.4) / sprigSpacing) * sprigSpacing;
      for (
        let worldY = Math.max(height * 1.0, firstSprig);
        worldY < scrollTop + height * 1.5;
        worldY += sprigSpacing
      ) {
        if (sectionAnchors.some((section) => Math.abs(section.top - worldY) < 220)) continue;
        const sprigIndex = Math.floor(worldY / sprigSpacing);
        const screenY = toScreenRow(worldY);
        const trunkX = trunkXAt(worldY);
        const direction = sprigIndex % 2 === 0 ? 1 : -1;
        const reach = compact ? 6.5 : 14 + seeded(sprigIndex + 7) * 9;
        const endX = trunkX + direction * reach;
        const endY = screenY - 3.2 - seeded(sprigIndex + 17) * 4;
        const tone = toneForIndex(sprigIndex);
        drawCurve(
          [trunkX, screenY, trunkX + direction * reach * 0.28, screenY, endX - direction * 2.5, endY, endX, endY],
          "bark",
          compact ? 0.9 : 1.35,
          0.82,
        );
        drawLeafCluster(endX, endY, compact ? 0.38 : 0.6, wind, 0.76, tone);
      }

      // Sprawling Footer Root System
      const rootStart = documentHeight - height * 0.95;
      if (scrollTop + height > rootStart - height * 0.3) {
        const rootX = trunkXAt(rootStart);
        const rootY = toScreenRow(rootStart);
        const rootEndY = toScreenRow(documentHeight + height * 0.12);
        const rootEnds = compact
          ? [0.03, 0.25, 0.5, 0.78, 0.97]
          : [0.02, 0.12, 0.25, 0.42, 0.58, 0.74, 0.88, 0.98];

        rootEnds.forEach((endFraction, index) => {
          const endX = columns * endFraction;
          const direction = endX < rootX ? -1 : 1;
          drawCurve(
            [
              rootX,
              rootY,
              rootX + direction * trunkWidth * (0.9 + index * 0.1),
              rootY + (rootEndY - rootY) * 0.28,
              endX - direction * columns * 0.08,
              rootY + (rootEndY - rootY) * 0.7,
              endX,
              rootEndY,
            ],
            index % 2 === 0 ? "barkDeep" : "bark",
            Math.max(1.2, trunkWidth * (0.36 + (index % 3) * 0.05)),
            0.96,
          );
        });
      }
    };

    const toneForIndex = (index: number): SceneTone =>
      CANOPY_TONES[Math.abs(index) % CANOPY_TONES.length];

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

    // Sample offscreen raster buffer and map into crisp ASCII characters
    const renderAscii = () => {
      const pixels = sceneContext.getImageData(0, 0, columns, rows).data;
      context.clearRect(0, 0, width, height);
      context.font = `600 ${Math.round(cellHeight * 0.84)}px "JetBrains Mono", "SFMono-Regular", Consolas, monospace`;

      const alphaAt = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= columns || y >= rows) return 0;
        return pixels[(y * columns + x) * 4 + 3] / 255;
      };

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.035) continue;

          const tone = nearestTone(pixels[index], pixels[index + 1], pixels[index + 2]);
          let character = ".";

          if (tone === "node") {
            character = alpha > 0.45 ? "●" : "o";
          } else if (tone === "leaf" || tone === "moss") {
            character = alpha > 0.72 ? "@" : alpha > 0.45 ? "*" : alpha > 0.2 ? "+" : ".";
          } else if (tone === "gold") {
            character = alpha > 0.65 ? "o" : alpha > 0.28 ? "*" : ".";
          } else if (tone === "coral") {
            character = alpha > 0.6 ? "%" : alpha > 0.25 ? "*" : ".";
          } else if (tone === "rose") {
            character = alpha > 0.6 ? "@" : alpha > 0.25 ? "+" : ".";
          } else if (tone === "violet") {
            character = alpha > 0.58 ? "~" : alpha > 0.24 ? "+" : ".";
          } else if (tone === "sky") {
            character = alpha > 0.55 ? "+" : ".";
          } else if (tone === "spore") {
            character = alpha > 0.38 ? ":" : "·";
          } else if (tone === "ambient") {
            character = "·";
          } else {
            // Bark & structural wood texturing
            const horizontalGradient = alphaAt(x + 1, y) - alphaAt(x - 1, y);
            const verticalGradient = alphaAt(x, y + 1) - alphaAt(x, y - 1);
            if (Math.abs(horizontalGradient) > Math.abs(verticalGradient) * 1.3) {
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
            alpha * 1.38,
            0.14,
            tone === "barkDeep" ? 0.96 : 0.92,
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
      if (!reducedMotion.matches && time - lastFrame < 33) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;

      // Smooth pointer interpolation
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
        drawHeroTree(motionTime, scrollTop);
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

    resize();
    start();
    resizeObserver.observe(document.body);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
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
