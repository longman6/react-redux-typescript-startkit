import React, { useEffect } from 'react';
import './App.css';
import TodosPage from 'pages/TodosPage';
import GitHubPage from 'pages/GitHubPage';
import { getUserInfo } from 'api/userAPI'
import axios from 'axios';

// axios.defaults.withCredentials = true




function App() {
  useEffect(()=> {
    const user = getUserInfo()
    console.log(user);
  }, [])
  return (
    <div className="App">
    <TodosPage />
    <GitHubPage />
    </div>
  );
}

export default App;
