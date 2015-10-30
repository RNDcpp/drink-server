var React = require('react');
var Head = require('./Head.jsx');

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
			<div onClick={this.onClick}>
				<ul>
					{this.props.data.heads.map((data, i) => (<li key={i}><Head data={data} /></li>))}
				</ul>
				<span>{this.props.data.time}</span>
			</div>
		);
	}
});
