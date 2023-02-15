import React from 'react'
import {useState, useEffect} from 'react'


function About() {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            const data = await response.json();

            if (mounted) {
                setPosts(
                    data.map((post) => ({
                        id: post.id,
                        title: post.title,
                    }))
                )
            }
        }
        fetchData();

        return () => {mounted = false};
    }, []);



    return (
        <div>
            <h1>About page</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

        </div>
        )
}

export default About