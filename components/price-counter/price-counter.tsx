import React from "react";
import "./style.css";
type PriceCounterProps = {
  price: number[];
  startPercentage?: number;
};
export default function PriceCounter({
  price,
  startPercentage = 0.5,
}: PriceCounterProps) {
  switch (price.length) {
    case 2:
      return (
        <p className="flex items-center gap-4">
          <span
            className="animated-counter text-center font-mono text-5xl"
            style={
              {
                "--counter-from": [price[0] * startPercentage],
                "--counter-to": [price[0]],
              } as React.CSSProperties
            }
          />
          <span className="text-center font-mono text-2xl">-</span>
          <span
            className="animated-counter text-center font-mono text-5xl"
            style={
              {
                "--counter-from": [price[1] * startPercentage],
                "--counter-to": [price[1]],
                "--duration": "2.5s",
              } as React.CSSProperties
            }
          />
        </p>
      );
    case 1:
      return (
        <span
          className="animated-counter text-center font-mono text-5xl"
          style={
            {
              "--counter-from": [price[0] * startPercentage],
              "--counter-to": [price[0]],
            } as React.CSSProperties
          }
        />
      );
    default:
      <span className="animated-counter text-center font-mono text-5xl">
        Invalid Data
      </span>;
  }
}
