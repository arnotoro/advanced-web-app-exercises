console.log("hello client")


const button = document.getElementById("submit-data")
const nameText = document.getElementById("input-name")
const taskText= document.getElementById("input-task")


// button.addEventListener('click', function (e) {
//     const nameData = {"name": nameText.value}
//     const taskData = {"todos": taskText.value}
//     console.log(nameData)
//     console.log(taskData)
//     fetch('/todo', {method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(nameData)
//     })
//         .then((data) => {
//             console.log('Success: ', data)
//         })
// })


function submitData() {
    const nameText = document.getElementById("input-name")
    const taskText= document.getElementById("input-task")

    const nameData = {"name": nameText.value}
    const taskData = {"todos": taskText.value}
    console.log(nameData)
    console.log(taskData)

    fetch('/todo', {method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: nameData
    })
        .then((data) => {
            console.log("Done")
        })


}