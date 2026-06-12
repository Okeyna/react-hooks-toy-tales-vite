import React from "react";
import { useToys } from "../context/ToysContext";

function ToyCard({ toy }) {
  const { deleteToy, updateToy } = useToys();

  const handleDelete = () => {
    deleteToy(toy.id);
  }

  const handleUpdate = () => {
    const likedToy = { ...toy, likes: toy.likes + 1 }
    updateToy(likedToy)
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{ toy.name }</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleUpdate}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDelete(toy.id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
