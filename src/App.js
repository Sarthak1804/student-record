import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavLinks from "./components/NavLinks/NavLinks";
import Students from "./pages/Students/Students";
import React from "react";

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h3>Student Record</h3>
                    <NavLinks/>
                </header>
                <Switch>
                    <Route path="/">
                        <Students/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
