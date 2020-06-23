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
      
        let newGame = new Game(game, game.attributes)

        document.querySelector('#game-container').innerHTML += newGame.renderGameCard()

      })
    })
}

function createFormHandler(e) {
  e.preventDefault()
  const titleInput = document.querySelector('#input-title').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const genreId = parseInt(document.querySelector('#genres').value)
  postFetch(titleInput, descriptionInput, imageInput, genreId)
}

function postFetch(title, description, image_url, genre_id) {
  const bodyData = {title, description, image_url, genre_id}

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(game => {
    const gameData = game.data
    
    let newGame = new Game(gameData, gameData.attributes)

    document.querySelector('#game-container').innerHTML += newGame.renderGameCard()
  })
}