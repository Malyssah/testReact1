import React from "react";
import Categorie from "./Categorie";
import CategorieForm from "./CategorieForm";

// import logo from './logo.svg';
import "./App.css";

class App extends React.Component {
  state = {
    categories: [],
    count: 0
  };

  // A finir
  componentDidMount() {
    fetch('http://localhost:5000/categories'/*autres paramètres*/)
    .then(res => res.json())// parse la réponse en JSON
    .then((resj) => {
		console.log(resj)
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
            <Categorie details={categorie} onDelete={this.handleDelete} />
          ))}
        </ul>
        <CategorieForm onCategorieAdd={this.handAdd} />
      </div>
    );
  }
}
export default App;
