import React, { Component } from "react";

class App extends Component {
    constructor() {
        super();
        this.state = {
            joke: [],
            fetchesJoke: false
        };

        this.tellJoke = this.tellJoke.bind(this);
    }

    componentDidMount() {
        this.fetchJoke(); // show joke on load
    }

    // get a joke
    fetchJoke() {
        this.setState({fetchesJoke: true});

        fetch("https://icanhazdadjoke.com/", {
            method: "GET",
            headers: {
                Accept: "application/json" // get json data
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    joke: json.joke, //fetch a new joke
                    fetchesJoke: false
                });
            });
    }
    tellJoke() {
        this.fetchJoke();
    }

    render() {
        return (
            <div className="container">
                <h1>Random Dad Joke</h1>
                <button onClick={this.tellJoke} disabled={this.state.fetchesJoke}>
                    Tell a joke
                </button>

                <p className="joke">
                    {this.state.fetchesJoke ? "loading..." : this.state.joke}
                </p>
            </div>
        )
    }
}
export default App;