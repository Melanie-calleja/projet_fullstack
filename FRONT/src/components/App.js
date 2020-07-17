
//import logo from './logo.svg';
//import './App.css';
import Article from './Article' 

import React, { Component } from 'react';

class App extends Component {
  // Initialisation du composant : on décrit l'état initial du composant.
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null
    };
  }

  // On utilise la méthode fetch dans componentDidMount() 
  // Cela permet d'effectuer la requête une fois que le composant "App" sera créé dans le DOM
  // et ainsi pouvoir l'utiliser dans la méthode render().
  componentDidMount() {
    fetch('http://localhost:3000/articles', {
      method: 'GET',
      headers: {
        "Accept": "application/json"
      }})
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }


  // Gestion de l'affichage du composant.
  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      // Pas d'erreur et les données sont bien chargées, on affiche le résultat de notre requête.
      return (
        <div>
        {console.log(data)}
        <Article posts={data}/>
        <hr />
        <h2>Ajouter un article</h2>
        

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
