
import React from "react";
import "./assets/scss/app.scss";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NotFound from "./layout/NotFound";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
