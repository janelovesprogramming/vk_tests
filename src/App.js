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
import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
import Pdf from "react-to-pdf";
import '@vkontakte/vkui/dist/vkui.css'
import VK, {Share, Post} from 'react-vk';



import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

import 'jspdf-autotable';
import * as _ from 'lodash';
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
import logo from '../src/api/s1200.jpg';
import entr from '../src/api/entr.jpg';
import impuls from '../src/api/145470.jpg';
import emo from '../src/api/Unknown1.jpg';
import ob from '../src/api/depositphotos_43962069-stock-photo-suspicious-man.jpg';
import pr from '../src/api/0ff07ec3519ac00d48af86d150a59bc8.jpg';
import jsPDF from "jspdf";
import { Document, Page, PDFDownloadLink  } from 'react-pdf';

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
					id: 2,
					name: 'Тест по Большой пятерке (30 вопросов)',
					text: 'Точный тест на 30 вопросов: узнай свой характер за 15 минут',
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
			array1: [],
			numPages: null,
			pageNumber: 1,
			phrase: "",
			question_ext:[],
			question_agr:[],
			question_con:[],
			question_ner:[],
			question_open:[]

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
		/*
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
		];*/
		this.state.question_ext = [
			"Мне нравится заниматься физкультурой",
			"Если я ничем не занят, то это меня беспокоит",
			"Я не могу долго оставаться в неподвижности",
			"Я люблю, чтобы другие быстро выполняли мои распоряжения",
			"Мне часто приходится быть лидером, проявлять инициативу",
			"Часто случается, что я руковожу, отдаю распоряжения другим людям",
			"Мне нравится общаться с незнакомыми людьми",
			"Мне нравится приобретать новых друзей и знакомых",
			"Я люблю находиться в больших и веселых компаниях",
			"Я часто игнорирую сигналы, предупреждающие об опасности",
			"Мне нравятся карнавальные шествия и демонстрации",
			"Я чувствую себя счастливым, когда на меня обращают внимание",
			"Я привлекателен для лиц противоположного пола",
			"Мне нравится выглядеть вызывающе"

		];
		this.state.question_agr = [
			"Люди считают меня отзывчивым и доброжелательным человеком",
			"Я стараюсь проявлять дружелюбие ко всем людям",
			"Я тактичен по отношения к другим людям",
			"Я уступчивый и склонный к компромиссам человек",
			"Я всегда готов оказать помощь и разделить чужие трудности",
			"Я предпочитаю сотрудничать с другими, чем соперничать",
			"Большинство людей добры от природы",
			"Люди, с которыми я общаюсь, обычно мне нравятся",
			"Большинство людей честные, и им можно доверять",
			"Я стараюсь проявлять чуткость, когда имею дело с людьми",
			"Радость других я разделяю как собственную",
			"Я стараюсь поставить себя на место другого человека, чтобы его понять",
			"В каждом человеке есть нечто, за что его можно уважать",
			"Я всегда стараюсь быть добрым и внимательным с каждым человеком",
			"Некоторые говорят, что я снисходителен к окружающим"

		];
		this.state.question_con = [
			"Я во всем ценю чистоту и порядок",
			"Моя комната всегда аккуратно прибрана",
			"Я тактичен по отношения к другим людям",
			"Я проявляю настойчивость, решая трудную задачу",
			"Я очень старательный во всех делах человек",
			"Я серьезно и прилежно отношусь к работе",
			"Люди часто доверяют мне ответственные дела",
			"Я требователен и строг в работе",
			"Я обычно работаю добросовестно",
			"Я редко делаю необдуманно то, что хочу сделать",
			"Я обычно контролирую свои чувства и желания",
			"В магазине я обычно долго выбираю то, что надумал купить",
			"Обычно я хорошо думаю, прежде чем действую",
			"Перед путешествием я намечаю точный план",
			"Я точно и методично выполняю свою работу"

		];
		this.state.question_ner = [
			"Меня часто беспокоит мысль, что что-нибудь может случиться",
			"Иногда я расстраиваюсь из-за пустяков",
			"Мои чувства легко уязвимы и ранимы",
			"В трудных ситуациях я весь сжимаюсь от напряжения",
			"У меня часто выступает холодный пот и дрожат руки",
			"В необычной обстановке я часто нервничаю",
			"Иногда я чувствую себя одиноко, тоскливо и все валится из рук",
			"Когда я сильно расстроен, у меня тяжело на душе",
			"Я легко впадаю в депрессию",
			"У меня много слабостей и недостатков",
			"Если я терплю неудачу, то обычно обвиняю себя",
			"Иногда я чувствую себя жалким человеком",
			"Часто у меня бывают взлеты и падения настроения",
			"Мое настроение легко меняется на противоположное",
			"Иногда я бываю настолько взволнован, что даже плачу",
		];
		this.state.question_open = [
			"Все новое вызывает у меня интерес",
			"Мне нравятся неожиданности",
			"Мне не интересно, когда ответ ясен заранее",
			"У меня очень живое воображение",
			"Мне нравится мечтать",
			"Иногда я погружаюсь в глубокие размышления",
			"Я хорошо знаю, что такое красота и элегантность",
			"Музыка способна так захватить меня, что я теряю чувство времени",
			"Настоящее произведение искусства вызывает у меня восхищение",
			"Я хорошо понимаю свое душевное состояние",
			"Я верю, что чувства делают мою жизнь содержательнее",
			"Я легко «вживаюсь» в переживания вымышленного героя",
			"Иногда я чувствую себя фокусником, подшучивающим над людьми",
			"Я думаю, что жизнь – это азартная игра",
			"Иногда я чувствую, что могу открыть в себе нечто новое"

		];
		var array1, array2, array3, array4, array5;
		array1 = _.shuffle(_.range(0,14)).slice(0,6);
		array2 = _.shuffle(_.range(0,14)).slice(0,6);
		array3 = _.shuffle(_.range(0,14)).slice(0,6);
		array4 = _.shuffle(_.range(0,14)).slice(0,6);
		array5 = _.shuffle(_.range(0,14)).slice(0,6);
		for (let j = 0; j < array1.length; j++) {

			this.state.allquestions_long_test.push(this.state.question_ext[array1[j]]);
			this.state.allquestions_long_test.push(this.state.question_agr[array2[j]]);
			this.state.allquestions_long_test.push(this.state.question_con[array3[j]]);
			this.state.allquestions_long_test.push(this.state.question_ner[array4[j]]);
			this.state.allquestions_long_test.push(this.state.question_open[array5[j]]);
		}

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
			if (i === 0 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25) {
				this.state.ext += Number(this.state.r[i]);
			} else if (i === 1 || i === 6 || i === 11 || i === 16 || i === 21 || i === 26) {
				this.state.agr += Number(this.state.r[i]);
			} else if (i === 2 || i === 7 || i === 12 || i === 17 || i === 22 || i === 27) {
				this.state.con += Number(this.state.r[i]);
			} else if (i === 3 || i === 8 || i === 13 || i === 18 || i === 23 || i === 28) {
				this.state.ner += Number(this.state.r[i]);
			} else if (i === 4 || i === 9 || i === 14 || i === 19 || i === 24 || i === 29) {
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

	onDocumentLoadSuccess = ({numPages}) => {
		this.setState({numPages});
	}




	exportPDF(){
		/*
		const {vfs} = vfsFonts.pdfMake;
		pdfMake.vfs = vfs;

		const documentDefinition = {
			pageSize: 'A4',
			pageOrientation: 'landscape',
			content: [
				{
					text: 'Мой психологический профиль',
					style: 'header',
					alignment: 'center'
				},
				'\n',
				{
					text: 'This is a header, using header style',
					style: 'header'
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
				{
					text: 'Subheader 1 - using subheader style',
					style: 'subheader'
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
				{
					text: 'Subheader 2 - using subheader style',
					style: 'subheader'
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
				{
					text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
					style: ['quote', 'small']
				}
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true
				},
				subheader: {
					fontSize: 15,
					bold: true
				},
				quote: {
					italics: true
				},
				small: {
					fontSize: 8
				}
			}

		};

		 this.downloadPdf(this.pdfObj);
		pdfMake.createPdf(documentDefinition).download();
		<div align="center"><Button onClick={(e) => this.exportPDF(e)}>Сохранить результат</Button></div>
		*/

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
					db.collection('30test').add({
					id: this.state.id_user,
					ext:  Math.round((this.state.ext * 100) / 30, 2),
					agr: Math.round((this.state.agr * 100) / 30, 2),
					con: Math.round((this.state.con* 100) / 30, 2),
					ner: Math.round((this.state.ner * 100) / 30, 2),
					open:Math.round((this.state.open * 100) / 30, 2),

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
				margin: 25
			}
			const h2Style = {
				margin: 30
			}
			const hr = {
				border: "none",
				background: "blue",
				color: "blue",
				height: 2
				}
			let {
				router,
			} = this.props

			const ref = React.createRef();
			const { pageNumber, numPages } = this.state;
			return (
				<div>

					<PanelHeader

						left={<PanelHeaderBack onClick={() => router.navigate('tasks') && this.setState({
							tasks: [
								{
									id: 2,
									name: 'Тест по Большой пятерке (30 вопросов)',
									text: 'Точный тест на 30 вопросов: узнай свой характер за 15 минут,',
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
									y: this.state.currentTaskId === 1 ? Math.round((this.state.ext * 100) / 10, 2) : Math.round((this.state.ext * 100) / 30, 2),
									fill: "#2196f3"
								},
								{
									x: "Доброжелательность",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.agr * 100) / 10, 2) : Math.round((this.state.agr * 100) / 30, 2),
									fill: "#03a9f4"
								},
								{
									x: "Добросовестность",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.con * 100) / 10, 2) : Math.round((this.state.con * 100) / 30, 2),
									fill: "#00bcd4"
								},
								{
									x: "Нейротизм",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.ner * 100) / 10, 2) : Math.round((this.state.ner * 100) / 30, 2),
									fill: "#009688"
								},
								{
									x: "Открытость опыту",
									y: this.state.currentTaskId === 1 ? Math.round((this.state.open * 100) / 10, 2) : Math.round((this.state.open * 100) / 30, 2),
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
					<div>
						{this.renderSwitch(0)}
						{this.renderSwitch(1)}
						{this.renderSwitch(2)}
						{this.renderSwitch(3)}
						{this.renderSwitch(4)}
					</div>
					</div>
					<div>
					<hr style={hr}>
					</hr>
					</div>
					<div  style={divStyle} align="center">
						<div>
						<VK>
							<Share shareOptions={{
								url: 'https://vk.com/app7165780_142799641',
								title: 'Узнай оценку своей личности по тесту BigFive',
								no_vk_links: 1,
							}} buttonOptions={{type: 'round_nocount',
								text: 'Поделиться'}}
							/>
						</VK>
						</div>

					</div>
				<div style={divStyle}>
					<br/>
				</div>
				</div>

			)
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
								<h2>Экстраверсия {Math.round((this.state.ext*100)/30,2)}%</h2>
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
							<div><h2>Привязанность {Math.round((this.state.agr*100)/30,2)}%</h2>
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
								<h2>Самоконтроль {Math.round((this.state.con*100)/30,2)}%</h2>
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
								<h2>Эмоциональная неустойчивость {Math.round((this.state.ner*100)/30,2)}%</h2>
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
								<h2>Экспрессивность {Math.round((this.state.open*100)/30,2)}%</h2>
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
								<h2>Интроверсия {Math.round((this.state.ext*100)/30,2)}%</h2>
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
							<div><h2>Обособленность {Math.round((this.state.agr*100)/30,2)}%</h2>
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
								<h2>Импульсивность {Math.round((this.state.con*100)/30,2)}%</h2>
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
								<h2>Эмоциональная устойчивость {Math.round((this.state.ner*100)/30,2)}%</h2>
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
								<h2>Практичность {Math.round((this.state.open*100)/30,2)}%</h2>
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
