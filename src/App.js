import React from "react";

import { VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryBar, VictoryLabel, VictoryGroup} from "victory";
import {
	View,
	Panel,
	Search,
	FixedLayout,
	Root,
	Radio,
	PanelHeader,
	HeaderButton,
	PanelHeaderBack,
	Button
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import VK, {Share, Post} from 'react-vk';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import {ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { RouteNode } from 'react-router5'
import connect from '@vkontakte/vk-connect';
import Quiz from './components/Quiz';
import peo from '../src/api/peo.png';
import people from '../src/api/people.png';
import extr from '../src/api/ekstravert.jpg';
import exp from '../src/api/expressiya3.jpg';
import agrt from '../src/api/inx960x640.jpg';
import sam from '../src/api/self_contr.jpg';
import notemo from '../src/api/Unknown.jpg';
import ClearCache from 'react-clear-cache';
import ScreenCapture from '../src/components/ScreenCapture'
import html2canvas from 'html2canvas';
import logo from '../src/api/Am7naMIL-zE-3.jpg';
import entr from '../src/api/entr.jpg';
import impuls from '../src/api/145470.jpg';
import emo from '../src/api/Unknown1.jpg';
import ob from '../src/api/depositphotos_43962069-stock-photo-suspicious-man.jpg';
import pr from '../src/api/0ff07ec3519ac00d48af86d150a59bc8.jpg';

const orange = { base: "#8ed1fc", highlight: "#0693e3" };

const red = { base: "#0693e3", highlight: "#0693e3" };

const innerRadius = 30;

class CompassCenter extends React.Component {

	render() {
		const { origin } = this.props;
		const circleStyle = {
			stroke: red.base, strokeWidth: 2, fill: orange.base
		};
		return (
			<g>
				<circle
					cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
				/>
			</g>
		);
	}
}

class CenterLabel extends React.Component {
	render() {
		const { datum, active, color, origin } = this.props;
		const text = [ `${datum.y}%` ];
		const baseStyle = { fill: color.highlight, textAnchor: "middle" };
		const style = [
			{ ...baseStyle, fontSize: 18, fontWeight: "bold" },
			{ ...baseStyle, fontSize: 18}
		];

		return active ?
			(
				<VictoryLabel
					text={text} style={style} x={205} y={150} renderInPortal
				/>
			) : null;
	}
}


class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks: [
				{
					id: 1,
					name: 'Тест по Большой пятерке (10 вопросов)',
					text: 'Большая пятерка – психологическая модель, описывающая структуру личности человека посредством пяти черт:  «нейротизм», «экстраверсия», «открытость опыту», «доброжелательность», «добросовестность».',
					image_back: people

				},
				{
					id: 2,
					name: 'Тест по Большой пятерке (75 вопросов)',
					text: 'Большая пятрека – психологическая модель, описывающая структуру личности человека посредством пяти черт: «нейротизм», «экстраверсия», «открытость опыту», «доброжелательность», «добросовестность».',
					image_back: peo
				}

			],
			currentTaskId: null,
			search: '',
			counter: 0,
			questionId: 1,
			question: '',
			answerOptions: [],
			answer: '',
			answersCount: {},
			result: '',
			allquestions: [],
			allquestions_long_test: [],
			r: [],
			checked: false,
			val: '',
			clicked: false,
			ext: 0,
			agr: 0,
			con: 0,
			ner: 0,
			open: 0,
			id_user: '',
			cur: 0,
			big5mas: [],
			flag: false,


		}




		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

	}

	onChangeSearch = (search) => {
		this.setState({search})
	}

	addTask = (task) => {
		task.id = this.state.tasks.length + 1
		this.setState({
			tasks: [...this.state.tasks, task]
		})
	}


	setCurrentTaskId = (currentTaskId) => this.setState({currentTaskId})

	editTask = (newTask) => {
		let newTasks = this.state.tasks.map((task) => {
			if (task.id === newTask.id) {
				task = newTask
			}
			return task
		})
		this.setState({
			tasks: newTasks
		})
	}


	get tasks() {

		const search = this.state.search.toLowerCase()
		return this.state.tasks.filter((task) =>
			task.name.toLowerCase().indexOf(search) > -1 ||
			task.text.toLowerCase().indexOf(search) > -1)
	}

	get task() {
		const id = Number(this.props.route.params.id) || this.state.currentTaskId
		return this.state.tasks.filter((task) =>
			task.id === id
		)

	}


	componentDidMount() {

		this.state.allquestions = ["Я хорошо справляюсь со стрессом, всегда спокоен и расслаблен",
			"Я склонен искать в других людях недостатки",
			"Я склонен быть ленивым ",
			"У меня мало художественных интересов",
			"Я общительный человек",
			"У меня развитое воображение",
			"Я часто нахожусь в стрессовом состоянии",
			"Я скрытный человек",
			"Я серьезно выполняю данную мне работу",
			"Я считаю, что я человек, которому доверяют другие люди"
		];

		this.state.allquestions_long_test = [
			"Мне нравится заниматься физкультурой",
			"Люди считают меня отзывчивым и доброжелательным человеком",
			"Я во всем ценю чистоту и порядок",
			"Меня часто беспокоит мысль, что что-нибудь может случиться",
			"Все новое вызывает у меня интерес",
			"Если я ничем не занят, то это меня беспокоит",
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
		]
		if (this.state.currentTaskId === 1) {
			this.setState({
				question: this.state.allquestions[0],

			});
		} else {
			this.setState({
				question: this.state.allquestions_long_test[0],

			});
		}

	}


	getResults() {
		const answersCount = this.state.answersCount;
		const answersCountKeys = Object.keys(answersCount);
		const answersCountValues = answersCountKeys.map(key => answersCount[key]);
		const maxAnswerCount = Math.max.apply(null, answersCountValues);

		for (let i = 0; i < this.state.r.length; i++) {
			if (i === 0 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25 || i === 30 || i === 35 || i === 40 || i === 45 || i === 50 || i === 55 || i === 60 || i === 65 || i === 70) {
				this.state.ext += Number(this.state.r[i]);
			} else if (i === 1 || i === 6 || i === 11 || i === 16 || i === 21 || i === 26 || i === 31 || i === 36 || i === 41 || i === 46 || i === 51 || i === 56 || i === 61 || i === 66 || i === 71) {
				this.state.agr += Number(this.state.r[i]);
			} else if (i === 2 || i === 7 || i === 12 || i === 17 || i === 22 || i === 27 || i === 32 || i === 37 || i === 42 || i === 47 || i === 52 || i === 57 || i === 62 || i === 67 || i === 72) {
				this.state.con += Number(this.state.r[i]);
			} else if (i === 3 || i === 8 || i === 13 || i === 18 || i === 23 || i === 28 || i === 33 || i === 38 || i === 43 || i === 48 || i === 53 || i === 58 || i === 63 || i === 68 || i === 73) {
				this.state.ner += Number(this.state.r[i]);
			} else if (i === 4 || i === 9 || i === 14 || i === 19 || i === 24 || i === 29 || i === 34 || i === 39 || i === 44 || i === 49 || i === 54 || i === 59 || i === 64 || i === 69 || i === 74) {
				this.state.open += Number(this.state.r[i]);
			}


		}

		connect.subscribe((e) => console.log(e));

		connect.send("VKWebAppInit", {});

		if (connect.supports("VKWebAppResizeWindow")) {
			connect.send("VKWebAppResizeWindow", {"width": 800, "height": 1000});
		}


		connect.sendPromise('VKWebAppGetUserInfo')
			.then(data => {
				const us = data.id;
				console.log(data.id);
				this.setState({id_user: us});

			})
			.catch(error => {
			});

		return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);

	}

	setResults(result) {

		if (result.length === 1) {
			this.setState({result: result[0]});
		} else {
			this.setState({result: 'Undetermined'});
		}

	}


	renderQuiz() {
		const divStyle = {
			backgroundColor: "#FFFFFF",
			minHeight: "200px",
			boxSizing: "border-box"
		}

		if (this.state.currentTaskId === 1) {
			return (


				<Panel id='task'>
					<div style={divStyle}>
						<Quiz
							answer={this.state.answer}
							answerOptions={this.state.answerOptions}
							questionId={this.state.questionId}
							question={this.state.question}
							questionTotal={this.state.allquestions.length}
							onAnswerSelected={this.handleAnswerSelected}

						/>

						<p>
							<Radio name="radio" value="5" checked={this.state.val === "5"}
								   onChange={this.handleAnswerSelected}>Полностью согласен</Radio>
							<Radio name="radio" value="4" checked={this.state.val === "4"}
								   onChange={this.handleAnswerSelected}>Согласен</Radio>
							<Radio name="radio" value="3" checked={this.state.val === "3"}
								   onChange={this.handleAnswerSelected}>Не уверен</Radio>
							<Radio name="radio" value="2" checked={this.state.val === "2"}
								   onChange={this.handleAnswerSelected}>Не согласен</Radio>
							<Radio name="radio" value="1" checked={this.state.val === "1"}
								   onChange={this.handleAnswerSelected}>Полностью не согласен</Radio>
						</p>
					</div>
				</Panel>



			);
		} else {
			return (
				<Panel id='task'>
					<div style={divStyle}>
						<Quiz
							answer={this.state.answer}
							answerOptions={this.state.answerOptions}
							questionId={this.state.questionId}
							question={this.state.question}
							questionTotal={this.state.allquestions_long_test.length}
							onAnswerSelected={this.handleAnswerSelected}

						/>

						<p>
							<Radio name="radio" value="5" checked={this.state.val === "5"}
								   onChange={this.handleAnswerSelected}>Полностью согласен</Radio>
							<Radio name="radio" value="4" checked={this.state.val === "4"}
								   onChange={this.handleAnswerSelected}>Согласен</Radio>
							<Radio name="radio" value="3" checked={this.state.val === "3"}
								   onChange={this.handleAnswerSelected}>Не уверен</Radio>
							<Radio name="radio" value="2" checked={this.state.val === "2"}
								   onChange={this.handleAnswerSelected}>Не согласен</Radio>
							<Radio name="radio" value="1" checked={this.state.val === "1"}
								   onChange={this.handleAnswerSelected}>Полностью не согласен</Radio>
						</p>
					</div>
				</Panel>


			);
		}

	}

	renderResult() {
		if (this.state.id_user !== '') {

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

			if(!this.state.flag) {
				firebase.initializeApp(config);
				this.state.flag = true;
			}
			const db = firebase.firestore();


			db.clearPersistence().catch(error => {
				console.error('Could not enable persistence:', error.code);
			});

			if (this.state.currentTaskId === 1) {
					db.collection('tests').add({
					id_user: this.state.id_user,
					q1: this.state.r[0],
					q2: this.state.r[1],
					q3: this.state.r[2],
					q4: this.state.r[3],
					q5: this.state.r[4],
					q6: this.state.r[5],
					q7: this.state.r[6],
					q8: this.state.r[7],
					q9: this.state.r[8],
					q10: this.state.r[9],
				});
			} else {
					db.collection('longtest').add({
					id_user: this.state.id_user,
					q1: this.state.r[0],
					q2: this.state.r[1],
					q3: this.state.r[2],
					q4: this.state.r[3],
					q5: this.state.r[4],
					q6: this.state.r[5],
					q7: this.state.r[6],
					q8: this.state.r[7],
					q9: this.state.r[8],
					q10: this.state.r[9],
					q11: this.state.r[10],
					q12: this.state.r[11],
					q13: this.state.r[12],
					q14: this.state.r[13],
					q15: this.state.r[14],
					q16: this.state.r[15],
					q17: this.state.r[16],
					q18: this.state.r[17],
					q19: this.state.r[18],
					q20: this.state.r[19],
					q21: this.state.r[20],
					q22: this.state.r[21],
					q23: this.state.r[22],
					q24: this.state.r[23],
					q25: this.state.r[24],
					q26: this.state.r[25],
					q27: this.state.r[26],
					q28: this.state.r[27],
					q29: this.state.r[28],
					q30: this.state.r[29],
					q31: this.state.r[30],
					q32: this.state.r[31],
					q33: this.state.r[32],
					q34: this.state.r[33],
					q35: this.state.r[34],
					q36: this.state.r[35],
					q37: this.state.r[36],
					q38: this.state.r[37],
					q39: this.state.r[38],
					q40: this.state.r[39],
					q41: this.state.r[40],
					q42: this.state.r[41],
					q43: this.state.r[42],
					q44: this.state.r[43],
					q45: this.state.r[44],
					q46: this.state.r[45],
					q47: this.state.r[46],
					q48: this.state.r[47],
					q49: this.state.r[48],
					q50: this.state.r[49],
					q51: this.state.r[50],
					q52: this.state.r[51],
					q53: this.state.r[52],
					q54: this.state.r[53],
					q55: this.state.r[54],
					q56: this.state.r[55],
					q57: this.state.r[56],
					q58: this.state.r[57],
					q59: this.state.r[58],
					q60: this.state.r[59],
					q61: this.state.r[60],
					q62: this.state.r[61],
					q63: this.state.r[62],
					q64: this.state.r[63],
					q65: this.state.r[64],
					q66: this.state.r[65],
					q67: this.state.r[66],
					q68: this.state.r[67],
					q69: this.state.r[68],
					q70: this.state.r[69],
					q71: this.state.r[70],
					q72: this.state.r[71],
					q73: this.state.r[72],
					q74: this.state.r[73],
					q75: this.state.r[74],
				});
			}
		}
			const data = [
				{
					name: 'Экстраверсия', count: this.state.ext,
				},
				{
					name: 'Доброжелательность', count: this.state.agr,
				},
				{
					name: 'Добросовестность', count: this.state.con,
				},
				{
					name: 'Нейротизм', count: this.state.ner,
				},
				{
					name: 'Открытость опыту', count: this.state.open,
				},
			];
			const {datum, active, color} = this.props;
			const text = ["data.name", "data.count"];
			const baseStyle = {fill: red.highlight, textAnchor: "middle"};
			const style = [
				{...baseStyle, fontSize: 10, fontWeight: "bold"},
				{...baseStyle, fontSize: 10}
			];
			const divStyle = {
				margin: 3
			}
			const h2Style = {
				margin: 10
			}
			let {
				router,
			} = this.props

			return (
				<div>

					<PanelHeader

						left={<PanelHeaderBack onClick={() => router.navigate('tasks') && this.setState({
							tasks: [
								{
									id: 1,
									name: 'Тест по Большой пятерке (10 вопросов)',
									text: 'Большая пятерка – психологическая модель, описывающая структуру личности человека посредством пяти черт:  «нейротизм», «экстраверсия», «открытость опыту», «доброжелательность», «добросовестность».',
									image_back: people

								},
								{
									id: 2,
									name: 'Тест по Большой пятерке (75 вопросов)',
									text: 'Большая пятрека – психологическая модель, описывающая структуру личности человека посредством пяти черт: «нейротизм», «экстраверсия», «открытость опыту», «доброжелательность», «добросовестность».',
									image_back: peo
								}

							],
							search: '',
							counter: 0,
							questionId: 1,
							question: '',
							answerOptions: [],
							answer: '',
							answersCount: {},
							result: '',
							currentTaskId: null,
							r: [],
							checked: false,
							val: '',
							clicked: false,
							ext: 0,
							agr: 0,
							con: 0,
							ner: 0,
							open: 0,
							cur: 0,
							big5mas: [],

						})}/>}>
						Тесты

					</PanelHeader>
					<h2 align="center">Ваш психологический профиль</h2>
					<VictoryChart polar
								  name = "capture"
								  animate={{duration: 500, onLoad: {duration: 500}}}
								  theme={VictoryTheme.material}
								  width={400}
								  height={300}
								  innerRadius={innerRadius}
								  domainPadding={{y: 10}}
								  events={[{
									  childName: "all",
									  target: "data",
									  eventHandlers: {
										  onMouseOver: () => {
											  return [
												  {target: "labels", mutation: () => ({active: true})},
												  {target: "data", mutation: () => ({active: true})}
											  ];
										  },
										  onMouseOut: () => {
											  return [
												  {target: "labels", mutation: () => ({active: false})},
												  {target: "data", mutation: () => ({active: false})}
											  ];
										  }
									  }
								  }]}
					>
						{
							["Экстраверсия", "Доброжелательность", "Добросовестность", "Нейротизм", "Открытость опыту"].map((d, i) => {
								return (
									<VictoryPolarAxis dependentAxis
													  key={i}
													  label={d}
													  labelPlacement="perpendicular"
													  style={{tickLabels: {fill: "none"}, fontSize: 10}}
													  axisValue={d}
									/>
								);
							})
						}

						<VictoryBar
							data={[
								{
									x: "Экстраверсия",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.ext * 100) / 10, 2) : Math.round((this.state.ext * 100) / 75, 2),
									fill: "#2196f3"
								},
								{
									x: "Доброжелательность",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.agr * 100) / 10, 2) : Math.round((this.state.agr * 100) / 75, 2),
									fill: "#03a9f4"
								},
								{
									x: "Добросовестность",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.con * 100) / 10, 2) : Math.round((this.state.con * 100) / 75, 2),
									fill: "#00bcd4"
								},
								{
									x: "Нейротизм",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.ner * 100) / 10, 2) : Math.round((this.state.ner * 100) / 75, 2),
									fill: "#009688"
								},
								{
									x: "Открытость опыту",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.open * 100) / 10, 2) : Math.round((this.state.open * 100) / 75, 2),
									fill: "#4caf50"
								}
							]}
							style={{
								data: {
									fill: ({active, datum}) => active ? orange.highlight : datum.fill,
									width: 25,
									fontSize: 10
								}
							}}
							labels={() => ""}
							labelComponent={<CenterLabel color={red}/>}
						/>


						<CompassCenter/>
					</VictoryChart>

					<div>
						{this.renderSwitch(0)}
						{this.renderSwitch(1)}
						{this.renderSwitch(2)}
						{this.renderSwitch(3)}
						{this.renderSwitch(4)}
					</div>
					<div style={h2Style}>
						<VK>
							<Share shareOptions={{
								url: 'https://vk.com/app7165780_142799641',
								title: 'VK Tests',
								image: {logo},
							}} buttonOptions={{type: 'round',
								text: 'Рассказать друзьям'}}
							/>
						</VK>
					</div>
				</div>

			)
		}

	screen()
	{


	}
	renderSwitch(k) {
		const divStyle = {
			margin: 3
		}

		this.state.big5mas = [this.state.ext, this.state.agr, this.state.con, this.state.ner, this.state.open];

		if (this.state.currentTaskId === 2) {

			if (this.state.big5mas[k] >= 51) {
				switch (k) {
					case 0:
						return (
							<div>
								<h2>Экстраверсия {Math.round((this.state.ext*100)/75,2)}%</h2>
								<p align="center">
									<img src={extr} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Высокие значения по фактору определяют направленность психики человека на экстраверсию.
									Типичные экстраверты отличаются общительностью, любят развлечения и коллективные мероприятия, имеют большой круг друзей и знакомых, ощущают потребность общения с людьми, с которыми можно поговорить и приятно провести время, стремятся к праздности и развлечениям, не любят себя утруждать работой или учебой, тяготеют к острым, возбуждающим впечатлениям, часто рискуют, действуют импульсивно, необдуманно, по первому побуждению.
								</div>
								<div style={divStyle}>
									<b>Характерные черты:</b> общительность, поиск впечатлений, доминирование, активность
									и любовь к всеобщему вниманию.
								</div>
							</div>
						);

					case 1:
						return (
							<div><h2>Привязанность {Math.round((this.state.agr*100)/75,2)}%</h2>
								<p align="center">
									<img src={agrt} width={400} height={300}/>
								</p>
							<div style={divStyle}>
								Высокие значения по данному фактору определяют позитивное отношение человека к людям.
								Такие лица испытывают потребность быть рядом с другими людьми. Как правило, это добрые, отзывчивые люди, они хорошо понимают других людей, чувствуют личную ответственность за их благополучие, терпимо относятся к недостаткам других людей.
								Умеют сопереживать, поддерживают коллективные мероприятия и чувствуют ответственность за общее дело, добросовестно и ответственно выполняют взятые на себя поручения.
							</div>
								<div style={divStyle}>
								<b>Характерологические признаки личности:</b> теплота, доверчивость, привязанность, склонность к сотрудничеству, способность завоевывать уважение людей.
							</div>
						</div>
						);
					case 2:
						return (
							<div>
								<h2>Самоконтроль {Math.round((this.state.con*100)/75,2)}%</h2>
								<p align="center">
									<img src={sam} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Главным содержанием этого фактора является волевая регуляция поведения.
									На полюсе высоких значений находится такие черты личности, как добросовестность, ответственность, обязательность, точность и аккуратность в делах
									Такие люди любят порядок и комфорт, они настойчивы в деятельности и обычно достигают в ней высоких результатов. Они придерживаются моральных принципов, не нарушают общепринятых норм поведения в обществе и соблюдают их даже тогда, когда нормы и правила кажутся пустой формальностью
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> аккуратность, ответственность, настойчивость и предусмотрительность.
								</div>
							</div>
						);
					case 3:
						return (
							<div>
								<h2>Эмоциональная неустойчивость {Math.round((this.state.ner*100)/75,2)}%</h2>
								<p align="center">
									<img src={notemo} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Высокие значения по этому фактору характеризуют лиц, неспособных контролировать свои эмоции и импульсивные влечения. В поведении это проявляется как отсутствие чувства ответственности, уклонение от реальности, капризность.
									Такие люди чувствуют себя беспомощными, неспособными справиться с жизненными трудностями. Их поведение во многом обусловлено ситуацией.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> тревожность, напряженность, эмоциональная лабильность (неустойчивость), склонность к самокритике и депрессиям.
								</div>
							</div>
						);
					case 4:
						return (
							<div>
								<h2>Экспрессивность {Math.round((this.state.open*100)/75,2)}%</h2>
								<p align="center">
									<img src={exp} width={400} height={300}/>
								</p>
									<div>
										Для респондентов с высокими показателями характерны такие черты, как беззаботность, легкомыслие, отношение к жизни как к игре. Такие люди предпочитают абстрактные идеи материальным ценностям. Обычно это громкий, эмоциональный человек, который скорее поверит своей интуиции, а не голосу разума и обладает утонченным художественным вкусом. Имеет разносторонние интересы, легко и быстро учится новому, однако не любит систематизировать знания.
									</div>
									<div style={divStyle}>
										<b>Характерологические черты личности:</b> любознательность, артистичность, экспрессивность, пластичность и сенситивность.
									</div>
								</div>
						);
					default:
						return 'foo';
				}

			}
			else if (this.state.big5mas[k] <= 40)
			{
				switch (k) {
					case 0:
						return (
							<div>
								<h2>Интроверсия {Math.round((this.state.ext*100)/75,2)}%</h2>
								<p align="center">
									<img src={entr} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Низкие значения по фактору характерны для интровертов.
									Основными особенностями интровертов являются отсутствие уверенности в отношении правильности своего поведения и невнимание к происходящим вокруг событиям; большая опора на собственные силы и желания, чем на взгляды других людей; предпочтение абстрактных идей конкретным явлениям действительности.
								</div>
								<div style={divStyle}>
									<b>Характерные черты:</b> неуверенность в правильности своих действий и отсутствие внимания к тому, что происходит вокруг него. Часто оказывает предпочтение абстрактным мыслям и идеям.
								</div>
							</div>
						);

					case 1:
						return (
							<div><h2>Обособленность {Math.round((this.state.agr*100)/75,2)}%</h2>
								<p align="center">
									<img src={ob} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Низкие оценки по фактору свидетельствует о стремлении человека быть независимым и самостоятельным. Такие люди предпочитают держать дистанцию, иметь обособленную позицию при взаимодействии с другими. Они избегают общественных поручений, небрежны в выполнении своих обязанностей и обещаний.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> теплота, доверчивость, привязанность, склонность
									к сотрудничеству, способность завоевывать уважение людей.
								</div>
							</div>);
					case 2:
						return (
							<div>
								<h2>Импульсивность {Math.round((this.state.con*100)/75,2)}%</h2>
								<p align="center">
									<img src={impuls} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Человек, имеющий низкую оценку по этому фактору, редко проявляет в своей жизни волевые качества, он живет, стараясь не усложнять свою жизнь. Ищет «легкой жизни».
									Это такой тип личности, для которого характерны естественность поведения, беспечность, склонность к необдуманным поступкам.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> обособленность, развитое самоуважение, равнодушие к другим, подозрительность и склонность к соперничеству.
								</div>
							</div>
						);
					case 3:
						return (
							<div>
								<h2>Эмоциональная устойчивость {Math.round((this.state.ner*100)/75,2)}%</h2>
								<p align="center">
									<img src={emo} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Невысокое количество баллов набирают спокойные, самодостаточные, уверенные в себе люди. Их отличительная черта – постоянство в любой сфере, будь то привязанность или планы на выходные. Импульсивность им не присуща. Они смотрят на мир без розовых очков, не расстраиваются из-за неудач и, как правило, чувствуют себя в своей тарелке. Осознают свои недостатки и способны сохранять хладнокровие даже в критические моменты. Чаще всего у таких людей хорошее настроение.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> беззаботность, расслабленность, самодостаточность, эмоциональные стабильность и комфорт.
								</div>
							</div>
						);
					case 4:
						return (
							<div>
								<h2>Практичность {Math.round((this.state.open*100)/75,2)}%</h2>
								<p align="center">
									<img src={pr} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Человек с выраженной чертой практичности по своему складу реалист, хорошо адаптирован в обыденной жизни. Он трезво и реалистично смотрит на жизнь, верит в материальные ценности больше, чем в отвлеченные идеи.
									Такой человек часто озабочен своими материальными проблемами, упорно работает и проявляет завидную настойчивость, воплощая в жизнь свои планы.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> консерватизм, практичность и нечувствительность по отношению к окружающим.
								</div>
							</div>
						);
					default:
						return 'foo';
				}

			}
		}
		else
		{
			if (this.state.big5mas[k] >= 7) {
				switch (k) {
					case 0:
						return (
							<div>
								<h2>Экстраверсия {Math.round((this.state.ext*100)/10,2)}%</h2>
                                <p align="center">
                                    <img src={extr} width={400} height={300}/>
                                </p>
								<div style={divStyle}>
									Высокие значения по фактору определяют направленность психики человека на экстраверсию.
									Типичные экстраверты отличаются общительностью, любят развлечения и коллективные мероприятия, имеют большой круг друзей и знакомых, ощущают потребность общения с людьми, с которыми можно поговорить и приятно провести время, стремятся к праздности и развлечениям, не любят себя утруждать работой или учебой, тяготеют к острым, возбуждающим впечатлениям, часто рискуют, действуют импульсивно, необдуманно, по первому побуждению.
								</div>
								<div style={divStyle}>
									<b>Характерные черты:</b> общительность, поиск впечатлений, доминирование, активность
									и любовь к всеобщему вниманию.
								</div>
							</div>
						);

					case 1:
						return (
							<div><h2>Привязанность {Math.round((this.state.agr*100)/10,2)}%</h2>
                                <p align="center">
                                    <img src={agrt} width={400} height={300}/>
                                </p>
								<div style={divStyle}> Высокие значения по данному фактору определяют позитивное отношение человека к людям.
									Такие лица испытывают потребность быть рядом с другими людьми. Как правило, это добрые, отзывчивые люди, они хорошо понимают других людей, чувствуют личную ответственность за их благополучие, терпимо относятся к недостаткам других людей.
									Умеют сопереживать, поддерживают коллективные мероприятия и чувствуют ответственность за общее дело, добросовестно и ответственно выполняют взятые на себя поручения.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> теплота, доверчивость, привязанность, склонность к сотрудничеству, способность завоевывать уважение людей.
								</div>
							</div>
						);
					case 2:
						return (
							<div>
								<h2>Самоконтроль {Math.round((this.state.con*100)/10,2)}%</h2>
                                <p align="center">
                                    <img src={sam} width={400} height={300}/>
                                </p>
								<div style={divStyle}>
									Главным содержанием этого фактора является волевая регуляция поведения.
									На полюсе высоких значений находится такие черты личности, как добросовестность, ответственность, обязательность, точность и аккуратность в делах
									Такие люди любят порядок и комфорт, они настойчивы в деятельности и обычно достигают в ней высоких результатов. Они придерживаются моральных принципов, не нарушают общепринятых норм поведения в обществе и соблюдают их даже тогда, когда нормы и правила кажутся пустой формальностью
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> аккуратность, ответственность, настойчивость и предусмотрительность.
								</div>
							</div>);
					case 3:
						return (
							<div>
								<h2>Эмоциональная неустойчивость {Math.round((this.state.ner*100)/10,2)}%</h2>
                                <p align="center">
                                    <img src={notemo} width={400} height={300}/>
                                </p>
								<div style={divStyle}>
									Высокие значения по этому фактору характеризуют лиц, неспособных контролировать свои эмоции и импульсивные влечения. В поведении это проявляется как отсутствие чувства ответственности, уклонение от реальности, капризность.
									Такие люди чувствуют себя беспомощными, неспособными справиться с жизненными трудностями. Их поведение во многом обусловлено ситуацией.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> тревожность, напряженность, эмоциональная лабильность (неустойчивость), склонность к самокритике и депрессиям.
								</div>
							</div>
						);
					case 4:
						return (
							<div>
								<h2>Экспрессивность {Math.round((this.state.open*100)/10,2)}%</h2>
                                <p align="center">
                                    <img src={exp} width={400} height={300}/>
                                </p>
								<div>
									Для респондентов с высокими показателями характерны такие черты, как беззаботность, легкомыслие, отношение к жизни как к игре. Такие люди предпочитают абстрактные идеи материальным ценностям. Обычно это громкий, эмоциональный человек, который скорее поверит своей интуиции, а не голосу разума и обладает утонченным художественным вкусом. Имеет разносторонние интересы, легко и быстро учится новому, однако не любит систематизировать знания.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> любознательность, артистичность, экспрессивность, пластичность и сенситивность.
								</div>
							</div>
						);
					default:
						return 'foo';
				}

			}
			else if(this.state.big5mas[k]<=5)
			{
				switch (k) {
					case 0:
						return(
							<div>
								<h2>Интроверсия {Math.round((this.state.ext*100)/10,2)}%</h2>
								<p align="center">
									<img src={entr} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Низкие значения по фактору характерны для интровертов.
									Основными особенностями интровертов являются отсутствие уверенности в отношении правильности своего поведения и невнимание к происходящим вокруг событиям; большая опора на собственные силы и желания, чем на взгляды других людей; предпочтение абстрактных идей конкретным явлениям действительности.
								</div>
								<div style={divStyle}>
									<b>Характерные черты:</b> неуверенность в правильности своих действий и отсутствие внимания к тому, что происходит вокруг него. Часто оказывает предпочтение абстрактным мыслям и идеям.
								</div>
							</div>
						);
					case 1:
						return(
							<div><h2>Обособленность {Math.round((this.state.agr*100)/10,2)}%</h2>
								<p align="center">
									<img src={ob} width={400} height={300}/>
								</p>
							<div style={divStyle}>
								Низкие оценки по фактору свидетельствует о стремлении человека быть независимым и самостоятельным. Такие люди предпочитают держать дистанцию, иметь обособленную позицию при взаимодействии с другими. Они избегают общественных поручений, небрежны в выполнении своих обязанностей и обещаний.
							</div>
							<div style={divStyle}>
								<b>Характерологические черты личности:</b> обособленность, развитое самоуважение, равнодушие к другим, подозрительность и склонность к соперничеству.
							</div>
						</div>
						);
					case 2:
						return(
							<div>
							<h2>Импульсивность {Math.round((this.state.con*100)/10,2)}%</h2>
								<p align="center">
									<img src={impuls} width={400} height={300}/>
								</p>
							<div style={divStyle}>
								Человек, имеющий низкую оценку по этому фактору, редко проявляет в своей жизни волевые качества, он живет, стараясь не усложнять свою жизнь. Ищет «легкой жизни».
								Это такой тип личности, для которого характерны естественность поведения, беспечность, склонность к необдуманным поступкам.
							</div>
							<div style={divStyle}>
								<b>Характерологические черты личности:</b> неаккуратность, импульсивность, беспечность, эти люди не из тех, кто проявляет настойчивость.
							</div>
						</div>
						);
					case 3:
						return(
							<div>
								<h2>Эмоциональная устойчивость {Math.round((this.state.ner*100)/10,2)}%</h2>
								<p align="center">
									<img src={emo} width={400} height={300}/>
								</p>
								<div style={divStyle}>
									Невысокое количество баллов набирают спокойные, самодостаточные, уверенные в себе люди. Их отличительная черта – постоянство в любой сфере, будь то привязанность или планы на выходные. Импульсивность им не присуща. Они смотрят на мир без розовых очков, не расстраиваются из-за неудач и, как правило, чувствуют себя в своей тарелке. Осознают свои недостатки и способны сохранять хладнокровие даже в критические моменты. Чаще всего у таких людей хорошее настроение.
								</div>
								<div style={divStyle}>
									<b>Характерологические черты личности:</b> беззаботность, расслабленность, самодостаточность, эмоциональные стабильность и комфорт.
								</div>
							</div>
						);
					case 4:
						return(
							<div>
							<h2>Практичность {Math.round((this.state.open*100)/10,2)}%</h2>
								<p align="center">
									<img src={pr} width={400} height={300}/>
								</p>
							<div style={divStyle}>
								еловек с выраженной чертой практичности по своему складу реалист, хорошо адаптирован в обыденной жизни. Он трезво и реалистично смотрит на жизнь, верит в материальные ценности больше, чем в отвлеченные идеи.
								Такой человек часто озабочен своими материальными проблемами, упорно работает и проявляет завидную настойчивость, воплощая в жизнь свои планы.
							</div>
							<div style={divStyle}>
								<b>Характерологические черты личности:</b> консерватизм, практичность и нечувствительность по отношению к окружающим.
							</div>
						</div>
						);
					default:
						return("something.....");

				}
			}
		}
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
		if(this.state.currentTaskId === 1) {
			this.setState({
				counter: counter,
				questionId: questionId,
				question: this.state.allquestions[counter],
				answer: '',
			});

			let ele = document.getElementsByName("radio");
			for (let i = 0; i < ele.length; i++)
				ele[i].checked = false;
		}
		else
		{
			this.setState({
				counter: counter,
				questionId: questionId,
				question: this.state.allquestions_long_test[counter],
				answer: '',
			});

			let ele = document.getElementsByName("radio");
			for (let i = 0; i < ele.length; i++)
				ele[i].checked = false;
		}

	}
	handleAnswerSelected(e) {
		this.setUserAnswer(e.currentTarget.value);

		this.setState({
			r: this.state.r.concat(e.currentTarget.value),
			checked: true,
			val: e.target.value
		});

		if(this.state.currentTaskId === 1) {
			if (this.state.questionId < this.state.allquestions.length) {
				setTimeout(() => this.setNextQuestion(), 300);
			} else {
				setTimeout(() => this.setResults(this.getResults()), 300);
			}
		}
		else
		{
			if (this.state.questionId < this.state.allquestions_long_test.length) {
				setTimeout(() => this.setNextQuestion(), 300);
			} else {
				setTimeout(() => this.setResults(this.getResults()), 300);
			}
		}

	}


	render() {
		let {
			route,
			router
		} = this.props


		const activeView = (route.name === 'add') ? 'addView' : 'tasksView'
		const activePanel = route.name
		const divStyle = {
			margin: "10px auto",
			backgroundColor: "#FFFFFF",
			minHeight: "200px",
			boxSizing: "border-box"
		}
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
						<div style={divStyle}>
							{this.state.result ? this.renderResult() : this.renderQuiz()}
						</div>
					</Panel>

					<Panel id="edit" theme="white">
						<EditTask 
							router={router}
							task={this.task[1]}
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
