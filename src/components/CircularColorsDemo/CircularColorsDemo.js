"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { is } from "date-fns/locale";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(undefined);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const createTimer = () => {
    const intervalId = window.setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
      console.log("time elapsed: ", timeElapsed);
    }, 1000);
    console.log("new timer id: ", intervalId);
    setIntervalId(intervalId);
  };

  const destroyTimer = () => {
    window.clearInterval(intervalId);
  };

  const selectedColor = COLORS[0];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button>
            {/* todo: fix initial button showing Pause logic. Maybe use hasBeenPlayed */}
            {isPlaying ? (
              <Pause
                onClick={() => {
                  setIsPlaying(false);
                  destroyTimer();
                }}
              />
            ) : (
              <Play
                onClick={() => {
                  setIsPlaying(true);
                  createTimer();
                }}
              />
            )}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              destroyTimer();
              setIsPlaying(false);
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
