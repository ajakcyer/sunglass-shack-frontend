import React, { Component } from 'react'

export default class Search extends Component {

    render() {
        return (
            <input type="text" placeholder="Search by name..." value={this.props.searchValue} onChange={this.props.searchHandler} />
        )
    }
}
