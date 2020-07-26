import React, { Component } from "react";
import VersioningForm from "./VersioningForm";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      removed: false,
      isEditing: false,
    };
  }

  removeItem= (e, id) => {
    this.setState({ removed: !this.state.removed });
    e.preventDefault();

    const url = "http://localhost:3000/articles/" + id;
    const data = { id: id };
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }

  editItem() {
    this.setState({ isEditing: true })
  }

  cancelEdit() {
    this.setState({ isEditing: false })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave(e, idArticle) {
    e.preventDefault();

    const url = "http://localhost:3000/versioning";
    const data = { 
      idArticle : idArticle,
      titre: this.props.titre,
      contenu: this.props.contenu,
     };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response))
      .then(()=> this.handleUpdate(e, idArticle)); 
  }

  handleUpdate(e, id) {
    this.setState({ isEditing: false })

    const url = "http://localhost:3000/articles/" + id;
    const data = { 
      titre: this.state.titre,
      contenu: this.state.contenu,
      Categorie: this.state.Categorie,
     };
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }

  render() {
    var articlesList = null;
    if (!this.state.isEditing) {
      articlesList = (
        <div>
          <h3>{this.props.titre}</h3>
          <p>{this.props.contenu}</p>
          <p>Categorie : {this.props.categorie}</p>
          <p>Tags : {this.props.tags}</p>
          <p>Date : {this.props.date}</p>

          <button className="removeBtn" onClick={(e) => this.removeItem(e, this.props.id)}> x </button>
          <button className="editBtn" onClick={e => this.editItem()}>modifier</button>
        </div>
      );
    } else {
      articlesList = (
        <div>
          <form onSubmit={(e) => this.handleSave(e, this.props.id)}>
            <input
              type="text"
              name="titre"
              defaultValue={this.props.titre}
              onChange={this.handleChange}
              placeholder={this.props.titre}
            />
            <br />
            <textarea
              type="text"
              name="contenu"
              defaultValue={this.props.contenu}
              onChange={this.handleChange}
              placeholder={this.props.contenu}
            />
            <br />
            <input
              type="text"
              name="Categorie"
              defaultValue={this.props.categorie}
              onChange={this.handleChange}
              placeholder={this.props.categorie}
            />
            <button type="submit">Modifier</button>
          </form>
          <button onClick={e => this.cancelEdit()} className="btn">annuler</button>
        </div>
      )
    }
    return (
      <li>
        {articlesList}
        <br />
        <VersioningForm idArticle={this.props.id} titre={this.props.titre} contenu={this.props.contenu}  />
      </li>
    );
  }
}

export default Article;

// const sidebar = (
//   <ul>
//     {this.props.posts.map((post) => (
//       <li key={post.id}>{post.titre}</li>
//     ))}
//   </ul>
// );

// const content = this.props.posts.map((post) => (
//   <div key={post._id}>
//     <h3>{post.titre}</h3>
//     <p>{post.contenu}</p>
//     <p>Categorie : {post.Categorie}</p>
//     <p>Tags : {post.tag}</p>
//     <p>{post.Date}</p>

//     <form onSubmit={this.handleSubmit}>
//       <select value={this.state.value} onChange={this.handleChange}>
//         <option value={post._id}>{post._id}</option>
//       </select>
//       <button type="submit">Supprimer</button>
//     </form>
//     <hr />
//   </div>
// ));
