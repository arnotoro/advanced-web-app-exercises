import React from 'react'

function SubmitBooks() {


  const submit = (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const book = {
      name: name,
      author: author,
      pages: pages,
    }

    fetch('api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
  <div>
        <form onSubmit={submit} style={{textAlign: 'center'}}>
            <input type="string" id="name" placeholder="Book name"/>
            <input type="string" id="author" placeholder="Author"/>
            <input type="number" id="pages" placeholder="Number of pages"/>
            <input type="submit" id="submit" value="Submit" />
        </form>
    </div>
  )
}

export default SubmitBooks