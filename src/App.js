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
    const categories = [...this.state.categories];
    const index = categories.findIndex(categorie => categorie.id === id);

    categories.splice(index, 1);
    this.setState({ categories });
  };

  //Gerer l'ajout d'une categorie
  handAdd = categorie => {
	  fetch(  // fetch  url methode et header
		  'http://localhost:5000/categories', {
			  method: 'POST', 
			  headers: "accept: application/json",
			});
		const categories = [...this.state.categories];
		categorie.id = this.state.count;
		this.setState ({count: this.state.count+1});
		categories.push(categorie);
		this.setState({ categories });
  };

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
        <CategorieForm onCategorieAdd={this.handAdd} />
      </div>
    );
  }
}
export default App;
