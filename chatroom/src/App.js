import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('Guest');
  useEffect(() => {
    const name = window.prompt("Enter a username");
    setUsername(name);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    const chatMessage = {
      user: username,
      message: input,
    };

    setInput("");
  };

  console.log(input);
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
