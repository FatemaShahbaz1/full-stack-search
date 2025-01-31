import { useCallback, useState, type ChangeEvent } from "react";
import { debounce } from "lodash";
import { getCodeSandboxHost } from "@codesandbox/utils";

type HotelT = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};
type CityT = { _id: string; name: string };
type CountryT = { _id: string; country: string; countryisocode: string };

type HotelResponse = {
  data: { hotels: HotelT[]; cities: CityT[]; countries: CountryT[] };
  error?: string;
};

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

const NoResultFound = () => <p className="text-muted">No results found.</p>;

function App() {
  const [hotels, setHotels] = useState<HotelT[]>([]);
  const [cities, setCities] = useState<CityT[]>([]);
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const resetData = () => {
    setHotels([]);
    setCities([]);
    setCountries([]);
    setShowClearBtn(false);
  };

  const isDataAvailable =
    !!hotels.length || !!cities.length || !!countries.length;

  const fetchHotels = useCallback(
    debounce(async (value: string) => {
      const hotelsData = await fetch(`${API_URL}/hotels?search=${value}`);
      setIsLoading(false);
      const hotelResponse = (await hotelsData.json()) as HotelResponse;

      const { data, error } = hotelResponse;
      const { hotels, cities, countries } = data;

      if (error) {
        setError(error);
        resetData();
        return;
      }

      setHotels(hotels);
      setCities(cities);
      setCountries(countries);

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
    fetchHotels(searchText);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
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
                    <h3 className="d-flex align-items-center">
                      <span>Hotels</span> <small className="ml-1">({hotels.length})</small>
                    </h3>
                    {hotels.length ? (
                      hotels.map(({ _id, hotel_name }) => (
                        <li key={_id}>
                          <a href={`/hotel/${_id}`} className="dropdown-item text-muted">
                            <i className="fa fa-building mr-2"></i>
                            {hotel_name}
                          </a>
                          <hr className="divider" />
                        </li>
                      ))
                    ) : (
                      <NoResultFound />
                    )}
                    <h2>Countries ({countries.length})</h2>
                    {countries.length ? (
                      countries.map(({ _id, country, countryisocode }) => (
                        <li key={_id}>
                          <a href={`/country/${_id}`} className="dropdown-item">
                            <i className="fa fa-globe mr-2"></i>
                            {countryisocode} - {country}
                          </a>
                          <hr className="divider" />
                        </li>
                      ))
                    ) : (
                      <NoResultFound />
                    )}
                    <h2>Cities ({cities.length})</h2>
                    {cities.length ? (
                      cities.map(({ _id, name }) => (
                        <li key={_id}>
                          <a href={`/city/${_id}`} className="dropdown-item">
                            <i className="fa fa-globe mr-2"></i>
                            {name}
                          </a>
                          <hr className="divider" />
                        </li>
                      ))
                    ) : (
                      <NoResultFound />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
