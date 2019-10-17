import React, { Component } from 'react'
import { View, Panel, Search, FixedLayout, Div, Button, platform, ANDROID, Root, Radio} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

import { RouteNode } from 'react-router5'


import Quiz from './components/Quiz';
import Result from './components/Result';
import AnswerTest from "./components/AnswersTest";


class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks : [ 
				{	
					id : 1,
					name : 'Big Five',
					text : 'Определение типа личности'
				},

			],
			currentTaskId : null,
			search : '',
			counter: 0,
			questionId: 1,
			question: '',
			answerOptions: [],
			answer: '',
			answersCount: {},
			result: '',
			allquestions: [],
			r:'',
		}
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	onChangeSearch = (search) => { 
		this.setState({ search })
	}
	
	addTask = (task) => {
		task.id = this.state.tasks.length + 1
		this.setState({
			tasks : [...this.state.tasks, task]
		})
	}



	setCurrentTaskId = (currentTaskId) => this.setState({ currentTaskId })

	editTask = (newTask) => {
		let newTasks = this.state.tasks.map((task) => {
			if (task.id === newTask.id) {
				task = newTask
			}
			return task
		})
		this.setState({
			tasks : newTasks
		})
	}

	get tasks () {
		const search = this.state.search.toLowerCase()
		return this.state.tasks.filter((task) => 
			task.name.toLowerCase().indexOf(search) > -1 || 
			task.text.toLowerCase().indexOf(search) > -1)
	}

	get task () {
		const id = Number(this.props.route.params.id) || this.state.currentTaskId
		return this.state.tasks.filter((task) =>
			task.id === id
		)
	}


	componentDidMount() {
		//const shuffledAnswerOptions = quizQuestions.map(this.shuffleArray(quizQuestions.answers)
		//);
		 this.state.allquestions = ["Я очень сильно беспокоюсь",
			"Which console would you prefer to play with friends?",
			"Which of these racing franchises would you prefer to play a game from?",
			"Which of these games do you think is best?",
			"What console would you prefer to own?"];

		this.setState({
			question: this.state.allquestions[0],
		});
	}

	shuffleArray(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}






	getResults() {
		const answersCount = this.state.answersCount;
		const answersCountKeys = Object.keys(answersCount);
		const answersCountValues = answersCountKeys.map(key => answersCount[key]);
		const maxAnswerCount = Math.max.apply(null, answersCountValues);

		return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
	}

	setResults(result) {
		if (result.length === 1) {
			this.setState({ result: result[0] });
		} else {
			this.setState({ result: 'Undetermined' });
		}
	}



	renderQuiz() {
		return (
			<Quiz
				answer={this.state.answer}
				answerOptions={this.state.answerOptions}
				questionId={this.state.questionId}
				question={this.state.question}
				questionTotal={this.state.allquestions.length}
				onAnswerSelected={this.handleAnswerSelected}
			/>
		);
	}

	renderResult() {
		return <Result quizResult={this.state.result} />;
	}

	setUserAnswer(answer) {
		this.setState((state, props) => ({
			answersCount: {
				...state.answersCount,
				[answer]: (state.answersCount[answer] || 0) + 1
			},
			answer: answer
		}));
	}


	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
			counter: counter,
			questionId: questionId,
			question: this.state.allquestions[counter],
			answer: ''
		});
	}
	handleAnswerSelected(e) {
		this.setUserAnswer(e.currentTarget.value);
		alert(e.currentTarget.value)
		if (this.state.questionId < this.state.allquestions.length) {
			setTimeout(() => this.setNextQuestion(), 300);
		} else {
			setTimeout(() => this.setResults(this.getResults()), 300);
		}
	}

	updateCategory = (e) => {
		if(e.target.checked) {
			this.state.r = e.target.value
			alert(this.state.r)
		}

	}

	render() {
		let {
			route,
			router
		} = this.props

		const osname = platform()
		const activeView = (route.name === 'add') ? 'addView' : 'tasksView'
		const activePanel = route.name

		return (
			<Root activeView={activeView}>
				<View activePanel={activePanel} id='tasksView'>
					<Panel id='tasks'>
						<FixedLayout vertical='top'>
							<Search value={this.state.search} onChange={this.onChangeSearch}/>
						</FixedLayout>
						<Tasks
							router={router}
							tasks={this.tasks}

							setCurrentTaskId={this.setCurrentTaskId}

						/>

					</Panel>

					<Panel id='task'>
						<div>
							{this.state.result ? this.renderResult() : this.renderQuiz()}
							<div>

								<p>
									<Radio name="radio" value="1" defaultChecked onChange={this.handleAnswerSelected}>First</Radio>
									<Radio name="radio" value="2" onChange={this.handleAnswerSelected}>Second</Radio>
									<Radio name="radio" value="3" onChange={this.handleAnswerSelected}>Third (disabled)</Radio>
								</p>

							</div>
						</div>
					</Panel>

					<Panel id="edit" theme="white">
						<EditTask 
							router={router}
							task={this.task[0]}
							editTask={this.editTask}
						/>
					</Panel>
				</View>
				<View activePanel={activePanel} id='addView'>
					<Panel id='add' theme="white">
							<AddTask 
								router={router}
								addTask={this.addTask}
							/>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default (props) => (
    <RouteNode nodeName="">
        {({ route }) => <App route={route} {...props}/>}
    </RouteNode>
)
