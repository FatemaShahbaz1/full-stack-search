import React from "react";
import { Link } from "react-router";
import { City } from "utils";

const CitySearchItem = ({ _id, name }: City) => {
  return (
    <li key={_id}>
      <Link to={`/city/${_id}`} className="dropdown-item text-muted">
        <i className="fa fa-globe mr-2"></i>
        {name}
      </Link>
      <hr className="divider" />
    </li>
  );
};

export default React.memo(CitySearchItem);
