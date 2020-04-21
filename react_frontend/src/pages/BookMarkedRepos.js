import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import _ from "lodash";
import RemoveBookmark from "../components/RemoveBookmark";

export default class BookMarkedRepos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repositories: null
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/repository/bookmark", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(response => {
                let result = _.cloneDeep(response.result);
                console.log(result)
                this.setState({ repositories: result });
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
                _.remove(this.state.repositories, {
                    id: repo.id
                });
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <div>
                    <h3 style={{ margin: "5% 0 0 5%"}}>Bookmarked repositories</h3>
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
                            {this.state.repositories && _.map(this.state.repositories, (val, index) => {
                                return (<tr key={index}>
                                    <td>{`${index + 1}.`}</td>
                                    <td>{val.id}</td>
                                    <td>{val.repository.name}</td>
                                    <td>{val.repository.owner.login}</td>
                                    <td><a href={val.repository.html_url} target="_blank">url</a></td>
                                    <td>{<RemoveBookmark repo={val.repository} onRemove={this.handleRemove} />}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}
