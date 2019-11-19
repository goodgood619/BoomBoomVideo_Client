<template>
    <div id = "Todo_show">
        <section class = "todoapp">
            <Header @insertTodo="insertTodo"/>
            <Todo :todos="todos" @removeTodo = "removeTodo" @updateDone = "updateDone" @updateTodo = "updateTodo"/>
            <Footer :filtertype="filterType" :size = "filteredlist.length" @handleFilterType = "handleFilterType"/>
        </section>
    </div>
</template>
<script>
import "../assets/css/main.css";

import Header from "./Header";
import Todo from "./Todo";
import Footer from "./Footer";
export default {
    components : {
        Header,
        Todo,
        Footer
    },
    data() {
        return {
            todos : [
                {
                    id : new Date(),
                    text : "Vue 공부!",
                    isDone : true
                },
                {
                    id : new Date() + 1,
                    text : "치킨 먹기", 
                    isDone : false
                }
            ],
            filterType : 'All'
        }
    },  
    methods : {
        insertTodo(text){
            this.todos = [
                ...this.todos,
                {
                    id : new Date(),
                    text,
                    isDone: false
                }
            ]
        } ,



        
        removeTodo(id) {
            this.todos = this.todos.filter(todo=>todo.id !== id) 
        },
        updateDone(id) {
            const todos = this.todos;
            const todo = todos.find(todo=>todo.id === id);
            if(todo !== undefined) {
                    todo.isDone = !todo.isDone; //toggle 후 다시 넣어주기
                    this.todos = todos;
            } 
        },
        updateTodo({id,text}){
            const todos = [...this.todos];
            const todo = todos.find(todo=>todo.id === id);
            if(todo !== undefined) {
                todo.text = text;
                this.todos = todos;
            }
        },
        handleFilterType(type) {
            this.filterType = type
        }
    },
    computed : {
        filteredlist() {
            switch(this.filterType) {
                case "All" : { 
                    return this.todos
                }
                case "Active" : { 
                    return this.todos.filter(todo => !todo.isDone)
                }
                case "Completed" : {
                    return this.todos.filter(todo => todo.isDone)
                }
                default : {
                    return []
                }
            }
        }
    }
}
</script>
<style>

</style>