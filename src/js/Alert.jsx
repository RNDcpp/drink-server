var React = require('react');
var {Button, ButtonToolbar} = require('react-bootstrap');
var Head = require('./Head.jsx');

module.exports = React.createClass({
	next() {
		var data = Object.assign({}, this.props.data, this.props.data.next);
		this.props.fn.nextAction(data);
	},
	render() {
		console.log(this.props.data);
		var heads = null;
		if ("heads" in this.props.data) {
			heads = this.props.data.heads.map((ele, i) => <li key={i}><Head data={ele} /></li>);
		}
		return (
			<div>
				{() => {
					if ("heads" in this.props.data) {
						var heads = this.props.data.heads.map((ele, i) => <li key={i}><Head data={ele} /></li>);
						return <ul>{heads}</ul>;
					}
				}()}
				<Button onClick={this.next}>OK</Button>
			</div>
		);
	}
});
