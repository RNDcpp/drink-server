var React = require('react');

module.exports = React.createClass({
	onClick(e) {
		this.props.onClick(this.props.data);
	},
	render() {
		return (
			<li className="btn btn-block btn-lg btn-primary choice" onClick={this.onClick}>
				{this.props.data.text}
			</li>
		);
	}
});
