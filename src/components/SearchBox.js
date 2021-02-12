import styled from 'styled-components';

const Input = styled.input`
  font-size: 1em;
  padding: 0.25em 0.5em;
  margin: 0 0.5em;
`;

const Button = styled.button`
  font-size: 1em;
`;

const SearchBox = ({ value = '', onValue = () => {} }) => {
  return (
    <div>
      <span>搜尋</span>
      <Input value={value} onChange={(e) => onValue(e.target.value)} />
      <Button onClick={() => onValue('')}>清除</Button>
    </div>
  );
};

export default SearchBox;
