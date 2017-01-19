import React from 'react';
import ReactDOM from 'react-dom';

class StarsFrame extends React.Component {

    render() {

        let stars = [];

        for(let i = 0; i < this.props.numberOfStars; i++) {
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

        let disabled = (this.props.selectedNumbers.length === 0);

        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg" disabled={disabled}>=</button>
            </div>
        );
    }
}

class AnswerFrame extends React.Component {

    render() {

        let props = this.props;
        let selectedNumbers = props.selectedNumbers.map(function(item){
            return (<span className="number" key={item} onClick={props.unselectNumber.bind(null, item)}>{item}</span>);
        });

        return (
            <div id="answer-frame">
                <div className="well">{selectedNumbers}</div>
            </div>
        );
    }
}

class NumbersFrame extends React.Component {

    render() {

        const count = 9;
        let selectedNumbers = this.props.selectedNumbers;
        let numbers = [], className;

        for(let i=1; i <= count; i++) {
            className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
            numbers.push(<div key={i} onClick={this.props.selectNumber.bind(null, i)} className={className}>{i}</div>);
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

    constructor() {
        super();

        this.state = {
            numberOfStars: Math.floor(Math.random() * 9) + 1, // produces random value between 1 and 9
            selectedNumbers: []
        };
    }

    selectNumber(clickedNumber) {

        if(this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            const dbSelectedNumbers = this.state.selectedNumbers;
            this.setState({selectedNumbers: dbSelectedNumbers.concat(clickedNumber)});
        }
    }

    unselectNumber(clickedNumber) {
        const selectedNumbers = this.state.selectedNumbers;
        const indexOfRemovedItem = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(indexOfRemovedItem, 1);

        this.setState({selectedNumbers: selectedNumbers});
    }

    render() {

        let numberOfStars = this.state.numberOfStars;
        let selectedNumbers = this.state.selectedNumbers;

        return (
          <div id="game">
              <h2>Play Nine</h2>
              <hr />

              <div className="clearfix"/>
              <StarsFrame numberOfStars = {numberOfStars}/>
              <ButtonFrame selectedNumbers = {selectedNumbers}/>
              <AnswerFrame selectedNumbers = {selectedNumbers} unselectNumber = {this.unselectNumber.bind(this)}/>
              <NumbersFrame selectedNumbers = {selectedNumbers} selectNumber = {this.selectNumber.bind(this)}/>
          </div>
        );

    };
}

ReactDOM.render(<Game />, document.getElementById('container'));