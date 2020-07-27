import React, { Component } from "react";

class VersionnigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      versionsData: null,
      versionSelect: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/versioning/" + this.props.idArticle, {
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
            versionsData: result,
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

  handleChangeSelect = (e) => {
    this.setState({
      versionSelect: e.target.value,
    });
  };

  handleVersioning(e, idArticle) {
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
      .then(()=> this.restaureVersion(e, this.state.versionSelect)); 
  }

  restaureVersion(e, idVersion) {

    const url = "http://localhost:3000/versioning/" + idVersion;
    const data = { 
        idVersion: idVersion,
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
    const { error, isLoaded, versionsData } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <form onSubmit={(e) => this.handleVersioning(e, this.props.idArticle)}>
          <select
            value={this.state.versionSelect}
            onClick={(e) => this.handleChangeSelect(e)}
          >
            {versionsData.map((version, index) => (
              <option value={version._id}>{version.numVersion}</option>
            ))}
          </select>
          <button type="submit">Restaurer</button>
        </form>
      );
    }
  }
}
export default VersionnigForm;
