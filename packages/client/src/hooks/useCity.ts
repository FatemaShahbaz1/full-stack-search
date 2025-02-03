import { useState } from "react";
import { City } from "utils";
import cityService from "../services/city.service";

const useCity = () => {
  const [city, setCity] = useState<City>();
  const [cities, setCities] = useState<City[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCityById = async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await cityService.getCityById(id);
      if (error) {
        setError(error);
        setCity(undefined);
        return;
      }

      setCity(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getCities = async (page: number, search: string) => {
    setLoading(true);
    setError(null);

    setPage(page);
    try {
      const { data, total } = await cityService.getCities(page, 10, search);
      setCount(total);
      setCities(data);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    cities,
    loading,
    error,
    page,
    count,
    getCityById,
    getCities,
  };
};

export default useCity;
