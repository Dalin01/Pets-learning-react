import { render } from "react-dom";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";
import { StrictMode } from "react"; // strict mode..
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"; //Switch matches only first match
import Details from "./Details";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to='/'>Adopt Me!</Link>
        </header>
        <Switch>
          <Route path='/details/:id'>
            <Details />
          </Route>
          <Route path='/'>
            <SearchParams />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* <Pet name="Luna" animal="dog" breed="Havanese" />
      <Pet name="Pepper" animal="bird" breed="Cockatiel" />
      <Pet name="Doink" animal="cat" breed="Mix" /> */}
    </div>
  );
};

render(<StrictMode><App /></StrictMode>, document.getElementById("root"));