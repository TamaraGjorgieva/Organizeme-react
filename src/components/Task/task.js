/**
 * Created by Tamara on 03.11.2018.
 */
import React from 'react';

const task = (props) => {
    let width100 = {width: '100px'};
    let margin = {margin: '2px'};

    const startWorkHandler = (event) => {
        console.log('[task.js]', event.target);
        props.startWork(props.index);

    };

    let activity = props.task.activity.map((el, index) => {
        return <div className="col-12" key={index}>
            {el.date} ({el.from} - {el.to})
        </div>
    });
    let workingButtonClasses = "btn-circle fa btn-success fa-play";
    if (props.task.activeTimer) {
        workingButtonClasses = "btn-circle fa btn-danger fa-stop";
    }

    return (
        <div>
            <div className="row">
                <div className="float-left"
                     style={margin}>
                    {props.task.title}
                </div>
                <div className="float-left"
                     style={margin}>
                    <a href='#'>{props.task.project.name}</a> |
                    <a href='#'>{props.task.project.client.name}</a>
                </div>

                <div className="float-right"
                     style={width100}>
                    {props.task.totalTime}
                </div>
                <div className="float-right">
                    <button className={workingButtonClasses}
                            title="Start working" onClick={startWorkHandler}> </button>

                    <button className="btn-circle btn-success fa fa-plus"
                            title="Log time"> </button>
                </div>
            </div>
            <div className="row clearfix">
                {activity}

            </div>
        </div>

    );
};

export default task;
