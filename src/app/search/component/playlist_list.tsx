import Card from "./card";
export default function PlaylistList({ playlist }: any) {
  console.log(playlist);
  return (
    <div className="mb-[80px]">
      {playlist.map((item: any, index: number) => (
        <div key={index}>
          <Card
            img={item.images[0].url}
            name={item.name}
            desc={item.description}
            href={item.id}
          />
        </div>
      ))}
    </div>
  );
}
