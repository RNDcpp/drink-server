var React = require('react');

module.exports = React.createClass({
	getDefaultProps() {
		return {
			onClick() {}
		};
	},
	onClick() {
		this.props.onClick(this.props.data);
	},
	render() {
		return (
			<div className="head-container" onClick={this.onClick}>
				<img className="head-img" src={this.props.data.img} />
				<span className="head-name">{this.props.data.name}</span>
			</div>
		);
	}
});
