import Image from "next/image";

export default function Card({ img, name, desc, href }: any) {
  return (
    <a href={`/play/${href}`}>
      <div className="flex flex-col justify-between items-center border my-4 p-2 rounded-md hover:bg-gray-800 hover:scale-105 transition w-[300px] h-[330px]">
        <h1>{name}</h1>
        <Image src={img} alt="playlist" width={200} height={200} />
        <h1 className="min-w-[200px] max-w-[250px] line-clamp-3 text-[12px] text-gray-400 ">
          {desc}
        </h1>
      </div>
    </a>
  );
}
