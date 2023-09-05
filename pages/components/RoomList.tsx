import { IHotelItem, IImage } from "./hotelItem";

export interface IRoom {
  id: string;
  name: string;
  longDescription: string;
  images: IImage[];
  occupancy: {
    maxAdults: number;
    maxChildren: number;
    maxOverall: number;
  };
}

const RoomList: React.FC<IRoom> = (props) => {
  return (
    <div
      key={props.id}
      className="mb-6 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-2xl mb-2">{props.name}</h3>
      <p className="mb-4">{props.longDescription}</p>
      <div className="flex justify-between mb-4">
        <p>
          Adult limit:{" "}
          <span className="font-bold">{props.occupancy.maxAdults}</span>
        </p>
        <p>
          Children limit:{" "}
          <span className="font-bold">{props.occupancy.maxChildren}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.images.map((image, idx) => (
          <div
            key={idx}
            className="flex justify-center items-center overflow-hidden rounded-md h-52"
          >
            <img
              src={image.url}
              alt={props.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
