import React, { Component } from "react";

export default class SearchByCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      idCategory: null, 
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

  

  render() {
    var categories = this.state.categories;
    return (
      
        <select onChange={this.selectCategorieChange}>
          {categories.map((element) => {
            return <option value={element._id}>{element.label}</option>;
          })}
        </select>
        
      
    );
  }
}
