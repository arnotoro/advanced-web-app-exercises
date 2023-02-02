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
    const errorMsg = document.getElementById('error-message');

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.href = '/login.html';
          } else if (response.status === 400) {
            errorMsg.innerHTML = 'Password is not strong enough';
          } else if (response.status === 403) {
            errorMsg.innerHTML = 'Email already in use';
          } else {
            return response.json();
          }
        })
}
