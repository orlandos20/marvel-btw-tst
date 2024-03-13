import { Route, Switch } from 'wouter';

import './App.css';

import { Home, Details } from '@/views/pages';
import CharacterProvider from './contexts/characters/CharacterProvider';

function App() {
  return (
    <CharacterProvider>
      <Switch>
        <Route path="/marvel-btw-tst" component={Home} />

        <Route path="/marvel-btw-tst/characters/:name">
          {(params) => <Details characterId={params.name} />}
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </CharacterProvider>
  );
}

export default App;
