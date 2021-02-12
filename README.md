# Y88 Song Request
A song requesting app made for my dad.

## Prerequisite
- An YouTube playlist with `public` or `unlisted` privacy.
- An [YouTube API Key](https://developers.google.com/youtube/v3/getting-started)

## Setup
```sh
yarn
```

## Dev
Create `.env` based on `.env.example`

```sh
yarn run server
```
```sh
yarn run client
```

## Start
```sh
yarn run build
yarn run start
```

## Authentication
Naive string matching.
```js
sha256(`${password}${REACT_APP_PW_SALT}`) === REACT_APP_PW_HASH
```


## Functionalities

**Viewer**
- Can request songs in the playlist
![](/screenshots/admin-view.png)

**Player (Admin)**
- Can play requested video.
- Once the video ends, the next requested song will be played.
- If there is no song in the request, a random song from the list will be picked.
![](/screenshots/normal-view.png)
