const endPoint = "http://localhost:3000/api/v1/games";

document.addEventListener('DOMContentLoaded', () => {
  getGames()

  const createGameForm = document.querySelector("#create-game-form")

  createGameForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getGames() {
  fetch(endPoint)
    .then(response => response.json())
    .then(games => {
      games.data.forEach(game => {
        const gameMarkup = `
          <div data-id=${game.id}>
            <img src=${game.attributes.image_url} height="200" width="250">
            <h3>${game.attributes.title}</h3>
            <p>${game.attributes.genre.name}</p>
            <button data-id=${game.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#game-container').innerHTML += gameMarkup
      })
    })
}