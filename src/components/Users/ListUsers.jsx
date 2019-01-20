/**
 * Created by bhushan on 21/8/18.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';
import {getUsers} from '../../actions/users'
import UserTable from "./UserTable";
import TablePagination from "./TablePagination";


class ListUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isFetching: true,
            totalCount: 0
        };
        this.handlePagination = this.handlePagination.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.isFetching && nextProps.users.length > 0) {
            return {
                isFetching: false,
                ...nextProps
            }
        }

        if (nextProps.isFetching != prevState.isFetching && !prevState.isFetching) {
            return {isFetching: true};
        }

        return null;
    }

    handlePagination(pageNo) {

        this.props.getUsers({
            page: pageNo
        });
    }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const {isFetching, users, totalCount, totalPages, currentPage} = this.state;
        return <div>{isFetching ? <div><Spinner type="grow" color="primary"/></div> :
            <div><TablePagination totalPages={totalPages} currentPage={currentPage}
                                  handlePagination={this.handlePagination}/>

                <UserTable users={users}/>
                <UserTable users={users}/>

                <TablePagination totalPages={totalPages} totalCount={totalCount} currentPage={currentPage}
                                 handlePagination={this.handlePagination}/>
            </div>}</div>;
    }
}

const mapStateToProps = (state) => ({
    ...state.usersReducer
});

export default connect(mapStateToProps, {getUsers})(ListUsers);