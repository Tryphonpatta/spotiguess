import { useEffect, useRef } from "react";

export default function AudioPlaying({ url }: any) {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.4;
    }
  }, []);
  return <audio ref={audioPlayer} hidden controls autoPlay src={url}></audio>;
}
