import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, getList } from '../actions';
import Video from './Video';

const Playlist = () => {
  const requests = useSelector((state) => state.requests);
  const list = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  const add = (id) => dispatch(addRequest(id));

  return (
    <div>
      <h3>歌曲列表</h3>
      <div style={{ paddingLeft: '1em' }}>
        {list.map((item) => (
          <Video
            key={item.id}
            video={item}
            action={
              requests.some((t) => t.id === item.id)
                ? undefined
                : () => add(item.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
