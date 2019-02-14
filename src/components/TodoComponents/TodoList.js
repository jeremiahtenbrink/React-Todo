import React from "react";
import Todo from "./Todo";

//Takes a array of todos and calls each todoElement creating a new todoItem.
const TodoList = ( props ) => {
    return (
        <div className="todo__list">
            
            {/*loop through todos*/}
            {props.todos.map((todo) => {
                return (<Todo todo={todo} key={todo.id} completeToggle={props.completeToggle}/>);
            })}
        </div>
    );
};

export default TodoList;
