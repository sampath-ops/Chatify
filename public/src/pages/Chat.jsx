import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";
import styled, { css } from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { mobile, tablet } from "../utils/constants";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isOpenContact, setIsOpenContact] = useState(false);

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        const user = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUser(user);
      }
    };
    checkLocalStorage();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      const fetchContacts = async () => {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      };
      fetchContacts();
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsOpenContact(false)
  };

  const handleListOpenState = ()=>{
      setIsOpenContact(!isOpenContact)
  }

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser, socket]);

  return (
    currentUser &&
    contacts && (
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
            isOpenContact={isOpenContact}
            handleListOpenState={handleListOpenState}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} handleListOpenState={handleListOpenState} isOpenContact={isOpenContact} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              handleListOpenState={handleListOpenState}
            />
          )}
        </div>
      </Container>
    )
  );
};

export default Chat;

const Container = styled.div`
  height: 100dvh;
  display: flex;
  background-color: #131324;
  .container {
    margin: 50px 110px;
    background-color: #00000076;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    ${tablet(css`
      margin: 30px 50px;
      position: relative;
      display: block;
    `)}
     ${mobile(css`
      margin: 20px;
      position: relative;
      display: block;
    `)}
  }
`;
