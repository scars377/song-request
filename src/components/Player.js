import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTubePlayer from 'youtube-player';
import { shiftRequest } from '../actions';

const Player = () => {
  const [vid, setVid] = useState();
  const player = useRef();
  const elm = useRef();
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    player.current = YouTubePlayer(elm.current);

    player.current.addEventListener('onStateChange', (e) => {
      if (e.data === 0) dispatch(shiftRequest());
    });

    const resize = () => {
      const width = window.innerWidth;
      const height = (9 / 16) * width;
      player.current.setSize(width, height);
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      player.current.destroy();
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    setVid(requests[0]?.id);
  }, [requests]);

  useEffect(() => {
    if (!vid) {
      player.current.stopVideo();
    } else {
      player.current.loadVideoById(vid);
      player.current.playVideo();
    }
  }, [vid]);

  return <div ref={elm} />;
};

export default Player;
