var React = require('react');
var Head = require('./Head.jsx');

module.exports = React.createClass({
	getDefaultProps() {
		return {
			onClick: null,
			comp: []
		};
	},
	onClick(data) {
		this.props.onClick(data);
	},
	render() {
		let base_class = ["tile"];
		if (this.props.onClick) {
			base_class.push("clickable");
		}
		var list = this.props.heads.map((data, i) => {
			let className = base_class;
			if (this.props.comp.some((ele) => (data.id == ele.id))) {
				className = className.concat(["selected"]);
			}
			return <li className={className.join(" ")} key={i}><Head data={data} onClick={this.onClick} /></li>;
		});

		return (
			<ul className="tile-container clearfix">
				{list}
			</ul>
		);
	}
});
