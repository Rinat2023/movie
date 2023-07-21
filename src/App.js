import { Fragment, useRef, useState } from 'react';
import './App.css';
import { Button } from './components/Header/Button';
import { ModalInput } from './components/Modal/ModalInput';
import { AddNewTodoButton } from './components/Modal/AddNewTodoButton';
import { DeleteButton } from './components/Main/DeleteButton';
import { EditButton } from './components/Main/EditButton';
import { styled } from 'styled-components';
import ReactDOM from 'react-dom';

function App() {
  const [state, setState] = useState(false);
  const [movie, setMovie] = useState([]);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [delmodal, setdelmodal] = useState(false);
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const addMovie = () => {
    const isFormValid = image.trim() && rating && title.trim();
    if (isFormValid) {
      const newMovie = {
        title,
        image,
        rating,
        id: Math.random(),
      };
      setMovie([...movie, newMovie]);
      setImage('');
      setRating('');
      setTitle('');
    }
    closeModal();
  };

  const openModal = () => {
    setState(true);
  };
  const closeModal = () => {
    setState(false);
  };
  const openDelModal = () => {
    setdelmodal(true);
  };
  const closeDelModal = () => {
    setdelmodal(false);
  };
  const deleteBtn = (id) => {
    const filteredMovie = movie.filter((mov) => mov.id !== id);
    setMovie(filteredMovie);
  };
  const AddModal = document.getElementById('AddModal');
  const delModal = document.getElementById('deleteModal');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioToggleHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="App">
        <HeaderCss>
          <h1>Favorite Movies</h1>
          {state ? (
            ReactDOM.createPortal(
              <>
                <ModalDivCss
                  className="modal"
                  onClick={closeModal}
                ></ModalDivCss>
                <button
                  style={{
                    background: '#c22a1f',
                    position: 'absolute',
                    left: 1000,
                    top: 500,
                  }}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <InputContainerCss className="a">
                  <ModalInput
                    type={'text'}
                    placeholder={' img...'}
                    value={image}
                    onChange={(event) => handleImageChange(event)}
                  ></ModalInput>
                  <ModalInput
                    type={'text'}
                    placeholder={' title...'}
                    value={title}
                    onChange={(event) => handleTitleChange(event)}
                  ></ModalInput>
                  <ModalInput
                    value={rating}
                    type={'number'}
                    placeholder={' stars/5...'}
                    onChange={(event) => handleRatingChange(event)}
                  ></ModalInput>
                  <AddNewTodoButton onClick={addMovie}></AddNewTodoButton>
                </InputContainerCss>
              </>,
              AddModal
            )
          ) : (
            <Button onClick={openModal}></Button>
          )}
        </HeaderCss>
        <div className="main__div">
          {movie.map((mov) => {
            return (
              <MainCss key={mov.id}>
                <OutDiv className="outDiv">
                  <InDivCss className="in__div">
                    <ImgStyle src={mov.image} className="img"></ImgStyle>
                    <Econtainer className="e">
                      <h3>{mov.title}</h3>
                      <InInDivCss className="ininDiv">
                        <h4>{mov.rating}/5 stars</h4>
                        {delmodal ? (
                          ReactDOM.createPortal(
                            <>
                              <Backdrop></Backdrop>
                              <Container>
                                <p
                                  style={{
                                    background: 'none',
                                    color: 'black',
                                    fontSize: '1.5rem',
                                  }}
                                >
                                  do you want delete
                                </p>
                                <button
                                  style={{
                                    background: 'white',
                                    color: 'blue',
                                    border: '1px solid blue',
                                  }}
                                  onClick={closeDelModal}
                                >
                                  NO
                                </button>
                                <button
                                  style={{ background: 'blue' }}
                                  onClick={() => deleteBtn(mov.id)}
                                >
                                  YES
                                </button>
                              </Container>
                            </>,
                            delModal
                          )
                        ) : (
                          <button
                            style={{ background: '#c22a1f' }}
                            onClick={openDelModal}
                          >
                            delete
                          </button>
                        )}

                        <EditButton />
                      </InInDivCss>
                    </Econtainer>
                  </InDivCss>
                </OutDiv>
              </MainCss>
            );
          })}
        </div>
        <br></br>
      </div>
      <div>
        {/* <audio controls ref={audioRef}>
          <source src="C:\Users\XX\Downloads\Eminem – Mockingbird.mp3"  />
        </audio> */}
        {/* <audio
          controls
          src="c:\Users\XX\Downloads\Eminem – Mockingbird.mp3"
          type="audio/ogg"
        ></audio> */}
        {/* <audio controls>
  <source src="myAudio.mp3" type="audio/mpeg" />
  <source src="myAudio.ogg" type="audio/ogg" />
</audio>
  <p>
    shunu kylalbadym
  </p> */}
        {/* <button onClick={audioToggleHandler}>
          {isPlaying ? 'Pause' : 'Play'}
        </button> */}
      </div>
    </>
  );
}
const HeaderCss = styled.header`
  height: 12vh;
  background-color: #073698;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;
const ModalDivCss = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #c75f1eed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;
const InputContainerCss = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: #073598;
  width: 40%;
  position: absolute;
  top: 200px;
  left: 500px;
  z-index: 100;
  height: 40vh;
  border-radius: 14px;
`;
const ImgStyle = styled.img`
  width: 240px;
`;
const OutDiv = styled.div`
  width: 550px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 0 10px 1px rgb(192, 192, 192);
  margin-top: 10px;
`;
const InDivCss = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 0 10px 1px rgba(223, 223, 223, 0.842);
  border-radius: 10px;
  overflow: hidden;
`;
const MainCss = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Econtainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const InInDivCss = styled.div`
  width: 100%;
  padding: 30px 20px;
  display: flex;
  gap: 10px;
`;

const Container = styled.div`
  position: absolute;
  background-color: white;
  top: 300px;
  left: 650px;
  padding: 30px;
  z-index: 1000;
`;
const Backdrop = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
`;
export default App;
