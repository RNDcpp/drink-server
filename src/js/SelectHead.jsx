var React = require('react');
var $ = require('jquery');
var HeadList = require('./HeadList.jsx');
var Button = require('./Button.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			heads: [],
			selected: []
		};
	},
	getHeadList() {
		$.ajax({
			url: "/head",
			dataType: "json",
			method: "GET"
		}).then((res) => {
			this.props.fn.setErrors([]);
			this.setState({
				heads: res.map((ele) => {
					return {
						id: ele.id,
						port: ele.port,
						name: ele.name,
						img: `/img/head_icon/${ele.port}.png`
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
		this.getHeadList();
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
		return (
			<div>
				<HeadList heads={this.state.heads} onClick={this.select} comp={this.state.selected} />
				<ul className="choice-container-col">
					<Button className="btn-success" text="キャンセル" onClick={this.cancel}/>
					<Button className="btn-success" text="再取得" onClick={this.getHeadList}/>
					{() => {
						if (this.state.heads.length > 0) {
							return <Button className="btn-success" text="決定" onClick={this.next}/>;
						}
					 }()}
				</ul>
			</div>
		);
	}
});
