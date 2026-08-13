import React, { useEffect, useRef } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const LivingBranch: React.FC = () => {
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const branch = branchRef.current;
    const intro = branch?.closest<HTMLElement>(".living-intro");
    const about = document.getElementById("about");
    const experience = document.getElementById("experience");
    if (!branch || !intro || !about || !experience) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let pointerFrame: number | null = null;

    const updateGrowth = () => {
      frame = null;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const introTop = intro.getBoundingClientRect().top + scrollTop;
      const aboutTop = about.getBoundingClientRect().top + scrollTop;
      const experienceTop = experience.getBoundingClientRect().top + scrollTop;

      branch.style.setProperty("--about-top", `${aboutTop - introTop}px`);
      branch.style.setProperty("--experience-top", `${experienceTop - introTop}px`);
      branch.style.setProperty("--experience-height", `${experience.offsetHeight}px`);

      if (reducedMotion.matches) {
        branch.style.setProperty("--trunk-progress", "1");
        branch.style.setProperty("--canopy-progress", "1");
        branch.style.setProperty("--handoff-progress", "1");
        branch.style.setProperty("--root-progress", "1");
        branch.style.setProperty("--canopy-opacity", "1");
        branch.style.setProperty("--handoff-opacity", "1");
        branch.style.setProperty("--moss-progress", "1");
        branch.style.setProperty("--root-opacity", "1");
        return;
      }

      const start = Math.max(0, introTop - 62);
      const aboutFinish = Math.max(start + 1, aboutTop - viewportHeight * 0.54);
      const experienceFinish = Math.max(
        aboutFinish + 1,
        experienceTop + Math.min(experience.offsetHeight * 0.38, viewportHeight * 0.85),
      );
      const progress = clamp((scrollTop - start) / (aboutFinish - start));
      const rootProgress = clamp((scrollTop - aboutFinish) / (experienceFinish - aboutFinish));

      const trunk = 0.2 + progress * 0.8;
      const canopy = clamp(0.12 + progress * 1.35);
      const handoff = clamp((progress - 0.34) / 0.66);

      branch.style.setProperty("--trunk-progress", trunk.toFixed(3));
      branch.style.setProperty("--canopy-progress", canopy.toFixed(3));
      branch.style.setProperty("--handoff-progress", handoff.toFixed(3));
      branch.style.setProperty("--root-progress", rootProgress.toFixed(3));
      branch.style.setProperty("--canopy-opacity", clamp(canopy * 1.7).toFixed(3));
      branch.style.setProperty(
        "--handoff-opacity",
        clamp((handoff - 0.72) / 0.28).toFixed(3),
      );
      branch.style.setProperty("--moss-progress", clamp(0.18 + progress * 0.62 + rootProgress * 0.2).toFixed(3));
      branch.style.setProperty("--root-opacity", clamp(rootProgress * 1.8).toFixed(3));
    };

    const scheduleGrowthUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateGrowth);
    };

    const updatePointerDepth = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        event.pointerType === "touch" ||
        !window.matchMedia("(pointer: fine)").matches
      ) return;

      const bounds = intro.getBoundingClientRect();
      const x = clamp((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = clamp((event.clientY - bounds.top) / Math.min(bounds.height, window.innerHeight)) * 2 - 1;

      if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = null;
        branch.style.setProperty("--botanical-x", `${(x * 7).toFixed(2)}px`);
        branch.style.setProperty("--botanical-y", `${(y * 4).toFixed(2)}px`);
        branch.style.setProperty("--root-x", `${(x * -3).toFixed(2)}px`);
      });
    };

    const resetPointerDepth = () => {
      branch.style.setProperty("--botanical-x", "0px");
      branch.style.setProperty("--botanical-y", "0px");
      branch.style.setProperty("--root-x", "0px");
    };

    updateGrowth();
    window.addEventListener("scroll", scheduleGrowthUpdate, { passive: true });
    window.addEventListener("resize", scheduleGrowthUpdate);
    reducedMotion.addEventListener("change", scheduleGrowthUpdate);
    intro.addEventListener("pointermove", updatePointerDepth, { passive: true });
    intro.addEventListener("pointerleave", resetPointerDepth);

    return () => {
      window.removeEventListener("scroll", scheduleGrowthUpdate);
      window.removeEventListener("resize", scheduleGrowthUpdate);
      reducedMotion.removeEventListener("change", scheduleGrowthUpdate);
      intro.removeEventListener("pointermove", updatePointerDepth);
      intro.removeEventListener("pointerleave", resetPointerDepth);
      if (frame !== null) window.cancelAnimationFrame(frame);
      if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <div
      ref={branchRef}
      className="living-branch"
      style={
        {
          "--trunk-progress": "0.2",
          "--canopy-progress": "0.12",
          "--handoff-progress": "0",
          "--root-progress": "0",
          "--canopy-opacity": "0.2",
          "--handoff-opacity": "0",
          "--moss-progress": "0.18",
          "--root-opacity": "0",
          "--about-top": "0px",
          "--experience-top": "0px",
          "--experience-height": "0px",
          "--botanical-x": "0px",
          "--botanical-y": "0px",
          "--root-x": "0px",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="botanical-atmosphere botanical-atmosphere--one" />
      <div className="botanical-atmosphere botanical-atmosphere--two" />

      <svg
        className="living-branch__svg living-branch__svg--desktop"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <g className="living-branch__skeleton">
          <path d="M770 42 C733 132 780 202 742 275 C704 349 742 398 714 448" />
          <path d="M753 153 C691 119 626 109 574 129 C539 142 519 169 485 177" />
          <path d="M744 238 C808 199 872 209 927 163" />
          <path d="M727 327 C670 291 616 300 569 263" />
          <path d="M707 381 C761 354 812 366 853 334" />
          <path d="M714 448 C681 510 603 535 518 558 C360 600 180 598 34 640" />
        </g>

        <path
          className="living-branch__growth living-branch__growth--trunk"
          pathLength="1"
          d="M770 42 C733 132 780 202 742 275 C704 349 742 398 714 448"
        />
        <g className="living-branch__growth-group living-branch__growth-group--canopy">
          <path pathLength="1" d="M753 153 C691 119 626 109 574 129 C539 142 519 169 485 177" />
          <path pathLength="1" d="M744 238 C808 199 872 209 927 163" />
          <path pathLength="1" d="M727 327 C670 291 616 300 569 263" />
          <path pathLength="1" d="M707 381 C761 354 812 366 853 334" />
        </g>
        <path
          className="living-branch__growth living-branch__growth--handoff"
          pathLength="1"
          d="M714 448 C681 510 603 535 518 558 C360 600 180 598 34 640"
        />

        <g className="living-branch__nodes living-branch__nodes--canopy">
          <circle cx="753" cy="153" r="5" />
          <circle cx="744" cy="238" r="5" />
          <circle cx="727" cy="327" r="5" />
          <circle cx="707" cy="381" r="5" />
        </g>
        <g className="living-branch__leaves living-branch__leaves--canopy">
          <path d="M485 177 C455 151 425 162 414 194 C446 199 470 192 485 177 Z" />
          <path d="M927 163 C945 130 974 127 991 151 C971 176 949 180 927 163 Z" />
          <path d="M569 263 C543 235 516 241 501 269 C525 284 548 280 569 263 Z" />
          <path d="M853 334 C872 308 898 310 913 334 C893 351 874 351 853 334 Z" />
        </g>
        <g className="living-branch__handoff-node">
          <circle cx="34" cy="640" r="7" />
          <circle cx="34" cy="640" r="2.5" />
        </g>
      </svg>

      <svg
        className="living-branch__svg living-branch__svg--mobile"
        viewBox="0 0 360 1000"
        preserveAspectRatio="none"
      >
        <g className="living-branch__skeleton">
          <path d="M242 288 C222 320 254 354 235 383 C218 410 232 430 215 450" />
          <path d="M237 331 C196 312 158 322 126 354" />
          <path d="M235 383 C273 356 310 366 341 347" />
          <path d="M223 422 C188 400 155 410 126 405" />
          <path d="M215 450 C165 450 125 462 82 472 C45 480 32 483 26 486" />
        </g>

        <path
          className="living-branch__growth living-branch__growth--trunk"
          pathLength="1"
          d="M242 288 C222 320 254 354 235 383 C218 410 232 430 215 450"
        />
        <g className="living-branch__growth-group living-branch__growth-group--canopy">
          <path pathLength="1" d="M237 331 C196 312 158 322 126 354" />
          <path pathLength="1" d="M235 383 C273 356 310 366 341 347" />
          <path pathLength="1" d="M223 422 C188 400 155 410 126 405" />
        </g>
        <path
          className="living-branch__growth living-branch__growth--handoff"
          pathLength="1"
          d="M215 450 C165 450 125 462 82 472 C45 480 32 483 26 486"
        />

        <g className="living-branch__nodes living-branch__nodes--canopy">
          <circle cx="237" cy="331" r="5" />
          <circle cx="235" cy="383" r="5" />
          <circle cx="223" cy="422" r="5" />
        </g>
        <g className="living-branch__leaves living-branch__leaves--canopy">
          <path d="M126 354 C105 331 82 338 72 362 C94 375 112 370 126 354 Z" />
          <path d="M341 347 C348 329 358 324 366 335 C361 351 352 355 341 347 Z" />
          <path d="M126 405 C107 385 87 390 78 412 C97 422 113 418 126 405 Z" />
        </g>
        <g className="living-branch__handoff-node">
          <circle cx="26" cy="486" r="7" />
          <circle cx="26" cy="486" r="2.5" />
        </g>
      </svg>

      <svg
        className="root-system root-system--desktop"
        viewBox="0 0 1000 1800"
        preserveAspectRatio="none"
      >
        <g className="root-system__underlay">
          <path d="M34 236 C76 284 56 346 92 397 C128 450 107 514 151 568 C190 617 174 686 226 738 C273 785 249 858 302 913 C346 959 329 1032 390 1082" />
          <path d="M92 397 C190 376 269 389 348 352" />
          <path d="M151 568 C250 540 349 552 439 511" />
          <path d="M226 738 C328 712 430 723 524 681" />
          <path d="M302 913 C408 890 516 901 609 862" />
        </g>
        <path
          className="root-system__growth"
          pathLength="1"
          d="M34 236 C76 284 56 346 92 397 C128 450 107 514 151 568 C190 617 174 686 226 738 C273 785 249 858 302 913 C346 959 329 1032 390 1082"
        />
        <g className="root-system__branches">
          <path pathLength="1" d="M92 397 C190 376 269 389 348 352" />
          <path pathLength="1" d="M151 568 C250 540 349 552 439 511" />
          <path pathLength="1" d="M226 738 C328 712 430 723 524 681" />
          <path pathLength="1" d="M302 913 C408 890 516 901 609 862" />
        </g>
        <g className="root-system__commits">
          <circle cx="92" cy="397" r="7" />
          <circle cx="151" cy="568" r="7" />
          <circle cx="226" cy="738" r="7" />
          <circle cx="302" cy="913" r="7" />
        </g>
        <g className="root-system__annotations">
          <text x="364" y="348">branch / platform</text>
          <text x="455" y="507">commit · 8e4c2f</text>
          <text x="540" y="677">merge / product</text>
          <text x="625" y="858">HEAD → production</text>
        </g>
      </svg>

      <svg
        className="root-system root-system--mobile"
        viewBox="0 0 360 2600"
        preserveAspectRatio="none"
      >
        <g className="root-system__underlay">
          <path d="M26 646 C64 715 40 814 75 885 C104 947 81 1042 116 1113 C149 1179 122 1276 159 1348 C193 1414 169 1510 207 1577" />
          <path d="M75 885 C125 862 174 872 216 839" />
          <path d="M116 1113 C170 1088 223 1096 271 1061" />
          <path d="M159 1348 C211 1324 264 1330 319 1296" />
          <path d="M207 1577 C251 1554 292 1558 339 1529" />
        </g>
        <path
          className="root-system__growth"
          pathLength="1"
          d="M26 646 C64 715 40 814 75 885 C104 947 81 1042 116 1113 C149 1179 122 1276 159 1348 C193 1414 169 1510 207 1577"
        />
        <g className="root-system__branches">
          <path pathLength="1" d="M75 885 C125 862 174 872 216 839" />
          <path pathLength="1" d="M116 1113 C170 1088 223 1096 271 1061" />
          <path pathLength="1" d="M159 1348 C211 1324 264 1330 319 1296" />
          <path pathLength="1" d="M207 1577 C251 1554 292 1558 339 1529" />
        </g>
        <g className="root-system__commits">
          <circle cx="75" cy="885" r="7" />
          <circle cx="116" cy="1113" r="7" />
          <circle cx="159" cy="1348" r="7" />
          <circle cx="207" cy="1577" r="7" />
        </g>
      </svg>

      <div className="technical-understory">
        <span className="technical-root-label technical-root-label--main">root/main</span>
        <span className="technical-root-label technical-root-label--branch">branch / platform</span>
        <span className="technical-root-label technical-root-label--commit">commit · 8e4c2f</span>
        <span className="technical-root-label technical-root-label--head">HEAD → production</span>
      </div>

      <div className="moss-bank moss-bank--hero">
        <span className="moss-bank__cushion moss-bank__cushion--one" />
        <span className="moss-bank__cushion moss-bank__cushion--two" />
        <span className="moss-bank__cushion moss-bank__cushion--three" />
      </div>

      <div className="grass-cluster grass-cluster--hero-left">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="grass-cluster grass-cluster--hero-right">
        <i /><i /><i /><i /><i />
      </div>
      <div className="grass-cluster grass-cluster--about">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="grass-cluster grass-cluster--experience">
        <i /><i /><i /><i /><i /><i />
      </div>

      <div className="moss-edge moss-edge--about" />
      <div className="moss-edge moss-edge--experience" />
    </div>
  );
};

export default LivingBranch;
