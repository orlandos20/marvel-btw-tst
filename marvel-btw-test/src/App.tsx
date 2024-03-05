import { useState } from 'react';
import { Link, Route, Switch } from 'wouter';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Switch>
      <Route
        path='/'
        component={() => (
          <>
            <div>
              <Link href='/character/wolverine'>Profile</Link>
              <a href='https://vitejs.dev' target='_blank'>
                <img src={viteLogo} className='logo' alt='Vite logo' />
              </a>
              <a href='https://react.dev' target='_blank'>
                <img src={reactLogo} className='logo react' alt='React logo' />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className='read-the-docs'>
              Click on the Vite and React logos to learn more
            </p>
          </>
        )}
      />

      <Route path='/character/:name'>
        {(params) => <>Hello, {params.name}!</>}
      </Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default App;
