import React from 'react';
import './App.scss';

// Components
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import ChannelActive from './components/ChannelActive';
import MessageList from './components/MessageList/MessageList';
import Submit from './components/Submit';

function App() {
  return (
    <div className="App">
        <div className="left" id="channels-wrapper">
            <Header/>
            <ChannelList/>
        </div>
        <div className="right" id="chat-wrapper">
            <ChannelActive/>
            <MessageList/>
            <Submit/>
        </div>
    </div>
  );
}

export default App;