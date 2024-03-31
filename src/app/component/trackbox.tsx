import { FaCheck, FaBan } from "react-icons/fa";

export default function TrackBox({ track }: any) {
  // console.log(track);
  return (
    <div className="flex gap-1">
      <h1 className="flex items-center">
        {"- "}
        {track?.name}
        {track?.preview_url ? <FaCheck color="green" /> : <FaBan color="red" />}
      </h1>
    </div>
  );
}
