import React, {useState, useEffect } from 'react'
import axios from 'axios';

function Hook() {

    const [ posts, setPosts ] = useState([])
    const [ id, setId ] = useState(1)
    const [ idFromButton, setIdFromButton ] = useState(0)
    const [ idPost, setIdPost ] = useState({})
    const [ sayi, setSayi ] = useState(0)
    const [ saniye, setSaniye ] = useState(0)


    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then( response => setPosts(response.data))
            .catch( error => console.log(error))
        
        const interval = setInterval(() => {
            setSaniye( prevSaniye => prevSaniye + 1)
        }, 1000);
        
        if (idFromButton) {
            console.log('componentDidUpdate tetiklendi - Hook')
            axios
                .get("https://jsonplaceholder.typicode.com/posts/" + idFromButton)
                .then( response => setIdPost(response.data))
                .catch( error => console.log(error))

        } else if (sayi) {
            console.log('Butona tiklandi - Hook')
            document.title = `Buton ${sayi} kere tiklandi`
        }

        return () => {
            clearInterval(interval)
        }
        
    }, [idFromButton, sayi])

    return (
        <div>
            Hook - {saniye}
            <hr/>
            <button onClick = { () => setSayi(prevSayi => prevSayi + 1)}>{sayi} kere tiklandi</button>
            <hr/>
            <h3>Posts - Hook</h3>
            Post Id : <input type="text" onChange = { e => setId(e.target.value)}/>
            <button onClick = {() => setIdFromButton(id)}>Post Al</button>
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
