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
                                    slideWidth="40%"
                                    style={{ height: 250 }}
                                >
                                    <img src={task.image_back}/>
                                    <div>
                                        <Div>{task.text}</Div>
                                        <div align="left"><Button onClick={()=> {
                                            setCurrentTaskId(task.id)
                                            router.navigate('task', { id : task.id })
                                        }
                                        }>Начать тест</Button></div>
                                    </div>
                                </Gallery>
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