import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import {PanelHeader} from "@vkontakte/vkui";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Tasks from "./Tasks";
import AnswerTest from "./AnswersTest";

function Quiz(props) {
    function renderAnswerTest(key) {
        return (
            <AnswerTest
                onAnswerSelected={props.onAnswerSelected}
                answerVal={props.answerCount}
                answer={props.answerOptions}
                answerContent={props.contentAn}
            />
        );
    }
    const task = props.question
    const router = props.router

    return (

        <div key={props.questionId}>
            <PanelHeader>
                Тесты
            </PanelHeader>

            <QuestionCount counter={props.questionId} total={props.questionTotal} />
            <Question content={props.question} />
            <ul className="answerTest">
                {props.answerOptions.map(renderAnswerTest)}
            </ul>
        </div>
    );
}

Quiz.propTypes = {
    contentAn: PropTypes.array.isRequired,
    answer: PropTypes.string.isRequired,
    answerCount: PropTypes.number.isRequired,
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;