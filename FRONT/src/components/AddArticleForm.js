import React, { Component } from "react";

class AddArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      valueCategory: "",
      category: "",
    };
    this.selectCategorieChange = this.selectCategorieChange.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((categories) => {
        this.setState({
          categories: categories,
        });
      });
  }
  
  selectCategorieChange(event) {
    this.setState({ valueCategory: event.target.value });
  }

  addArticle = (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/articles";
    const postsData = {
      titre: this.state.titre,
      contenu: this.state.contenu,
      idCategorie: this.state.valueCategory,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(postsData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
    window.location.reload(false);
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
        <h4>Categories</h4>
        <select onChange={this.selectCategorieChange}>
          {this.state.categories.map((element) => {
            return <option value={element._id}>{element.label}</option>;
          })}
        </select>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddArticleForm;
