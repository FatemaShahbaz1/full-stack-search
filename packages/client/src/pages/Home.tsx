import { useCallback, useState, type ChangeEvent } from "react";
import { debounce } from "lodash";
import { getCodeSandboxHost } from "@codesandbox/utils";
import { Hotel, City, Country } from "utils";
import { AccomodationResponse } from "../types";
import HotelSearchItem from "../components/Hotel/HotelSearchItem";
import NoResultFound from "../components/Shared/NoResultFound";
import SearchHeading from "../components/Shared/SearchHeading";
import CountrySearchItem from "../components/Country/CountrySearchItem";
import CitySearchItem from "../components/City/CitySearchItem";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

function Home() {
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

  const isDataAvailable =
    !!hotels.length || !!cities.length || !!countries.length;

  const fetchAccomodations = useCallback(
    debounce(async (value: string) => {
      const accommodations = await fetch(
        `${API_URL}/accomodations?search=${value}`
      );
      setIsLoading(false);
      const data = (await accommodations.json()) as AccomodationResponse;

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

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    if (searchText === "") {
      resetData();
      return;
    }

    setIsLoading(true);
    fetchAccomodations(searchText);
  };

  return (
    <div className="dropdown">
      <div className="form">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search accommodation..."
          onChange={fetchData}
        />
        {showClearBtn && (
          <span className="left-pan">
            <i className="fa fa-close"></i>
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
          <div>Loading...</div>
        </div>
      ) : (
        isDataAvailable && (
          <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
            <SearchHeading title="Hotels" count={hotelsCount} route="/hotels" />
            {hotelsCount ? (
              hotels.map((hotel) => <HotelSearchItem {...hotel} />)
            ) : (
              <NoResultFound />
            )}

            <SearchHeading
              title="Countries"
              count={countriesCount}
              route="/countries"
            />
            {countriesCount ? (
              countries.map((country) => <CountrySearchItem {...country} />)
            ) : (
              <NoResultFound />
            )}

            <SearchHeading title="Cities" count={citiesCount} route="/cities" />
            {citiesCount ? (
              cities.map((city) => <CitySearchItem {...city} />)
            ) : (
              <NoResultFound />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
