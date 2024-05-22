#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "select what you want?",
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        }
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add Items In the list",
            validate: function (input) {
                if (input.trim == "") {
                    return "Please Enter a NON-Empty Value.";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "")
            todos.push(addTodo.todo);
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Update") {
        let updateTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "Remove items from List",
                choices: todos.map(item => item)
            }
        ]);
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add Items in the List"
            }
        ]);
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "View") {
        console.log("*********To Do List*********");
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Delete") {
        let deleteTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "Delete Item from list",
                choices: todos.map(item => item)
            }
        ]);
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Exit") {
        console.log("Exiting Program!!!!");
        condition = false;
    }
}
