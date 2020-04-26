import React, {useState, useEffect } from 'react'
import axios from 'axios';

function Hook() {

    const [ posts, setPosts ] = useState([])
    const [ id, setId ] = useState(1)
    const [ idFromButton, setIdFromButton ] = useState(0)
    const [ idPost, setIdPost ] = useState({})
    const [ count, setCount ] = useState(0)
    const [ second, setSecond ] = useState(0)


    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then( response => setPosts(response.data))
            .catch( error => console.log(error))
        
        const interval = setInterval(() => {
            setSecond( prevSecond => prevSecond + 1)
        }, 1000);
        
        if (idFromButton) {
            console.log('componentDidUpdate triggered - Hook')
            axios
                .get("https://jsonplaceholder.typicode.com/posts/" + idFromButton)
                .then( response => setIdPost(response.data))
                .catch( error => console.log(error))

        } else if (count) {
            console.log('Button clicked - Hook')
            document.title = `Button ${count} times clicked`
        }

        return () => {
            clearInterval(interval)
        }
        
    }, [idFromButton, count])

    return (
        <div>
            Hook Second - {second}
            <hr/>
            <button onClick = { () => setCount(prevCount => prevCount + 1)}>{count} times clicked</button>
            <hr/>
            <h3>Posts - Hook</h3>
            Post Id : <input type="text" onChange = { e => setId(e.target.value)}/>
            <button onClick = {() => setIdFromButton(id)}>Get Post</button>
            { idFromButton !== 0 && <p>{idFromButton}{'. '}{idPost.title} </p> }
            <hr/>
            <ol>
                {
                    posts.map( item => <li key={item.id}>{item.title}</li> )
                }
            </ol>
        </div>
    )
}

export default Hook;
