var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('./dialog.js');
var Choice = require('./Choice.jsx');
var HeadForm = require('./HeadForm.jsx');
var HeadList = require('./HeadList.jsx');
var Alert = require('./Alert.jsx');
var {DeleteHeadConfirm, AddJobConfirm} = require('./Confirm.jsx');

var App = React.createClass({
	getInitialState() {
		return {
			type: dialog.init.type,
			question: dialog.init.q,
			answer: dialog.init.a,
			errors: []
		};
	},
	nextAction(data) {
		var target = dialog[data.op];
		if ('set' in target) {
			target.set(data);
		}
		this.setState({
			type: target.type,
			question: target.q,
			answer: target.a
		});
	},
	setMessage(message) {
		this.setState({
			question: message
		});
	},
	setErrors(errors) {
		this.setState({
			errors: errors
		})
	},
	render() {
		var answer;
		var fn = {
			nextAction: this.nextAction,
			setMessage: this.setMessage,
			setErrors: this.setErrors
		};
		switch(this.state.type) {
			case "list":
				answer = [];
				this.state.answer.forEach((data, i) => {
					answer.push(<Choice key={i} data={data} onClick={this.nextAction} />);
				});
				answer = <ul>{answer}</ul>;
				break;
			case "head-list":
				answer = <HeadList fn={fn} data={this.state.answer} />;
				break;
			case "drink-form":
				answer = <HeadForm fn={fn} data={this.state.answer} />;
				break;
			case "delete-head-confirm":
				answer = <DeleteHeadConfirm fn={fn} data={this.state.answer} />;
				break;
			case "add-job-confirm":
				answer = <AddJobConfirm fn={fn} data={this.state.answer} />;
				break;
			case "alert":
				answer = <Alert fn={fn} data={this.state.answer} />;
				break;
		}
		return (
			<div className="contents">
				<div className="title">
					<h1>DrinkServer</h1>
				</div>
				<div className="question clearfix">
					<img src="/img/mascot.png" />
					<div className="arrow_box">
						{this.state.question}
					</div>
				</div>
				<div className="errors">
					<ul>
						{this.state.errors.map((ele, i) => (<li key={i}>{ele}</li>))}
					</ul>
				</div>
				<div className="answer">
					{answer}
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('main')
);
