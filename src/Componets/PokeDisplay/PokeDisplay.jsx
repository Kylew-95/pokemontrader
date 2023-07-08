import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardPopup from "../CardPopup/CardPopup";
import Grid from "@mui/material/Grid";
import { supabase } from "../SupabaseLogin/SupabaseLogin";

import { rareColors, typeColors } from "./Types";
import "./PokeDisplay.css";
import { Button } from "@mui/material";

function PokeDisplay({ pokeData, faviorteCard, userid }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 9; // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokeData = pokeData?.slice(startIndex, endIndex) || [];

  const handleCardClick = (pokeData) => {
    setSelectedCard(pokeData);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const handleToFavourite = ({ faviorteCard, userid }) => {
    async function handleFavouriteCard() {
      console.log("faviorteCard:", faviorteCard);
      console.log("userid:", userid);

      if (!Array.isArray(faviorteCard)) {
        console.log("faviorteCard is not an array");
        return;
      }

      const NewfavouriteCard = faviorteCard?.filter(
        (card) => card.images.small === true
      );

      console.log("NewfavouriteCard:", NewfavouriteCard);

      if (!NewfavouriteCard || NewfavouriteCard.length === 0) {
        return; // Exit the function if NewfavouriteCard is undefined or empty
      }

      const { data, error } = await supabase
        .from("user_faviourtes")
        .insert({ favourite_cards: NewfavouriteCard })
        .eq("user_id", userid?.id);

      console.log("Insert data:", data);
      console.log("Insert error:", error);
    }

    handleFavouriteCard();
  };

  if (!pokeData) {
    return (
      <img src="./Loading/running-pikachu-transparent-snivee.gif" alt="" />
    );
  }

  return (
    <>
      <Stack id="pagination" spacing={2}>
        <Pagination
          count={Math.ceil(pokeData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <CardPopup poksData={selectedCard} onClose={handleClosePopup} />
      {pokeData.length > 0 ? (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          columnGap={0.2}
          rowSpacing={10}
        >
          {currentPokeData.map((poksData) => (
            <Grid item xs={12} sm={4} md={4} lg={3} key={poksData.id}>
              <div className="card_container">
                <div
                  id="card"
                  className="menu__container"
                  onClick={() => handleCardClick(poksData)}
                >
                  <img id="pokeImg" src={poksData.images.small} alt="" />
                </div>
              </div>
              <p id="Att">
                <span
                  id="typeColour"
                  style={{ color: typeColors[poksData.types[0]] }} // Apply type color
                >
                  {poksData.types[0]}
                </span>
                <p
                  id="rareColour"
                  style={{ color: rareColors[poksData.rarity] }} // Apply rarity color
                >
                  {poksData.rarity || "No rarity"}
                </p>
              </p>
              <div className="attContainer">
                <h3>
                  <span id="hp">Hp </span>
                  {poksData.hp}
                </h3>
                <Button variant="contained" onClick={handleToFavourite}>
                  Add to Faviourites
                </Button>
                <h3>
                  <span id="market">
                    ${poksData.cardmarket?.prices.trendPrice}
                  </span>
                </h3>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default PokeDisplay;
