"use client";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import CreateClient from "../../util/getAccesstoken";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import DisplayImage from "./component/displayimage";
import SongList from "./component/songlist";
import ShuffleList from "./lib/shufflelist";
import Guessing from "./component/guessing";
import { time } from "console";
export default function Home() {
  // const accesstoken = CreateClient();
  const [playlistid, setPlaylist] = useState<string>("");
  const [playlistdata, setPlaylistdata] = useState<any>(null);
  const [isplay, setIsplay] = useState<boolean>(false);
  const [tracklist, setTracklist] = useState<any>(null);
  const [isload, setIsload] = useState<boolean>(false);

  const getPlaylist = async () => {
    const accesstoken = await CreateClient();
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
    <div className="max-w-sm w-full mx-auto h-screen overflow-hidden">
      <NextUIProvider>
        {!isplay && (
          <>
            <div className="flex items-center m-2 gap-2">
              <Input
                type="text"
                label="playlist_url"
                value={playlistid}
                onValueChange={setPlaylist}
                radius="sm"
                isClearable={true}
                variant="bordered"
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
            {playlistdata && (
              <div className=" h-full w-full mx-auto flex flex-col gap-2 mt-2 items-center">
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
