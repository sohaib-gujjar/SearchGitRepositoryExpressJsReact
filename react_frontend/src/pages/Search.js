import React from "react";
import { TextInput } from "../components/TextInputs";
import _ from "lodash";
import RemoveBookmark from "../components/RemoveBookmark";
import AddBooMark from "../components/AddBooMark";

/**
 * 
 */
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            repositories: "",
            results: 0,
            loaded: false
        }
    }

    handleSearchClick = () => {
        fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/repository/get/" + this.state.searchText, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({
                    loaded: true,
                    repositories: response.result.items,
                    results: response.result.total_count
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleAdd = (repo) => {
        fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/repository/bookmark/" + repo.id, {
            method: "POST",
            body: JSON.stringify(repo),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                _.forEach(this.state.repositories, (value, index) => {
                    if(value.id === repo.id) 
                        value.bookmark = true;
                })
                this.forceUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleRemove = (repo) => {
        fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/repository/bookmark/" + repo.id , {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                alert(response);
                _.forEach(this.state.repositories, (value, index) => {
                    if(value.id === repo.id) 
                        value.bookmark = false;
                })
                this.forceUpdate();
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }
    render() {
        return (
            <div style={{ marginBottom: "20%" }}>
                <div className="searchBox">
                    <label>&nbsp;</label>
                    <TextInput
                        title="Enter text"
                        placeholder="max char 150."
                        setField={(val) => { this.setState({ searchText: val }) }}>
                    </TextInput>
                    <div className="search-button-box">
                        <button type="button" onClick={this.handleSearchClick}>Search</button>
                    </div>
                </div>
                {this.state.loaded &&
                    <div>
                        <h3 style={{ margin: "5% 0 0 5%" }}>Results: {this.state.results}</h3>
                        <table className="github-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>OWNER</th>
                                    <th>URL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.map(this.state.repositories, (val, index) => {
                                    return (<tr key={index}>
                                        <td>{`${index + 1}.`}</td>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.owner.login}</td>
                                        <td><a href={val.html_url} target="_blank">url</a></td>
                                        <td>{val.bookmark ?
                                            <RemoveBookmark repo={val} onRemove={this.handleRemove} /> :
                                            <AddBooMark repo={val} onAdd={this.handleAdd} />
                                        }</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>}
            </div>
        )
    }
}
