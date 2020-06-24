class Game {

  constructor(game, gameAttributes) {
    this.id = game.id
    this.title = gameAttributes.title
    this.description = gameAttributes.description
    this.image_url = gameAttributes.image_url
    this.genre = gameAttributes.genre
    Game.all.push(this)
  }
  
  renderGameCard() {
    return `
      <div data-id=${this.id}>
        <img src=${this.image_url} height="200" width="250">
        <h3>${this.title} (${this.genre.name})</h3>
        <p>${this.description}</p>
        <button data-id=${this.id}>Delete</button>
      </div>
      <br><br>`;
  }

  removeGameCard(id) {
    const el = document.querySelector(`[data-id='${id}']`);
    el.remove()
  }

  static findById(id) {
    return this.all.find(game => game.id === id.toString());
  }
}

Game.all = [];