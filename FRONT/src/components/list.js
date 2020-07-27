import React, { Component } from "react";
import Article from "./Article";

class List extends Component {
  render() {
    return (
      <div>        
        <ul>
          {
            this.props.posts.map((post, index) => 
            <Article id={post._id} titre={post.titre} contenu={post.contenu} categorie={post.idCategorie} tag={post.idTag} date={post.Date}  state={post.state}  key={index} />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;