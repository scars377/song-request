import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { requestAdd, requestRemove, setAdmin } from '../actions';
import Player from './Player';
import Playlist from './Playlist';
import Requests from './Requests';
import sha256 from 'crypto-js/sha256';

const Global = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #222;
    color: #eee;
  }
`;

const SALT = process.env.REACT_APP_PW_SALT;
const HASH = process.env.REACT_APP_PW_HASH;

function App() {
  const isAdmin = useSelector((state) => state.isAdmin);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    const input = prompt('管理密碼');
    console.log(sha256(input + SALT).toString());
    if (sha256(input + SALT).toString() === HASH) {
      dispatch(setAdmin(true));
    } else {
      alert('錯囉');
    }
  };

  useEffect(() => {
    const socket = window.io();
    socket.on('request add', (item) => dispatch(requestAdd(item)));
    socket.on('request remove', (item) => dispatch(requestRemove(item)));
  }, []);

  return (
    <div>
      <Global />
      {isAdmin && <Player />}
      <div style={{ padding: '0 0.5em' }}>
        {!isAdmin && (
          <button style={{ float: 'right' }} onClick={login}>
            登入
          </button>
        )}
        <Requests isAdmin={isAdmin} />
        <div style={{ height: '3em' }} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
