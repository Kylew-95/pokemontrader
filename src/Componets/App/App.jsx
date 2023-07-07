import "./App.css";
import Profile from "../Profile/Profile";
import ResponsiveNavBar from "../NavBar/Navbar";
import PokeDisplay from "../PokeDisplay/PokeDisplay";
import SupabaseLogin from "../SupabaseLogin/SupabaseLogin";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [pokeData, setPokeData] = useState(""); // Updated initial state to an empty string

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?id=${pokeData}`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_POKE_KEY,
          },
        }
      );
      const newPokeData = await response.json();
      setPokeData(newPokeData.data); // Set the state to the new data
      // console.log(newPokeData);
      // Do something with pokeData
      console.log(pokeData);
    }

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <ResponsiveNavBar />
        <Routes>
          <Route path="Home" element={<PokeDisplay />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="/Login" element={<SupabaseLogin />} />
          <Route
            path="/"
            element={
              <>
                {" "}
                <section className="homepage">
                  <img
                    id="pokemonTitle"
                    src="/Loading/pokemon title.png"
                    alt=""
                  />
                  <h2>Click on the card to find out more below</h2>
                </section>
                <section className="mainContent">
                  <PokeDisplay pokeData={pokeData} />
                </section>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;