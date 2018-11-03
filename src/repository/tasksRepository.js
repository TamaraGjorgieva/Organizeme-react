/**
 * Created by Tamara on 03.11.2018.
 */
import Moment from 'moment';
import {dateTimeFormat, timeOnlyFormat} from "../util/dateFormats";

export const getTasks = () => {
    return [
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
                date: '25.10.2018',
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
                date: '25.10.2018',
                from: '13:12:05',
                to: '14:02:00'
            }, {
                date: '25.10.2018',
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
};


export const cloneTasks = (state, index) => {
    const task = {
        ...state.tasks[index],
        activity: [...state.tasks[index].activity]
    };

    const newTasksArrayRef = [...state.tasks];
    newTasksArrayRef[index] = task;
    return newTasksArrayRef;
};


export const updateTaskDuration = (task) => {

    let duration = task.activity
        .map((activity) => {
            const start = Moment(activity.date + ' ' + activity.from, dateTimeFormat);
            let end = activity.to !== null ? Moment(activity.date + ' ' + activity.to, dateTimeFormat) : Moment();
            if (end.isBefore(start)) {
                end = end.add(1, 'days');
            }
            // https://stackoverflow.com/a/25150793
            return Moment.duration(end.diff(start));
        })
        .reduce((acc, duration) => Moment.duration(acc.add(duration)));

    task.totalTime = Moment.utc(duration.asMilliseconds()).format(timeOnlyFormat);

};
