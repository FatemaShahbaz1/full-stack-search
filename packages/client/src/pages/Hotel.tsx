import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHotel from "../hooks/useHotel";

const Hotel = () => {
  const { id } = useParams();
  const { getHotelById, hotel, loading, error } = useHotel();

  useEffect(() => {
    getHotelById(id as string);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!hotel) return <div>No hotel found</div>;

  return (
    <div>
      <h1>{hotel.hotel_name}</h1>
      <p>{hotel.city}</p>
      <p>{hotel.country}</p>
    </div>
  );
};

export default React.memo(Hotel);
