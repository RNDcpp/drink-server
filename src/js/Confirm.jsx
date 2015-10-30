var React = require('react');
var $ = require('jquery');
var {Button, ButtonToolbar} = require('react-bootstrap');
var Head = require('./Head.jsx');

var Confirm = {
	cancel() {
		this.props.fn.nextAction(this.props.data.cancel);
	},
	ajax(opt) {
		var data = Object.assign({}, this.props.data, this.props.data.next);
		$.ajax(opt).then((res) => {
			if (res.result == "success") {
				data.q = this.props.data.msg.success;
			} else {
				data.q = this.props.data.msg.fail;
			}
			this.props.fn.nextAction(data);
		}).fail((err) => {
			console.log(err);
			data.q = this.props.data.msg.fail;
			this.props.fn.nextAction(data);
		});
	},
	render() {
		return (
			<div>
				<ul>
					{this.props.data.heads.map((ele, i) => <li key={i}><Head data={ele} /></li>)}
				</ul>
				<ButtonToolbar>
					<Button onClick={this.cancel}>キャンセル</Button>
					<Button onClick={this.next}>OK</Button>
				</ButtonToolbar>
			</div>
		);
	}
};

module.exports.DeleteHeadConfirm = React.createClass({
	mixins: [Confirm],
	next() {
		this.ajax({
			url: "/head",
			dataType: "json",
			method: "DELETE",
			data: {
				id: this.props.data.head.id
			}
		});
	}
});

module.exports.AddJobConfirm = React.createClass({
	mixins: [Confirm],
	next() {
		this.ajax({
			url: "/job",
			dataType: "json",
			method: "POST",
			data: {
				order: this.props.data.heads.map((ele) => ele.id).reduce((pre, cur) => ((1 << (cur - 1)) + pre), 0)
			}
		});
	}
});
