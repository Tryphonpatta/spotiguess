"use client";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import getaccessToken from "../../util/getAccesstoken";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import DisplayImage from "./component/displayimage";
import SongList from "./component/songlist";
import ShuffleList from "./lib/shufflelist";
import Guessing from "./component/guessing";
import { CiLink } from "react-icons/ci";

import { time } from "console";
export default function Home() {
  // const accesstoken = CreateClient();
  const [playlistid, setPlaylist] = useState<string>("");
  const [playlistdata, setPlaylistdata] = useState<any>(null);
  const [isplay, setIsplay] = useState<boolean>(false);
  const [tracklist, setTracklist] = useState<any>(null);
  const [isload, setIsload] = useState<boolean>(false);

  const getPlaylist = async () => {
    const accesstoken = await getaccessToken();
    const id = playlistid.slice(playlistid.indexOf("playlist/") + 9);
    const response = await fetch("https://api.spotify.com/v1/playlists/" + id, {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    });
    const data = await response.json();
    setPlaylistdata(data);
  };
  useEffect(() => {
    setIsload(false);
    if (!playlistdata?.tracks) return;
    const shufflelist = ShuffleList(playlistdata?.tracks);
    setTracklist(shufflelist);
    setIsload(true);
  }, [playlistdata?.tracks]);
  const handleplay = async () => {
    setIsplay(true);
    // const shufflelist = ShuffleList(playlistdata?.tracks.items);
    // console.log(playlistdata?.tracks.items);
    // console.log(playlistdata?.tracks.items);
    // console.log("track", tracklist);
    // console.log("shuffle", shufflelist);
  };

  return (
    <div className="max-w-sm w-full mx-auto h-full overflow-auto mb-[10rem]">
      <NextUIProvider>
        {!isplay && (
          <>
            <div className="flex items-center m-2 gap-2">
              <form className="max-w-md mx-auto">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <CiLink className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Playlist URL"
                      required
                      value={playlistid}
                      onChange={(e) => setPlaylist(e.target.value)}
                    />
                    <Button
                      color="default"
                      radius="full"
                      onPress={getPlaylist}
                      className=" bg-gradient-to-b  from-gray-900 to-green-800 text-white"
                    >
                      Load!
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            {playlistdata && (
              <div className=" h-[40rem] w-full mx-auto flex flex-col gap-2 mt-2 items-center mb-4">
                <DisplayImage imageurl={playlistdata?.images[0].url} />
                <SongList track={playlistdata?.tracks.items}></SongList>
                <Button
                  onClick={handleplay}
                  isDisabled={
                    isload && tracklist && tracklist.length >= 10 ? false : true
                  }
                >
                  Play!
                </Button>
              </div>
            )}
          </>
        )}
        {isplay && tracklist && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Guessing track={tracklist} />
            <Button onPress={() => setIsplay(false)}>Quit</Button>
          </div>
        )}
      </NextUIProvider>
    </div>
  );
}
