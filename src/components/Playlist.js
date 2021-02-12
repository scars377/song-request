import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, getList } from '../actions';
import SearchBox from './SearchBox';
import Video from './Video';

const Playlist = () => {
  const requests = useSelector((state) => state.requests);
  const list = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(list);

  useEffect(() => {
    dispatch(getList());
  }, []);

  const add = (id) => dispatch(addRequest(id));

  useEffect(() => {
    const f = filter.toLowerCase();
    if (!f) setFiltered(list);
    else
      setFiltered(list.filter((item) => item.title.toLowerCase().includes(f)));
  }, [filter, list]);

  return (
    <div>
      <h3>歌曲列表</h3>
      <div style={{ paddingLeft: '1em' }}>
        <SearchBox value={filter} onValue={setFilter} />
        {filtered.map((item) => (
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
