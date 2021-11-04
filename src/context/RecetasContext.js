import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el Context
export const RecetasContext = createContext();

// Provider es donde se encuentran las funciones y el state
const RecetasProvider = (props) => {
  // Crear el state del context
  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const [consultar, guardarConsultar] = useState(false);

  const { nombre, categoria } = busqueda;

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

        const resultado = await axios.get(url);

        // console.log(resultado.data.drinks)
        guardarRecetas(resultado.data.drinks);
      };
      obtenerRecetas();
    }
  }, [busqueda, nombre, categoria, consultar]);

  return (
    <RecetasContext.Provider
      value={{ recetas, guardarBusqueda, guardarConsultar }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
