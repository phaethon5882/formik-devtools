import React, { useCallback, useEffect, useState } from "react";

function Provider({ addMessage }) {
  const onMessage = useCallback(
    (msg) => {
      try {
        console.log(msg);
        const message = JSON.parse(msg);
        console.log(message);

        if (message && message.msg) {
          addMessage(JSON.stringify(message.msg));
        }
      } catch (ex) {
        console.log(msg);
        console.log(ex);
      }
    },
    [addMessage]
  );

  useEffect(() => {
    // eslint-disable-next-line
    chrome.runtime.onConnect.addListener((port) =>
      port.onMessage.addListener(onMessage)
    );
  }, [onMessage]);

  return null;
}

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback(
    (newMessage) => {
      setMessages([...messages, newMessage]);
    },
    [messages]
  );

  return (
    <div className="App" onClick={() => addMessage("aa")}>
      {messages?.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <Provider addMessage={addMessage} />
    </div>
  );
}

export default App;
