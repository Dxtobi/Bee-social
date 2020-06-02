import React from 'react';
import ReactDOM from 'react-dom';
import './post.css';
import './index.css';
import './dashbord.css';
import './loading.css';
import './profile.css';
import './emoji.css';
import{ App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
