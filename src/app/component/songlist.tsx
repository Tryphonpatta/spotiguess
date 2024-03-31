import TrackBox from "./trackbox";
export default function SongList({ track }: any) {
  //   console.log(track);
  return (
    <div className="flex flex-col gap-2 h-[20rem] w-[350px] overflow-auto m-2 rounded border p-2">
      {track.map((track: any, index: number) => {
        return (
          <div key={index}>
            <TrackBox track={track.track}></TrackBox>
          </div>
        );
      })}
      {/* <audio controls autoPlay src={track[1].track.preview_url}></audio> */}
    </div>
  );
}
