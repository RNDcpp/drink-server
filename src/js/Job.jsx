var React = require('react');

module.exports = React.createClass({
	getDefaultProps() {
		return {
			onClick() {}
		};
	},
	onClick(e) {
		this.props.onClick(this.props.data);
	},
	render() {
		return (
			<div className={this.props.className} onClick={this.onClick}>
				<img src={this.props.data.img} /><span>{this.props.data.name}</span>
			</div>
		);
	}
});
