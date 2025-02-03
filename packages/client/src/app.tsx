import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import Country from "./pages/Country";
import City from "./pages/City";
import HotelList from "./pages/HotelList";
import CountryList from "./pages/CountryList";
import CityList from "./pages/CityList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="hotels" element={<HotelList />} />
              <Route path="hotel/:id" element={<Hotel />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="country/:id" element={<Country />} />
              <Route path="cities" element={<CityList />} />
              <Route path="city/:id" element={<City />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
