(this["webpackJsonpvk-tests"]=this["webpackJsonpvk-tests"]||[]).push([[0],{309:function(e,t,a){e.exports=a(538)},538:function(e,t,a){"use strict";a.r(t);a(310),a(335);var n=a(1),r=a.n(n),s=a(29),i=a.n(s),o=a(216),c=a.n(o),l=a(77),u=a(234),h=a(41),d=a(42),m=a(45),p=a(43),f=a(98),k=a(46),v=a(8),b=(a(71),function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(k.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.tasks,a=e.router,n=e.setCurrentTaskId,s=e.deleteTask,i=e.removable,o=Object(v.q)();return r.a.createElement("div",null,r.a.createElement(v.k,null,"\u0422\u0435\u0441\u0442\u044b"),r.a.createElement(v.i,{style:{paddingTop:o===v.a?56:48}},t.map((function(e,t){return r.a.createElement(v.c,{multiline:!0,expandable:!0,removable:i,key:t,onRemove:function(){return s(e.id)},onClick:function(){n(e.id),a.navigate("task",{id:e.id})}},e.name)}))))}}]),t}(r.a.Component)),g=a(100),E=a.n(g),O=a(99),w=a.n(O),j=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).onClickAddTask=function(){var e=a.props,t=e.addTask,n=e.router,r=a.state,s=r.name,i=r.text;""!==s&&""!==i?(a.setState({error:!1}),t({name:s,text:i}),n.navigateToDefault()):a.setState({error:!0})},a.onChangeNameTask=function(e){var t=e.target.value;a.setState({name:t})},a.onChangeTextTask=function(e){var t=e.target.value;a.setState({text:t})},a.state={name:"",text:"",error:!1},a}return Object(k.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props.router,a=Object(v.q)();return r.a.createElement("div",null,r.a.createElement(v.k,{left:r.a.createElement(E.a,{onClick:function(){return t.navigate("tasks")}})},"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435"),r.a.createElement(v.f,null,!0===this.state.error&&r.a.createElement(v.g,{title:"\u041d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0435 \u043f\u043e\u043b\u044f",state:"error"},"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f"),r.a.createElement(v.h,{onChange:this.onChangeNameTask,type:"text",value:this.state.name,placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438, \u043a\u0430\u043a \u043d\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0437\u0430\u0434\u0430\u0447\u0430"}),r.a.createElement(v.o,{onChange:this.onChangeTextTask,value:this.state.text,placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438, \u0447\u0442\u043e\u0431\u044b \u0442\u044b \u0445\u043e\u0442\u0435\u043b \u0441\u0434\u0435\u043b\u0430\u0442\u044c"})),r.a.createElement(v.e,{vertical:"bottom"},a===v.a?r.a.createElement(v.d,{style:{float:"right"}},r.a.createElement(v.b,{className:"FixedBottomButton",onClick:function(t){return e.onClickAddTask(t)}},r.a.createElement(w.a,null))):r.a.createElement(v.d,null,r.a.createElement(v.b,{size:"xl",onClick:function(t){return e.onClickAddTask(t)}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"))))}}]),t}(r.a.Component);function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var C=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).onClickEditTask=function(){var e=a.props,t=e.editTask,n=e.router,r=a.state,s=r.id,i=r.name,o=r.text;""!==i&&""!==o?(a.setState({error:!1}),t({id:s,name:i,text:o}),n.navigateToDefault()):a.setState({error:!0})},a.onChangeNameTask=function(e){var t=e.target.value;a.setState({name:t})},a.onChangeTextTask=function(e){var t=e.target.value;a.setState({text:t})},a.state={id:null,name:"",text:"",error:!1},a}return Object(k.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.task;this.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e))}},{key:"render",value:function(){var e=this,t=this.props,a=t.task,n=t.router,s=Object(v.q)();return r.a.createElement("div",null,"undefined"!==typeof a&&r.a.createElement("div",null,r.a.createElement(v.k,{left:r.a.createElement(E.a,{onClick:function(){return n.navigate("task",{id:a.id})}})},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"),r.a.createElement(v.f,null,!0===this.state.error&&r.a.createElement(v.g,{title:"\u041d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0435 \u043f\u043e\u043b\u044f",state:"error"},"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f"),r.a.createElement(v.h,{onChange:this.onChangeNameTask,type:"text",value:this.state.name,placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438, \u043a\u0430\u043a \u043d\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0437\u0430\u0434\u0430\u0447\u0430"}),r.a.createElement(v.o,{onChange:this.onChangeTextTask,value:this.state.text,placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438, \u0447\u0442\u043e\u0431\u044b \u0442\u044b \u0445\u043e\u0442\u0435\u043b \u0441\u0434\u0435\u043b\u0430\u0442\u044c"})),r.a.createElement(v.e,{vertical:"bottom"},s===v.a?r.a.createElement(v.d,{style:{float:"right"}},r.a.createElement(v.b,{className:"FixedBottomButton",onClick:function(){return e.onClickEditTask()}},r.a.createElement(w.a,null))):r.a.createElement(v.d,null,r.a.createElement(v.b,{size:"xl",onClick:function(){return e.onClickEditTask()}},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))))}}]),t}(r.a.Component),S=a(49),T=a(103),q=a(30),x=a.n(q);var A=function(e){return r.a.createElement("div",null,r.a.createElement("h2",{className:"question"},e.content))};var I=function(e){return r.a.createElement("div",{className:"questionCount"},"\u0412\u043e\u043f\u0440\u043e\u0441 ",r.a.createElement("span",null,e.counter)," \u0438\u0437 ",r.a.createElement("span",null,e.total))};var N=function(e){return r.a.createElement("div",null,r.a.createElement("li",{className:"answerOption"},r.a.createElement("input",{name:"Radio",value:e.answerVal,onChange:e.onAnswerSelected,content:e.answerContent})))};var P=function(e){return r.a.createElement("div",{key:e.questionId},r.a.createElement(v.k,null,"\u0422\u0435\u0441\u0442\u044b"),r.a.createElement(I,{counter:e.questionId,total:e.questionTotal}),r.a.createElement(A,{content:e.question}),r.a.createElement("ul",{className:"answerTest"},e.answerOptions.map((function(t){return r.a.createElement(N,{onAnswerSelected:e.onAnswerSelected,answerVal:e.answerCount,answer:e.answerOptions,answerContent:e.contentAn})}))))};function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var D=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).onChangeSearch=function(e){a.setState({search:e})},a.addTask=function(e){e.id=a.state.tasks.length+1,a.setState({tasks:[].concat(Object(u.a)(a.state.tasks),[e])})},a.setCurrentTaskId=function(e){return a.setState({currentTaskId:e})},a.editTask=function(e){var t=a.state.tasks.map((function(t){return t.id===e.id&&(t=e),t}));a.setState({tasks:t})},a.state={tasks:[{id:1,name:"Big Five",text:"\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u0442\u0438\u043f\u0430 \u043b\u0438\u0447\u043d\u043e\u0441\u0442\u0438"}],currentTaskId:null,search:"",counter:0,questionId:1,question:"",answerOptions:[],answer:"",answersCount:{},result:"",allquestions:[],r:[],checked:!1,val:"",clicked:!1,ext:0,agr:0,con:0,ner:0,open:0,id_user:""},a.handleAnswerSelected=a.handleAnswerSelected.bind(Object(f.a)(a)),a}return Object(k.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.state.allquestions=["\u042f \u0445\u043e\u0440\u043e\u0448\u043e \u0441\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0441\u044c \u0441\u043e \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u043c, \u0432\u0441\u0435\u0433\u0434\u0430 \u0441\u043f\u043e\u043a\u043e\u0435\u043d \u0438 \u0440\u0430\u0441\u0441\u043b\u0430\u0431\u043b\u0435\u043d","\u042f \u0441\u043a\u043b\u043e\u043d\u0435\u043d \u0438\u0441\u043a\u0430\u0442\u044c \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u043b\u044e\u0434\u044f\u0445 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043a\u0438","\u042f \u0441\u043a\u043b\u043e\u043d\u0435\u043d \u0431\u044b\u0442\u044c \u043b\u0435\u043d\u0438\u0432\u044b\u043c ","\u0423 \u043c\u0435\u043d\u044f \u043c\u0430\u043b\u043e \u0445\u0443\u0434\u043e\u0436\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0445 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043e\u0432","\u042f \u043e\u0431\u0449\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a","\u0423 \u043c\u0435\u043d\u044f \u0440\u0430\u0437\u0432\u0438\u0442\u043e\u0435 \u0432\u043e\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435","\u042f \u0447\u0430\u0441\u0442\u043e \u043d\u0430\u0445\u043e\u0436\u0443\u0441\u044c \u0432 \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u0432\u043e\u043c \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0438","\u042f \u0441\u043a\u0440\u044b\u0442\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a","\u042f \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u043e \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u044e \u0434\u0430\u043d\u043d\u0443\u044e \u043c\u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0443","\u042f \u0441\u0447\u0438\u0442\u0430\u044e, \u0447\u0442\u043e \u044f \u0447\u0435\u043b\u043e\u0432\u0435\u043a, \u043a\u043e\u0442\u043e\u0440\u043e\u043c\u0443 \u0434\u043e\u0432\u0435\u0440\u044f\u044e\u0442 \u0434\u0440\u0443\u0433\u0438\u0435 \u043b\u044e\u0434\u0438"],this.setState({question:this.state.allquestions[0]})}},{key:"getResults",value:function(){for(var e=this,t=this.state.answersCount,a=Object.keys(t),n=a.map((function(e){return t[e]})),r=Math.max.apply(null,n),s=0;s<this.state.r.length;s++)4===s||7===s?this.state.ext+=Number(this.state.r[s]):1===s||9===s?this.state.agr+=Number(this.state.r[s]):2===s||8===s?this.state.con+=Number(this.state.r[s]):0===s||6===s?this.state.ner+=Number(this.state.r[s]):3!==s&&5!==s||(this.state.open+=Number(this.state.r[s]));return x.a.subscribe((function(e){return console.log(e)})),x.a.send("VKWebAppInit",{}),x.a.supports("VKWebAppResizeWindow")&&x.a.send("VKWebAppResizeWindow",{width:800,height:1e3}),x.a.sendPromise("VKWebAppGetUserInfo").then((function(t){var a=t.id;console.log(t.id),e.setState({id_user:a})})).catch((function(e){})),a.filter((function(e){return t[e]===r}))}},{key:"setResults",value:function(e){1===e.length?this.setState({result:e[0]}):this.setState({result:"Undetermined"})}},{key:"renderQuiz",value:function(){return r.a.createElement(v.j,{id:"task"},r.a.createElement("div",{style:{backgroundColor:"#FFFFFF",minHeight:"200px",boxSizing:"border-box"}},r.a.createElement(P,{answer:this.state.answer,answerOptions:this.state.answerOptions,questionId:this.state.questionId,question:this.state.question,questionTotal:this.state.allquestions.length,onAnswerSelected:this.handleAnswerSelected}),r.a.createElement("p",null,r.a.createElement(v.l,{name:"radio",value:"5",checked:"5"===this.state.val,onChange:this.handleAnswerSelected},"\u041f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0441\u043e\u0433\u043b\u0430\u0441\u0435\u043d"),r.a.createElement(v.l,{name:"radio",value:"4",checked:"4"===this.state.val,onChange:this.handleAnswerSelected},"\u0421\u043e\u0433\u043b\u0430\u0441\u0435\u043d"),r.a.createElement(v.l,{name:"radio",value:"3",checked:"3"===this.state.val,onChange:this.handleAnswerSelected},"\u041d\u0435 \u0443\u0432\u0435\u0440\u0435\u043d"),r.a.createElement(v.l,{name:"radio",value:"2",checked:"2"===this.state.val,onChange:this.handleAnswerSelected},"\u041d\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u0435\u043d"),r.a.createElement(v.l,{name:"radio",value:"1",checked:"1"===this.state.val,onChange:this.handleAnswerSelected},"\u041f\u043e\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u043d\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u0435\u043d"))))}},{key:"renderResult",value:function(){if(""!==this.state.id_user){var e=a(526);a(536);e.initializeApp({apiKey:"AIzaSyBDhnNJsSVzBM0NHjpsDBVssdW7282FMys",authDomain:"jannneee-github-io-446aa.firebaseapp.com",databaseURL:"https://jannneee-github-io-446aa.firebaseio.com",projectId:"jannneee-github-io-446aa",storageBucket:"jannneee-github-io-446aa.appspot.com",messagingSenderId:"124736021555",appId:"1:124736021555:web:dd34a597e4058db36def46",measurementId:"G-ZZ3P9VFGZY"}),e.firestore().collection("tests").add({id_user:this.state.id_user,q1:this.state.r[0],q2:this.state.r[1],q3:this.state.r[2],q4:this.state.r[3],q5:this.state.r[4],q6:this.state.r[5],q7:this.state.r[6],q8:this.state.r[7],q9:this.state.r[8],q10:this.state.r[9]})}var t=[{name:"\u042d\u043a\u0441\u0442\u0440\u0430\u0432\u0435\u0440\u0441\u0438\u044f",count:this.state.ext},{name:"\u0414\u043e\u0431\u0440\u043e\u0436\u0435\u043b\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c",count:this.state.agr},{name:"\u0414\u043e\u0431\u0440\u043e\u0441\u043e\u0432\u0435\u0441\u0442\u043d\u043e\u0441\u0442\u044c",count:this.state.con},{name:"\u041d\u0435\u0439\u0440\u043e\u0442\u0438\u0437\u043c",count:this.state.ner},{name:"\u041e\u0442\u043a\u0440\u044b\u0442\u043e\u0441\u0442\u044c \u043e\u043f\u044b\u0442\u0443",count:this.state.open}];return r.a.createElement("div",null,r.a.createElement(v.k,null,"\u0422\u0435\u0441\u0442\u044b"),r.a.createElement(S.c,{layout:"vertical",width:400,height:300,data:t,margin:{top:40,right:40,bottom:40,left:80},fontSize:12},r.a.createElement(S.b,{stroke:"#f5f5f5"}),r.a.createElement(S.f,{type:"number"}),r.a.createElement(S.g,{dataKey:"name",type:"category"}),r.a.createElement(S.e,null),r.a.createElement(S.d,null),r.a.createElement(S.a,{dataKey:"count",barSize:25,fill:"#4169E1"})))}},{key:"setUserAnswer",value:function(e){this.setState((function(t,a){return{answersCount:z({},t.answersCount,Object(l.a)({},e,(t.answersCount[e]||0)+1)),answer:e}}))}},{key:"setNextQuestion",value:function(){var e=this.state.counter+1,t=this.state.questionId+1;this.setState({counter:e,questionId:t,question:this.state.allquestions[e],answer:""});for(var a=document.getElementsByName("radio"),n=0;n<a.length;n++)a[n].checked=!1}},{key:"handleAnswerSelected",value:function(e){var t=this;this.setUserAnswer(e.currentTarget.value),this.setState({r:this.state.r.concat(e.currentTarget.value),checked:!0,val:e.target.value}),this.state.questionId<this.state.allquestions.length?setTimeout((function(){return t.setNextQuestion()}),300):setTimeout((function(){return t.setResults(t.getResults())}),300)}},{key:"render",value:function(){var e=this.props,t=e.route,a=e.router,n="add"===t.name?"addView":"tasksView",s=t.name;return r.a.createElement(v.m,{activeView:n},r.a.createElement(v.p,{activePanel:s,id:"tasksView"},r.a.createElement(v.j,{id:"tasks"},r.a.createElement(v.e,{vertical:"top"},r.a.createElement(v.n,{value:this.state.search,onChange:this.onChangeSearch})),r.a.createElement(b,{router:a,tasks:this.tasks,setCurrentTaskId:this.setCurrentTaskId})),r.a.createElement(v.j,{id:"task"},r.a.createElement("div",{style:{margin:"10px auto",backgroundColor:"#FFFFFF",minHeight:"200px",boxSizing:"border-box"}},this.state.result?this.renderResult():this.renderQuiz())),r.a.createElement(v.j,{id:"edit",theme:"white"},r.a.createElement(C,{router:a,task:this.task[0],editTask:this.editTask}))),r.a.createElement(v.p,{activePanel:s,id:"addView"},r.a.createElement(v.j,{id:"add",theme:"white"},r.a.createElement(j,{router:a,addTask:this.addTask}))))}},{key:"tasks",get:function(){var e=this.state.search.toLowerCase();return this.state.tasks.filter((function(t){return t.name.toLowerCase().indexOf(e)>-1||t.text.toLowerCase().indexOf(e)>-1}))}},{key:"task",get:function(){var e=Number(this.props.route.params.id)||this.state.currentTaskId;return this.state.tasks.filter((function(t){return t.id===e}))}}]),t}(r.a.Component),V=function(e){return r.a.createElement(T.a,{nodeName:""},(function(t){var a=t.route;return r.a.createElement(D,Object.assign({route:a},e))}))},R=a(79),B=a(232),K=a(233),W=[{name:"tasks",path:"/tasks"},{name:"task",path:"/task/:id"},{name:"edit",path:"/edit/:id"},{name:"add",path:"/add"},{name:"quiz",path:"/quiz"}];c.a.send("VKWebAppInit",{});var M=function(){var e=Object(R.b)(W,{defaultRoute:"tasks"});return e.usePlugin(B.a),e.usePlugin(Object(K.a)({useHash:!0})),e}();M.start((function(){i.a.render(r.a.createElement(T.b,{router:M},r.a.createElement(V,{router:M})),document.getElementById("root"))}))}},[[309,1,2]]]);
//# sourceMappingURL=main.a1d87394.chunk.js.map