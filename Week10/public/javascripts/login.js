if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      intializedCodeLogin();
    });
  }
  
  function intializedCodeLogin() {
    document.getElementById('login-form').addEventListener('submit', onSubmit);
}


function onSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password)

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/';
            } else {
                console.log(data);
            }
    })
}
