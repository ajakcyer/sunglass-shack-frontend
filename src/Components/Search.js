import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

export default class Search extends Component {

    render() {
        return (
            
            <div className="search-input">
                {/* <p>Search: </p> */}
                <Input icon="search" type="text" placeholder="Search by name..." value={this.props.searchValue} onChange={this.props.searchHandler} />
            </div>
        )
    }
}
