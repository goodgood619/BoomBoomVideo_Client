<template>
    <div id = "Todo_show">
        <section class = "todoapp">
            <Header @insertTodo="insertTodo"/>
            <Todo :todos="todos"/>
            <Footer/>
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
            ]
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
        }
    }
}
</script>
<style>

</style>