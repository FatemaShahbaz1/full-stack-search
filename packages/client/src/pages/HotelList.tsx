import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import useHotel from "../hooks/useHotel";
import { debounce } from "lodash";

const HotelList = () => {
  const [search, setSearch] = useState("");
  const { hotels, page, count, loading, error, getHotels } = useHotel();

  useEffect(() => {
    getHotels(1, "");
  }, []);

  const getHotelsHandler = useCallback(
    debounce((value: string) => {
      getHotels(1, value);
    }, 1000),
    []
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    getHotelsHandler(value);
  };

  const handleNextPage = () => getHotels(page + 1, search);
  const handlePrevPage = () => getHotels(page - 1, search);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search hotels..."
      />
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>{hotel.hotel_name}</li>
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

export default React.memo(HotelList);
