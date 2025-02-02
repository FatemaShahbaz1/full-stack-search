import { useState } from "react";
import { Country } from "utils";
import countryService from "../services/country.service";

const useCountry = () => {
  const [country, setCountry] = useState<Country>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCountryById = async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await countryService.getCountryById(id);
      if (error) {
        setError(error);
        setCountry(undefined);
        return;
      }

      setCountry(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getCountries = async (page: number, search: string) => {
    setLoading(true);
    setError(null);

    setPage(page);
    try {
      const { data, total } = await countryService.getCountries(
        page,
        10,
        search
      );
      setCount(total);
      setCountries(data);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    country,
    countries,
    loading,
    error,
    page,
    count,
    getCountryById,
    getCountries,
  };
};

export default useCountry;
