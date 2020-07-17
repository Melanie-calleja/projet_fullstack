import React, { Component } from "react";

class Article extends Component {
  render() {
    const sidebar = (
      <ul>
        {this.props.posts.map((post) => (
          <li key={post.id}>{post.nom}</li>
        ))}
      </ul>
    );
    
    const content = this.props.posts.map((post) => (
      <div key={post._id}>
        <h3>{post.nom}</h3>
        <p>{post.contenu}</p>
        <p>Categorie : {post.Categorie}</p>
        <p>Tags : {post.tag}</p>
        <p>{post.Date}</p>
      </div>
    ));
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }
}

export default Article;
