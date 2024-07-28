import React from "react";
import styled, { css } from "styled-components";
import Robot from "../assets/Welcome_animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { BiRightArrow } from "react-icons/bi";
import { mobile, tablet } from "../utils/constants";

const Welcome = ({ currentUser, handleListOpenState, isOpenContact }) => {
  return (
    <Container>
      {isOpenContact ? "" : <BiRightArrow onClick={handleListOpenState} />}
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
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  height: 100%;
  padding: 20px;
  h1 {
    margin-bottom: 12px;
  }
  h1,
  h3 {
    text-align: center;
  }
  & > svg {
    display: none;
  }
  ${tablet(css`
    grid-template-rows: repeat(8, minmax(0, 1fr));
    div {
      grid-row: 1 / 6;
    }
    & > svg {
      display: block;
      position: absolute;
      right: 20px;
      cursor: pointer;
      top: 32px;
    }
  `)}
  ${mobile(css`
    h1,
    h3 {
      font-size: 20px;
    }
    & > svg {
      display: block;
      position: absolute;
      right: 20px;
      cursor: pointer;
      top: 18px;
    }
  `)}
  img {
    height: 20rem;
  }
  span {
    color: #c822ff;
  }
`;
