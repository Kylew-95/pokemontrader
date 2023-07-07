import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardPopup from "../CardPopup/CardPopup";
import Grid from "@mui/material/Grid";
import { rareColors, typeColors } from "./Types";
import "./PokeDisplay.css";

function PokeDisplay({ pokeData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8; // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokeData = pokeData?.slice(startIndex, endIndex) || [];

  const handleCardClick = (pokeData) => {
    setSelectedCard(pokeData);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  if (!pokeData) {
    return <h1>Loading...</h1>;
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