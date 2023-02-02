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
    const errorMsg  = document.getElementById('error-message');

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then((response) => {
            if (response.status === 403) {
              errorMsg.innerHTML = 'Invalid credentials';
            } else if (response.status != 200) {
              errorMsg.innerHTML = 'Something went wrong';
            }
            return response.json();
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/';
            } else {
                console.log(data);
            }
    })
}
