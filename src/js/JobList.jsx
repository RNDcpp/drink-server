var React = require('react');
var $ = require('jquery');
var Job = require('./Job.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			jobs: []
		};
	},
	getData() {
		Promise.all([
			$.ajax({
				url: "/head",
				dataType: "json",
				method: "GET"
			}),
			$.ajax({
				url: "/job",
				dataType: "json",
				method: "GET"
			})
		]).then((res) => {
			this.props.fn.setErrors([]);
			this.setState({
				jobs: res[1].map((ele) => {
					return {
						id: ele.id,
						order: ele.order,
						status: ele.status,
						time: ele.updated_at,
						heads: res[0].filter((e) => ((ele.order >> (e.port - 1)) & 1)).map((e) => ({
							id: e.id,
							port: e.port,
							name: e.name,
							img: `/img/head_icon/${e.port}.png`
						}))
					};
				})
			});
		}, (err) => {
			console.log(err);
			this.props.fn.setErrors(["server error"]);
			this.props.fn.setMessage(this.props.data.msg.retry);
		});
	},
	componentDidMount() {
		this.getData();
	},
	select(data) {
		this.props.fn.nextAction(Object.assign({}, data, this.props.data.next));
	},
	cancel() {
		this.props.fn.nextAction(this.props.data.cancel);
	},
	render() {
		return (
			<div>
				<ol className="job-list">
					{this.state.jobs.map((data, i) => (<li key={i}><Job data={data} onClick={this.select}/></li>))}
				</ol>
				<ul className="choice-container-col">
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.cancel}>戻る</li>
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.getData}>再取得</li>
				</ul>
			</div>
		);
	}
});
