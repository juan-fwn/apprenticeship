import React from "react";
import HomeScreen from "./Components/HomeScreen";

const token = process.env.GITHUB_API_KEY;

function App() {
  // useEffect(() => {
  //   const getMovies = async () => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/76341?api_key=${token}`,
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
