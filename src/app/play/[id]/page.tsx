"use client";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import getaccessToken from "../../../../util/getAccesstoken";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import DisplayImage from "@/app/component/displayimage";
import SongList from "@/app/component/songlist";
import ShuffleList from "@/app/lib/shufflelist";
import Guessing from "@/app/component/guessing";
import { CiLink } from "react-icons/ci";

import { time } from "console";
export default function Home({ params }: any) {
  // const accesstoken = CreateClient();
  const [playlistid, setPlaylist] = useState<string>(params.id);
  const [playlistdata, setPlaylistdata] = useState<any>(null);
  const [isplay, setIsplay] = useState<boolean>(false);
  const [tracklist, setTracklist] = useState<any>(null);
  const [isload, setIsload] = useState<boolean>(false);
  const getPlaylist = async () => {
    setIsload(false);
    const accesstoken = await getaccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/playlists/" + params.id,
      {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      }
    );
    // console.log("https://api.spotify.com/v1/playlists/" + params.id);
    const data = await response.json();
    setPlaylistdata(data);
    console.log(data.tracks.items);
    const shufflelist = ShuffleList(data?.tracks);
    setTracklist(shufflelist);
    setIsload(true);
    console.log("tracklist", tracklist);
  };
  useEffect(() => {
    getPlaylist();
  }, []);
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
