var React = require('react');

var Choice = React.createClass({
	onClick(e) {
		this.props.onClick(this.props.data);
	},
	render() {
		return (
			<li onClick={this.onClick}>
				{(() => {
					if ('head' in this.props.data) {
						return(
							<div><img src={this.props.data.head.img} /><span>{this.props.data.head.name}</span></div>
						);
					} else {
						return <div><span>{this.props.data.text}</span></div>;
					}
				 })()}
			</li>
		);
	}
});

module.exports = Choice;
