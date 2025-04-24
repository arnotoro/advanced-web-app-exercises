import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import test from '../test.json'

function Book() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});


    useEffect(() => {
        fetch(`/api/book/${name}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                navigate('/notfound')
            }
        })
        .then(data => setBook(data))
    }, [name])



  return (
    <div>
        <p style={{textAlign: 'center'}}>{book.name}</p>
        <p style={{textAlign: 'center'}}>{book.author}</p>
        <p style={{textAlign: 'center'}}>{book.pages}</p>
    </div>
  )
}

export default Book