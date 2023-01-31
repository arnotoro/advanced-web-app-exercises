if (document.readyState !== "loading") {
    initializeCodeRegister();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeRegister();
    });
  }
  
  function initializeCodeRegister() {
    document.getElementById('register-form').addEventListener('submit', onSubmit);
}


function onSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.erros) {
                console.log(data.errors);
            } else {
                window.location.href = '/login.html';
            }
    })
}
