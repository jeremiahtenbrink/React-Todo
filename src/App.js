import React from "react";
import TodoItem from "./components/TodoComponents/TodoItem";
import TodoList from "./components/TodoComponents/TodoList";
import TodoForm from "./components/TodoComponents/TodoForm";
import { encrypt, decrypt } from "./components/TodoComponents/Cryptr";
import Search from "./components/TodoComponents/Search";

class App extends React.Component {
    
    constructor( props ) {
        super( props );
        
        this.window = Window;
        this.storage = localStorage;
        debugger;
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
            errorMessage: "",
            search: ""
        };
    }
    
    checkStoarage() {
        if( !this.storage ) {
            this.storage = localStorage;
        }
    }
    
    // handle submit of form
    handleSubmit = ( event ) => {
        debugger;
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
        debugger;
        this.setState( ( state ) => {
            state.todos.push( todo );
            debugger;
            this.checkStoarage();
            
            if( this.storage ) {
                this.storage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }else {
                localStorage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }
            
            return { todos: state.todos, errorMessage: "" };
        } );
        debugger;
    };
    
    clearTodoList = () => {
        this.checkStoarage();
        if( this.storage ) {
            this.checkStoarage();
            if( this.storage ) {
                this.storage.removeItem( "state" );
            }
        }
        debugger;
        if (this.state.todos.length === 0){
            return this.setState( { errorMessage: "There are no todo items to clear." } );
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
            const completed = state.todos.filter( ( todo ) => todo.completed );
            
            if( completed.length === 0 ) {
                return { errorMessage: "There are no completed todos to remove." };
            }
            
            state.todos = state.todos.filter( ( todo ) => !todo.completed );
            this.checkStoarage();
            if( this.storage ) {
                this.storage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }else {
                localStorage.setItem( "state", encrypt( JSON.stringify( state ) ) );
            }
            return {
                todos: [ ...state.todos ],
                errorMessage: ""
            };
        } );
    };
    
    search = ( event ) => {
        let text = event.target.value;
        
        if( this.state.todos.length === 0 && text === "" ) {
            this.setState( { errorMessage: "" } );
        }else if( this.state.todos.length === 0 ) {
            this.setState( { errorMessage: "There are no items to search." } );
        }
        
        this.setState( { search: text } );
    };
    
    render() {
        return (
            <div className="container">
                <Search searchWord={ this.state.search } searhFun={ this.search } />
                <TodoList
                    todos={ this.state.todos }
                    completeToggle={ this.setCompletedToggle }
                    searchWord={ this.state.search } />
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
