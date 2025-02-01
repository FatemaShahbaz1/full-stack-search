import React from "react";
import { Link } from "react-router";
import { Hotel } from "utils";

const HotelSearchItem = ({ _id, hotel_name, star_rating, country }: Hotel) => {
  return (
    <li key={_id}>
      <Link to={`/hotel/${_id}`} className="dropdown-item text-muted">
        <i className="fa fa-building mr-2"></i>
        {hotel_name} - {star_rating} - {country}
      </Link>
      <hr className="divider" />
    </li>
  );
};

export default React.memo(HotelSearchItem);
