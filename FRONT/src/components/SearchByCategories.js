import React, { Component } from "react";

export default class SearchByCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
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

  render() {
    var categories = this.state.categories;
    return (
      <form onSubmit={this.searchByCategories}>
        <select onChange={this.selectCategorieChange}>
          {categories.map((element) => {
            return <option value={element._id}>{element.label}</option>;
          })}
        </select>
        <button type="submit">Rechercher</button>
      </form>
    );
  }
}
