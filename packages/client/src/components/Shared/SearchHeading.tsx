import React from "react";
import { NavLink } from "react-router";

const SearchHeading = ({ title = "Hotels", count = 0, route = "/hotels" }) => (
  <div className="d-flex justify-content-between align-items-center mb-1">
    <h3 className="d-flex align-items-center mb-0">
      <span>{title}</span> <small className="ml-1">({count})</small>
    </h3>
    {count > 10 && <NavLink to={route}>View All</NavLink>}
  </div>
);

export default React.memo(SearchHeading);
