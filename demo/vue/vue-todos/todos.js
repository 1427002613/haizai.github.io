new Vue({
	el: '#app',
	data: {
		newTodo: '',
		todos: JSON.parse( window.localStorage.getItem('vue-todos-haizai') ) || [],
		status: '全部'
	},
	//观测todos，存入
	watch: {
		todos: {
			deep: true,
			handler: function (val, oldval) {
				window.localStorage.setItem( 'vue-todos-haizai', JSON.stringify(val) )
			}
		}
	},
	computed: {
		checkedCount: function () {
			let count = 0
			this.todos.forEach( function(todo) {
				if( todo.isChecked === true ) count++
			})
			return count
		}
	},
	filters: {
		'status': function (todos, status) {
			switch (status) {
			case '全部': 
				return todos
				break;
			case '被选中':
				return todos.filter( function (todo) {
					return todo.isChecked === true
				})
				break
			case '未选中':
				return todos.filter( function(todo) {
					return todo.isChecked === false
				})
				break
			}
		}
	},
	methods:{
		createTodo: function () {
			if( this.newTodo && this.newTodo.trim() ) {
				this.todos.push({
					content: this.newTodo,
					isChecked: false,
					isMouseenter: false
				})
				this.newTodo = ''
			}
		},
		removeTodo: function (todo) {
			this.todos.$remove(todo)
		},
		showGlyphicon: function (todo) {
			todo.isMouseenter = true
		},
		hideGlyphicon: function (todo) {
			todo.isMouseenter = false			
		},
		allClick: function () {
			if( this.checkedCount !== this.todos.length ) {
				this.todos.forEach( function (todo) { todo.isChecked = true } )
			}else{
				this.todos.forEach( function (todo) { todo.isChecked = false } )				
			}
		},
		showAll: function () {
			this.status = '全部'
		},
		showClicked: function () {
			this.status = '被选中'
		},
		showUnClicked: function () {
			this.status = '未选中'			
		},
		removeClicked: function () {
			this.todos = this.todos.filter( function (todo) { return todo.isChecked === false })
		}
	}
})