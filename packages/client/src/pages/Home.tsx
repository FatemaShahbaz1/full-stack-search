import { type ChangeEvent } from "react";
import HotelSearchItem from "../components/Hotel/HotelSearchItem";
import NoResultFound from "../components/Shared/NoResultFound";
import SearchHeading from "../components/Shared/SearchHeading";
import CountrySearchItem from "../components/Country/CountrySearchItem";
import CitySearchItem from "../components/City/CitySearchItem";
import useAccomodation from "../hooks/useAccomodation";

function Home() {
  const {
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
  } = useAccomodation();

  const isDataAvailable =
    !!hotels.length || !!cities.length || !!countries.length;

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
