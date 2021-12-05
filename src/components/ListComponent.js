import React from "react";
import { Table  } from "reactstrap";

const ListComponent = (props) => {
    React.useEffect(() => {
    }, [])
    const handleStatusChange = (id) => {
        props.onStatusChange(id);
    }
    return (
        <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listData.length ? 
                            // eslint-disable-next-line array-callback-return
                            props.listData.map((d) => {
                                return (<tr>
                                    <td  onClick={() => { handleStatusChange(d.id);}}>{d.firstName}</td>
                                    <td>{d.dueDate}</td>
                                    <td>{d.priority}</td>
                                    <td style={{color: d.status ? 'green' : 'red'}}>{d.status ? 'Done' : 'Pending'}</td>
                                </tr>);
                            })
                        : []
                    }
                </tbody>
            </Table>
        </>
    );
}

export default ListComponent;