import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCharacterById } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span``;

const Films = styled.ul`
  width: 30%;
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
  @media (max-width: 768px) {
    // 화면의 너비가 768px 이하일 때 적용될 스타일
    width: 50%;
  }

  @media (max-width: 480px) {
    // 화면의 너비가 480px 이하일 때 적용될 스타일
    width: 70%;
  }
`;

const Film = styled.li``;
const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ArrowLink = styled(Link)`
  /* margin-right: auto;  */
  font-size: 32px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
const Span = styled.span`
  display: inline-block;
  background-color: white;
  color: black;
  padding: 5px 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

interface IFilm {
  films: string[];
  id: number;
  imageUrl: string;
  name: string;
}

function Detail() {
  const {
    state: { name, id },
  } = useLocation();
  console.log(name, id);
  const { data, isLoading } = useQuery<IFilm>("character", () =>
    getCharacterById(id)
  );
  console.log(data);
  return (
    <Wrapper>
      <ArrowLink to="/">&larr;</ArrowLink>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Img src={data?.imageUrl} />
          <Title> {`${name}'s Films'`} </Title>
          <Films>
            <Film>
              {data?.films.map((film) => (
                <Span>{film} </Span>
              ))}
            </Film>
          </Films>
        </>
      )}
    </Wrapper>
  );
}

export default Detail;
