import React, { Component } from "react";
import Article from "./Article";

class List extends Component {
  render() {
    return (
      <div>        
        <ul>
          {
            this.props.posts.map((post, index) => 
            <Article titre={post.titre} state={post.state}  key={index} />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;