import React from 'react';
import {Table} from 'reactstrap';
import propTypes from 'prop-types';
import TablePagination from "./TablePagination";
//table headers
const tableColumns = [
    'ID', 'Name', 'Email', 'Gender', 'Phone', 'Date of birth'
];
export default class UserTable extends React.Component {

    render() {
        let tableHeaders = tableColumns.map(th => <th key={th}>{th}</th>);
        let tableRows = this.props.users.map(user =>
            <tr key={user.id} scope="row">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.dob}</td>
            </tr>
        );

        return (

            <Table responsive hover size="sm">
                <thead>
                <tr>
                    {tableHeaders}
                </tr>
                </thead>
                <tbody>
                {tableRows}
                </tbody>
            </Table>
        );
    }
}

UserTable.propTypes = {
    users: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
            email: propTypes.string.isRequired,
            gender: propTypes.string.isRequired,
            phone: propTypes.string,
            dob: propTypes.string,
        })
    ),
};
