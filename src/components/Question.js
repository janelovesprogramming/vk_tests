import React from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, Header, Div, Group } from '@vkontakte/vkui'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Tasks from "./Tasks";

function Question(props) {



    return (

        <div>
            <h2 className="question">{props.content}</h2>
        </div>
    );
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question;
