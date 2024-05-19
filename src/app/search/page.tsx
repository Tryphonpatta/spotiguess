"use client";

import { useState } from "react";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import PlaylistList from "./component/playlist_list";
import getaccessToken from "../../../util/getAccesstoken";
export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [playlists, setPlaylists] = useState<any>(null);
  const fetchplaylists = async () => {
    const accessToken = await getaccessToken();
    console.log(accessToken);
    const response = await fetch(
      `https://api.spotify.com/v1/search?query=${search}&type=playlist`,
      {
        // mode: "no-cors",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    console.log(data.playlists.items);
    setPlaylists(data.playlists.items);
  };
  return (
    <div className="max-w-md mx-auto w-full">
      <div className="max-w-[20rem] mx-auto mt-5">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <form
            action={fetchplaylists}
            className="flex items-center w-full h-full"
          >
            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Playlist"
              required
            />
            <Button
              type="submit"
              onPress={fetchplaylists}
              className="text-white absolute end-2.5 bottom-2.5 bg-[#609966] hover:bg-[#] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="inset-0 flex justify-center">
        {playlists && <PlaylistList playlist={playlists} />}
      </div>
    </div>
  );
}
