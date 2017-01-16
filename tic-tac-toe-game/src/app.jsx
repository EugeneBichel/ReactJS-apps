import React from 'react';
import ReactDOM from 'react-dom';

export const HelloUser = (props) => { return (<div>Welcome to {props.name}</div>)};

ReactDOM.render(<HelloUser name="tic-tac-toe game" />, document.getElementById('container'));
