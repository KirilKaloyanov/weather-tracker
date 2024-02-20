import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useFetchWeather() {
  return useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return axios
        .get("https://weather-tracker-de4c4456558d.herokuapp.com/lastTenDays")
        .then((result) => result.data)
        .catch((err) => console.log(err));
    },
  });
}

export default useFetchWeather;
