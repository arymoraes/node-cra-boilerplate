import { useEffect, useState } from 'react';
import './App.css';
import { apiHello } from './services/helloApi';

function App() {

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    apiHello().then((response: string | null) => {
      if (response) {
        setMessage(response);
      }
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        {message && message}
      </header>
    </div>
  );
}

export default App;
