/**
 * Created by Tamara on 03.11.2018.
 */
import React from 'react';

const taskEditor = (props) => {
    return (
        <div className="row">
            <div className="float-left">
                <input type="input" className="form-control" value="The task title that can be longer"/>
            </div>
            <div className="float-left">
                <button className="btn-circle btn-success fa fa-folder" title="Select project"> </button>
            </div>
            <div className="float-right"
                 style={{width: '200px'}}>
                No time logged for now
            </div>
            <div className="float-right">
                <button className="btn-circle btn-success fa fa-play" title="Start working"> </button>

                <button className="btn-circle btn-success fa fa-plus" title="Just create the task"> </button>
            </div>
        </div>

    );
};

export default taskEditor;
