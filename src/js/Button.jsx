var React = require('react');

module.exports = React.createClass({
	getDefaultProps() {
		return {
			onClick() {},
			text: "",
			data: null,
			className: ""
		};
	},
	onClick(e) {
		this.props.onClick(this.props.data);
	},
	render() {
		let className = "btn btn-lg choice-col";
		if (this.props.className) {
			className += ` ${this.props.className}`
		}
		return (
			<li className={className} onClick={this.onClick}>{this.props.text}</li>
		);
	}
});
