import React from 'react';
import ReactDOM from 'react-dom';

class StarsFrame extends React.Component {

    render() {

        let numberOfStars = Math.floor(Math.random() * 9) + 1; // produces random value between 1 and 9
        let stars = [];

        for(let i=0; i<numberOfStars; i++) {
            stars.push(<span key={i} className="glyphicon glyphicon-star"></span>);
        }

        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
}

class ButtonFrame extends React.Component {

    render() {

        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg">=</button>
            </div>
        );
    }
}

class AnswerFrame extends React.Component {

    render() {

        return (
            <div id="answer-frame">
                <div className="well">...</div>
            </div>
        );
    }
}

class NumbersFrame extends React.Component {

    render() {

        const count = 9;
        let numbers = [];

        for(let i=1; i <= count; i++) {
            numbers.push(<div key={i} className="number">{i}</div>);
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    render() {

        return (
          <div id="game">
              <h2>Play Nine</h2>
              <hr />

              <div className="clearfix"/>
              <StarsFrame/>
              <ButtonFrame/>
              <AnswerFrame/>
              <NumbersFrame/>
          </div>
        );

    };
}

ReactDOM.render(<Game />, document.getElementById('container'));