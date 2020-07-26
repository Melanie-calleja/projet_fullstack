import React, { Component } from "react";

class AddArticleForm extends Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addArticle = (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/articles";
    const postsData = {
      titre: this.state.titre,
      contenu: this.state.contenu,
      Categorie: this.state.Categorie,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(postsData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  render() {
    return (
      <form onSubmit={this.addArticle}>
        <input
          type="text"
          name="titre"
          onChange={this.handleChange}
          placeholder="titre"
        />
        <br />
        <textarea
          type="text"
          name="contenu"
          onChange={this.handleChange}
          placeholder="Contenu"
        />
        <br />
        <input
          type="text"
          name="Categorie"
          onChange={this.handleChange}
          placeholder="Categorie"
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddArticleForm;
