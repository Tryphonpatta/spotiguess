export default function DisplayImage(imageurl: any) {
  return (
    <div className=" w-[300px]">
      <img src={imageurl.imageurl} alt="" />
    </div>
  );
}
