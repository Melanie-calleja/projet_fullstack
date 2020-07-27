import React, { Component } from 'react'

export default class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
        }
    }

    componentDidMount() {

        fetch('http://localhost:3000/tag/' + this.props.idTag).then(
            res => res.json()
        ).then((tag => {
            this.setState({
                tag: tag,
            });
        }))
    }

    render() {
        var tag = this.state.tag;
        if (tag) {
            return (
                tag.label
            )
        } else {
            return (
                null
            )
        }
    }
}