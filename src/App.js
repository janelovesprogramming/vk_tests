import React, { Component } from 'react'
import {
	View,
	Panel,
	Search,
	FixedLayout,
	Div,
	Button,
	platform,
	ANDROID,
	Root,
	Radio,
	PanelHeader
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { RouteNode } from 'react-router5'
import connect from '@vkontakte/vk-connect';
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
			r:[],
			checked:false,
			val: '',
            clicked: false,
			ext: 0,
			agr: 0,
			con: 0,
			ner:0,
			open: 0

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

		this.state.allquestions = ["Мне нравится заниматься физическими упражнениями",
			"Люди считают меня отзывчивым и доброжелательным человеком",
			"Я во всем ценю чистоту и порядок",
			"Меня часто беспокоит мысль, что что-то может случится",
			"Все новое вызывает у меня интерес",
			"Если я ничем не занят, то меня это беспокоит",
			"Я стараюсь проявлять дружелюбие ко всем людям",
			"Моя комната всегда аккуратно прибрана",
			"Иногда я расстраиваюсь из-за пустяков",
			"Мне нравятся неожиданности",
			"Я не могу долго оставаться в неподвижности",
			"Я тактичен по отношения к другим людям",
			"Я методичен и пунктуален во всем",
			"Мои чувства легко уязвимы и ранимы",
			"Мне не интересно, когда ответ ясен заранее",
			"Я люблю, чтобы другие быстро выполняли мои распоряжения",
			"Я уступчивый и склонный к компромиссам человек",
			"Я проявляю настойчивость, решая трудную задачу",
			"В трудных ситуациях я весь сжимаюсь от напряжения",
			"У меня очень живое воображение",
			"Мне часто приходится быть лидером, проявлять инициативу",
			"Я всегда готов оказать помощь и разделить чужие трудности",
			"Я очень старательный во всех делах человек",
			"У меня часто выступает холодный пот и дрожат руки",
			"Мне нравится мечтать",
			"Часто случается, что я руковожу, отдаю распоряжения другим людям",
			"Я предпочитаю сотрудничать с другими, чем соперничать",
			"Я серьезно и прилежно отношусь к работе",
			"В необычной обстановке я часто нервничаю",
			"Иногда я погружаюсь в глубокие размышления",
			"Мне нравится общаться с незнакомыми людьми",
			"Большинство людей добры от природы",
			"Люди часто доверяют мне ответственные дела",
			"Иногда я чувствую себя одиноко, тоскливо и все валится из рук",
			"Я хорошо знаю, что такое красота и элегантность",
			"Мне нравится приобретать новых друзей и знакомых",
			"Люди, с которыми я общаюсь, обычно мне нравятся",
			"Я требователен и строг в работе",
			"Когда я сильно расстроен, у меня тяжело на душе",
			"Музыка способна так захватить меня, что я теряю чувство времени",
			"Я люблю находиться в больших и веселых компаниях",
			"Большинство людей честные, и им можно доверять",
			"Я обычно работаю добросовестно",
			"Я легко впадаю в депрессию",
			"Настоящее произведение искусства вызывает у меня восхищение",
			"«Болея» на спортивных соревнованиях, я забываю обо всем",
			"Я стараюсь проявлять чуткость, когда имею дело с людьми",
			"Я редко делаю необдуманно то, что хочу сделать",
			"У меня много слабостей и недостатков",
			"Я хорошо понимаю свое душевное состояние",
			"Я часто игнорирую сигналы, предупреждающие об опасности",
			"Радость других я разделяю как собственную",
			"Я обычно контролирую свои чувства и желания",
			"Если я терплю неудачу, то обычно обвиняю себя",
			"Я верю, что чувства делают мою жизнь содержательнее",
			"Мне нравятся карнавальные шествия и демонстрации",
			"Я стараюсь поставить себя на место другого человека, чтобы его понять",
			"В магазине я обычно долго выбираю то, что надумал купить",
			"Иногда я чувствую себя жалким человеком",
			"Я легко «вживаюсь» в переживания вымышленного героя",
			"Я чувствую себя счастливым, когда на меня обращают внимание",
			"В каждом человеке есть нечто, за что его можно уважать",
			"Обычно я хорошо думаю, прежде чем действую",
			"Часто у меня бывают взлеты и падения настроения",
			"Иногда я чувствую себя фокусником, подшучивающим над людьми",
			"Я привлекателен для лиц противоположного пола",
			"Я всегда стараюсь быть добрым и внимательным с каждым человеком",
			"Перед путешествием я намечаю точный план",
			"Мое настроение легко меняется на противоположное",
			"Я думаю, что жизнь – это азартная игра",
			"Мне нравится выглядеть вызывающе",
			"Некоторые говорят, что я снисходителен к окружающим",
			"Я точно и методично выполняю свою работу",
			"Иногда я бываю настолько взволнован, что даже плачу",
			"Иногда я чувствую, что могу открыть в себе нечто новое"
		];


		this.setState({
			question: this.state.allquestions[0],

		});
	}




	getResults() {
		const answersCount = this.state.answersCount;
		const answersCountKeys = Object.keys(answersCount);
		const answersCountValues = answersCountKeys.map(key => answersCount[key]);
		const maxAnswerCount = Math.max.apply(null, answersCountValues);

		for (let i = 0; i < this.state.r.length; i++) {
			if(i == 0 || i == 5|| i==10 || i==15 || i==20 || i==25 || i==30||i==35||i==40 || i==45 || i==50 || i==55 || i==60 || i==65 || i==70) {
				this.state.ext += Number(this.state.r[i]);
			}
			else if(i == 1 || i == 6|| i==11 || i==16 || i==21 || i==26 || i==31||i==36||i==41 || i==46 || i==51 || i==56 || i==61 || i==66 || i==71) {
				this.state.agr += Number(this.state.r[i]);
			}
			else if(i == 2 || i == 7|| i==12 || i==17 || i==22 || i==27 || i==32||i==37||i==42 || i==47 || i==52 || i==57 || i==62 || i==67|| i==72) {
				this.state.con += Number(this.state.r[i]);
			}
			else if(i == 3 || i == 8|| i==13 || i==18 || i==23 || i==28 || i==33||i==38||i==43 || i==48 || i==53 || i==58 || i==63 || i==68|| i==73) {
				this.state.ner += Number(this.state.r[i]);
			}
			else if(i == 4 || i == 9|| i==14 || i==19 || i==24 || i==29 || i==34||i==39||i==44 || i==49 || i==54 || i==59 || i==64 || i==69|| i==74) {
				this.state.open += Number(this.state.r[i]);
			}



		}
		alert(this.state.ext)

		connect.subscribe((e) => console.log(e));

		connect.send("VKWebAppInit", {});

		if (connect.supports("VKWebAppResizeWindow")) {
			connect.send("VKWebAppResizeWindow", {"width": 800, "height": 1000});
		}

		alert(connect.send("VKWebAppGetUserInfo", {}));

		const firebase = require("firebase");


		require("firebase/firestore");

		var config = {
			apiKey: "AIzaSyBDhnNJsSVzBM0NHjpsDBVssdW7282FMys",
			authDomain: "jannneee-github-io-446aa.firebaseapp.com",
			databaseURL: "https://jannneee-github-io-446aa.firebaseio.com",
			projectId: "jannneee-github-io-446aa",
			storageBucket: "jannneee-github-io-446aa.appspot.com",
			messagingSenderId: "124736021555",
			appId: "1:124736021555:web:dd34a597e4058db36def46",
			measurementId: "G-ZZ3P9VFGZY"
		};

		firebase.initializeApp(config);
		const db = firebase.firestore();
		db.settings({ timestampsInSnapshots: true });

		db.collection('tests').add({
			id_user: 2,
			ext: this.state.ext,
			agr: this.state.agr,
			con: this.state.con,
			ner: this.state.ner,
			open: this.state.open
		});

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
			<Panel id='task'>
				<div>
			<Quiz
				answer={this.state.answer}
				answerOptions={this.state.answerOptions}
				questionId={this.state.questionId}
				question={this.state.question}
				questionTotal={this.state.allquestions.length}
				onAnswerSelected={this.handleAnswerSelected}

			/>
				</div>
				<div>
					<p>
						<Radio name="radio" value="5" checked = {this.state.val === "5"} onChange={this.handleAnswerSelected}>Полностью согласен</Radio>
						<Radio name="radio" value="4" checked = {this.state.val === "4"} onChange={this.handleAnswerSelected}>Согласен</Radio>
						<Radio name="radio" value="3" checked = {this.state.val === "3"} onChange={this.handleAnswerSelected}>Не уверен</Radio>
						<Radio name="radio" value="2" checked = {this.state.val === "2"} onChange={this.handleAnswerSelected}>Не согласен</Radio>
						<Radio name="radio" value="1" checked = {this.state.val === "1"} onChange={this.handleAnswerSelected}>Поолностью не согласен</Radio>
					</p>
				</div>
			</Panel>


		);
	}

	renderResult() {
		const data = [
			{
				name: 'Экстраверсия', count: this.state.ext,
			},
			{
				name: 'Доброжелательность',  count: this.state.agr,
			},
			{
				name: 'Добросовестность',  count: this.state.con,
			},
			{
				name: 'Нейротизм', count: this.state.ner,
			},
			{
				name: 'Открытость опыту', count: this.state.open,
			},
		];
		return (
			<div>
				<PanelHeader>
					Тесты
				</PanelHeader>
				<ComposedChart
					layout="vertical"
					width={400}
					height={300}
					data={data}
					margin={{
						top: 40, right: 40, bottom: 40, left:80,
					}}
					fontSize={12}
				>
					<CartesianGrid stroke="#f5f5f5" />
					<XAxis type="number" />
					<YAxis dataKey="name" type="category" />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" barSize={25} fill="#4169E1"/>
				</ComposedChart>
			</div>

			);
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
			answer: '',
		});

		let ele = document.getElementsByName("radio");
		for(let i=0;i<ele.length;i++)
			ele[i].checked = false;

	}
	handleAnswerSelected(e) {
		this.setUserAnswer(e.currentTarget.value);

		this.setState({
			r: this.state.r.concat(e.currentTarget.value),
			checked: true,
			val: e.target.value
		});


		if (this.state.questionId < this.state.allquestions.length) {
			setTimeout(() => this.setNextQuestion(), 300);
		} else {
			setTimeout(() => this.setResults(this.getResults()), 300);
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
