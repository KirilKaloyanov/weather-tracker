import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DailyWeather from "./components/dailyWeather/dailyWeather.jsx";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return axios
        .get("https://weather-tracker-de4c4456558d.herokuapp.com/lastTenDays")
        .then((result) => result.data)
        .catch((err) => console.log(err));
    },
  });
  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    console.log(data);
    return (
      <div className="display_flex overflow_x">
        {data.map((x) => (
          <DailyWeather key={x.date} morning={x.morning} noon={x.noon} />
        ))}
      </div>
    );
  }
}

export default App;
