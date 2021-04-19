import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Typography, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { IndeterminateCheckBoxOutlined } from "@material-ui/icons";

const Messages = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  //   Get all messages for this user.
  useEffect(() => {
    axios
      .post("/messages", {
        user_id: parseInt(user.userID),
      })
      .then((res) => {
        console.log(res);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMessage = (e, id) => {
    console.log(id);
    // axios.delete("/delete", message).then(res => {
    //     console.log(res.data);
    // }).catch(err => {
    //     console.log(err);
    // })
  };
  const [currentImage, setCurrentMessage] = useState(false);

  return (
    <>
      {messages.length > 0 ? (
        <>
          {messages.map((mes, index) => {
            return (
              <div
                key={index}
                onClick={(e, mes) => {
                  setCurrentMessage(mes);
                  console.log(mes);
                  console.log("stuff");
                }}>
                {mes.message}
              </div>
            );
          })}
        </>
      ) : (
        <Typography>No Messages</Typography>
      )}
    </>
  );
};

export default Messages;
