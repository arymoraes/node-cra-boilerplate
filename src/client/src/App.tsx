import { useEffect, useState } from 'react';
import './App.scss';
import { apiHello } from './services/helloApi';

function App() {

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    apiHello().then((response: string | null) => {
      if (response) {
        setMessage(response);
      }
    });
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <span>{message && message}
          <p className="app__header__scss">And from SCSS</p>
        </span>
      </header>
    </div>
  );
}

export default App;
