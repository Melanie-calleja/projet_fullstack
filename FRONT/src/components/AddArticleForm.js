import React, { Component } from "react";

class AddArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        valueCategory:'',
        category: '',
        tags: [],
        valueTag:'',
        tag: '',
    }
    this.selectCategorieChange =  this.selectCategorieChange.bind(this);
    this.selectTagChange =  this.selectTagChange.bind(this);
}
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
componentDidMount(){
  fetch('http://localhost:3000/categories').then(
            res => res.json()
        ).then((categories => {
            this.setState({
                categories: categories,
            });
        }))
}
componentDidMount(){
        fetch('http://localhost:3000/tags').then(
            res => res.json()
        ).then((tags => {
            this.setState({
                tags: tags,
            });
        }))
    }
selectCategorieChange(event) {
  this.setState({valueCategory: event.target.value});
}
selectTagChange(event) {
        this.setState({valueTag: event.target.value});
    }
  addArticle = (event) => {
    event.preventDefault();
  
    const url = "http://localhost:3000/articles";
    const postsData = {
      titre: this.state.titre,
      contenu: this.state.contenu,
      idCategorie: this.state.valueCategory,
      idTags: this.state.valueTag,
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
        <h4>Categories</h4>
        <select onChange={this.selectCategorieChange}>
            {
                this.state.categories.map(element => {
                    return <option value={element._id}>{element.label}</option>
                })
            }
           </select>
          <button type="submit">Add</button>
            <br />
            <h4>Tags</h4>
            <select onChange={this.selectTagChange}>
                {
                    this.state.tags.map(element => {
                        return <option value={element._id}>{element.label}</option>
                    })
                }
            </select>
            <button type="submit">Add</button>
      </form>
    );
  }
}


export default AddArticleForm;
