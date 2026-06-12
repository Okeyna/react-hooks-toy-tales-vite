import React, { createContext, useState, useContext, useEffect } from "react";

const ToysContext = createContext();

export const ToysProvider = ({ children }) => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetchToys();
  }, [])

  const fetchToys = () => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toysData) => {
        setToys(toysData)
      })
      .catch((error) => console.error(error));
  }

  const postNewToy = (newToy) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then((response) => response.json())
    .then((newToyData) => {
      addToy(newToyData);
    })
    .catch((error) => console.error(error));
  }
  
  const updateToy = (toy) => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy),
    })
    .then((response) => response.json())
    .then((updatedToy) => {
      updateToys(updatedToy);
    })
    .catch((error) => console.error(error));
  }
  
  const deleteToy = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        removeToy(id);
      }
    })
    .catch((error) => console.error(error));
  }
  
  
  const getToy = (id) => {
    const toy = toys.find((toy) => toy.id === id);
  }
  
  const addToy = (toy) => {
    setToys([...toys, toy]);
  }

  const updateToys = (updatedToy) => {
    setToys(toys.map((toy) => (toy.id === updatedToy.id) ? updatedToy : toy));
  }

  const removeToy = (id) => {
    setToys(toys.filter((toy) => toy.id !== id));
  }

  const value = { deleteToy, updateToy, postNewToy, toys };
  
  return (
    <ToysContext.Provider value={value}>
      {children}
    </ToysContext.Provider>
  );
}

export const useToys = () => useContext(ToysContext);
