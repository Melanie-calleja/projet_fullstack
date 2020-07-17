//import logo from './logo.svg';
//import './App.css';
import Article from "./Article";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null
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
            data: result,
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
    const data = { titre: this.state.titre, contenu: this.state.contenu};
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          {console.log(data)}
          <Article posts={data} />
          <hr />
          <h2>Ajouter un article</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="titre" onChange={this.handleChange} />
            <input type="text" name="contenu" onChange={this.handleChange} />
            
            <input type="submit" value="Ajouter un article" />{" "}
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
