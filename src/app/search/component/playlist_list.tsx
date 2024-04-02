export default function PlaylistList({ playlist }: any) {
  return (
    <div>
      {playlist.map((item: any, index: number) => (
        <div key={index}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
}
