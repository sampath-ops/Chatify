import React from "react";
import styled, { css } from "styled-components";
import Robot from "../assets/Welcome_animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { BiRightArrow } from "react-icons/bi";
import { tablet } from "../utils/constants";

const Welcome = ({ currentUser, handleListOpenState, isOpenContact }) => {
  return (
    <Container>
      {isOpenContact ? '' : <BiRightArrow onClick={handleListOpenState}/> }
      <Player src={Robot} className="loader" autoplay loop />
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
  position: relative;
  flex-direction: column;
  & > svg {
    display: none;
  }
  ${tablet(css`
    & > svg {
      display: block;
      position: absolute;
      right: 20px;
      cursor: pointer;
      top: 32px;
    }
  `)}
  img {
    height: 20rem;
  }
  span {
    color: #c822ff;
  }
`;
