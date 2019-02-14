const uuidv4 = require('uuid/v4')

export default class TodoItem {
    constructor(task){
        this.task = task;
        this.id = uuidv4();
        this.completed = false;
    }
}
