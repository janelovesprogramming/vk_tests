import React from 'react';
import PropTypes from 'prop-types';
import {PanelHeader} from "@vkontakte/vkui";

function Result(props) {
    return (
        <div>
            <PanelHeader>
                Тесты
            </PanelHeader>

            <div>
                <p>
                You prefer <strong>{props.quizResult}</strong>!
                </p>
            </div>
        </div>

    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;