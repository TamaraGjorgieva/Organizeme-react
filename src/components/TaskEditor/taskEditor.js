/**
 * Created by Tamara on 03.11.2018.
 */
import React from 'react';

const taskEditor = (props) => {
   const onFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        console.log('onFormSubmit', formSubmitEvent);

        props.onNewTask(
            {
                title: formSubmitEvent.target.taskName.value,
                done: false,
                project: {
                    id: 1,
                    name: formSubmitEvent.target.projectName.value,
                    client: {
                        id: 1,
                        name: 'FINKI'
                    }
                },
                totalTime: '00:00:00',
                activity: []
            }
        );
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="row">
                <div className="col-md-7">
                    <input name="taskName"
                           placeholder={"Enter the name of the task..."} type={"text"}
                           className="form-control"/>
                </div>
                <div className="col-md-3">
                    <select name="projectName" className="form-control">
                        <option value="Project 1">Project 1</option>
                        <option value="Project 2">Project 2</option>
                        <option value="Project 3">Project 3</option>
                    </select>
                </div>
                <div className="col-md-2 ">

                    <button type="submit"
                            className="btn btn-outline-success">
                        Create
                    </button>

                </div>
            </div>
        </form>
    );
};

export default taskEditor;
