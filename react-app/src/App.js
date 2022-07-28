import React from "react";
import HomeScreen from "./Components/HomeScreen";

// const API_KEY = "df7ba0e57e5998b3482646f2dded6d32";

function App() {
  // useEffect(() => {
  //   const getMovies = async () => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/76341?api_key=${API_KEY}`,
  //     );

  //     const json = await response.json();

  //     // eslint-disable-next-line no-console
  //     console.log({ response });
  //     // eslint-disable-next-line no-console
  //     console.log({ json });
  //   };

  //   getMovies();
  // }, []);

  return <HomeScreen />;
}
export default App;
