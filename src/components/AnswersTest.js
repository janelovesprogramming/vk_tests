import React from 'react';
import PropTypes from 'prop-types';
import { Div, Radio} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

function AnswerTest(props) {
    const task = props.tasks
    const router = props.router

    return (
        <div>
            <Radio name="radio" value="1"defaultChecked>First</Radio>
            <Radio name="radio" value="2">Second</Radio>
            <Radio name="radio" value="3" >Third (disabled)</Radio>
        </div>
    );
}

AnswerTest.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerTest;