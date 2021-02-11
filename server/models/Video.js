class Video {
  constructor(item) {
    this.id = item.snippet.resourceId.videoId;
    this.title = item.snippet.title;
    this.image =
      (item.snippet.thumbnails.default &&
        item.snippet.thumbnails.default.url) ||
      '';
  }
}

module.exports = Video;
