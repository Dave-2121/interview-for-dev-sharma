import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <Image
        src="/Loader.png"
        alt="Loading..."
        height={44}
        width={44}
        className="w-44 h-44 animate-spin"
      />
    </div>
  );
}
