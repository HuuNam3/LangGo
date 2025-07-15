"use client";

import YouTube, { YouTubeProps } from "react-youtube";
import type { YouTubePlayer } from "react-youtube";
import { useRef } from "react";

type Props = {
  videoId: string;
  setTime: (time: number) => void;
};

export default function YouTubePlayer({ videoId, setTime }: Props) {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;

    const interval = setInterval(() => {
        if(playerRef.current) {
            const current = playerRef.current?.getCurrentTime();
            if (typeof current === "number") {
              setTime(current); // Gửi về cho cha
            }
        }
    }, 1000);

    // Dọn dẹp interval khi unmount
    return () => clearInterval(interval);
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube className="w-full h-[calc(100vh-10rem)] object-contain" videoId={videoId} opts={opts} onReady={onPlayerReady} />
  );
}
