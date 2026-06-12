import React, { useState } from "react";
import { useToys } from "../context/ToysContext";

function ToyForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0
  });

  const { postNewToy } = useToys();

  const handleSubmit = (e) => {
    // prevent default behavior of form submission
    e.preventDefault();
    if (formData.name === "" || formData.image === "") {
      return;
    }
    // post new toy to toys array in state
    postNewToy(formData);
    // reset form to default values
    setFormData({
      name: "",
      image: "",
      likes: 0
    });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit} >
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
