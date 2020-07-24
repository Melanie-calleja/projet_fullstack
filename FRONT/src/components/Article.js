import React, { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: ' ' ,
      removed: false
    };
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit = (event) => {
  //   console.log("id : " + this.state.value);
  //   event.preventDefault();

  //   // const url = "http://localhost:3000/articles/this.state.id";
  //   // const data = { id: this.idInput.value };
  //   // fetch(url, {
  //   //   method: "DELETE",
  //   //   body: JSON.stringify(data),
  //   //   headers: { "Content-Type": "application/json" },
  //   // })
  //   //   .then((res) => res.json())
  //   //   .catch((error) => console.error("Error:", error))
  //   //   .then((response) => console.log("Success:", response));
  // };

  removeItem() {
    this.setState({ removed: !this.state.removed });
  }

  render() {
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
    return (
      
      <li>
      
        {this.props.titre}
        

        <button className='removeBtn' onClick={e => this.removeItem(e)}> x </button>
        
      </li>
    );
  }
}

export default Article;
