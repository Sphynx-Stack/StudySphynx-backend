document.querySelector('.LOGOUT').addEventListener('click', async (e) => {
    e.preventDefault();
    let res = await fetch('/api/logout', {
      method: 'DELETE'
    });
    let data = await res.json();
    window.location.href = data.redirect;
})