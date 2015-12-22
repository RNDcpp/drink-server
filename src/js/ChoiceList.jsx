var React = require('react');
var Button = require('./Button.jsx');

module.exports = React.createClass({
	render() {
		return (
			<ul className="choice-container">
			{
				this.props.data.map((data, i) => {
					return (<Button key={i} className="btn-block btn-success" text={data.text} data={data} onClick={this.props.fn.nextAction} />);
				})
			}
			</ul>
		)
	}
});
