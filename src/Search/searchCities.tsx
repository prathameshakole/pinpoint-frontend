import { useNavigate } from "react-router"
import { City } from "../City/city"

export const SearchCities = ({ cities }: any) => {
    const navigate = useNavigate()
    return (
        <div>
            {cities.slice(0, 10).map((city: any) => (
                <div className="card col-lg-6 col-md-8">
                    <City city={city} />
                </div>
            ))}
        </div>
    )
}