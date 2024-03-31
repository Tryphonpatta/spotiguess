import { useEffect } from "react";
import { Howl } from "howler";

export default function AudioPlaying({ url }: any) {
  // console.log(url);
  useEffect(() => {
    const sound = new Howl({
      src: [url],
      format: ["mp3"],
      autoplay: true,
      loop: true,
      volume: 0.4,
      onplayerror: function () {
        sound.once("unlock", function () {
          sound.play();
        });
      },
    });

    return () => {
      sound.unload(); // Clean up Howler instance when component unmounts
    };
  }, [url]);

  return null; // Since audio playback is handled by Howler.js, return null from the component
}
