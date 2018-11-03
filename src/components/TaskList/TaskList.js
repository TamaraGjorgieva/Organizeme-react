import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

import Task from '../Task/task';


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 2
        }
    }



    render() {
        const offset = this.state.pageNum * this.state.pageSize;

        const nextPageOffset = offset + this.state.pageSize;
        const pageCount = Math.ceil(this.props.tasks.length / this.state.pageSize);


        const tasks = this.getTasksPage(offset, nextPageOffset);
        return (
            <div className="col-md-12">
                {tasks}
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
            </div>
        );
    }
    handlePageClick = (data) => {
        let selected = data.selected;

        console.log('New selected: ', selected);
        this.setState({pageNum: selected});
    };

    getTasksPage = (offset, nextPageOffset) => {
        return this.props.tasks
            .map((task, index) => {
                return <Task task={task}
                             key={index}
                             startWork={this.props.startStop}
                             index={index}/>
            })
            // the filter is after the map function, so that the index attribute in map function is not reset for each page
            .filter((task, index) => {
                return index >= offset
                    && index < nextPageOffset;
            });
    };

}

export default TaskList;

