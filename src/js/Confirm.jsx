var React = require('react');
var $ = require('jquery');
var HeadList = require('./HeadList.jsx');
var Job = require('./Job.jsx');

var confirm = {
	cancel() {
		this.props.fn.nextAction(this.props.data.cancel);
	},
	render() {
		return (
			<div>
				{this.content()}
				<ul className="choice-container-col">
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.cancel}>キャンセル</li>
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.next}>OK</li>
				</ul>
			</div>
		);
	}
};

var ajax = {
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
	}
}

var heads = {
	content() {
		return (
			<HeadList heads={this.props.data.heads} />
		);
	}
}

module.exports.DeleteHeadConfirm = React.createClass({
	mixins: [confirm, ajax, heads],
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
	mixins: [confirm, ajax, heads],
	next() {
		this.ajax({
			url: "/job",
			dataType: "json",
			method: "POST",
			data: {
				order: this.props.data.heads.map((ele) => ele.port).reduce((pre, cur) => ((1 << (cur - 1)) + pre), 0)
			}
		});
	}
});

module.exports.DeleteJobConfirm = React.createClass({
	mixins: [confirm, ajax],
	content() {
		return (
			<Job data={this.props.data}/>
		);
	},
	next() {
		this.ajax({
			url: "/job",
			dataType: "json",
			method: "DELETE",
			data: {
				id: this.props.data.id
			}
		});
	}
});
