// import axios from "axios";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/pokemon/${value}`);
  };

  // const getData = async (searchValue) => {
  //   try {
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${searchValue}`
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <form onSubmit={search} className="search">
        <input
          type="search"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
