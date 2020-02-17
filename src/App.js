import React from "react";
import Categorie from "./Categorie";
import CategorieForm from "./CategorieForm";

import "./App.css";

class App extends React.Component {
  state = {
    categories: [],
    count: 0
  };

  //Récupérer les données dans la base de donnée de node-rest-crud-API
  //curl -X GET "http://127.0.0.1:8000/api/categories" -H  "accept: application/json"
  componentDidMount() {
	fetch('http://localhost:5000/categories')
    .then(res => res.json())
    .then((resj) => {
		//  console.log(resj)
      this.setState({ categories: resj.data })
    })
    .catch(console.log)
  }

  //méthode Delete
  handleDelete = id => {
	fetch(  
		'http://localhost:5000/categories', {
	 		method: 'POST', 
			 headers: "accept: application/json",
			 'Content-Type': 'application/json'
		   });
		   
		const categories = [...this.state.categories];
		const index = categories.findIndex(categorie => categorie.id === id);

		categories.splice(index, 1);
		this.setState({ categories });
  };

  //Gerer l'ajout d'une categorie
  handleAdd = categorie => {
	  fetch(
		'http://localhost:5000/categories', {
			method: 'POST', 
        	headers:{ "accept": "application/json",
        	'Content-Type': 'application/json'
      		},
        	body: JSON.stringify({ categorie
      		})
      	}
    )
    .then(res => res.json())// parse la réponse en JSON
    .then((resj) => {
    const categories = [...this.state.categories];
		categorie.id = resj.data.insertId;
		categories.push(categorie);
		this.setState({ categories });
  })
}

  render() {
    const title = "Liste des catégories";

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {this.state.categories.map(categorie => (
            <Categorie key={categorie.id} details={categorie} onDelete={this.handleDelete} />
          ))}
        </ul>
        <CategorieForm onCategorieAdd={this.handleAdd} />
      </div>
    );
  }
}
export default App;
