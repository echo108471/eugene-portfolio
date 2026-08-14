import { useEffect, useState } from "react";

export type TreeSpecimen = "spirit-oak" | "sakura" | "bio-cypress" | "ginkgo";

export interface SpecimenInfo {
  id: TreeSpecimen;
  name: string;
  glyph: string;
  flourish: string;
  tagline: string;
  paletteLabel: string;
}

export const TREE_SPECIMENS: Record<TreeSpecimen, SpecimenInfo> = {
  "spirit-oak": {
    id: "spirit-oak",
    name: "Ancient Spirit Oak",
    glyph: "🌳",
    flourish: "·~*~+~*~·",
    tagline: "Emerald moss, ancient weathered cedar, warm amber lanterns & cyan runes",
    paletteLabel: "emerald-amber",
  },
  sakura: {
    id: "sakura",
    name: "Celestial Sakura",
    glyph: "🌸",
    flourish: "·~✿~*~✿~·",
    tagline: "Ethereal cherry blossoms, plum wood, drifting petals & rose lanterns",
    paletteLabel: "sakura-rose",
  },
  "bio-cypress": {
    id: "bio-cypress",
    name: "Midnight Bio-Cypress",
    glyph: "⚡",
    flourish: "·~⚡~*~⚡~·",
    tagline: "Electric neon cyan, ultraviolet canopy, obsidian bark & cyber runes",
    paletteLabel: "neon-cyber",
  },
  ginkgo: {
    id: "ginkgo",
    name: "Golden Autumn Ginkgo",
    glyph: "🍂",
    flourish: "·~🍂~*~🍂~·",
    tagline: "Radiant saffron gold, smoked oak, crimson maple & flame lanterns",
    paletteLabel: "autumn-gold",
  },
};

const STORAGE_KEY = "eugene-portfolio-specimen";

export function useTreeTheme() {
  const [specimen, setSpecimenState] = useState<TreeSpecimen>(() => {
    if (typeof window === "undefined") return "spirit-oak";
    const saved = localStorage.getItem(STORAGE_KEY) as TreeSpecimen | null;
    return saved && saved in TREE_SPECIMENS ? saved : "spirit-oak";
  });

  const setSpecimen = (newSpecimen: TreeSpecimen) => {
    setSpecimenState(newSpecimen);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newSpecimen);
      document.documentElement.setAttribute("data-tree-specimen", newSpecimen);
      window.dispatchEvent(
        new CustomEvent("tree-specimen-change", { detail: newSpecimen }),
      );
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-tree-specimen", specimen);

    const handleSpecimenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<TreeSpecimen>;
      if (customEvent.detail && customEvent.detail in TREE_SPECIMENS) {
        setSpecimenState(customEvent.detail);
      }
    };

    window.addEventListener("tree-specimen-change", handleSpecimenEvent);
    return () => {
      window.removeEventListener("tree-specimen-change", handleSpecimenEvent);
    };
  }, [specimen]);

  return {
    specimen,
    info: TREE_SPECIMENS[specimen],
    setSpecimen,
    specimens: Object.values(TREE_SPECIMENS),
  };
}
