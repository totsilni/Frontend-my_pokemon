import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const Main = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${
          (currentPage - 1) * 20
        }&limit=20`
      );
      const pokemonList = response.data.results;

      const pokemonDataPromises = pokemonList.map(async (pokemon) => {
        const individualResponse = await axios.get(pokemon.url);
        return individualResponse.data;
      });

      const pokemonDetails = await Promise.all(pokemonDataPromises);
      setPokemonData(pokemonDetails);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  if (pokemonData) {
    console.log(pokemonData);
  }

  return (
    <div>
      <div
        className="loaderBack"
        style={{ display: isLoading ? "block" : "none" }}
      >
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      </div>
      <div style={{ display: !isLoading ? "block" : "none" }}>
        <Navbar />
        <div className="card-group">
          {pokemonData.map((pokemon, index) => (
            <Card
              key={index}
              name={pokemon.name}
              img={pokemon.sprites.other.dream_world.front_default}
              abilities={pokemon.types}
            />
          ))}
        </div>
        <div className="pageButtons">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="prevPage"
            style={{ display: currentPage === 1 ? "none" : "block" }}
          >
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="nextPage"
            style={{ display: currentPage === totalPages ? "none" : "block" }}
          >
            Next Page
          </button>
        </div>
        {/* <button className="arrowUp"><ArrowCircleUpIcon style={{fontSize: }}/></button> */}
      </div>
    </div>
  );
};

export default Main;
