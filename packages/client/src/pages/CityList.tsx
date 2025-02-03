import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import useCity from "../hooks/useCity";

const CityList = () => {
  const [search, setSearch] = useState("");
  const { cities, page, count, loading, error, getCities } = useCity();

  useEffect(() => {
    getCities(1, "");
  }, []);

  const getCitiesHandler = useCallback(
    debounce((value: string) => {
      getCities(1, value);
    }, 1000),
    []
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    getCitiesHandler(value);
  };

  const handleNextPage = () => getCities(page + 1, search);
  const handlePrevPage = () => getCities(page - 1, search);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search cities..."
      />
      <ul>
        {cities.map((city) => (
          <li key={city._id}>{city.name}</li>
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

export default React.memo(CityList);
