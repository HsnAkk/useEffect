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
            sayi: 0,
            saniye: 0       
        }
    }

    componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then( response => this.setState({ posts: response.data}))
            .catch( error => console.log(error))
        
        this.interval = setInterval( () => { this.setState({saniye: this.state.saniye + 1})}, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.idFromButton !== this.state.idFromButton) {
            console.log('componentDidUpdate tetiklendi - Class')
            axios
                .get("https://jsonplaceholder.typicode.com/posts/" + this.state.idFromButton)
                .then( response => this.setState({ idPost: response.data}))
                .catch( error => console.log(error))
        }
        if (prevState.sayi !== this.state.sayi) {
            console.log('Butona tiklandi - Class')
            document.title = `Buton ${this.state.sayi} kere tiklandi`
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    

    render() {
        return (
            <div>
                Class - {this.state.saniye}
                <hr/>
                <button onClick = { () => this.setState({ sayi: this.state.sayi + 1})}>{this.state.sayi} kere tiklandi</button>
                <hr/>
                <h3>Posts - ClassComponent</h3>
                Post Id : <input type="text" onChange = { e => this.setState({ id: e.target.value})}/>
                <button onClick = {() => this.setState({idFromButton: this.state.id})}>Post Al</button>
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
