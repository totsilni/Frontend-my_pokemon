import { useNavigate } from "react-router-dom";

const Card = ({ name, abilities, img }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/pokemon/${name}`)}>
      <img src={img} alt="" className="pokemonCardImage" />
      <div>
        <h1 className="pokemonName">{name}</h1>
        {abilities.map((ability, index) => (
          <div key={index} className="cardAbilities">
            <h3>{ability.type.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
