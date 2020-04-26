import React, { Component } from 'react'
import axios from 'axios';


class ClassComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            id: 1,
            idFromButton: 0,
            idPost: {},
            count: 0,
            second: 0       
        }
    }

    componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then( response => this.setState({ posts: response.data}))
            .catch( error => console.log(error))
        
        this.interval = setInterval( () => { this.setState({second: this.state.second + 1})}, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.idFromButton !== this.state.idFromButton) {
            console.log('componentDidUpdate triggered - Class')
            axios
                .get("https://jsonplaceholder.typicode.com/posts/" + this.state.idFromButton)
                .then( response => this.setState({ idPost: response.data}))
                .catch( error => console.log(error))
        }
        if (prevState.count !== this.state.count) {
            console.log('Button clicked - Class')
            document.title = `Button ${this.state.count} times clicked`
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    

    render() {
        return (
            <div>
                Class Second - {this.state.second}
                <hr/>
                <button onClick = { () => this.setState({ count: this.state.count + 1})}>{this.state.count} times clicked</button>
                <hr/>
                <h3>Posts - ClassComponent</h3>
                Post Id : <input type="text" onChange = { e => this.setState({ id: e.target.value})}/>
                <button onClick = {() => this.setState({idFromButton: this.state.id})}>Get Post</button>
                { this.state.idFromButton !== 0 && <p>{this.state.idFromButton}{'. '}{this.state.idPost.title} </p> }
                <hr/>
                <ol>
                    {
                        this.state.posts.map( item => <li key={item.id}>{item.title}</li> )
                    }
                </ol>
            </div>
        )
    }
}

export default ClassComponent
