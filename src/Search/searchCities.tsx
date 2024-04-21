import { useNavigate } from "react-router"

export const SearchCities = ({ cities }: any) => {
    const navigate = useNavigate()
    return (
        <div className="col-lg-12">
            <div className="col-lg-12">
                {cities.slice(0, 10).map((city: any) => (
                    <div onClick={() => navigate(`city/${cities.name}`)}>
                        <h5>{city.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}