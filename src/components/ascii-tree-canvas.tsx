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
  | "spore";

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

const SCENE_TONES: Record<SceneTone, { css: string; rgb: [number, number, number] }> = {
  barkDeep: { css: "rgb(72, 34, 24)", rgb: [72, 34, 24] },
  bark: { css: "rgb(164, 84, 38)", rgb: [164, 84, 38] },
  barkLight: { css: "rgb(236, 158, 68)", rgb: [236, 158, 68] },
  moss: { css: "rgb(35, 150, 76)", rgb: [35, 150, 76] },
  leaf: { css: "rgb(38, 225, 104)", rgb: [38, 225, 104] },
  gold: { css: "rgb(244, 207, 42)", rgb: [244, 207, 42] },
  coral: { css: "rgb(242, 72, 35)", rgb: [242, 72, 35] },
  rose: { css: "rgb(227, 38, 137)", rgb: [227, 38, 137] },
  violet: { css: "rgb(114, 60, 238)", rgb: [114, 60, 238] },
  sky: { css: "rgb(48, 180, 235)", rgb: [48, 180, 235] },
  node: { css: "rgb(38, 82, 250)", rgb: [38, 82, 250] },
  spore: { css: "rgb(214, 218, 216)", rgb: [214, 218, 216] },
};

