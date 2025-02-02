import { useState, useCallback } from "react";
import { City, Country, Hotel } from "utils";
import { debounce } from "lodash";
import accomodationService from "../services/accomodation.service";
import { AccomodationResponse } from "../types";

const useAccomodation = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const [hotelsCount, setHotelsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const resetData = () => {
    setHotels([]);
    setCities([]);
    setCountries([]);
    setShowClearBtn(false);

    setHotelsCount(0);
    setCountriesCount(0);
    setCitiesCount(0);
  };

  const fetchAccomodations = useCallback(
    debounce(async (value: string) => {
      const data = (await accomodationService.getAccomodations(
        value
      )) as AccomodationResponse;
      setIsLoading(false);

      const { hotels, countries, cities, error } = data;

      if (error) {
        setError(error);
        resetData();
        return;
      }

      // Setting counts
      setHotelsCount(hotels.total);
      setCountriesCount(countries.total);
      setCitiesCount(cities.total);

      // Setting data
      setHotels(hotels.data);
      setCities(cities.data);
      setCountries(countries.data);

      setShowClearBtn(true);
    }, 1000),
    []
  );

  return {
    hotels,
    cities,
    countries,
    hotelsCount,
    countriesCount,
    citiesCount,
    isLoading,
    showClearBtn,
    setIsLoading,
    fetchAccomodations,
    resetData,
  };
};

export default useAccomodation;
