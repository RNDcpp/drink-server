var React = require('react');
var $ = require('jquery');
var {Button, ButtonToolbar} = require('react-bootstrap');
var Job = require('./Job.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			heads: [],
			selected: []
		};
	},
	getHeadList() {
		return $.ajax({
			url: "/head",
			dataType: "json",
			method: "GET"
		}).then((res) => {
			this.setState({
				heads: res.map((ele) => {
					return {
						id: ele.id,
						name: ele.name,
						img: `img/head_icon/${ele.id}.png`
					};
				})
			});
		}, (err) => {
			console.log(err);
			this.props.fn.setMessage(this.props.data.msg.retry);
		});
	},
	componentDidMount() {
		async () => {
			await this.getHeadList();
			await this.getJobList();
		}
	},
	select(data) {
		var state = {selected: []};
		switch(this.props.data.mode) {
			case "single":
				state.selected = [data];
				break;
			case "multi":
				if (this.state.selected.some((ele) => (data.id == ele.id))) {
					state.selected = this.state.selected.filter((ele) => (data.id != ele.id));
				} else {
					state.selected = this.state.selected.concat(data);
				}
				break;
		}
		this.setState(state);
	},
	next() {
		if (this.state.selected.length == 0) {
			this.props.fn.setMessage(this.props.data.msg[`${this.props.data.mode}_select_error`]);
			return;
		}
		var data = {};
		data.heads = this.state.selected.concat();
		data.head = data.heads[0];
		this.props.fn.nextAction(Object.assign({}, data, this.props.data.next));
	},
	cancel() {
		this.props.fn.nextAction(this.props.data.cancel);
	},
	render() {
		var list = this.state.heads.map((data, i) => {
			var className = "";
			if (this.state.selected.some((ele) => (data.id == ele.id))) {
				className = "selected";
			}
			return <li key={i}><Head data={data} onClick={this.select} className={className} /></li>;
		});

		return (
			<div>
				<ul>
					{list}
				</ul>
				<ButtonToolbar>
					<Button onClick={this.cancel}>キャンセル</Button>
					<Button onClick={this.getHeadList}>再取得</Button>
					{() => {
						if (this.state.heads.length > 0) {
							return (<Button onClick={this.next}>決定</Button>);
						}
					}()}
				</ButtonToolbar>
			</div>
		);
	}
});
