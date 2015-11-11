var React = require('react');
var HeadList = require('./HeadList.jsx');

module.exports = React.createClass({
	next() {
		var data = Object.assign({}, this.props.data, this.props.data.next);
		this.props.fn.nextAction(data);
	},
	render() {
		return (
			<div>
				{() => {
					if ("heads" in this.props.data) {
						return <HeadList heads={this.props.data.heads} />;
					}
				 }()}
				<ul className="choice-container-col">
					<li className="btn btn-lg btn-primary choice-col c1-1" onClick={this.next}>OK</li>
				</ul>
			</div>
		);
	}
});
