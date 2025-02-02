import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import useCountry from "../hooks/useCountry";

const CountryList = () => {
  const [search, setSearch] = useState("");
  const { countries, page, count, loading, error, getCountries } = useCountry();

  useEffect(() => {
    getCountries(1, "");
  }, []);

  const getCountriesHandler = useCallback(
    debounce((value: string) => {
      getCountries(1, value);
    }, 1000),
    []
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    getCountriesHandler(value);
  };

  const handleNextPage = () => getCountries(page + 1, search);
  const handlePrevPage = () => getCountries(page - 1, search);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search countries..."
      />
      <ul>
        {countries.map((country) => (
          <li key={country._id}>{country.country}</li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={page <= 1}>
        Prev
      </button>
      <button onClick={handleNextPage} disabled={count / 10 < 1}>
        Next
      </button>
    </div>
  );
};

export default React.memo(CountryList);
