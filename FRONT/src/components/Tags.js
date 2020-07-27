import React, { Component } from 'react'

export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/tags').then(
            res => res.json()
        ).then((tags => {
            this.setState({
                tags: tags,
            });
        }))
    }
    render() {
        var tags = this.state.tags;
        return (
            <>
                <select>
                    {
                        tags.map(element => {
                            return <option value={element._id}>{element.label}</option>
                        })
                    }
                </select>
            </>
        )
    }
}