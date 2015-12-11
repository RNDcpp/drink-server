var React = require('react');
var ReactDOM = require('react-dom');
var dialog = require('./dialog.js');
var ChoiceList = require('./ChoiceList.jsx');
var HeadForm = require('./HeadForm.jsx');
var SelectHead = require('./SelectHead.jsx');
var JobList = require('./JobList.jsx');
var Alert = require('./Alert.jsx');
var {DeleteHeadConfirm, AddJobConfirm, DeleteJobConfirm} = require('./Confirm.jsx');
var $ = require('jquery');

var App = React.createClass({
	getInitialState() {
		return {
			type: "",
			question: "Loading...",
			answer: [],
			errors: []
		};
	},
	componentDidMount() {
		$.ajax({
			url: "/data/locale.json",
			dataType: "json",
			method: "GET"
		}).then((res) => {
			dialog.setLocale(res);
			if (this.isMounted()) {
				this.nextAction({op: "init"});
			}
		}, (err) => {
			console.log(err);
			if (this.isMounted()) {
				this.setErrors(["server error"]);
				this.setMessage("Failed to load data.");
			}
		});
	},
	nextAction(data) {
		dialog.setBefore(data);
		var target = dialog[data.op];
		this.setState({
			type: target.type,
			question: target.q,
			answer: target.a,
			errors: []
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
				answer = <ChoiceList fn={fn} data={this.state.answer} />;
				break;
			case "head-list":
				answer = <SelectHead fn={fn} data={this.state.answer} />;
				break;
			case "job-list":
				answer = <JobList fn={fn} data={this.state.answer} />;
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
			case "delete-job-confirm":
				answer = <DeleteJobConfirm fn={fn} data={this.state.answer} />;
				break;
			case "alert":
				answer = <Alert fn={fn} data={this.state.answer} />;
				break;
		}
		return (
			<div className="message-box">
				<span className="message-text">
					{this.state.question}
				</span>
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
	document.getElementById('chat-content')
);
