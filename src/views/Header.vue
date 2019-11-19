<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" 
    v-model = "text" 
    autofocus 
    autocomplete="off" 
    placeholder="What needs to be done?"
    v-on:keyup.enter="handlesaveTodo"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      text : ""
    }
  },
  methods : {
    handlesaveTodo(){
      const text = this.text;
      if(text !== "") {
        this.$emit("insertTodo",text);
        this.text = "";
      }
    }
  }
};
</script>

<style scoped>
h1 {
  position: absolute;
  top: -100px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>