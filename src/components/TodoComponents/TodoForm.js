import React from "react";
import './Todo.scss';

//render new todo list item
const TodoForm = ( props ) => {
    return (
        //wraps form in div
        <div className="todo__form">
            {/*creates form */}
            <form onSubmit={props.handleSubmit}>
                <label form="task">
                    Create Task:
                </label>
                <input type="text" name="task"/>
                <label htmlFor="errorMessage">
                    {(props.errorMessage ? props.errorMessage : "" )}
                </label>
                
                <input id="submit" type="submit" value="Submit" />
            </form>
            {/*sets onclick event to app.cleartodolist*/}
            <button onClick={props.completedItems}>Clear Completed Items</button>
            <button onClick={props.clearTodoList}>Clear All Items</button>
            
        </div>
    );
};

export default TodoForm;
