/**
 * Created by Tamara on 03.11.2018.
 */
import React from 'react';

const task = (props) => {


    const startWorkHandler = (event) => {
        console.log('[task.js]', event.target, props.index);
        props.startWork(props.index);

    };

    let activity = props.task.activity.map((el, index) => {
        return <div className="col-12 text-muted text-sm-left" key={index}>
            {el.date} ({el.from} - {el.to})
            <hr/>
        </div>
    });

    let workingButtonClasses = "btn-circle fa btn-success fa-play";
    if (props.task.activeTimer) {
        workingButtonClasses = "btn-circle fa btn-danger fa-stop";
    }

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-5">
                    {props.task.title}
                </div>
                <div className="col-md-3">
                    <a href='/#'>{props.task.project.name}</a> |
                    <a href='/#'>{props.task.project.client.name}</a>

                </div>

                <div className="col-md-2">
                    {props.task.totalTime}
                </div>
                <div className="float-right">
                    <button className={workingButtonClasses} title="Start working" onClick={startWorkHandler}> </button>

                    <button className="btn-circle btn-success fa fa-plus" title="Log time"> </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {activity}
                </div>

            </div>
        </div>

    )
};

export default task;
