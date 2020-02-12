import React, { Component } from "react";

class CategorieForm extends Component {
  state = {
    newCategorie: ""
  };

  handleChange = event => {
    this.setState({ newCategorie: event.currentTarget.value });
  };

  //méthode ajouter
  handleSubmit = event => {
    event.preventDefault();

    const id = -1;//new Date().getTime();
    const libelle = this.state.newCategorie;

    this.props.onCategorieAdd({ id, libelle });
    this.setState({ newCategorie: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.newCategorie}
          onChange={this.handleChange}
          type="text"
          placeholder="Ajouter un libellé"
        />
        <button>Ajouter à la liste</button>
      </form>
    );
  }
}

export default CategorieForm;
