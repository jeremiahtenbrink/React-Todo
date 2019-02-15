import React from "react";
import './Todo.scss';

//render new todo list item
const TodoForm = ( props ) => {
    debugger;
    return (
        //wraps form in div
        
        <div className="todo__form">
            {/*creates form */}
            <form onSubmit={props.handleSubmit}>
                <label form="task">
                    Create Task:
                </label>
                <input type="text" name="task"/>
                
                <button id="submit">Submit</button>
                <label htmlFor="errorMessage" id="error">
                    {(props.errorMessage ? props.errorMessage : "" )}
                </label>
            </form>
            {/*sets onclick event to app.cleartodolist*/}
            <button onClick={props.completedItems}>Clear Completed Items</button>
            <button onClick={props.clearTodoList}>Clear All Items</button>
            
        </div>
    );
};

export default TodoForm;
