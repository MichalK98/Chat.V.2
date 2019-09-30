import React from 'react';
import './App.css';

// Components
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import ChannelActive from './components/ChannelActive';
import MessageList from './components/MessageList/MessageList';
import Submit from './components/Submit';

function App() {
  return (
    <div className="App">
        <div className="left">
            <Header/>
            <ChannelList/>
        </div>
        <div className="right">
            <ChannelActive/>
            <MessageList/>
            <Submit/>
        </div>
    </div>
  );
}

export default App;