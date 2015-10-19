var React = require('react');
var {Button, ButtonToolbar} = require('react-bootstrap');

var Confirm = React.createClass({
	next() {
		let data = this.props.data;
		this.props.nextAction(Object.assign({}, data, data.next));
	},
	cancel() {
		this.props.nextAction(this.props.data.cancel);
	},
	render() {
		return (
			<div>
				<img src={this.props.data.head.img} />
				<span>{this.props.data.head.name}</span>
				<ButtonToolbar>
					<Button onClick={this.cancel}>キャンセル</Button>
					<Button onClick={this.next}>OK</Button>
				</ButtonToolbar>
			</div>
		);
	}
});

module.exports = Confirm;
