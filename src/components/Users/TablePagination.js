import React from 'react';
import {Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import propTypes from 'prop-types';

const _ = require('underscore'); //added to debounce keypress event.
/***
 * props :
 * currentPage : current page.
 * totalPage : total no of pages.
 * handlePagination : function which will set page no
 */
export default class TablePagination extends React.Component {
    constructor(props) {
        super(props);

        this.setPageNo = _.debounce(this.setPageNo.bind(this), 500);
    }
    //handle pagination
    handleNav(direction) {
        let {currentPage} = this.props;
        currentPage = currentPage + direction;
        if (currentPage > 0 && currentPage <= this.props.totalPages) {
            this.props.handlePagination(currentPage);
        }
    }

    setPageNo(e) {
        let pageNo = parseInt(e.target.value) || 0;
        if (pageNo > 0 && pageNo <= this.props.totalPages) {
            this.props.handlePagination(pageNo);
        } else {
            alert(`Enter Page No Less then ${this.props.totalPages}`);
        }
    }

    handleTextbox(e) {
        //ref : https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
        e.persist();
        this.setPageNo(e);
    }

    render() {
        const {currentPage, totalPages} = this.props;
        return (
            <div>
                <div className="row float-right">
                    <div className="col-12 mt-2">
                        <Pagination size="sm" aria-label="Page navigation">
                            <PaginationItem>
                                <PaginationLink previous onClick={this.handleNav.bind(this, -1)}/>
                            </PaginationItem>
                            <Input type="text" bsSize="sm" className="mb-3 w-auto ml-1 mr-1"
                                   placeholder={currentPage + " / " + totalPages}
                                   onKeyUp={this.handleTextbox.bind(this)}/>
                            <PaginationItem>
                                <PaginationLink next href="#" onClick={this.handleNav.bind(this, +1)}/>
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div>
            </div>
        )
    }
}


TablePagination.propTypes = {
    totalPages: propTypes.number.isRequired,
    totalCount: propTypes.number,
    handlePagination: propTypes.func.isRequired
};
