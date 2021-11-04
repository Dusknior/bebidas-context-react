import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el Context
export const ModalContext = createContext();

// Provider es donde se encuentran las funciones y el state
const ModalProvider = (props) => {
  // Crear el state del context
  const [idreceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

      const resultado = await axios.get(url);

      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{ informacion, guardarIdReceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
