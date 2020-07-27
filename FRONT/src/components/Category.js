import React, { Component } from 'react'

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
        }
    }
    componentDidMount() {
    
        fetch('http://localhost:3000/category/'+this.props.idCategory).then(
            res => res.json()
        ).then((category => {
            this.setState({
                category: category,
            });
        }))
    }
    render() {
        var category = this.state.category;
        if(category)
        {
            return (
                category.label
            )
        }
        else {
            return (
                null
            )
        }
    }
}
