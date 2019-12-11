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
                                    slideWidth="100%"
                                    style={{ height: 170 }}
                                >
                                    <img src={task.image_back}/>

                                </Gallery>
                                    <div>
                                        <Div align="left">{task.text}</Div>
                                        <div align="center"><Button size="xl" onClick={()=> {
                                            setCurrentTaskId(task.id)
                                            router.navigate('task', { id : task.id })
                                        }
                                        }><b>{task.id===1?"Начать короткий тест":"Начать тест"}</b></Button></div>
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
