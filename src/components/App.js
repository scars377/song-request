import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { requestAdd, requestRemove } from '../actions';
import Player from './Player';
import Playlist from './Playlist';
import Requests from './Requests';
import Login from './Login';

const Global = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #222;
    color: #eee;
  }
`;

function App() {
  const fbid = useSelector((state) => state.fbid);
  const dispatch = useDispatch();
  const isAdmin = process.env.REACT_APP_ADMIN_ID?.split(',')?.includes(fbid);

  useEffect(() => {
    const socket = window.io();
    socket.on('request add', (item) => dispatch(requestAdd(item)));
    socket.on('request remove', (item) => dispatch(requestRemove(item)));
  }, []);

  return (
    <div>
      <Global />
      {!fbid ? (
        <Login />
      ) : (
        <>
          {isAdmin && <Player />}
          <div style={{ padding: '0 0.5em' }}>
            <Requests isAdmin={isAdmin} />
            <div style={{ height: '3em' }} />
            <Playlist />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
