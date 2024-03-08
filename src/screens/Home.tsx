import { useQuery } from "react-query";
import styled from "styled-components";
import { getCharacters } from "../api";
import { Link } from "react-router-dom";

export interface IGetCharacterResult {
  id: number;
  name: string;
  imageUrl: string;
}

const Wrapper = styled.div`
  padding: 20px 60px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  margin-bottom: 30px;
`;
const Items = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
`;
const Item = styled.li`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.05);
    background-color: whitesmoke;
    border-radius: 50px;
    color: black;
    transition: transform 0.5s ease-in-out;

    img {
      box-shadow: 0 10px 20px -12px rgba(50, 50, 93, 0.8),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    }
  }
`;
const Img = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Span = styled.span``;
const EmptyImg = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: red;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetCharacterResult[]>(
    "all",
    getCharacters
  );
  console.log(data, isLoading);

  return (
    <Wrapper>
      <Title> Disney Characters </Title>
      {isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Items>
            {data?.map((item) => (
              <Link
                to={`character/${item.id}`}
                state={{ id: item.id, name: item.name }}
              >
                <Item key={item.id}>
                  <Img src={item.imageUrl} />
                  <Span>{item.name}</Span>
                </Item>
              </Link>
            ))}
          </Items>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
