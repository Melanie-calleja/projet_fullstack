//import logo from './logo.svg';
//import './App.css';
import List from './list'
import AddArticleForm from "./AddArticleForm";
import Categories from './Categories';

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

  render() {
    const { error, isLoaded, postsData } = this.state;
    

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
  
      return (
        <div className='App'>
          

          <List posts={postsData} />

          <hr />
          <h2>Ajouter un article</h2>
          <AddArticleForm />
          {/* <h2>Categories</h2>
          <Categories/> */}
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
