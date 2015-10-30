module.exports = {
	init: {
		type: "list",
		q: "何がしたい？",
		a: [
			{
				op: "select_head",
				q: "どのドリンクを注文する？",
				mode: "multi",
				next: {
					op: "confirm",
					mode: "add-job",
					q: "これを注文しますか？",
					next: {
						op: "alert",
						q: "この飲み物を注文したよ",
						next: {
							op: 'init'
						}
					},
					cancel: {
						op: "init"
					},
					msg: {
						success: "この内容で注文したよ",
						fail: "この内容での注文に失敗したよ"
					}
				},
				cancel: {
					op: "init"
				},
				text: "飲み物を注文する"
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
				mode: "single",
				next: {
					op: "edit_head"
				},
				cancel: {
					op: "setting"
				},
				text: "ドリンクの編集"
			},
			{
				op: "select_head",
				q: "どのドリンクを削除する？",
				mode: "single",
				next: {
					op: "confirm",
					q: "これを削除しますか？",
					mode: "delete-head",
					next: {
						op: "alert",
						next: {
							op: "init"
						}
					},
					cancel: {
						op: "setting"
					},
					msg: {
						success: "これを削除したよ",
						fail: "これの削除に失敗したよ"
					}
				},
				cancel: {
					op: "setting"
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
			next: {
				op: "alert",
				q: "飲み物を追加したよ",
				next: {
					op: 'init'
				}
			},
			msg: {
				retry: "送信に失敗したよ"
			}
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
				msg: {
					retry: "送信に失敗したよ"
				}
			}, data);
		},
		q: "ドリンクの情報を編集してね"
	},
	select_head: {
		type: "head-list",
		set(data) {
			this.q = data.q;
			this.a = Object.assign({
				msg: {
					single_select_error: "一つ選んでね",
					multi_select_error: "一つ以上選んでね",
					retry: "取得に失敗したよ"
				}
			}, data);
		}
	},
	alert: {
		type: "alert",
		set(data) {
			this.q = data.q;
			this.a = Object.assign({}, data, data.next);
		}
	},
	confirm: {
		set(data) {
			this.type = `${data.mode}-confirm`;
			this.q = data.q;
			this.a = data;
		}
	}
};
