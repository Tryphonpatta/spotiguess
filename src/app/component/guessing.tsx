import { useEffect, useState } from "react";
import AudioPlaying from "./audioplaying";
export default function Guessing({ track }: any) {
  // console.log(track);
  const [currenttrack, setCurrenttrack] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [choice, setChoice] = useState<any>([]);
  const [showanswer, setShowanswer] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  // console.log(track);
  useEffect(() => {
    // console.log(track[currenttrack]);
    if (currenttrack < track.length && currenttrack < 10) {
      const choices = [currenttrack];
      const otherchoices = track
        .map((track: any, index: number) => index)
        .filter((index: number) => index !== currenttrack);
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * otherchoices.length);
        choices.push(otherchoices[random]);
        otherchoices.splice(random, 1); //remove the choice from the list
      }
      setChoice(shuffleArray(choices));
    } else {
      setIsFinished(true);
    }
  }, [currenttrack]);
  const shuffleArray = (array: number[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const handleguess = (index: number) => {
    // console.log(index);
    if (index === currenttrack) {
      setScore(score + 1);
    }
    setShowanswer(true);
    setTimeout(() => {
      setShowanswer(false);
      setCurrenttrack(currenttrack + 1);
    }, 3000);
  };
  return (
    <div className="w-full h-full">
      {!isFinished && (
        <>
          <div>Status : Playing</div>
          <div>
            Score : {score}/
            {currenttrack + 1 <= 10 ? currenttrack + 1 : currenttrack}
          </div>
          <AudioPlaying url={track[currenttrack].url} />
          <div className="flex flex-col gap-10 justify-center items-center mt-5 mb-5">
            {choice.map((choice: any, index: number) => (
              <div
                key={index}
                className={
                  "w-[300px] h-[60px] border rounded-md flex justify-center items-center hover:cursor-pointer p-2" +
                  (showanswer
                    ? choice === currenttrack
                      ? " bg-green-700"
                      : " bg-red-700"
                    : " ")
                }
                onClick={() => handleguess(choice)}
              >
                <h1>{track[choice].title}</h1>
              </div>
            ))}
          </div>
        </>
      )}
      {isFinished && (
        <div>
          <h1>Game Over</h1>
          <h1>
            Score : {score} / {10 < currenttrack ? 10 : currenttrack}
          </h1>
        </div>
      )}
    </div>
  );
}
