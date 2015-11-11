var React = require('react');
var {Input, Button, ButtonToolbar} = require('react-bootstrap');
var Cropper = require('react-cropper');
var $ = require('jquery');
var default_head = {
	img: '/img/noimage.png',
	name: "",
	port: ""
};

module.exports = React.createClass({
	getInitialState() {
		return {
			src: (this.props.data.head || default_head).img,
		};
	},
	_onChange(e) {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		let reader = new FileReader();
		reader.onload = () => {
			this.setState({src: reader.result});
		};
		reader.readAsDataURL(files[0]);
	},
	zoomIn() {
		this.refs.cropper.zoom(0.1);
	},
	zoomOut() {
		this.refs.cropper.zoom(-0.1);
	},
	send() {
		var option = {
			url: "/head",
			method: "POST",
			dataType: "json",
			data: {
				name: this.refs.name.getValue(),
				port: this.refs.port.getValue(),
				data: this.refs.cropper.getCroppedCanvas({width: 100, height: 100})
					.toDataURL('image/png').replace(/^.*,/, '')
			}
		}
		if ('head' in this.props.data) {
			option.method = "PUT";
			option.data.id = this.props.data.head.id;
		}
		$.ajax(option).then((data) => {
			if (data.result == "success") {
				this.props.fn.setErrors([]);
				this.props.fn.nextAction(this.props.data.next);
			} else {
				this.props.fn.setErrors(data.message);
				this.props.fn.setMessage(this.props.data.msg.retry);
			}
		}, (err) => {
			console.log(err);
			this.props.fn.setErrors(["server error"]);
			this.props.fn.setMessage(this.props.data.msg.retry);
		});
	},
	cancel() {
		this.props.fn.nextAction({op: 'init'});
	},
	render() {
		return (
			<form>
				<Input type="text" ref="name" label="名前" placeholder="名前を入力してください" defaultValue={(this.props.data.head || default_head).name} />
				<Input type="number" ref="port" label="番号" placeholder="番号を入力してください" defaultValue={(this.props.data.head || default_head).port} />
				<Input type="file" label="画像ファイル" help="画像ファイルを選択してください" onChange={this._onChange} />
				<Cropper
					aspectRatio={1}
					guides={false}
					center={false}
					autoCropArea={1}
					dragCrop={false}
					rotatable={false}
					scalable={false}
					mouseWheelZoom={false}
					wheelZoomRatio={false}
					touchDragZoom={false}
					cropBoxMovable={false}
					cropBoxResizable={false}
					doubleClickToggle={false}
					src={this.state.src}
					ref='cropper'
					crop={this._crop} />
				<ul className="choice-container-col">
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.zoomOut}>-</li>
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.zoomIn}>+</li>
				</ul>
				<ul className="choice-container-col">
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.cancel}>キャンセル</li>
					<li className="btn btn-lg btn-primary choice-col c1-2" onClick={this.sned}>送信</li>
				</ul>
			</form>
		);
	}
});
