import React, { Component } from "react";
import Article from "./Article";

class List extends Component {
  render() {
    return (
      <div>        
        <ul>
          {
            this.props.posts.map((post, index) => 
            <Article id={post._id} titre={post.titre} contenu={post.contenu} categorie={post.Categorie} tags={post.tag} date={post.Date}  state={post.state}  key={index} />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;