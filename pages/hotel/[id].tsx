import axios from "axios";
import Link from "next/link";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import "../../styles/globals.css";
import { IHotelItem, IImage } from "../components/hotelItem";
import RoomList from "../components/RoomList";
import { IRoom } from "../components/RoomList";

const HotelPage = ({ id }: any) => {
  const [hotel, setHotel] = useState<IHotelItem | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [filters, setFilters] = useState({ adults: 1, children: 0 });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelResponse = await axios.get(
          `https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`
        );
        const roomResponse = await axios.get(
          `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`
        );
        setHotel(hotelResponse.data.find((h: any) => h.id === id));
        setRooms(roomResponse.data.rooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const filteredRooms = rooms.filter(
    (room) =>
      room.occupancy.maxAdults >= filters.adults &&
      room.occupancy.maxChildren >= filters.children
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Link className="underline font-bold text-xl" href={`/`}>
        BACK
      </Link>
      {hotel && (
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {hotel.name}{" "}
            <span className="text-xl font-normal">
              ({hotel.starRating} Stars)
            </span>
          </h1>
          <p className="mb-6">{hotel.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {hotel.images.map((image, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center h-48 overflow-hidden rounded-md"
              >
                <img
                  src={image.url}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-4">Rooms</h2>
      <div className="mb-6 bg-gray-800 p-4 rounded-md text-white grid sm:grid-cols-2 gap-4">
        <div>
          <label className="mr-2">Adults:</label>
          <input
            type="number"
            min="0"
            value={filters.adults}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                adults: parseInt(e.target.value, 10),
              }))
            }
            className="border rounded-md px-2 py-1 mr-4 text-black"
          />
        </div>
        <div>
          <label className="mr-2">Children:</label>
          <input
            type="number"
            min="0"
            value={filters.children}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                children: parseInt(e.target.value, 10),
              }))
            }
            className="border rounded-md px-2 py-1 text-black"
          />
        </div>
      </div>

      {filteredRooms.map((room) => (
        <RoomList
          key={room.id}
          id={room.id}
          name={room.name}
          longDescription={room.longDescription}
          images={room.images}
          occupancy={room.occupancy}
        ></RoomList>
      ))}
    </div>
  );
};

HotelPage.getInitialProps = ({ query }: NextPageContext) => {
  return { id: query.id as string };
};

export default HotelPage;
