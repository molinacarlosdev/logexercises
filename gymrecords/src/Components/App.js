import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts';
import Records from './Records';
import { muscles, exercises } from '../store.js';

export default class extends Component {
	state = {
		exercises,
		exercise: {},
	};

	getExercisesByCategory () {
		const initialCategories = muscles.reduce(
			(exercises, categories) => ({
				...exercises,
				[categories]: [],
			}),
			{}
		);

		console.log(muscles, initialCategories);

		return Object.entries(
			this.state.exercises.reduce((cat_group, excercise) => {
				const { muscles } = excercise;
				cat_group[muscles] = [ ...cat_group[muscles], excercise ];
				return cat_group;
			}, initialCategories)
		);
	}

	handleCategorySelected = (category) => {
		this.setState({
			category,
		});
	};
	handleExerciseSelected = (id) => {
		this.setState(({ exercises }) => ({
			exercise: exercises.find((ex) => ex.id === id),
		}));
	};

	handleExerciseCreate = (exercise) => {
		this.setState(({ exercises }) => ({
			exercises: [ ...exercises, exercise ],
		}));
	};

	handleExerciseDelete = (id) => {
		console.log(id);
		this.setState(({ exercises }) => ({
			exercises: exercises.filter((ex) => ex.id !== id),
		}));
	};

	render () {
		const exercises_by_cat = this.getExercisesByCategory(),
			{ category, exercise } = this.state;

		return (
			<Fragment>
				<Header muscles={muscles} onExerciseCreate={this.handleExerciseCreate} />
				<Records
					exercises_in_group={exercises_by_cat}
					exercise={exercise}
					category={category}
					onSelect={this.handleExerciseSelected}
					onDelete={this.handleExerciseDelete}
				/>
				<Footer category={category} muscles={muscles} onSelect={this.handleCategorySelected} />
			</Fragment>
		);
	}
}
