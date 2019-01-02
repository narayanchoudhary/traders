import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'redux-form';
import RenderSelectField from './RenderSelectField';
import RenderInputField from './RenderInputField';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

const RenderLotsFieldArray = (props) => {
    let { fields, meta: { touched, error } } = props;
    return (
        <Fragment>
            <Row className="mb-3 mt-3 text-center">
                <Col>
                    <Button color="primary" onClick={() => fields.push({})} >
                        <FontAwesomeIcon
                            icon="plus"
                            color="white"
                            className="pointer mr-2"
                        />
                        Add Lot
                    </Button>
                    {touched && error && <span>{error}</span>}
                </Col>
            </Row>
            {
                fields.map((lot, index) =>
                    <Fragment key={index}>
                        <Row form>
                            <Col className="d-flex align-items-center justify-content-center form-group">
                                Lot #{index + 1}
                            </Col>
                            <Field
                                name={`${lot}.item`}
                                component={RenderSelectField}
                                placeholder="Item"
                                options={props.itemOptions}
                                className="col"
                            />
                            <Field
                                name={`${lot}.packet`}
                                component={RenderInputField}
                                placeholder="Packet"
                                className="col"
                            />
                            <Field
                                name={`${lot}.weight`}
                                type="number"
                                component={RenderInputField}
                                placeholder="Weight"
                                className="col"
                            />
                            <Field
                                name={`${lot}.rate`}
                                type="number"
                                component={RenderInputField}
                                placeholder="Rate"
                                className="col"
                            />
                            <Field
                                name={`${lot}.amount`}
                                type="number"
                                component={RenderInputField}
                                placeholder="Amount"
                                className="col"
                            />
                            <Col className="d-flex justify-content-center align-items-center form-group">
                                <FontAwesomeIcon
                                    icon="trash"
                                    color="red"
                                    onClick={() => fields.remove(index)}
                                    className="pointer"
                                />
                            </Col>
                        </Row>
                    </Fragment>
                )
            }
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        itemOptions: state.item.itemOptions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderLotsFieldArray);