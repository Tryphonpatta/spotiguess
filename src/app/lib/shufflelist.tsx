export default function ShuffleList({ items }: any) {
  const shufflelist = [] as any;
  for (let i = 0; i < items.length; i++) {
    //copy to shufflelist
    if (!items[i].track.preview_url) continue;
    shufflelist.push({
      title: items[i].track.name,
      artist: items[i].track.artists,
      url: items[i].track.preview_url,
    });
    // console.log(items[i].track.name, items[i].track.preview_url);
  }
  for (let i = shufflelist.length - 1; i > 0; i--) {
    //shuffle
    const j = Math.floor(Math.random() * (i + 1));
    [shufflelist[i], shufflelist[j]] = [shufflelist[j], shufflelist[i]];
  }
  // console.log(shufflelist);
  return shufflelist;
}
