import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  if (isError) {
    console.log(isError);
    return <h1>Error</h1>;
  }
  if (isLoading) return <h1>Loading</h1>;
  if (data)
    return (
      <>
        <table>
          <thead>
            <th>time</th>
            <th>temp</th>
            <th>weather</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x._id}>
                <td>
                  {x.localObservationDateTime.replace("T", " ").slice(0, -5)}
                </td>
                <td>{x.temperature.metric.value}</td>
                <td>{x.weatherText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
}

export default App;
