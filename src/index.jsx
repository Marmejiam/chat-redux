// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

//Import reducers
import channelsReducer from "./reducers/channels_reducer";
import messagesReducer from "./reducers/messages_reducer";
import currentUserReducer from "./reducers/current_user_reducer";
import selectedChannelReducer from "./reducers/selected_channel_reducer";

// State and reducers
const reducers = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  currentUser: currentUserReducer,
  selectedChannel: selectedChannelReducer
});

const initialState = {
  channels: ["General", "React", "Paris"],
  messages: [],
  currentUser: prompt("What is your username?") || `anonymous${Math.floor(10 + (Math.random() * 90))}`,
  selectedChannel: "general"
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(reduxPromise, logger));


// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
