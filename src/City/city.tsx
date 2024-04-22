import { useNavigate } from "react-router"

export const City = ({ city }: any) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/city?city=${city.name}&long=${city.longitude}`)} className="container">
            <h5>{city.name}</h5>
        </div>
    )
}