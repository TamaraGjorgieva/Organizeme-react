import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import Moment from 'moment';

import React, {Component} from 'react';
import TaskList from "../TaskList/TaskList";
import TaskEditor from "../TaskEditor/taskEditor";
import {cloneTasks, getTasks, updateTaskDuration} from "../../repository/tasksRepository";
import {dateOnlyFormat, timeOnlyFormat} from "../../util/dateFormats";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: getTasks()
        };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.title}</h1>

                <div className="row">
                    <div className="col-md-12">
                        <TaskEditor onNewTask={this.onNewTask}/>
                        <hr/>
                    </div>
                    <TaskList tasks={this.state.tasks} startStop={this.startWorkHandler}/>
                </div>
            </div>
        );
    }

    componentWillUnmount = () => {
        console.log('unmount');

        this.state.tasks.forEach((t => {
            if (t.activeTimer) {
                clearInterval(t.activeTimer);
            }
        }));

    };



  onNewTask = (task) => {
      console.log('[App.js] On new task');
      this.setState((state, props) => {
      return {
        tasks: [...state.tasks, task]
      };
    });
 };


 startWorkHandler = (index) => {
   console.log('[App.js] startWorkingHandler for index: ', index);

   this.setState((state, props) => {
            const newTasksArrayRef = cloneTasks(state, index);
            const task = newTasksArrayRef[index];

     if (task.activeTimer) {
              console.log('There is timer that is already started!');
                    // this call is obsolete. We are already in the setState method
                  // this.setState((state, props) => {
              const startedActivity = task.activity[task.activity.length - 1];
              startedActivity.to = Moment().format(timeOnlyFormat);

               // stop timer
              clearInterval(task.activeTimer);
              delete task.activeTimer;
              }
      else {

               task.activity.push({
               date: Moment().format(dateOnlyFormat),
               from: Moment().format(timeOnlyFormat),
                to: null
               });


                task.activeTimer = setInterval(() => {
                this.setState((state, props) => {
                    const tasksInInterval = cloneTasks(state, index);
                    const taskInInterval = tasksInInterval[index];
                    updateTaskDuration(taskInInterval);

                      // stop timer
                      return {tasks: tasksInInterval};
                  });

                 }, 1000);

      }


       return {tasks: newTasksArrayRef};
                                       });


        };

}

export default App;
