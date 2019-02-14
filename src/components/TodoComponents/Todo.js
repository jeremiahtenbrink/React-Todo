import React from "react";
import './Todo.scss';

// renders a todoItem
// Takes in prop todo: todoItem Class
const Todo = ( props ) => {
    return (
        <div className="todo__item">
            <h3 onClick={() => props.completeToggle(props.todo.id)} className={"todo__item-title " +
            (props.todo.completed ? 'complete': '')}>
                {props.todo.task}
            </h3>
            <div className="icon">
                <span className={(props.todo.completed ? "icon-checkmark2": '')}></span>
            </div>
        </div>
    );
};

export default Todo;
