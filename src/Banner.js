import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function Banner({ lists = [] }) {
  // const modified = ['----- LATEST LISTS -----',...lists]
  const contentRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const fullWidth = contentEl.scrollWidth;

      const scrollDistance = fullWidth / 2; // Half because we duplicate
      const speed = 100; // pixels per second
      const calculatedDuration = scrollDistance / speed;

      setDuration(calculatedDuration);
    }
  }, [lists]);

  return (
    <div className="scroll-container">
      <div className="bannerTitleContainer">
        <span className="bannerTitle">&#8595; === THE LATEST LISTS === &#8595;</span>
      </div>
      <div
        className="scroll-track"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        <div className="scroll-content" ref={contentRef}>
          {[...lists, ...lists].map((text, idx) => (
            <span className="scroll-item" key={idx}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
