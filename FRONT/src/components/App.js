//import logo from './logo.svg';
//import './App.css';
import List from './list'
import Article from "./Article";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      postsData: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/articles", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            postsData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("titre : " + this.state.titre);

    const url = "http://localhost:3000/articles";
    const postsData = { titre: this.state.titre, contenu: this.state.contenu, Categorie: this.state.Categorie};
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
    const { error, isLoaded, postsData } = this.state;
    

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
  
      return (
        <div>
          {console.log(postsData)}

          <List posts={postsData} />

          <hr />

          <h2>Ajouter un article</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="titre" onChange={this.handleChange} placeholder="titre" /><br />            
            <textarea type="text" name="contenu" onChange={this.handleChange} placeholder="Contenu" /><br />
            <input type="text" name="Categorie" onChange={this.handleChange} placeholder="Categorie" />
            <button type="submit">Add</button>
          </form>
        </div>
      );
    }
  }
}

export default App;

/* <ul>
    {
      data.map((item, index) => 
          <li>
            {item.nom}
          {item.contenu}
            {item.Categorie}
          {item.Date}
          {item.Version}                                           
          </li>
      )
    }
</ul> */
