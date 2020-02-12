import React from "react";

const Categorie = ({ details, onDelete }) => (
  <li>
   {details.id} -> {details.libelle} <button onClick={() => onDelete(details.id)}>X</button>
  </li>
);

export default Categorie;
