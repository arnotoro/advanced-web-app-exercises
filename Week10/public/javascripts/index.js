if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    document.onLoad = onLoad();
}

function onLoad() {
    const token = localStorage.getItem('auth_token');
    console.log(token);
    if (!token) return;

    fetch('/', {
        method: 'POST',
        headers: {
            'authorization': 'Bearer ' + token
        }
    })
    .then((response) => response.text())
    .then((value) => {
        document.getElementById('content').innerHTML = value;
    })
    .then(() => {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            window.location.href = '/';
        });
    })
    .catch((error) => {
        console.log(error);
    });
}
