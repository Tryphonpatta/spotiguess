export default function DisplayImage(imageurl: any) {
  return (
    <div>
      <img src={imageurl.imageurl} alt="" width={300} />
    </div>
  );
}
