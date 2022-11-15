console.log("client side online")


const button = document.getElementById("submit-data")
const textArea = document.getElementById("input-text")

button.addEventListener('click', function (e) {
    const data = {"text": textArea.value}
    console.log(data)
    fetch('/list', {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then((data) => {
            console.log('Success: ', data)
        })
})
