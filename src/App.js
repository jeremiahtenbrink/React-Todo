import React from "react";
import TodoItem from "./components/TodoComponents/TodoItem";
import TodoList from "./components/TodoComponents/TodoList";
import TodoForm from "./components/TodoComponents/TodoForm";
import { encrypt, decrypt } from "./components/TodoComponents/Cryptr";

class App extends React.Component {
    
    constructor( props ) {
        super( props );
        
        debugger;
        this.window = Window;
        this.storage = localStorage;
        
        let state = undefined;
        let todos = [];
        if( this.storage ) {
            try {
                state = JSON.parse( decrypt( this.storage.getItem( "state" ) ) );
                todos = state.todos;
            }catch( e ) {
                todos = [];
            }
        }
        
        this.state = {
            text: "",
            todos: todos,
            errorMessage: ""
        };
    }
    
    checkStoarage() {
        if( !this.storage ) {
            this.storage = Window.localStorage;
        }
    }
    
    // handle submit of form
    handleSubmit = ( event ) => {
        let text = "";
        //stop form submission
        event.preventDefault();
        
        // get the input from the form.
        event.target.childNodes.forEach( ( input ) => {
            // make sure the input is the right one by checking its name
            if( input.name === "task" ) {
                // get the value
                text = input.value;
                /// set the input element back to no string.
                input.value = "";
            }
        } );
        
        let error = false;
        // check if item is already in list.
        this.state.todos.forEach( ( todo ) => {
            if( todo.task === text ) {
                this.setState( { errorMessage: "You already have that item on your todo list." } );
                error = true;
            }
        } );
        
        if( error ) {
            return;
        }
        
        // create new todo item
        const todo = new TodoItem( text );
        
        // add it to the todos array in state
        this.setState( ( state ) => {
            state.todos.push( todo );
            this.checkStoarage();
            if( this.storage ) {
                this.storage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }else {
                localStorage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }
            
            return { todos: state.todos, errorMessage: "" };
        } );
    };
    
    clearTodoList = () => {
        debugger;
        this.checkStoarage();
        if( this.storage ) {
            this.checkStoarage();
            if( this.storage ) {
                this.storage.removeItem( "state" );
            }
        }
        this.setState( { todos: [], errorMessage: "" } );
    };
    
    setCompletedToggle = ( id ) => {
        this.setState( ( state ) => {
            state.todos.forEach( ( item ) => {
                if( item.id === id ) {
                    item.completed = !item.completed;
                }
            } );
            this.storage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            return {
                todos: [ ...state.todos ]
            };
        } );
    };
    
    completedItems = () => {
        this.setState( state => {
            debugger;
            state.todos = state.todos.filter( ( todo ) => !todo.completed );
            this.checkStoarage();
            if( this.storage ) {
                this.storage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }else {
                localStorage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }
            return {
                todos: [ ...state.todos ]
            };
        } );
    };
    
    render() {
        return (
            <div>
                <TodoList todos={ this.state.todos } completeToggle={ this.setCompletedToggle } />
                <TodoForm
                    handleSubmit={ this.handleSubmit }
                    textValue={ this.state.text }
                    clearTodoList={ this.clearTodoList }
                    errorMessage={ this.state.errorMessage }
                    completedItems={ this.completedItems }
                />
            </div>
        );
    }
}

export default App;
