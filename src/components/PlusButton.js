import React from 'react';
import { Button } from 'reactstrap';
import * as classes from '../css/PlusButton.module.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPlus);

const PlusButton = (props) => {
    return (
        <Button
            outline
            color="info"
            className={classes.plusButton}
            size={"sm"}
            onClick={props.onClick}>
            &nbsp;
                <FontAwesomeIcon icon="plus" />
            &nbsp;
        </Button>
    );
};

export default PlusButton;