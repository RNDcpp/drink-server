var $ = require('jquery');
module.exports = {
	init: {
		type: "list",
		q: "何がしたい？",
		a: [
			{
				op: "order",
				text: "飲み物を頼む"
			},
			{
				op: "job",
				text: "ジョブを見る"
			},
			{
				op: "setting",
				text: "設定"
			}
		]
	},
	order: {
		type: "list",
		ajax(data) {
			return $.ajax({
				url: "/head",
				dataType: "json",
				method: "GET"
			}).then((res) => {
				this.q = "どれにする？";
				// TODO: 未実装
//				this.a = res.map((ele) => {
//					return {
//						op:
//						ele.
//				});
				this.a = [
					{
						op: "init",
						text: "キャンセル"
					}
				];
			}, (err) => {
				console.log(err);
				this.q = "取得に失敗したよ";
				this.a = [
					{
						op: "order",
						text: "再取得"
					},
					{
						op: "init",
						text: "キャンセル"
					}
				];
			});
		}
	},
	setting: {
		type: "list",
		q: "何を設定する？",
		a: [
			{
				op: "add_head",
				text: "ドリンクの追加"
			},
			{
				op: "select_head",
				q: "どのドリンクを編集する？",
				next: {
					op: "edit_head"
				},
				text: "ドリンクの編集"
			},
			{
				op: "select_head",
				q: "どのドリンクを削除する？",
				next: {
					op: "confirm",
					q: "これを削除しますか？",
					next: {
						op: "delete_head"
					},
					cancel: {
						op: "init"
					}
				},
				text: "ドリンクの削除"
			},
			{
				op: "init",
				text: "キャンセル"
			}
		]
	},
	add_head: {
		type: "drink-form",
		q: "追加するドリンクの情報を入力してね",
		a: {
			head: {
				img: '/img/noimage.png',
				name: ""
			},
			next: {
				op: "alert",
				q: "飲み物を追加したよ",
				next: {
					op: 'init'
				}
			},
			retry_msg: "送信に失敗したよ"
		}
	},
	edit_head: {
		type: "drink-form",
		set(data){
			this.a = Object.assign({
				next: {
					op: "alert",
					q: "飲み物を編集したよ",
					next: {
						op: 'init'
					}
				},
				retry_msg: "送信に失敗したよ"
			}, data);
		},
		q: "ドリンクの情報を編集してね"
	},
	select_head: {
		type: "list",
		ajax(data) {
			return $.ajax({
				url: "/head",
				dataType: "json",
				method: "GET"
			}).then((res) => {
				this.q = data.q;
				this.a = res.map((ele) => {
					return Object.assign({
						head: {
							id: ele.id,
							name: ele.name,
							img: `img/head_icon/${ele.id}.png`
						}
					}, data.next);
				}).concat({
					op: "init",
					text: "キャンセル"
				});
			}, (err) => {
				console.log(err);
				this.q = "取得に失敗したよ";
				this.a = [
					Object.assign({}, data, {
						op: "select_head",
						text: "再取得"
					}),
					{
						op: "init",
						text: "キャンセル"
					}
				];
			});
		}
	},
	delete_head: {
		type: "list",
		ajax(data) {
			return $.ajax({
				url: "/head",
				dataType: "json",
				method: "DELETE",
				data: {
					id: data.head.id
				}
			}).then((res) => {
				if (res.result == "success") {
					this.q = `${data.head.name}を削除したよ`;
				} else {
					this.q = `${data.head.name}の削除に失敗したよ`;
				}
			}).fail((err) => {
				console.log(err);
				this.q = `${data.head.name}の削除に失敗したよ`;
			});
		},
		a: [
			{
			op: "init",
			text: "OK"
			}
		]
	},
	alert: {
		type: "list",
		set(data) {
			this.q = data.q;
			this.a = [
				Object.assign({}, data, data.next, {
					text: "OK"
				})
			];
		}
	},
	confirm: {
		type: "confirm",
		set(data) {
			this.q = data.q;
			this.a = data;
		}
	}
};
