import React from "react";

type Palette =
  | "barkDeep"
  | "bark"
  | "barkLight"
  | "crevice"
  | "leafShadow"
  | "leaf"
  | "leafLight"
  | "gold"
  | "coral"
  | "lantern"
  | "lanternCore";

type CellMap = Map<string, Palette>;
type Point = readonly [number, number];

const PALETTE: Record<Palette, string> = {
  barkDeep: "var(--bark-deep)",
  bark: "var(--bark)",
  barkLight: "var(--bark-light)",
  crevice: "var(--tree-crevice)",
  leafShadow: "var(--growth-muted)",
  leaf: "var(--growth)",
  leafLight: "var(--growth-bright)",
  gold: "var(--tree-gold)",
  coral: "var(--tree-coral)",
  lantern: "var(--tree-lantern)",
  lanternCore: "var(--tree-lantern-core)",
};

const keyOf = (x: number, y: number) => `${x},${y}`;

const noise = (x: number, y: number, seed: number) => {
  let value = Math.imul(x + seed * 31, 374761393) + Math.imul(y - seed * 17, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

const put = (map: CellMap, x: number, y: number, palette: Palette) => {
  if (x >= 0 && x < 132 && y >= 0 && y < 152) map.set(keyOf(x, y), palette);
};

const paintWoodDisc = (map: CellMap, cx: number, cy: number, radius: number, seed: number) => {
  for (let y = Math.floor(cy - radius - 1); y <= Math.ceil(cy + radius + 1); y += 1) {
    for (let x = Math.floor(cx - radius - 1); x <= Math.ceil(cx + radius + 1); x += 1) {
      const dx = (x - cx) / radius;
      const dy = (y - cy) / radius;
      if (dx * dx + dy * dy > 1 + (noise(x, y, seed) - 0.5) * 0.2) continue;

      const texture = noise(x, y, seed + 9);
      let palette: Palette = "bark";
      if (dx < -0.48 || texture < 0.09) palette = "barkDeep";
      if (dx > 0.48 || texture > 0.9) palette = "barkLight";
      put(map, x, y, palette);
    }
  }
};

const cubicPoint = (a: Point, b: Point, c: Point, d: Point, t: number): Point => {
  const inverse = 1 - t;
  return [
    inverse ** 3 * a[0] + 3 * inverse ** 2 * t * b[0] + 3 * inverse * t ** 2 * c[0] + t ** 3 * d[0],
    inverse ** 3 * a[1] + 3 * inverse ** 2 * t * b[1] + 3 * inverse * t ** 2 * c[1] + t ** 3 * d[1],
  ];
};

const paintWoodStroke = (
  map: CellMap,
  points: readonly [Point, Point, Point, Point],
  startRadius: number,
  endRadius: number,
  seed: number,
) => {
  for (let step = 0; step <= 96; step += 1) {
    const t = step / 96;
    const [x, y] = cubicPoint(points[0], points[1], points[2], points[3], t);
    paintWoodDisc(map, x, y, startRadius + (endRadius - startRadius) * t, seed + Math.floor(t * 11));
  }
};

const paintPixelLine = (
  map: CellMap,
  start: Point,
  end: Point,
  palette: Palette,
  thickness = 1,
  skip = 0,
) => {
  const distance = Math.max(Math.abs(end[0] - start[0]), Math.abs(end[1] - start[1]));
  for (let step = 0; step <= distance; step += 1) {
    if (skip > 0 && step % skip === skip - 1) continue;
    const t = distance === 0 ? 0 : step / distance;
    const x = Math.round(start[0] + (end[0] - start[0]) * t);
    const y = Math.round(start[1] + (end[1] - start[1]) * t);
    for (let offset = 0; offset < thickness; offset += 1) put(map, x + offset, y, palette);
  }
};

const paintCanopy = (map: CellMap, cx: number, cy: number, radiusX: number, radiusY: number, seed: number) => {
  for (let y = Math.floor(cy - radiusY); y <= Math.ceil(cy + radiusY); y += 1) {
    for (let x = Math.floor(cx - radiusX); x <= Math.ceil(cx + radiusX); x += 1) {
      const dx = (x - cx) / radiusX;
      const dy = (y - cy) / radiusY;
      const distance = dx * dx + dy * dy;
      if (distance > 1 + (noise(x, y, seed) - 0.5) * 0.34) continue;
      if (distance > 0.32 && noise(x, y, seed + 3) < 0.055) continue;

      const texture = noise(x, y, seed + 8);
      let palette: Palette = "leaf";
      if (distance > 0.76 || dy > 0.54) palette = "leafShadow";
      if ((dx < -0.18 && dy < 0.1 && texture > 0.52) || texture > 0.91) palette = "leafLight";
      if (texture > 0.974) palette = "gold";
      if (texture > 0.991) palette = "coral";
      put(map, x, y, palette);
    }
  }
};

const paintEllipse = (map: CellMap, cx: number, cy: number, radiusX: number, radiusY: number, palette: Palette) => {
  for (let y = cy - radiusY; y <= cy + radiusY; y += 1) {
    for (let x = cx - radiusX; x <= cx + radiusX; x += 1) {
      const dx = (x - cx) / radiusX;
      const dy = (y - cy) / radiusY;
      if (dx * dx + dy * dy <= 1) put(map, x, y, palette);
    }
  }
};

const layerShadows = (map: CellMap) => {
  const grouped = new Map<Palette, string[]>();
  map.forEach((palette, coordinate) => {
    const [x, y] = coordinate.split(",").map(Number);
    const shadows = grouped.get(palette) ?? [];
    shadows.push(`${x}px ${y}px 0 ${PALETTE[palette]}`);
    grouped.set(palette, shadows);
  });
  return Array.from(grouped.entries()).map(([palette, shadows]) => ({ palette, boxShadow: shadows.join(",") }));
};

const createPixelTree = () => {
  const branches: CellMap = new Map();
  const canopy: CellMap = new Map();
  const trunk: CellMap = new Map();
  const roots: CellMap = new Map();
  const details: CellMap = new Map();
  const lights: CellMap = new Map();
  const vines: CellMap = new Map();

  const branchStrokes: Array<readonly [readonly [Point, Point, Point, Point], number, number]> = [
    [[[63, 46], [48, 39], [31, 25], [9, 23]], 6, 2],
    [[[61, 57], [44, 52], [27, 43], [4, 47]], 7, 2],
    [[[62, 34], [49, 27], [41, 16], [27, 8]], 5, 2],
    [[[69, 42], [83, 35], [98, 24], [123, 20]], 7, 2],
    [[[71, 55], [88, 53], [103, 42], [129, 46]], 6, 2],
    [[[68, 30], [78, 22], [87, 11], [94, 3]], 5, 1.5],
    [[[57, 69], [43, 67], [28, 59], [14, 64]], 5, 1.5],
    [[[75, 70], [91, 68], [105, 61], [120, 67]], 5, 1.5],
  ];
  branchStrokes.forEach(([points, startRadius, endRadius], index) => paintWoodStroke(branches, points, startRadius, endRadius, 20 + index * 7));

  const twigStrokes: Array<readonly [Point, Point]> = [
    [[11, 23], [2, 14]], [[18, 28], [6, 34]], [[30, 21], [19, 10]], [[36, 31], [22, 36]],
    [[108, 27], [126, 11]], [[111, 42], [130, 34]], [[99, 49], [116, 57]], [[87, 20], [80, 6]],
    [[25, 55], [8, 56]], [[103, 62], [127, 71]],
  ];
  twigStrokes.forEach(([start, end]) => paintPixelLine(branches, start, end, "bark", 2));

  const canopyClusters = [
    [8, 17, 14, 9], [23, 11, 18, 11], [42, 8, 20, 12], [61, 6, 22, 13],
    [82, 8, 19, 12], [101, 13, 20, 12], [119, 20, 14, 10], [13, 31, 17, 11],
    [34, 26, 21, 13], [57, 22, 22, 14], [82, 24, 22, 14], [106, 29, 20, 13],
    [25, 42, 18, 11], [50, 38, 21, 13], [78, 39, 22, 14], [105, 44, 18, 12],
  ] as const;
  canopyClusters.forEach(([x, y, radiusX, radiusY], index) => paintCanopy(canopy, x, y, radiusX, radiusY, 80 + index * 13));

  paintWoodStroke(trunk, [[65, 143], [56, 113], [67, 73], [60, 29]], 18, 6, 161);
  paintWoodStroke(trunk, [[64, 69], [55, 48], [48, 27], [43, 5]], 11, 3, 173);
  paintWoodStroke(trunk, [[68, 66], [70, 43], [72, 21], [68, 1]], 10, 3, 181);
  paintWoodStroke(trunk, [[70, 66], [79, 44], [84, 27], [88, 8]], 9, 3, 193);

  const rootStrokes: Array<readonly [readonly [Point, Point, Point, Point], number, number]> = [
    [[[58, 132], [43, 140], [24, 143], [2, 149]], 11, 2],
    [[[61, 137], [48, 144], [38, 147], [22, 151]], 10, 2],
    [[[68, 139], [74, 145], [88, 149], [106, 151]], 11, 2],
    [[[73, 132], [88, 137], [106, 139], [130, 146]], 10, 2],
    [[[64, 140], [61, 145], [58, 148], [53, 151]], 9, 2],
  ];
  rootStrokes.forEach(([points, startRadius, endRadius], index) => paintWoodStroke(roots, points, startRadius, endRadius, 220 + index * 9));

  paintEllipse(details, 67, 87, 7, 10, "barkDeep");
  paintEllipse(details, 67, 88, 4, 7, "crevice");
  paintEllipse(lights, 67, 88, 1, 2, "lantern");

  const fissures: Array<readonly [Point, Point]> = [
    [[54, 42], [57, 65]], [[56, 70], [52, 96]], [[76, 53], [73, 78]],
    [[48, 91], [51, 119]], [[78, 94], [82, 123]], [[61, 110], [59, 134]],
  ];
  fissures.forEach(([start, end], index) => paintPixelLine(details, start, end, index % 2 === 0 ? "crevice" : "barkLight", 1, 4));

  const sapVeins: Array<readonly [Point, Point]> = [
    [[59, 55], [61, 72]], [[73, 73], [70, 84]], [[56, 101], [60, 116]], [[75, 112], [72, 128]],
  ];
  sapVeins.forEach(([start, end]) => paintPixelLine(lights, start, end, "lantern", 1, 3));

  [[48, 72], [80, 81], [45, 105], [84, 118], [37, 134], [93, 137]].forEach(([x, y], index) => {
    for (let offset = -4; offset <= 5; offset += 1) {
      if (noise(x + offset, y, 270 + index) > 0.25) put(details, x + offset, y, offset % 3 === 0 ? "leafLight" : "leaf");
    }
  });

  const vineCurves = [
    [[18, 27], [17, 80]], [[32, 18], [34, 91]], [[95, 20], [93, 79]], [[112, 31], [116, 88]],
  ] as const;
  vineCurves.forEach(([start, end], index) => {
    for (let y = start[1]; y <= end[1]; y += 1) {
      const x = Math.round(start[0] + Math.sin((y + index * 7) / 7) * 2);
      put(vines, x, y, index % 2 === 0 ? "leafShadow" : "leaf");
      if ((y - start[1]) % 11 === 5) {
        put(vines, x - 1, y, "leafLight");
        put(vines, x + 1, y + 1, "leaf");
      }
    }
  });

  [[21, 19], [38, 31], [72, 17], [91, 33], [111, 25], [55, 51], [83, 48]].forEach(([x, y], index) => {
    put(lights, x, y, "lanternCore");
    if (index % 2 === 0) put(lights, x, y + 1, "lantern");
  });

  return {
    branches: layerShadows(branches), canopy: layerShadows(canopy), trunk: layerShadows(trunk),
    roots: layerShadows(roots), details: layerShadows(details), lights: layerShadows(lights), vines: layerShadows(vines),
  };
};

const PIXEL_TREE = createPixelTree();

const PixelPart: React.FC<{ name: keyof typeof PIXEL_TREE }> = ({ name }) => (
  <div className={`pixel-tree__part pixel-tree__part--${name}`}>
    {PIXEL_TREE[name].map((layer) => (
      <span
        className={`pixel-tree__layer pixel-tree__layer--${layer.palette}`}
        key={`${name}-${layer.palette}`}
        style={{ boxShadow: layer.boxShadow }}
      />
    ))}
  </div>
);

const motes = [
  [14, 17, "-2s", "9s"], [29, 34, "-7s", "12s"], [46, 13, "-4s", "11s"],
  [61, 38, "-9s", "13s"], [74, 22, "-5s", "10s"], [86, 46, "-1s", "14s"],
  [38, 59, "-11s", "15s"], [69, 67, "-6s", "12s"], [21, 74, "-3s", "14s"],
] as const;

const TreeEnvironment: React.FC = () => {
  const environmentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const environment = environmentRef.current;
    if (!environment) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateScene = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const rawProgress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      const progress = reducedMotion.matches ? 0 : rawProgress * rawProgress * (3 - 2 * rawProgress);
      const winding = Math.sin(progress * Math.PI * 3) * 12;

      environment.style.setProperty("--tree-scroll-x", `${Math.round(20 - progress * 54 + winding)}px`);
      environment.style.setProperty("--tree-scroll-y", `${Math.round(12 - progress * 92)}px`);
      environment.style.setProperty("--far-scroll-x", `${Math.round(progress * 34)}px`);
      environment.style.setProperty("--near-scroll-x", `${Math.round(progress * 58)}px`);
      environment.style.setProperty("--motes-scroll-y", `${Math.round(progress * -52)}px`);
      environment.style.setProperty("--foreground-scroll-x", `${Math.round(progress * -24)}px`);
      environment.style.setProperty("--atmosphere-scroll-y", `${Math.round(progress * 16)}px`);
      frame = 0;
    };

    const requestSceneUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScene);
    };

    updateScene();
    window.addEventListener("scroll", requestSceneUpdate, { passive: true });
    window.addEventListener("resize", requestSceneUpdate);
    reducedMotion.addEventListener("change", requestSceneUpdate);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSceneUpdate);
      window.removeEventListener("resize", requestSceneUpdate);
      reducedMotion.removeEventListener("change", requestSceneUpdate);
    };
  }, []);

  return (
    <div className="tree-environment" aria-hidden="true" ref={environmentRef}>
      <div className="tree-environment__sky" />
      <div className="tree-environment__horizon tree-environment__horizon--far" />
      <div className="tree-environment__horizon tree-environment__horizon--near" />
      <div className="tree-environment__ground" />
      <div className="pixel-tree-stage">
        <div className="pixel-tree">
          <PixelPart name="branches" />
          <PixelPart name="canopy" />
          <PixelPart name="trunk" />
          <PixelPart name="roots" />
          <PixelPart name="details" />
          <PixelPart name="lights" />
          <PixelPart name="vines" />
        </div>
      </div>
      <div className="tree-environment__glow tree-environment__glow--crown" />
      <div className="tree-environment__glow tree-environment__glow--roots" />
      <div className="tree-environment__fog tree-environment__fog--one" />
      <div className="tree-environment__fog tree-environment__fog--two" />
      <div className="tree-environment__motes" role="presentation">
        {motes.map(([x, y, delay, duration]) => (
          <span key={`${x}-${y}`} style={{
            "--mote-x": `${x}%`, "--mote-y": `${y}%`, "--mote-delay": delay, "--mote-duration": duration,
          } as React.CSSProperties} />
        ))}
      </div>
      <div className="tree-environment__foreground" role="presentation">
        <span className="tree-environment__stone tree-environment__stone--one" />
        <span className="tree-environment__stone tree-environment__stone--two" />
        <span className="tree-environment__stone tree-environment__stone--three" />
        <span className="tree-environment__grass tree-environment__grass--one" />
        <span className="tree-environment__grass tree-environment__grass--two" />
        <span className="tree-environment__grass tree-environment__grass--three" />
      </div>
      <div className="tree-environment__atmosphere" />
    </div>
  );
};

export default TreeEnvironment;
