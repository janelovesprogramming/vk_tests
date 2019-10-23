import React from 'react';
import PropTypes from 'prop-types';
import { Div, Radio} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

function AnswerTest(props) {
    const task = props.tasks
    const router = props.router

    return (
        <div>
            <li className="answerOption">
                <input
                    name="Radio"
                    value={props.answerVal}
                    onChange={props.onAnswerSelected}
                    content={props.answerContent}
                />
            </li>
        </div>
        );
    }

    AnswerTest.propTypes = {
        answerVal: PropTypes.number.isRequired,
        answerContent: PropTypes.array.isRequired,
        onAnswerSelected: PropTypes.func.isRequired
    };

export default AnswerTest;