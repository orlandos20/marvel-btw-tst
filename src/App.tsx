import { Route, Switch } from 'wouter';

import './App.css';

import { Home, Details } from './views/pages';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/characters/:name">
        {(params) => <Details characterId={params.name} />}
      </Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default App;
