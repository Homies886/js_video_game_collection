const endPoint = "http://localhost:3000/api/v1/games";
const gameEndPoint = "http://localhost:3000/api/v1/games/:id";

document.addEventListener('DOMContentLoaded', () => {
  getGames()

  const createGameForm = document.querySelector("#create-game-form")

  createGameForm.addEventListener("submit", (e) => createFormHandler(e))

  const gameContainer = document.querySelector('#game-container')

  gameContainer.addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id);
    const game = Game.findById(id);
    game.removeGameCard(id);
    deleteGame(game)
  })

  const gameSort = document.querySelector('button#sort-button')

  gameSort.addEventListener("click", (e) => sortGameList(e))
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

function deleteGame(info) {
  const gameInfo = info

  fetch(gameEndPoint, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(gameInfo)
  })
}

function sortGameList() {
  let container = document.querySelector('#game-container')

  container.innerHTML = ""

  let sortedList = Game.all.sort((a, b) => {
    let titleA = a.title.toUpperCase()
    let titleB = b.title.toUpperCase()
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  })

  sortedList.forEach(game => {
    container.innerHTML += game.renderGameCard()
  })
}