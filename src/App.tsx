import React, { useEffect } from 'react';
import './App.css';
import TodosPage from 'pages/TodosPage';
import GitHubPage from 'pages/GitHubPage';
import axios from 'axios';

// axios.defaults.withCredentials = true




function App() {
  useEffect(()=> {
  }, [])
  return (
    <div className="App">
    <TodosPage />
    <GitHubPage />
    </div>
  );
}

export default App;
