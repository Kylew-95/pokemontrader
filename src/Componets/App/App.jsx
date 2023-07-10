import "./App.css";
import Profile from "../Profile/Profile";
import ResponsiveNavBar from "../NavBar/Navbar";
import PokeDisplay from "../PokeDisplay/PokeDisplay";
import { supabase } from "../SupabaseLogin/SupabaseLogin.jsx";
import SupabaseLogin from "../SupabaseLogin/SupabaseLogin";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [pokeData, setPokeData] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Check if pokeData and pokeData.id are defined
      const response = await fetch(`https://api.pokemontcg.io/v2/cards`, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_POKE_KEY,
        },
      });
      const newPokeData = await response.json();
      setPokeData(newPokeData.data);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
      // console.log(user.data.user);
    }
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   async function fetchUserData() {
  //     const user = await supabase.auth.getUser();
  //     console.log(user);
  //     const { data, error } = await supabase
  //       .from("new_users")
  //       .select("*")
  //       // .eq("new_user_id", user.id)
  //       .ilike("first_name", user?.first_name);
  //       console.log(data)
  //     if (error) {
  //       throw error;
  //     }
  //     if (data) {
  //       setUser(data);
  //       console.log(data);
  //     }
  //   }

  //   fetchUserData();
  // }, []);

  return (
    <>
      <Router>
        <ResponsiveNavBar user={user} />
        <Routes>
          <Route path="Home" element={<PokeDisplay />} />
          <Route
            path="Profile"
            element={<Profile user={user} favouriteCard={pokeData} />}
          />
          <Route path="/Login" element={<SupabaseLogin />} />
          <Route
            path="/"
            element={
              <>
                <section className="homepage">
                  <img
                    id="pokemonTitle"
                    src="/Loading/pokemon title.png"
                    alt=""
                  />
                  <h2>Click on the cards to find out more below</h2>
                </section>
                <section className="mainContent">
                  <PokeDisplay pokeData={pokeData} userid={user} />
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
