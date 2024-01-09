import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import { Activity } from './pages/activity.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div style={{backgroundColor: "ghostwhite"}}>
        <Activity />
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
