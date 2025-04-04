import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTodos,
	addTodo,
	updateTodo,
	deleteTodo
} from './redux/actions/todosActions';
import {
	setSearchTerm,
	setSortByAlphabet
} from './redux/actions/filterActions';
import {
	setNewTodo
} from './redux/actions/newTodoActions';
import { TodoItem } from '../components/TodoItem';
import styles from './App.module.css';

export const App = () => {
	const todos = useSelector(state => state.todos);
	const loading = useSelector(state => state.loading);
	const error = useSelector(state => state.error);
	const searchTerm = useSelector(state => state.filter.searchTerm);
	const sortByAlphabet = useSelector(state => state.filter.sortByAlphabet);
	const newTodo = useSelector(state => state.newTodo);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const handleAddTodo = () => {
		if (newTodo.trim() === '') return;
		dispatch(addTodo(newTodo));
		dispatch(setNewTodo('')); // Clear the input after adding
	};

	const handleUpdateTodo = (id, newTitle) => {
		dispatch(updateTodo(id, newTitle));
	};

	const handleDeleteTodo = (id) => {
		dispatch(deleteTodo(id));
	};

	const handleSearchTermChange = (e) => {
		dispatch(setSearchTerm(e.target.value));
	};

	const handleSortByAlphabetToggle = () => {
		dispatch(setSortByAlphabet(!sortByAlphabet));
	};

	const handleNewTodoChange = (e) => {
		dispatch(setNewTodo(e.target.value));
	};

	const filteredTodos = todos.filter(todo =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedTodos = sortByAlphabet
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	if (loading) {
		return <div className={styles.loading}>Загрузка списка дел...</div>;
	}

	if (error) {
		return <div className={styles.error}>Ошибка: {error}</div>;
	}

	return (
		<div className={styles.container}>
			<h1>Todo List</h1>

			<div className={styles.addTodo}>
				<input
					type="text"
					placeholder="Добавить новое дело"
					value={newTodo}
					onChange={handleNewTodoChange}
				/>
				<button onClick={handleAddTodo}>Добавить</button>
			</div>

			<div className={styles.search}>
				<input
					type="text"
					placeholder="Поиск дела"
					value={searchTerm}
					onChange={handleSearchTermChange}
				/>
			</div>

			<div className={styles.sort}>
				<button onClick={handleSortByAlphabetToggle}>
					{sortByAlphabet ? 'Отключить сортировку' : 'Сортировка по алфавиту'}
				</button>
			</div>

			<ul className={styles.todoList}>
				{sortedTodos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onUpdate={handleUpdateTodo}
						onDelete={handleDeleteTodo}
					/>
				))}
			</ul>
		</div>
	);
};
