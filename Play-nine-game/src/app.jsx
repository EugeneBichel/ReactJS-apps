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

        let disabled;
        let correctAnswer = this.props.correctAnswer;
        let btnCorrectAnswer;

        switch(correctAnswer) {
            case true:
                btnCorrectAnswer = (
                    <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                btnCorrectAnswer = (
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                disabled = (this.props.selectedNumbers.length === 0);
                btnCorrectAnswer = (
                    <button className="btn btn-primary btn-lg" disabled={disabled}
                            onClick={this.props.checkAnswer}>=</button>
                );
        }

        return (
            <div id="button-frame">
                {btnCorrectAnswer}
                <br/><br/>
                <button className="btn btn-warning btn-xs"
                        onClick={this.props.redraw}
                        disabled={this.props.amountOfRedraws === 0}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                    {this.props.amountOfRedraws}
                </button>
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
        let usedNumbers = this.props.usedNumbers;
        let numbers = [];
        let className;

        for(let i = 1; i <= count; i++) {
            className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
            className += " used-" + (usedNumbers.indexOf(i) >= 0);
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

class DoneFrame extends React.Component {

    render() {

        return (
          <div className="well text-center">
              <h2>{this.props.doneStatus}</h2>
              <button className="btn btn-default" onClick={this.props.resetGame}>Play again</button>
          </div>
        );
    }
}

class Game extends React.Component {

    constructor() {
        super();

        this.state = {
            numberOfStars: this.randomNumber(), // produces random value between 1 and 9
            selectedNumbers: [],
            correctAnswer: null,
            usedNumbers: [],
            amountOfRedraws: 5,
            doneStatus: null
        };
    }

    randomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    selectNumber(clickedNumber) {

        if(this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            const dbSelectedNumbers = this.state.selectedNumbers;
            this.setState({
                selectedNumbers: dbSelectedNumbers.concat(clickedNumber),
                correctAnswer: null
            });
        }
    }

    unselectNumber(clickedNumber) {
        const selectedNumbers = this.state.selectedNumbers;
        const indexOfRemovedItem = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(indexOfRemovedItem, 1);

        this.setState({
            selectedNumbers: selectedNumbers,
            correctAnswer: null
        });
    }

    sumOfSelectedNumbers() {
        return this.state.selectedNumbers.reduce(function(op1, op2){
            return op1+op2;
        }, 0);
    }

    checkAnswer() {
        let correctAnswer = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        this.setState({correctAnswer: correctAnswer});
    }

    acceptAnswer() {
        let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correctAnswer: null,
            numberOfStars: this.randomNumber()
        }, function() {
            this.updateDoneStatus();
        });
    }

    redraw() {

        if(this.state.amountOfRedraws <= 0) {
            return;
        }

        this.setState({
            numberOfStars: this.randomNumber(),
            selectedNumbers: [],
            correctAnswer: null,
            amountOfRedraws: this.state.amountOfRedraws - 1
        }, function() {
            this.updateDoneStatus();
        });
    }

    //bit.ly/s-pcs
    possibleCombinationSum(arr, n) {
        if(arr.indexOf(n) >= 0) {
            return true;
        }
        if(arr[0] > n) {
            return false;
        }
        if(arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }

        let listSize = arr.length;
        let combinationsCount = (1 << listSize);

        for(let i=1; i < combinationsCount; i++) {
            let combinationSum = 0;
            for(let j=0; j < listSize; j++) {
                if(i & (1 << j)) {
                    combinationSum += arr[j];
                }
            }
            if(combinationSum === n) {
                return true;
            }
        }

        return false;
    }

    possibleSolutions() {
        let numberOfStars = this.state.numberOfStars;
        let usedNumbers = this.state.usedNumbers;
        let possilbeNumbers = [];

        for(let i = 1; i <= 9; i++) {
            if(usedNumbers.indexOf(i) < 0) {
                possilbeNumbers.push(i);
            }
        }

        return this.possibleCombinationSum(possilbeNumbers, numberOfStars);
    }

    updateDoneStatus() {
        if(this.state.usedNumbers === 9) {
            this.setState({doneStatus: "Done. Nice!"});
            return;
        }
        if(this.state.amountOfRedraws === 0 && !this.possibleSolutions()) {
            this.setState({doneStatus: "Game Over!"});
        }
    }

    resetGame() {
        this.setState({
            numberOfStars: this.randomNumber(), // produces random value between 1 and 9
            selectedNumbers: [],
            correctAnswer: null,
            usedNumbers: [],
            amountOfRedraws: 5,
            doneStatus: null
        })
    }

    render() {

        let numberOfStars = this.state.numberOfStars;
        let selectedNumbers = this.state.selectedNumbers;
        let correctAnswer = this.state.correctAnswer;
        let usedNumbers = this.state.usedNumbers;
        let amountOfRedraws = this.state.amountOfRedraws;
        let doneStatus = this.state.doneStatus;

        let resultFrame;

        if(doneStatus) {
            resultFrame = <DoneFrame doneStatus = {doneStatus}
                                     resetGame = {this.resetGame.bind(this)} />;
        } else {
            resultFrame = <NumbersFrame selectedNumbers = {selectedNumbers}
                                        selectNumber = {this.selectNumber.bind(this)}
                                        usedNumbers = {usedNumbers}/>;
        }

        return (
          <div id="game">
              <h2>Play Nine</h2>
              <hr />

              <div className="clearfix"/>
              <StarsFrame numberOfStars = {numberOfStars}/>
              <ButtonFrame selectedNumbers = {selectedNumbers}
                           correctAnswer = {correctAnswer}
                           amountOfRedraws = {amountOfRedraws}
                           checkAnswer = {this.checkAnswer.bind(this)}
                           acceptAnswer = {this.acceptAnswer.bind(this)}
                           redraw = {this.redraw.bind(this)} />
              <AnswerFrame selectedNumbers = {selectedNumbers}
                           unselectNumber = {this.unselectNumber.bind(this)}/>

              {resultFrame}
          </div>
        );

    };
}

ReactDOM.render(<Game />, document.getElementById('container'));