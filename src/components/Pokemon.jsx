import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import HomeIcon from "@mui/icons-material/Home";

const Pokemon = () => {
  const { name } = useParams();
  const [poekemonData, setPokemonData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("about");
  const getData = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [name]);

  console.log(poekemonData);

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
        <div className="pokemon">
          <button onClick={() => navigate("/")} className="homeBtn">
            <HomeIcon />
            Home
          </button>

          <div className="cardWithInfo">
            <div className="pokemonCard">
              <img
                src={poekemonData.sprites?.other?.dream_world?.front_default}
                alt=""
              />
            </div>
            <div className="pokemonInfo">
              <h1 className="infoName">{poekemonData.name}</h1>
              <div className="tab">
                <button
                  style={{
                    borderBottom: selectedTab === "about" && "5px solid blue",
                  }}
                  onClick={() => setSelectedTab("about")}
                >
                  About
                </button>
                <button
                  style={{
                    borderBottom: selectedTab === "stats" && "5px solid blue",
                  }}
                  onClick={() => setSelectedTab("stats")}
                >
                  Base stats
                </button>
                {/* <button
                  style={{
                    borderBottom:
                      selectedTab === "evolution" && "5px solid blue",
                  }}
                  onClick={() => setSelectedTab("evolution")}
                >
                  Evolution
                </button> */}
                <button
                  style={{
                    borderBottom: selectedTab === "moves" && "5px solid blue",
                  }}
                  onClick={() => setSelectedTab("moves")}
                >
                  Moves
                </button>
              </div>
              {selectedTab === "about" && (
                <div className="aboutPage">
                  <ul>
                    {poekemonData.types &&
                      poekemonData.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                      ))}
                  </ul>
                  <h1>Height: {poekemonData.height}</h1>
                  <h1>Weight: {poekemonData.weight}</h1>
                  <h1>
                    Abilities:{" "}
                    {poekemonData.abilities &&
                      poekemonData.abilities.map((ability, index) => (
                        <span key={index} className="pokemonAbilities">
                          {ability.ability.name},
                        </span>
                      ))}
                  </h1>
                </div>
              )}
              {selectedTab === "stats" && (
                <div className="statsPage">
                  <h2>
                    {poekemonData.stats &&
                      poekemonData.stats.map((stats, index) => (
                        <div>
                          <h2 key={index}>
                            <span>{stats.stat.name}: </span>
                            {stats.base_stat}
                          </h2>
                          <div style={{width: "500px", height: "20px", border: "1px solid", borderRadius: "20px", overflow: "hidden"}}>
                            <div
                              style={{
                                height: "20px",
                                width: `${stats.base_stat * 3.5}px`,
                                background: `${
                                  stats.stat.name === "hp" ? "red" : "blue"
                                }`,
                                // borderRadius: "20px"
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </h2>
                </div>
              )}
              {selectedTab === "moves" && (
                <div className="movesPage">
                  <h1 style={{ color: "red" }}>Moves: </h1>
                  {poekemonData.moves &&
                    poekemonData.moves.map((move, index) => (
                      <div key={index}>
                        <h2>{move.move.name},</h2>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
