import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherCard from "./components/features/weatherCard";
import "./App.css";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return axios
        .get("https://weather-tracker-de4c4456558d.herokuapp.com")
        .then((result) => {
          console.log(result.data);
          return result.data;
        })
        .catch((err) => console.log(err));
    },
  });
  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data)
    return (
      <>
        {data.map((x) => (
          <WeatherCard key={x._id} weatherInfo={x} />
        ))}
      </>
    );
}

export default App;
