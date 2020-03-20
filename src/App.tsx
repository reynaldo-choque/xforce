import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import Container from '@material-ui/core/Container';
import AppRouter from "./Components/AppRouter";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container>
        <AppRouter/>
      </Container>
    </div>
  );
}

export default App;
