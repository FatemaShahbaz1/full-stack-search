import React from "react";
import { Link } from "react-router";
import { Country } from "utils";

const CountrySearchItem = ({ _id, countryisocode, country }: Country) => {
  return (
    <li key={_id}>
      <Link to={`/country/${_id}`} className="dropdown-item text-muted">
        <i className="fa fa-globe mr-2"></i>
        {countryisocode} - {country}
      </Link>
      <hr className="divider" />
    </li>
  );
};

export default React.memo(CountrySearchItem);
