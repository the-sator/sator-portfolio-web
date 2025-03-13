"use client";
import React, { useEffect, useRef } from "react";

export default function TrackCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = card.getBoundingClientRect();
      const padding = 200;

      // Define the boundary (card's dimensions)
      const boundary = {
        left: left - padding,
        right: left + width + padding,
        top: top - padding,
        bottom: top + height + padding,
      };

      // Check if the mouse is within the boundary
      const isMouseInsideBoundary =
        clientX >= boundary.left &&
        clientX <= boundary.right &&
        clientY >= boundary.top &&
        clientY <= boundary.bottom;

      if (isMouseInsideBoundary) {
        // Calculate the mouse position relative to the center of the card
        const mouseX = clientX - (left + width / 2);
        const mouseY = clientY - (top + height / 2);

        // Calculate rotation angles (in degrees)
        const rotateX = (mouseY / (height / 2)) * -10;
        const rotateY = (mouseX / (width / 2)) * 10;

        // Apply the transformation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } else {
        // Reset the transformation if the mouse is outside the boundary
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative h-[400px] w-[550px] flex-shrink-0 bg-card p-2 drop-shadow-xl transition-transform duration-300 ease-out"
    >
      <div className="flex h-full w-full items-center justify-center border">
        <p className="text-5xl font-bold">Sator</p>
      </div>
    </div>
  );
}
