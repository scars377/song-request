const yt = require('../yt');
const Video = require('./Video');

class PlayList {
  static getInstance() {
    if (!PlayList.instance) PlayList.instance = new PlayList();
    return PlayList.instance;
  }

  constructor() {
    this.id = '';
    this.items = [];
    this.title = '';
    this.image = '';
  }

  setId(id) {
    this.id = id;
    return this;
  }

  sample() {
    const i = (Math.random() * this.items.length) | 0;
    return this.items[i];
  }

  async getItems(pageToken = undefined) {
    const { data } = await yt.get('playlistItems', {
      params: {
        playlistId: this.id,
        part: 'snippet',
        pageToken,
      },
    });
    this.items = this.items.concat(data.items.map((item) => new Video(item)));
    if (data.nextPageToken) {
      await this.getItems(data.nextPageToken);
    }
  }
}

module.exports = PlayList;
