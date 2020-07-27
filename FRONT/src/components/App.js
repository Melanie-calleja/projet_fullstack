//import logo from './logo.svg';
//import './App.css';
import List from "./list";
import AddArticleForm from "./AddArticleForm";
import SearchByCategories from "./SearchByCategories";
import Category from "./Category";
import Tag from "./Tag";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      postsData: null,
      article: null,
      idArticle: "",
      idCategory: "",
      idTag: "",
    };
    this.selectArticleChange = this.selectArticleChange.bind(this);
    this.searchByTitre = this.searchByTitre.bind(this);
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

  selectArticleChange(event) {
    this.setState({ idArticle: event.target.value });
  }

  cancelSearch(event) {
    this.setState({ article: null });
  }

  searchByTitre(event) {
    event.preventDefault();
    console.log(this.state.idArticle);
    const url = "http://localhost:3000/articles/" + this.state.idArticle;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
        .then((res) => res.json())
        .then(
            (result) => {
              this.setState({
                article: result,
              });
            },
            (error) => {
              console.error("Error:", error);
            }
        );
  }



  render() {
    const { error, isLoaded, postsData, article } = this.state;
    var articlesList = null;

    if (article != null) {
      articlesList = (
          <div>
            {article.titre}
            <h3>{article.titre}</h3>
            <p>{article.contenu}</p>
            <p>Categorie :{<Category idCategory={article.idCategorie} />}</p>
            <p>Tag : {<Tag idTag={article.idTag} />}</p>
            <p>Date : {article.date}</p>
            <hr />
            <button className="cancelSearch" onClick={(e) => this.cancelSearch()}>
              retour
            </button>
          </div>
      );
    } else {
      articlesList = <List posts={postsData} />;
    }

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
          <div className="App">
            {articlesList}

            <hr />
            <div>
              <h2>Ajouter un article</h2>
              <AddArticleForm />
              <hr />
              <h2>Recherche par Categories</h2>
              <form onSubmit={this.searchByCategories}>

                <SearchByCategories />

                <button type="submit">Rechercher</button>
              </form>
              <hr />
              <h2>Recherche par titre</h2>
              <form onSubmit={this.searchByTitre}>
                <select onChange={this.selectArticleChange}>
                  {postsData.map((element) => {
                    return <option value={element._id}>{element.titre}</option>;
                  })}
                </select>
                <button type="submit">Rechercher</button>
              </form>
            </div>
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
