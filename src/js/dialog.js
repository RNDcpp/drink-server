module.exports = {
	locale: null,
	before: null,
	setLocale(data) {
		this.locale = data;
	},
	setBefore(data) {
		this.before = data;
	},
	get init() {
		return {
			type: "list",
			q: this.locale.question.which.do,
			a: [
				{
					op: "select_head",
					q: this.locale.question.which.drink.order,
					mode: "multi",
					next: {
						op: "confirm",
						mode: "add-job",
						q: this.locale.question.is.order_this,
						next: {
							op: "alert",
							next: {
								op: 'init'
							}
						},
						cancel: {
							op: "init"
						},
						msg: {
							success: this.locale.message.success.job.order,
							fail: this.locale.message.fail.job.order
						}
					},
					cancel: {
						op: "init"
					},
					text: this.locale.choice.drink.order
				},
				{
					op: "job",
					text: this.locale.choice.see_jobs
				},
				{
					op: "setting",
					text: this.locale.choice.settings
				}
			]
		}
	},
	get setting() {
		return {
			type: "list",
			q: this.locale.question.which.setting,
			a: [
				{
					op: "add_head",
					text: this.locale.choice.drink.add
				},
				{
					op: "select_head",
					q: this.locale.question.which.drink.edit,
					mode: "single",
					next: {
						op: "edit_head"
					},
					cancel: {
						op: "setting"
					},
					text: this.locale.choice.drink.edit
				},
				{
					op: "select_head",
					q: this.locale.question.which.drink.delete,
					mode: "single",
					next: {
						op: "confirm",
						q: this.locale.question.is.delete_this,
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
							success: this.locale.message.success.drink.delete,
							fail: this.locale.message.fail.drink.delete
						}
					},
					cancel: {
						op: "setting"
					},
					text: this.locale.choice.drink.delete
				},
				{
					op: "init",
					text: this.locale.choice.cancel
				}
			]
		};
	},
	get job() {
		return {
			type: "job-list",
			q: this.locale.question.which.job.see,
			a: {
				next: {
					op: "confirm",
					mode: "delete-job",
					q: this.locale.question.which.job.delete,
					next: {
						op: "alert",
						next: {
							op: 'job'
						}
					},
					cancel: {
						op: "job"
					},
					msg: {
						success: this.locale.message.success.job.delete,
						fail: this.locale.message.fail.job.delete
					}
				},
				cancel: {
					op: "init"
				}
			}
		};
	},
	get add_head() {
		return {
			type: "drink-form",
			q: this.locale.question.please.edit_drink_info,
			a: {
				next: {
					op: "alert",
					q: this.locale.message.success.drink.add,
					next: {
						op: 'init'
					}
				},
				msg: {
					retry: this.locale.message.fail.transmission
				}
			}
		};
	},
	get edit_head() {
		return {
			type: "drink-form",
			a: Object.assign({
				next: {
					op: "alert",
					q: this.locale.message.success.drink.edit,
					next: {
						op: 'init'
					}
				},
				msg: {
					retry: this.locale.message.fail.transmission
				}
			}, this.before),
			q: this.locale.question.please.edit_drink_info
		};
	},
	get select_head() {
		return {
			type: "head-list",
			q: this.before.q,
			a: Object.assign({
				msg: {
					single_select_error: this.locale.message.fail.select.single,
					multi_select_error: this.locale.message.fail.select.multi,
					retry: this.locale.message.fail.get_data
				}
			}, this.before)
		};
	},
	get alert() {
		return {
			type: "alert",
			q: this.before.q,
			a: Object.assign({}, this.before, this.before.next)
		};
	},
	get confirm() {
		return {
			type: `${this.before.mode}-confirm`,
			q: this.before.q,
			a: this.before
		};
	}
};
