import React from "react";
import styled from "styled-components";
import Robot from "../assets/Welcome_animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const Welcome = ({currentUser}) => {

  return (
    <Container>
       <Player src={Robot} className="loader" autoplay loop/>
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #C822FF;
  }
`;