const CANOPY_TONES: SceneTone[] = ["moss", "gold", "coral", "rose", "violet", "sky"];

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
    let cellWidth = width <= 680 ? 6.8 : 6.4;
    let cellHeight = width <= 680 ? 10.5 : 10.8;
    let columns = Math.ceil(width / cellWidth);
    let rows = Math.ceil(height / cellHeight);
    let animationFrame: number | null = null;
    let lastFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let sectionAnchors: SectionAnchor[] = [];
    let isDark = document.documentElement.classList.contains("dark");
    let palette: Palette = {
      barkDeep: "#393a33",
      bark: "#5c594d",
      barkLight: "#8c8979",
      moss: "#3e7652",
      leaf: "#2f9e5c",
      gold: "#d89a22",
      coral: "#d5614d",
      rose: "#bb4f79",
      violet: "#725f99",
      sky: "#4b7894",
      node: "#1d6fa5",
      spore: "#8e8174",
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
      };
    };

    const measureSections = () => {
      const scrollTop = window.scrollY;
      sectionAnchors = SECTION_IDS.flatMap((id, index) => {
        const section = document.getElementById(id);
        if (!section) return [];
        const bounds = section.getBoundingClientRect();
        return [{
          top: bounds.top + scrollTop,
          height: bounds.height,
          side: section.dataset.treeSide === "right" ? "right" : "left",
          index,
        }];
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      density = Math.min(2, window.devicePixelRatio || 1);
      cellWidth = width <= 680 ? 6.8 : 6.4;
      cellHeight = width <= 680 ? 10.5 : 10.8;
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
        sceneContext.setLineDash([Math.max(0.25, distances * visibleProgress), distances + 2]);
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
      const scale = smoothstep(0.42, 0.9, growth);
      if (scale <= 0.01) return;

      sceneContext.fillStyle = SCENE_TONES[tone].css;
      for (let index = 0; index < 13; index += 1) {
        const angle = seeded(seed + index * 3.1) * Math.PI * 2;
        const distance = Math.sqrt(seeded(seed + index * 7.7));
        const lobeX = x + Math.cos(angle) * radiusX * distance + wind * (0.12 + index * 0.006);
        const lobeY = y + Math.sin(angle) * radiusY * distance;
        const lobeRadiusX = radiusX * (0.22 + seeded(seed + index * 11.3) * 0.24) * scale;
        const lobeRadiusY = radiusY * (0.18 + seeded(seed + index * 13.9) * 0.23) * scale;
        sceneContext.globalAlpha = alpha * (0.42 + seeded(seed + index * 5.3) * 0.45);
        sceneContext.beginPath();
        sceneContext.ellipse(
          lobeX,
          lobeY,
          Math.max(0.6, lobeRadiusX),
          Math.max(0.45, lobeRadiusY),
          angle * 0.24,
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
        [0, -2.2],
        [-2.4, -0.8],
        [2.4, -0.8],
        [-3.6, -2.6],
        [3.6, -2.7],
        [-1.4, -4.2],
        [1.6, -4.5],
      ];
      sceneContext.globalAlpha = alpha;
      sceneContext.fillStyle = SCENE_TONES[tone].css;
      offsets.forEach(([offsetX, offsetY], index) => {
        sceneContext.beginPath();
        sceneContext.ellipse(
          x + (offsetX + wind * (0.22 + index * 0.02)) * scale,
          y + offsetY * scale,
          Math.max(0.65, 1.65 * scale),
          Math.max(0.5, 0.82 * scale),
          (index - 3) * 0.42,
          0,
          Math.PI * 2,
        );
        sceneContext.fill();
      });
      if (bloomTone) {
        sceneContext.fillStyle = SCENE_TONES[bloomTone].css;
        sceneContext.beginPath();
        sceneContext.arc(x + wind * scale, y - 6.4 * scale, 0.85 * scale, 0, Math.PI * 2);
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
      const generation = 3 - depth;
      const stage = 0.2 + generation * 0.18 + seeded(seed) * 0.04;
      const branchProgress = smoothstep(stage, stage + 0.18, growth);
      if (branchProgress <= 0.01) return;

      const bend = (seeded(seed + 4.1) - 0.5) * 0.72;
      const windLift = wind * (0.1 + generation * 0.07);
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
        const leafProgress = smoothstep(stage + 0.1, stage + 0.22, growth);
        if (leafProgress > 0.01) {
          const tone = CANOPY_TONES[Math.abs(toneIndex) % CANOPY_TONES.length];
          drawLeafCluster(
            endX,
            endY,
            0.34 + seeded(seed + 8.3) * 0.3,
            wind,
            alpha * leafProgress * 0.88,
            tone,
            seeded(seed + 12.7) > 0.78 ? "gold" : undefined,
          );
        }
        return;
      }

      const spread = 0.3 + seeded(seed + 5.2) * 0.24;
      const nextLength = length * (0.58 + seeded(seed + 9.4) * 0.08);
      drawTwig(
        endX,
        endY,
        angle - spread,
        nextLength,
        Math.max(0.34, branchWidth * 0.58),
        depth - 1,
        seed + 17,
        wind,
        alpha,
        growth,
        toneIndex,
      );
      drawTwig(
        endX,
        endY,
        angle + spread * 0.82,
        nextLength * 0.92,
        Math.max(0.32, branchWidth * 0.54),
        depth - 1,
        seed + 31,
        wind,
        alpha,
        growth,
        toneIndex + 1,
      );
    };

    const drawAmbient = (time: number, wind: number, fade: number) => {
      sceneContext.fillStyle = SCENE_TONES.spore.css;
      for (let index = 0; index < 34; index += 1) {
        const originX = columns * (0.43 + seeded(index + 2) * 0.54);
        const originY = rows * seeded(index + 12);
        const drift = Math.sin(time * 0.00025 + index * 1.7) * (1 + seeded(index + 22) * 1.8);
        const x = originX + drift + wind * 0.4;
        const y = (originY + time * (0.00012 + seeded(index + 42) * 0.00008)) % (rows + 4) - 2;
        sceneContext.globalAlpha = fade * (0.08 + seeded(index + 52) * 0.2);
        sceneContext.beginPath();
        sceneContext.arc(x, y, 0.18 + seeded(index + 62) * 0.28, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;
    };

    const drawHeroTree = (time: number, scrollTop: number) => {
      const fade = 1;

      const compact = width <= 680;
      const scrollGrowth = smoothstep(0, height * 0.72, scrollTop);
      const growth = 0.8 + scrollGrowth * 0.2;
      const wind =
        Math.sin(time * 0.00043) * (compact ? 0.7 : 1.25) +
        Math.sin(time * 0.00019 + 1.7) * 0.6 +
        pointerX * (compact ? 0.45 : 1.15) +
        pointerY * 0.16;
      const baseX = columns * (compact ? 0.78 : 0.74);
      const baseY = rows * 1.04;
      const forkX = columns * (compact ? 0.76 : 0.715);
      const forkY = rows * 0.51;
      const trunkWidth = Math.max(compact ? 3.5 : 5.2, columns * (compact ? 0.055 : 0.038));

      drawAmbient(time, wind, fade);

      sceneContext.globalAlpha = fade * (isDark ? 0.13 : 0.1);
      sceneContext.fillStyle = SCENE_TONES[isDark ? "sky" : "gold"].css;
      sceneContext.beginPath();
      sceneContext.arc(columns * 0.9, rows * 0.14, compact ? 5 : 7.5, 0, Math.PI * 2);
      sceneContext.fill();
      sceneContext.globalAlpha = 1;

      const washes: Array<[number, number, number, number, SceneTone, number]> = [
        [0.53, 0.18, 0.105, 0.105, "gold", 11],
        [0.65, 0.13, 0.11, 0.09, "coral", 23],
        [0.76, 0.16, 0.11, 0.11, "rose", 37],
        [0.88, 0.2, 0.105, 0.13, "violet", 41],
        [0.95, 0.34, 0.075, 0.14, "violet", 53],
        [0.82, 0.32, 0.11, 0.12, "coral", 67],
        [0.62, 0.31, 0.105, 0.12, "moss", 79],
        [0.53, 0.4, 0.075, 0.115, "sky", 83],
        [0.91, 0.49, 0.08, 0.11, "rose", 97],
      ];
      washes.forEach(([x, y, radiusX, radiusY, tone, seed]) => {
        if (compact && x < 0.54) return;
        drawCanopyWash(
          columns * x,
          rows * y,
          columns * radiusX,
          rows * radiusY,
          tone,
          seed,
          wind,
          fade * (isDark ? 0.58 : 0.54),
          growth,
        );
      });

      const trunk: CurvePoints = [
        baseX,
        baseY,
        columns * 0.7,
        rows * 0.84,
        columns * 0.78,
        rows * 0.68,
        forkX,
        forkY,
      ];
      drawCurve(trunk, "barkDeep", trunkWidth, fade, smoothstep(0.02, 0.46, growth));

      const ribbons: Array<[number, CurvePoints, SceneTone, number]> = [
        [-0.34, [baseX - 3, baseY, columns * 0.67, rows * 0.86, columns * 0.74, rows * 0.67, forkX - 2.4, forkY], "bark", 0.19],
        [-0.15, [baseX - 1.2, baseY, columns * 0.75, rows * 0.86, columns * 0.69, rows * 0.69, forkX - 1.1, forkY], "barkLight", 0.1],
        [0.05, [baseX + 0.4, baseY, columns * 0.7, rows * 0.84, columns * 0.79, rows * 0.67, forkX + 0.4, forkY], "bark", 0.2],
        [0.22, [baseX + 2, baseY, columns * 0.77, rows * 0.83, columns * 0.72, rows * 0.66, forkX + 1.6, forkY], "barkLight", 0.09],
        [0.38, [baseX + 3.3, baseY, columns * 0.72, rows * 0.84, columns * 0.8, rows * 0.68, forkX + 2.8, forkY], "bark", 0.16],
      ];
      ribbons.forEach(([offset, points, tone, ribbonScale]) => {
        drawCurve(
          points.map((value, index) => (index % 2 === 0 ? value + offset : value)) as CurvePoints,
          tone,
          Math.max(0.65, trunkWidth * ribbonScale),
          fade * 0.92,
          smoothstep(0.08, 0.52, growth),
        );
      });

      const boughs: Array<[CurvePoints, number, SceneTone, number]> = [
        [[forkX, rows * 0.58, columns * 0.65, rows * 0.5, columns * 0.54, rows * 0.42, columns * 0.48, rows * 0.28], trunkWidth * 0.53, "barkDeep", 0.86],
        [[forkX - 1, rows * 0.55, columns * 0.66, rows * 0.43, columns * 0.6, rows * 0.28, columns * 0.55, rows * 0.16], trunkWidth * 0.46, "barkDeep", 0.79],
        [[forkX, rows * 0.54, columns * 0.74, rows * 0.39, columns * 0.72, rows * 0.24, columns * 0.72, rows * 0.11], trunkWidth * 0.42, "bark", 0.76],
        [[forkX + 1, rows * 0.57, columns * 0.79, rows * 0.51, columns * 0.86, rows * 0.43, columns * 0.94, rows * 0.31], trunkWidth * 0.55, "barkDeep", 0.85],
        [[forkX, rows * 0.48, columns * 0.78, rows * 0.37, columns * 0.85, rows * 0.21, columns * 0.91, rows * 0.13], trunkWidth * 0.43, "barkDeep", 0.8],
        [[forkX - 2, rows * 0.44, columns * 0.63, rows * 0.34, columns * 0.55, rows * 0.2, columns * 0.49, rows * 0.1], trunkWidth * 0.29, "bark", 0.72],
        [[forkX + 2, rows * 0.49, columns * 0.82, rows * 0.48, columns * 0.9, rows * 0.5, columns * 0.98, rows * 0.43], trunkWidth * 0.3, "bark", 0.72],
      ];
      boughs.forEach(([points, branchWidth, tone, threshold], index) => {
        drawCurve(
          points.map((value, pointIndex) =>
            pointIndex % 2 === 0 && pointIndex > 1 ? value + wind * (0.08 + index * 0.012) : value,
          ) as CurvePoints,
          tone,
          Math.max(0.9, branchWidth),
          fade,
          smoothstep(0.28, threshold, growth),
        );
      });

      const twigOrigins: Array<[number, number, number, number, number]> = [
        [0.48, 0.28, -2.56, 12, 17],
        [0.55, 0.16, -2.03, 13, 31],
        [0.72, 0.11, -1.54, 12, 47],
        [0.91, 0.13, -0.72, 14, 61],
        [0.94, 0.31, -0.2, 13, 73],
        [0.98, 0.43, 0.23, 10, 89],
        [0.61, 0.34, -2.75, 10, 101],
      ];
      twigOrigins.forEach(([x, y, angle, length, seed], index) => {
        if (compact && x < 0.52) return;
        drawTwig(
          columns * x,
          rows * y,
          angle,
          compact ? length * 0.7 : length,
          compact ? 0.85 : 1.18,
          3,
          seed,
          wind,
          fade * 0.94,
          growth,
          index,
        );
      });

      sceneContext.globalAlpha = fade;
      sceneContext.fillStyle = SCENE_TONES.node.css;
      sceneContext.beginPath();
      sceneContext.arc(forkX, rows * 0.58, compact ? 0.85 : 1.15, 0, Math.PI * 2);
      sceneContext.fill();
      sceneContext.globalAlpha = 1;
    };

    const drawWorldTree = (time: number, scrollTop: number, documentHeight: number) => {
      const compact = width <= 680;
      const wind =
        Math.sin(time * 0.00038 + scrollTop * 0.00016) * (compact ? 0.42 : 0.9) +
        Math.sin(time * 0.00017 + 2.4) * 0.34 +
        pointerX * (compact ? 0.2 : 0.5) +
        pointerY * 0.08;

      const waypoints = [
        { y: height * 0.82, x: compact ? 0.82 : 0.74 },
        ...sectionAnchors.map((section) => ({
          y: section.top + Math.min(92, section.height * 0.1),
          x: compact ? 0.075 : section.side === "left" ? 0.84 : 0.16,
        })),
        { y: documentHeight - height * 0.42, x: compact ? 0.09 : 0.5 },
      ].sort((a, b) => a.y - b.y);

      const trunkXAt = (worldY: number) => {
        if (compact) {
          const handoff = smoothstep(height * 0.78, height * 1.42, worldY);
          const x = 0.78 + (0.075 - 0.78) * handoff;
          return columns * (x + Math.sin(worldY * 0.0017) * 0.013 * handoff);
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
          const organicDrift = Math.sin(worldY * 0.0031 + index * 1.7) * 0.012;
          return columns * (current.x + (next.x - current.x) * progress + organicDrift);
        }
        return columns * last.x;
      };

      const toScreenRow = (worldY: number) => (worldY - scrollTop) / cellHeight;
      const pageProgress = clamp(scrollTop / Math.max(1, documentHeight - height));
      const trunkWidth = compact
        ? 3.2 + Math.sin(pageProgress * Math.PI) * 0.7
        : columns * (0.032 + Math.sin(pageProgress * Math.PI) * 0.009);
      const segmentSize = Math.max(260, height * 0.32);
      const firstSegment = Math.max(
        height * 0.78,
        Math.floor((scrollTop - height * 0.55) / segmentSize) * segmentSize,
      );
      const lastSegment = Math.min(
        documentHeight + height * 0.2,
        scrollTop + height * 1.55,
      );

      for (let worldY = firstSegment; worldY < lastSegment; worldY += segmentSize) {
        const nextWorldY = Math.min(worldY + segmentSize + 1, documentHeight + height * 0.2);
        const y0 = toScreenRow(worldY);
        const y1 = toScreenRow(nextWorldY);
        const x0 = trunkXAt(worldY);
        const x1 = trunkXAt(nextWorldY);
        const segmentIndex = Math.floor(worldY / segmentSize);
        const bend = (seeded(segmentIndex * 13 + 7) - 0.5) * (compact ? 1.2 : 3.8);
        const points: CurvePoints = [
          x0,
          y0,
          x0 + bend + wind * 0.1,
          y0 + (y1 - y0) * 0.34,
          x1 - bend + wind * 0.18,
          y0 + (y1 - y0) * 0.68,
          x1,
          y1,
        ];

        drawCurve(points, "barkDeep", trunkWidth, 0.96);
        const ribbons: Array<[number, SceneTone, number]> = [
          [-0.32, "bark", 0.18],
          [-0.12, "barkLight", 0.075],
          [0.06, "bark", 0.16],
          [0.23, "barkLight", 0.06],
          [0.37, "bark", 0.13],
        ];
        ribbons.forEach(([offsetScale, tone, widthScale], ribbonIndex) => {
          const offset = trunkWidth * offsetScale;
          const ripple = Math.sin(segmentIndex * 2.1 + ribbonIndex) * (compact ? 0.3 : 0.7);
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
            Math.max(0.46, trunkWidth * widthScale),
            tone === "barkLight" ? 0.74 : 0.9,
          );
        });

        const knotWorldY = worldY + segmentSize * (0.44 + seeded(segmentIndex + 18) * 0.24);
        const knotY = toScreenRow(knotWorldY);
        const knotX = trunkXAt(knotWorldY);
        sceneContext.globalAlpha = 0.68;
        sceneContext.strokeStyle = SCENE_TONES.barkLight.css;
        sceneContext.lineWidth = Math.max(0.45, trunkWidth * 0.07);
        sceneContext.beginPath();
        sceneContext.ellipse(
          knotX + (seeded(segmentIndex + 44) - 0.5) * trunkWidth * 0.5,
          knotY,
          Math.max(0.8, trunkWidth * 0.27),
          Math.max(0.65, trunkWidth * 0.12),
          seeded(segmentIndex + 61) * Math.PI,
          0,
          Math.PI * 2,
        );
        sceneContext.stroke();
        sceneContext.globalAlpha = 1;
      }

      sectionAnchors.forEach((section) => {
        const worldY = section.top + Math.min(92, section.height * 0.1);
        const screenY = toScreenRow(worldY);
        if (screenY < -24 || screenY > rows + 24) return;

        const sectionGrowth = 1 - smoothstep(rows * 0.8, rows * 1.08, screenY);
        const trunkX = trunkXAt(worldY);
        const endX = compact
          ? columns * 0.2
          : columns * (section.side === "left" ? 0.57 : 0.43);
        const endY = screenY - (compact ? 2.5 : 5 + (section.index % 2) * 1.8);
        const tone = toneForIndex(section.index);
        const branchWidth = compact ? 1.05 : Math.max(1.5, trunkWidth * 0.34);

        drawCurve(
          [
            trunkX,
            screenY,
            trunkX + (endX - trunkX) * 0.28,
            screenY - 0.8,
            trunkX + (endX - trunkX) * 0.7,
            endY + 1.3,
            endX,
            endY,
          ],
          section.index % 3 === 0 ? "bark" : "barkDeep",
          branchWidth,
          0.96,
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
          Math.max(0.42, branchWidth * 0.13),
          0.68,
          sectionGrowth,
        );

        if (sectionGrowth > 0.05) {
          drawCanopyWash(
            endX,
            endY - 1,
            compact ? 4 : 8.5,
            compact ? 3 : 5.5,
            tone,
            section.index * 29 + 11,
            wind,
            sectionGrowth * 0.3,
            1,
          );
          drawTwig(
            endX,
            endY,
            compact ? -0.22 : section.side === "left" ? -2.72 : -0.42,
            compact ? 5.5 : 13 + (section.index % 3) * 1.7,
            compact ? 0.72 : 1.08,
            compact ? 1 : 3,
            section.index * 37 + 23,
            wind,
            sectionGrowth * 0.9,
            1,
            section.index,
          );
          drawLeafCluster(
            endX,
            endY,
            compact ? 0.34 : 0.58,
            wind,
            sectionGrowth * 0.86,
            tone,
            section.index % 3 === 0 ? "gold" : undefined,
          );
        }

        sceneContext.globalAlpha = sectionGrowth;
        sceneContext.fillStyle = SCENE_TONES.node.css;
        sceneContext.beginPath();
        sceneContext.arc(trunkX, screenY, compact ? 0.54 : 0.86, 0, Math.PI * 2);
        sceneContext.fill();
        sceneContext.globalAlpha = 1;
      });

      const sprigSpacing = Math.max(440, height * 0.58);
      const firstSprig = Math.floor((scrollTop - height * 0.4) / sprigSpacing) * sprigSpacing;
      for (
        let worldY = Math.max(height * 1.1, firstSprig);
        worldY < scrollTop + height * 1.4;
        worldY += sprigSpacing
      ) {
        if (sectionAnchors.some((section) => Math.abs(section.top - worldY) < 240)) continue;
        const sprigIndex = Math.floor(worldY / sprigSpacing);
        const screenY = toScreenRow(worldY);
        const trunkX = trunkXAt(worldY);
        const direction = sprigIndex % 2 === 0 ? 1 : -1;
        const reach = compact ? 4.5 : 8 + seeded(sprigIndex + 7) * 6;
        const endX = trunkX + direction * reach;
        const endY = screenY - 2.6 - seeded(sprigIndex + 17) * 3;
        const tone = toneForIndex(sprigIndex);
        drawCurve(
          [trunkX, screenY, trunkX + direction * reach * 0.28, screenY, endX - direction * 2, endY, endX, endY],
          "bark",
          compact ? 0.58 : 0.86,
          0.68,
        );
        drawLeafCluster(endX, endY, compact ? 0.24 : 0.38, wind, 0.58, tone);
      }

      const sporeBand = Math.floor(scrollTop / height);
      sceneContext.fillStyle = SCENE_TONES.spore.css;
      for (let index = 0; index < 28; index += 1) {
        const seed = sporeBand * 43 + index;
        const worldY = (sporeBand - 0.2 + seeded(seed + 9) * 1.5) * height;
        const screenY = toScreenRow(worldY);
        if (screenY < -2 || screenY > rows + 2) continue;
        const x = columns * seeded(seed + 21) + Math.sin(time * 0.00022 + index) * 1.4;
        sceneContext.globalAlpha = 0.06 + seeded(seed + 33) * 0.15;
        sceneContext.beginPath();
        sceneContext.arc(x, screenY, 0.16 + seeded(seed + 47) * 0.24, 0, Math.PI * 2);
        sceneContext.fill();
      }
      sceneContext.globalAlpha = 1;

      const rootStart = documentHeight - height * 0.82;
      if (scrollTop + height > rootStart - height * 0.25) {
        const rootX = trunkXAt(rootStart);
        const rootY = toScreenRow(rootStart);
        const rootEndY = toScreenRow(documentHeight + height * 0.08);
        const rootEnds = compact ? [0.02, 0.28, 0.56] : [0.02, 0.18, 0.36, 0.62, 0.82, 0.98];
        rootEnds.forEach((endFraction, index) => {
          const endX = columns * endFraction;
          const direction = endX < rootX ? -1 : 1;
          drawCurve(
            [
              rootX,
              rootY,
              rootX + direction * trunkWidth * (0.8 + index * 0.08),
              rootY + (rootEndY - rootY) * 0.28,
              endX - direction * columns * 0.07,
              rootY + (rootEndY - rootY) * 0.7,
              endX,
              rootEndY,
            ],
            index % 2 === 0 ? "barkDeep" : "bark",
            Math.max(0.78, trunkWidth * (0.22 + (index % 3) * 0.035)),
            0.94,
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

    const renderAscii = () => {
      const pixels = sceneContext.getImageData(0, 0, columns, rows).data;
      context.clearRect(0, 0, width, height);
      context.font = `600 ${Math.round(cellHeight * 0.82)}px "JetBrains Mono", "SFMono-Regular", monospace`;

      const alphaAt = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= columns || y >= rows) return 0;
        return pixels[(y * columns + x) * 4 + 3] / 255;
      };

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.045) continue;

          const tone = nearestTone(pixels[index], pixels[index + 1], pixels[index + 2]);
          let character = ".";

          if (tone === "node") {
            character = alpha > 0.48 ? "o" : "+";
          } else if (tone === "moss" || tone === "leaf") {
            character = alpha > 0.7 ? "*" : alpha > 0.3 ? "+" : ".";
          } else if (tone === "gold") {
            character = alpha > 0.62 ? "o" : alpha > 0.25 ? "*" : ".";
          } else if (tone === "coral") {
            character = alpha > 0.58 ? "%" : alpha > 0.24 ? "*" : ".";
          } else if (tone === "rose") {
            character = alpha > 0.58 ? "@" : alpha > 0.24 ? "+" : ".";
          } else if (tone === "violet") {
            character = alpha > 0.56 ? "~" : alpha > 0.23 ? "+" : ".";
          } else if (tone === "sky") {
            character = alpha > 0.52 ? "+" : ".";
          } else if (tone === "spore") {
            character = alpha > 0.35 ? ":" : ".";
          } else {
            const horizontalGradient = alphaAt(x + 1, y) - alphaAt(x - 1, y);
            const verticalGradient = alphaAt(x, y + 1) - alphaAt(x, y - 1);
            if (Math.abs(horizontalGradient) > Math.abs(verticalGradient) * 1.35) {
              character = "|";
            } else if (Math.abs(verticalGradient) > Math.abs(horizontalGradient) * 1.35) {
              character = "-";
            } else if (horizontalGradient * verticalGradient > 0) {
              character = "/";
            } else if (horizontalGradient * verticalGradient < 0) {
              character = "\\";
            } else {
              character = alpha > 0.72 ? "#" : alpha > 0.34 ? ":" : ".";
            }
          }

          context.globalAlpha = clamp(alpha * 1.34, 0.12, tone === "barkDeep" ? 0.94 : 0.9);
          context.fillStyle = palette[tone];
          context.fillText(character, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight);
        }
      }
      context.globalAlpha = 1;
    };

    const draw = (time: number) => {
      animationFrame = null;
      if (document.visibilityState === "hidden") return;
      if (!reducedMotion.matches && time - lastFrame < 40) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      sceneContext.clearRect(0, 0, columns, rows);
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const motionTime = reducedMotion.matches ? 0 : time;
      drawWorldTree(motionTime, scrollTop, documentHeight);
      if (scrollTop < height * 1.35) {
        sceneContext.save();
        sceneContext.translate(0, -scrollTop / cellHeight);
        drawHeroTree(motionTime, scrollTop);
        sceneContext.restore();
      }
      renderAscii();
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(draw);
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
      pointerX = (event.clientX / Math.max(1, width)) * 2 - 1;
      pointerY = (event.clientY / Math.max(1, height)) * 2 - 1;
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
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
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

  return <canvas ref={canvasRef} className="ascii-shader-canvas" aria-hidden="true" />;
};

export default AsciiTreeCanvas;
