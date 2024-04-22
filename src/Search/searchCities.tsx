import { CityBox } from "../City/cityBox";

export const SearchCities = ({ cities }: any) => {
  return (
    <div className="col-lg-10">
      {cities.slice(0, 10).map((city: any) => (
        <div key={city.properties.place_id}>
          <CityBox city={city} />
        </div>
      ))}
    </div>
  );
};
