const endPoint = "http://localhost:3000/api/v1/games";

document.addEventListener('DOMContentLoaded', () => {
  getGames()
});

function getGames() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => console.log(json));
}