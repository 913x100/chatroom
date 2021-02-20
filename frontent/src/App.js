import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:8080/'

function App() {
  const [input, setInput] = useState('');
  const [isSubmit, setIsSubmit] = useState(false)
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('Guest');
  useEffect(() => {
    const name = window.prompt("Enter a username");
    setUsername(name);
  }, []);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setList({ name: data.name, message: data.message })
      })

  }, isSubmit)

  const sendMessage = (event) => {
    event.preventDefault();

    const chatMessage = {
      user: username,
      message: input,
    };

    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: chatMessage.name,
        message: chatMessage.message,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setInput("");
        isSubmit = true
      }
    }).catch((error) => {

    })
  };

  return (
    <div className="App">
      {list.map(({ id, data: { message, timestamp, name } }) => (
        <h3 key={id} className='chatMessage'>
          {name}: {message}
        </h3>
      ))}

      <form>
        <input
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <button onClick={sendMessage} type="submit">Send message</button>
      </form>

    </div>
  );
}

export default App;
