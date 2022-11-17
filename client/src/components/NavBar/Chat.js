import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
    if (currentMessage !== "") {
        const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
    };

    useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
    });
    }, [socket]);
    

    return (
    <div style={{height:'600px'}}>
        <div className="col-6 mx-auto chatBox" >
            <div>
                <div className="no-gutter fluid text-light text-center bg-dark">
                    <h5>Live Chat</h5>
                </div>
                <div style={{height:'472px'}} className="chat-body">
                    <ScrollToBottom className="messageContainer">
                        {messageList.map((messageContent) => {
                        return (
                        <div
                            className="message"
                            id={username === messageContent.author ? "you" : "other"}
                        >
                            <div>
                            <div className="message-content fs-5">
                                <p>{messageContent.message}</p>
                                </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                        })}
                    </ScrollToBottom>
                </div>
                <div className="d-flex align-items-center">
                    <input type="text" className="form-control bg-light" value={currentMessage} placeholder="Your message here..." onChange={(event) => { setCurrentMessage(event.target.value) }} onKeyPress={(event) => { event.key === "Enter" && sendMessage() }}/>
                    <button onClick={sendMessage} className='btn btn-success'>&#9658;</button>
                </div>
        </div>
    </div>
    </div>
    )
}

export default Chat