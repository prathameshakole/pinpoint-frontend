import { useNavigate } from "react-router";

export const CityBox = ({ city }: any) => {
  const navigate = useNavigate();
  console.log(city);
  return (
    <div className="card p-2 m-4">
      <div className="row">
        <h5>{city.properties.name}</h5>
        <p>{city.properties.display_name}</p>
      </div>
      <div className="row">
        <div className="col-6">
          <h6>Coordinates</h6>
          {city.geometry.coordinates[0]}
          <br />
          {city.geometry.coordinates[1]}
        </div>
        <div className="col-6">
          <button className="btn btn-primary float-end m-4" onClick={() =>
            navigate(
              `/city?name=${city.properties.name}&longitude=${city.geometry.coordinates[0]}&latitude=${city.geometry.coordinates[0]}&display_name=${city.properties.display_name}
          `,
            )
          }>Go</button>
        </div>
      </div>
    </div>
  );
};
