import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
//   </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
let rerender = (state) => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>)
}

// let rerender = (state) => {
//   ReactDOM.render(
//     <BrowserRouter>
//       <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
//     </BrowserRouter>, document.getElementById('root'));
// }

rerender(store.getState());

store.subscribe(rerender)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
