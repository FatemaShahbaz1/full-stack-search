import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCity from "../hooks/useCity";

const City = () => {
  const { id } = useParams();
  const { getCityById, city, loading, error } = useCity();

  useEffect(() => {
    getCityById(id as string);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!city) return <div>No city found</div>;

  return (
    <div>
      <h1>{city.name}</h1>
      <p>{city._id}</p>
    </div>
  );
};

export default React.memo(City);
