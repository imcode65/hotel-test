import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import HotelItem from "./components/hotelItem";
import { IHotelItem } from "./components/hotelItem";

const HomePage = () => {
  const [hotels, setHotels] = useState<IHotelItem[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotelItem[]>([]);
  const [starFilter, setStarFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
        );
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    if (starFilter !== null) {
      setFilteredHotels(
        hotels.filter((hotel) => parseInt(hotel.starRating) >= starFilter)
      );
    } else {
      setFilteredHotels(hotels);
    }
  }, [starFilter, hotels]);

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-4xl font-bold mb-6 text-blue-700">Hotels</p>

      <div className="mb-6 bg-gray-800 text-white p-4 rounded-md">
        <label htmlFor="starFilter" className="mr-2">
          Filter by Star Rating:
        </label>
        <select
          id="starFilter"
          value={starFilter || ""}
          onChange={(e) =>
            setStarFilter(e.target.value ? parseInt(e.target.value) : null)
          }
          className="border rounded-md px-2 py-1 text-black"
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredHotels.map((hotel) => (
          <HotelItem
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            description={hotel.description}
            images={hotel.images}
            starRating={hotel.starRating}
            address1={hotel.address1}
          ></HotelItem>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
