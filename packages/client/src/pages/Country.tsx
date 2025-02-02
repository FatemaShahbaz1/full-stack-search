import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCountry from "../hooks/useCountry";

const Country = () => {
  const { id } = useParams();
  const { getCountryById, country, loading, error } = useCountry();

  useEffect(() => {
    getCountryById(id as string);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!country) return <div>No country found</div>;

  return (
    <div>
      <h1>{country.country}</h1>
      <p>{country.countryisocode}</p>
    </div>
  );
};

export default React.memo(Country);
