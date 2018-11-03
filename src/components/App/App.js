import React, { Component } from 'react';

import './App.css';
import Task from '../Task/task';
import TaskEditor from '../TaskEditor/taskEditor';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);

        let tasks = [
            {
                title: 'Av 01',
                done: true,
                project: {
                    id: 1,
                    name: 'Web Programming',
                    client: {
                        id: 1,
                        name: 'FINKI'
                    }
                },
                totalTime: '2:23:12',
                activity: [{
                    date: '25.10.2018',
                    from: '13:12:05',
                    to: '14:02:00'
                }, {
                    from: '14:00:00',
                    to: '15:30:00'
                }]
            }, {
                title: 'Av 02',
                done: false,
                project: {
                    id: 1,
                    name: 'Web Programming',
                    client: {
                        id: 1,
                        name: 'FINKI'
                    }
                },
                totalTime: '2:23:12',
                activity: [{
                    from: '13:12:05',
                    to: '14:02:00'
                }, {
                    from: '14:10:00',
                    to: null
               }],
            activeTimer: true

    }, {
                title: 'Av 03',
                done: false,
                project: {
                    id: 1,
                    name: 'Web Programming',
                    client: {
                        id: 1,
                        name: 'FINKI'
                    }
                },
                totalTime: null,
                activity: []
            }];

        this.state = {
            tasks: tasks
        };
    }
    componentWillUnmount = () => {
        console.log('unmount');

        this.state.tasks.forEach((t => {
            clearInterval(t.activeTimer);
        }));
    };

    render() {

        const cloneTasks = (state, index) => {
            const task = {
                ...state.tasks[index],
                activity: [...state.tasks[index].activity]
            };

            const newTasksArrayRef = [...state.tasks];
            newTasksArrayRef[index] = task;
            return newTasksArrayRef;
        };

        const dateTimeFormat = 'DD.MM.YYYY hh:mm:ss';
        const dateOnlyFormat = 'DD.MM.YYYY';
        const timeOnlyFormat = 'hh:mm:ss';

        const startWorkHandler = (index) => {
            console.log('[App.js] startWorkingHandler for index: ', index);

            this.setState((state, props) => {
                const newTasksArrayRef = cloneTasks(state, index);
                const task = newTasksArrayRef[index];



                if (task.activeTimer) {
                    console.log('There is timer that is already started!');

                    this.setState((state, props) => {

                        const stateTasksArrayRef = cloneTasks(state, index);
                        const stateTask = stateTasksArrayRef[index];


                        clearInterval(stateTask.activeTimer);
                        stateTask.activeTimer = false;

                        const startedActivity = stateTask.activity[stateTask.activity.length - 1];
                        startedActivity.to = Moment().format(timeOnlyFormat);

                        return {tasks: stateTasksArrayRef};

                    });

                } else {
                    task.activity.push({
                        date: Moment().format(dateOnlyFormat),
                        from: Moment().format(timeOnlyFormat),
                        to: null
                    });
                    task.activeTimer = setInterval(() => {
                        this.setState((state, props) => {
                            const tasksInInterval = cloneTasks(state, index);
                            const taskInInterval = tasksInInterval[index];
                            console.log('in time out');
                            taskInInterval.totalTime += '.';
                            if (taskInInterval.totalTime.length > 15) {
                                taskInInterval.totalTime = '2:23:15';
                            }
                            return {tasks: tasksInInterval};
                        });

                    }, 1000);
                }

                return {tasks: newTasksArrayRef};
        });

};

            return (
            <div className="container">

              <div className="row">
                <div className="col-12">
                    <TaskEditor/>
                </div>

                <div className="col-12">
                    <Task task={this.state.tasks[0]} startWork={startWorkHandler} index={0}/>
                    <Task task={this.state.tasks[1]} startWork={startWorkHandler} index={1}/>
                    <Task task={this.state.tasks[2]} startWork={startWorkHandler} index={2}/>

                </div>
              </div>

            </div>
        );
    }
}

    export default App;
