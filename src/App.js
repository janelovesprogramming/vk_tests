import React from 'react'
import {
	View,
	Panel,
	Search,
	FixedLayout,
	Root,
	Radio,
	PanelHeader
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import {ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { RouteNode } from 'react-router5'
import connect from '@vkontakte/vk-connect';
import Quiz from './components/Quiz';


class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks : [
				{
					id : 1,
					name : 'Short Big Five',
					text : 'Определение типа личности'
				},
				{
					id : 2,
					name : 'Big Five 75',
					text : 'Определение типа личности'
				}

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
			allquestions_long_test: [],
			r:[],
			checked:false,
			val: '',
            clicked: false,
			ext: 0,
			agr: 0,
			con: 0,
			ner:0,
			open: 0,
			id_user:'',
			cur : 0,
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
		if(this.state.currentTaskId === 1) {
			this.setState({
				question: this.state.allquestions[0],

			});
		}
		else
		{
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
			if(i === 0 || i === 5 || i === 10 || i === 15 || i===20 || i ===25 || i===30 || i=== 35 || i===40 || i===45|| i===50 || i===55 || i=== 60 || i===65 || i===70) {
				this.state.ext += Number(this.state.r[i]);
			}
			else if(i === 1 || i === 6 || i === 11 || i === 16 || i===21 || i ===26 || i===31 || i=== 36 || i===41 || i===46|| i===51 || i===56 || i=== 61 || i===66 || i===71) {
				this.state.agr += Number(this.state.r[i]);
			}
			else if(i === 2 || i === 7 || i === 12 || i === 17 || i===22 || i ===27 || i===32 || i=== 37 || i===42 || i===47|| i===52 || i===57 || i=== 62 || i===67 || i===72) {
				this.state.con += Number(this.state.r[i]);
			}
			else if(i === 3 || i === 8 || i === 13 || i === 18 || i===23 || i ===28 || i===33 || i=== 38 || i===43 || i===48|| i===53 || i===58 || i=== 63 || i===68 || i===73) {
				this.state.ner += Number(this.state.r[i]);
			}
			else if(i === 4 || i === 9 || i === 14 || i === 19 || i===24 || i ===29 || i===34 || i=== 39 || i===44 || i===49|| i===54 || i===59 || i=== 64 || i===69 || i===74) {
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
				this.setState({ id_user: us});

			})
			.catch(error => {
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
		const divStyle = {
			backgroundColor: "#FFFFFF",
			minHeight: "200px",
			boxSizing: "border-box"
		}

		if(this.state.currentTaskId === 1) {
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
								   onChange={this.handleAnswerSelected}>Поолностью не согласен</Radio>
						</p>
					</div>
				</Panel>


			);
		}
		else
		{
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
								   onChange={this.handleAnswerSelected}>Поолностью не согласен</Radio>
						</p>
					</div>
				</Panel>


			);
		}

	}

	renderResult() {
			if(this.state.id_user !== '') {
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
				}
				else
				{
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

		const divStyle = {
			margin: 3
		}
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
				<div>
					<h2>Экстраверсия</h2>
					<div style={divStyle}>
						Высокие значения по фактору определяют направленность психики человека на экстраверсию.
						Типичные экстраверты отличаются общительностью, любят развлечения и коллективные мероприятия, имеют большой круг друзей и знакомых, ощущают потребность общения с людьми, с которыми можно поговорить и приятно провести время, стремятся к праздности и развлечениям, не любят себя утруждать работой или учебой, тяготеют к острым, возбуждающим впечатлениям, часто рискуют, действуют импульсивно, необдуманно, по первому побуждению.
					</div>
				</div>

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
