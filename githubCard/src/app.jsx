import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';


class Card extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            avatar_url: ""
        };
    }

    componentDidMount() {

        var component = this;

        request('https://api.github.com/users/' + this.props.login, function(error, response){

            var body = JSON.parse(response.body);

            var data = {
                name: body.name,
                avatar_url: body.avatar_url
            };

            component.setState(data);
        });
    }

    render() {
        return (
            <div>
                <img src={this.state.avatar_url} width="80px" />
                <h3>{this.state.name}</h3>
                <hr />
            </div>
        );
    }
}

class Form extends React.Component{

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var loginInput = ReactDOM.findDOMNode(this.refs.login);
        this.props.addCard(loginInput.value);
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <input placeholder = "github login" ref="login"/>
                <button>Add</button>
            </form>
        );
    }
}

class Board extends React.Component {

    constructor() {
        super();

        this.state = {
            logins: ['eugenebichel', 'facebook']
        };
    }

    addNewCard(loginToAdd) {
        this.setState({logins: this.state.logins.concat(loginToAdd)});
    }

    render() {

        var cards = this.state.logins.map(function(userLogin){
            return (<Card key={userLogin} login={userLogin} />);
        });

        return (
          <div>
              <p>GitHub Cards</p>
              <Form addCard = {this.addNewCard.bind(this)} />
              <br />
              {cards}
          </div>
        );
    };
}

ReactDOM.render(<Board />, document.getElementById('container'));
