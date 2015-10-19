var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('./dialog.js');
var Choice = require('./Choice.jsx');
var ImageForm = require('./ImageForm.jsx');
var Confirm = require('./Confirm.jsx');

var App = React.createClass({
	getInitialState() {
		return {
			type: dialog.init.type,
			question: dialog.init.q,
			answer: dialog.init.a
		};
	},
	nextAction(data) {
		(async () => {
			var target = dialog[data.op];
			if ('ajax' in target) {
				await target.ajax(data);
			} else if ('set' in target) {
				target.set(data);
			}
			this.setState({
				type: target.type,
				question: target.q,
				answer: target.a
			});
		})();
	},
	setMessage(message) {
		this.setState({
			question: message
		});
	},
	render() {
		var answer;
		switch(this.state.type) {
			case "list":
				answer = [];
				this.state.answer.forEach((data, i) => {
					answer.push(<Choice key={i} data={data} onClick={this.nextAction} />);
				});
				answer = <ul>{answer}</ul>;
				break;
			case "drink-form":
				answer = <ImageForm nextAction={this.nextAction} data={this.state.answer} />;
				break;
			case "confirm":
				answer = <Confirm nextAction={this.nextAction} data={this.state.answer} />;
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
