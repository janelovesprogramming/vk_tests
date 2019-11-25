import React from 'react'
import {List, Cell, PanelHeader, platform, ANDROID, Header, Div, Group, Gallery, Button} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'


class Tasks extends React.Component {
	render() {

        let {
            tasks,
            router,
            setCurrentTaskId,
            deleteTask,
            removable
        } = this.props

        const osname = platform()
        const divStyle = {
            display: "inline-block",
            boxSizing: "border-box"
        }
        const rovStyle = {
            display: "inline-block",
            boxSizing: "border-box"
        }
		return (
			<div>
                <PanelHeader

                >
                    Тесты
                </PanelHeader>
                <List style={{ paddingTop : (osname === ANDROID) ? 56 : 48 }}>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                multiline
                                expandable
                                removable={removable}
                                key={index}
                                onRemove={() => deleteTask(task.id)}

                            >
                                <div>
                                <Header><b>{task.name}</b></Header>
                                <Gallery
                                    slideWidth="90%"
                                    style={{ height: 150 }}
                                >
                                    <img src={task.image_back}/>

                                </Gallery>
                                    <div>
                                        <Div>{task.text}</Div>
                                        <div align="center"><Button onClick={()=> {
                                            setCurrentTaskId(task.id)
                                            router.navigate('task', { id : task.id })
                                        }
                                        }>{task.id===1?"Начать короткий тест":"Начать длинный тест"}</Button></div>
                                    </div>
                                </div>



                            </Cell>
                        ))
                    }
                </List>
            </div>
		);
	}
}

export default Tasks;
