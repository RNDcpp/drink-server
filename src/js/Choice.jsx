var React = require('react');

module.exports = React.createClass({
	onClick(e) {
		this.props.onClick(this.props.data);
	},
	render() {
		return (
			<li onClick={this.onClick}>
				<div><span>{this.props.data.text}</span></div>
			</li>
		);
	}
});
