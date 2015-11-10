var moment = require('moment');
var React = require('react');
var HeadList = require('./HeadList.jsx');

var msg = {
	"0": "準備中",
	"1": "準備完了"
}

var className = {
	"0": "job-wait",
	"1": "job-ready"
}

moment.locale('ja', {
	relativeTime : {
		future: "%s後",
		past:   "%s前",
		s:  "秒",
		m:  "1分",
		mm: "%d分",
		h:  "1時間",
		hh: "%d時間",
		d:  "1日",
		dd: "%d日",
		M:  "1ヶ月",
		MM: "%dヶ月",
		y:  "1年",
		yy: "%d年"
	}
});

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
			<div className="job-container" onClick={this.onClick}>
				<HeadList heads={this.props.data.heads} />
				<div className="job-info">{moment(this.props.data.time).fromNow()}</div>
				<div className={"job-info ${className[this.props.data.status]}"} >{msg[this.props.data.status]}</div>
			</div>
		);
	}
});
