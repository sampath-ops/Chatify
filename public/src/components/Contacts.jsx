import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Logo from "../assets/logo.svg";
import { mobile, tablet } from "../utils/constants";
import { BiLeftArrow } from "react-icons/bi";

const Contacts = ({
  contacts,
  currentUser,
  changeChat,
  isOpenContact,
  handleListOpenState,
}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUser && (
        <Container isOpenContact={isOpenContact}>
          <div className="brand">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <h3>Chatify</h3>
            </div>
            <BiLeftArrow color="white" onClick={handleListOpenState} />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contacts;

const slideInAnim = keyframes`
from{
  transform: translateX(-150%);
  opacity:0;
}
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const slideOutAnim = keyframes`
from{
  transform: translateX(0%);
  opacity:1;
}
  to {
    transform: translateX(-150%);
    opacity: 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  overflow: hidden;
  background-color: #080420;
  z-index: 10;
  height: 100%;
  ${tablet(css`
    position: absolute;
    animation: ${(props) =>
      props.isOpenContact
        ? css`
            ${slideInAnim} 0.6s ease-in-out forwards;
          `
        : css`
            ${slideOutAnim} 0.5s ease-in-out forwards;
          `}
    left: 0;
    padding: 20px;
    width: 50%;
  `)}
  ${mobile(css`
    padding: 15px;
    width: 80%;
  `)}
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.625rem 2rem;
    justify-content: center;
    svg {
      display: none;
    }
    ${tablet(css`
      padding: 1.25rem 0;
      padding-top: 0;
      justify-content: space-between;
      svg {
        display: block;
      }
    `)}
    .logo {
      display: flex;
      align-items: center;
      gap: 6px;
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      ${mobile(css`
        min-height: 4rem;
        .avatar {
          img {
            height: 2.5rem;
          }
        }
        .username {
          h3 {
            font-size: 16px;
          }
        }
      `)}
    }
    .selected {
      background-color: #d889fa;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    ${mobile(css`
      padding: 12px;
      .avatar {
        img {
          height: 3rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          font-size: 18px;
        }
      }
    `)}
  }
`;
