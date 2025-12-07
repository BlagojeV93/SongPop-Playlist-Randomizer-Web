import { useState, useEffect } from "react";

const regularFileUri =
  "https://raw.githubusercontent.com/BlagojeV93/SongPop-Playlist-Randomizer-Web/master/src/assets/files/AllPlaylists.txt";
const specialUri =
  "https://raw.githubusercontent.com/BlagojeV93/SongPop-Playlist-Randomizer-Web/master/src/assets/files/special.txt";

export const usePlaylists = () => {
  const [allPlaylists, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLists = async () => {
    const res = await fetch(regularFileUri, {
      cache: "no-cache",
    });
    let content = await res.text();
    content = content.split("•");
    content.shift();
    setAll((prevContent) => {
      let arr = [...prevContent];
      arr.push({ title: "Regular Lists", lists: content });
      return arr;
    });
    await getSpecialLists(specialUri);
    setIsLoading(false);
  };

  const getSpecialLists = async (url) => {
    try {
      let res = await fetch(url, { cache: "no-cache" });
      let lists = await res.text();
      lists = lists.split("•");
      lists.shift();
      const uri = lists[1].trim();
      const title = lists[0].trim();
      lists.splice(0, 2);
      setAll((prevContent) => {
        let arr = [...prevContent];
        arr.push({ title, lists });
        return arr;
      });
      if (uri !== "null") {
        getSpecialLists(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { allPlaylists, isLoading };
};

