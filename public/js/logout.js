document.querySelector('.LOGOUT').addEventListener('click', async (e) => {
    e.preventDefault();
    let res = await fetch('/api/logout', {
      method: 'DELETE'
    });
    let data = await res.json();
    window.location.href = data.redirect;
})

async function connect(dest) {
  const res = await fetch(`/api/${dest}`, {
      method: 'GET'
  });
  const data = await res.json();
  return data;
}

function connection(dest) {
  connect(dest).then(response => {
    return response;
  }).catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', (e) => {
  let data = connection('user')
})