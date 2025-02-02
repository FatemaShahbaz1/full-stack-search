import { useState } from "react";
import { Hotel } from "utils";
import hotelService from "../services/hotel.service";

const useHotel = () => {
  const [hotel, setHotel] = useState<Hotel>();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHotelById = async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await hotelService.getHotelById(id);
      if (error) {
        setError(error);
        setHotel(undefined);
        return;
      }

      setHotel(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getHotels = async (page: number, search: string) => {
    setLoading(true);
    setError(null);

    setPage(page);
    try {
      const { data, total } = await hotelService.getHotels(page, 10, search);
      setCount(total);
      setHotels(data);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    hotel,
    hotels,
    loading,
    error,
    page,
    count,
    getHotelById,
    getHotels,
  };
};

export default useHotel;
