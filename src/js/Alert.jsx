var React = require('react');
var HeadList = require('./HeadList.jsx');
var Button = require('./Button.jsx');

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
					<Button className="btn-primary c1-1" text="OK" onClick={this.next}/>
				</ul>
			</div>
		);
	}
});
