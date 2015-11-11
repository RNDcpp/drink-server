var React = require('react');
var Choice = require('./Choice.jsx');

module.exports = React.createClass({
	render() {
		return (
			<ul className="choice-container">
			{
				this.props.data.map((data, i) => {
					return (<Choice key={i} data={data} onClick={this.props.fn.nextAction} />);
				})
			}
			</ul>
		)
	}
});
