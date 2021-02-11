import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequests, removeRequest } from '../actions';
import Video from './Video';

const Requests = ({ isAdmin }) => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  const remove = (id) => dispatch(removeRequest(id));

  return (
    <div>
      <h3>點歌列表</h3>
      <div style={{ paddingLeft: '1em' }}>
        {requests.length === 0 && <div>還沒有人點歌 :(</div>}
        {requests.map((item) => (
          <Video
            key={item.id}
            video={item}
            action={isAdmin && (() => remove(item.id))}
            actionLabel="移除"
          />
        ))}
        <div>點選下方歌曲列表來點歌</div>
      </div>
    </div>
  );
};

export default Requests;
