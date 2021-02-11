const Playlist = require('./Playlist');
const socket = require('../socket');

class SongRequest {
  static getInstance() {
    if (!SongRequest.instance) SongRequest.instance = new SongRequest();
    return SongRequest.instance;
  }
  constructor() {
    this.items = [];
  }
  addItem(id) {
    const item = Playlist.getInstance().items.find((t) => t.id === id);
    if (!item) throw new Error('item invalid');
    if (this.items.includes(item)) throw new Error('item exists');

    this.items.push(item);
    socket.emit('request add', item);
  }
  removeItem(id) {
    const idx = this.items.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('item not found');

    const [item] = this.items.splice(idx, 1);
    socket.emit('request remove', item);

    if (this.items.length === 0) {
      const rand = Playlist.getInstance().sample();
      this.addItem(rand.id);
    }
  }
}

module.exports = SongRequest;
