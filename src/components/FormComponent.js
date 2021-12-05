import React from 'react';
import { Button, Input, Form, FormGroup, Label, Row, Col } from "reactstrap";
import * as yup from 'yup';
import dayjs, * as dayJs from 'dayjs';
import { v4 as uuidv4 }  from 'uuid';
const FormComponent = (props) => {
    const [data, setData] = React.useState({ firstName: '', dueDate: dayJs().format('YYYY-MM-DD'), status: false, priority: 0, id: '' });
    const [formErrors, setFormErrors] = React.useState([]);
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Task name is required."),
        dueDate: yup.date().required("Due date is required."),
        status: yup.boolean().required("Status is required"),
        priority: yup.number().required("Priority is required"),
        id: yup.string().optional()
    });
    const onFormSubmit = (data) => {
        validationSchema.validate(data, { abortEarly: false }).then(f => {
            data = {...data, id: uuidv4()}
            props.onSubmitForm(data);
            setData({
                firstName: '',
                dueDate: dayjs().format("YYYY-MM-DD"),
                status: false,
                priority: 0,
                id: ''
            })
            setFormErrors({})
        }).catch(error => {
            if (error.name) {
                setFormErrors(error.errors);
            }
            if (error.inner && error.inner.length) {
                let errors = {};
                error.inner.map((e) => {
                    Object.assign(errors, { [e.path]: e.errors[0] })
                })
                setFormErrors(errors);
            }
        });

    }

    React.useEffect(() => {

    }, [data]);
    const handleFormChange = (e) => {
        if(e.target.name == 'status'){
            setData(prevState => {
                return { ...prevState, [e.target.name]:  e.target.checked }
            })
        }else{
            setData(prevState => {
                return { ...prevState, [e.target.name]:  e.target.value }
            })
        }
        
    }
    return (
        <>
            <Form style={{ paddingTop: '30px', paddingRight: '30px', paddingLeft: '30px', paddingBottom: '30px' }} onSubmit={(event) => { event.preventDefault(); onFormSubmit(data); }}>
                <Row xs={5}>
                    <Col>
                        <FormGroup>
                            <Label style={{ fontWeight: 'bold' }}>Task Name</Label>
                            <Input id="txtFirstName" name="firstName" type="text" value={data.firstName} onChange={handleFormChange} />
                        </FormGroup>
                        <div style={{ color: 'red' }}>
                            {
                                formErrors?.firstName
                            }
                        </div>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label style={{ fontWeight: 'bold' }}>Due Date</Label>
                            <Input id="txtDueDate" name="dueDate" type="date" value={data.dueDate} onChange={handleFormChange} />
                        </FormGroup>
                        <div style={{ color: 'red' }}>
                            {
                                formErrors?.dueDate
                            }
                        </div>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label style={{ fontWeight: 'bold' }}>Status</Label>
                            <Row>
                                <Col>
                                    <Input name="status" type="checkbox" value={data.status} onChange={handleFormChange} /> Is done ?
                                </Col>
                            </Row>
                            <div style={{ color: 'red' }}>
                                {
                                    formErrors?.status
                                }
                            </div>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label style={{ fontWeight: 'bold' }}>Priority</Label>
                            <Input id="txtPriority" name="priority" type="number" value={data.priority} onChange={handleFormChange} />
                        </FormGroup>
                        <div style={{ color: 'red' }}>
                            {
                                formErrors?.priority
                            }
                        </div>
                    </Col>
                    <Col style={{ marginTop: '32px' }}>
                        <Button color="primary" type='submit'>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <center>
                <Row>
                    <ul>
                        {formErrors.length ? formErrors.map((e) => {
                            return (
                                <li style={{ color: 'red' }}>{e}</li>
                            )
                        }) : []}
                    </ul>
                </Row>
            </center>
        </>
    )
}

export default FormComponent;