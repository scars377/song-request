import styled from 'styled-components';

import ActionButton from './ActionButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #444;

  &:hover {
    background-color: #333;
  }
`;

const Cover = styled.div`
  margin: 0.25em;
  flex: 0 0 100px;
  height: 60px;
  background: #333 no-repeat center center;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const Title = styled.div`
  flex: 1;
  padding: 0 0.5em;
`;

const Action = styled.div`
  flex: 0 0 100px;
`;

const Video = ({ video, action, actionLabel = '點歌' }) => {
  const { title, image } = video;
  return (
    <Container>
      <Cover src={image} />
      <Title>{title}</Title>

      {action && (
        <Action>
          <ActionButton onClick={action}>{actionLabel}</ActionButton>
        </Action>
      )}
    </Container>
  );
};

export default Video;
