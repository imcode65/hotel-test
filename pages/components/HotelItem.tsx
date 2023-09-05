import Link from "next/link";

export interface IImage {
  url: string;
  alt?: string;
}

export interface IHotelItem {
  id: string;
  name: string;
  description: string;
  images: IImage[];
  starRating: string;
  address1: string;
}

const HotelItem: React.FC<IHotelItem> = (props) => {
  return (
    <div
      key={props.id}
      className="border rounded-lg p-4 shadow-md transition-shadow border-[#50586a] bg-gray-300"
    >
      <h2 className="text-2xl mb-2">
        <Link
          className="underline font-bold hover:shadow-lg"
          href={`/hotel/${props.id}`}
        >
          {props.name}
        </Link>
      </h2>
      <p className="mb-4">{props.description}</p>
      <p>
        Address: <span className="font-bold">{props.address1}</span>
      </p>
      <p className="mb-1">
        Star Rating:{" "}
        <span className="text-yellow-300 font-bold">{props.starRating}</span>
      </p>
      <img
        src={props.images[0]?.url}
        alt={props.name}
        className="w-full h-48 object-cover rounded-md"
      />
    </div>
  );
};

export default HotelItem;
