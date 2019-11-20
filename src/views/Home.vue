<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
    <button v-on:click="axiosgetTest">axios get Test</button>
    <br><br>
    <input class="axios-post" v-model="text" v-on:keyup.enter = "axiosfindTest">
    <input class="axios-deletepost" v-model = "postdata" v-on:keyup.enter = "axiospostTest">
    <span>{{axiosdata}} </span>   
    <li v-for= "(item,idx) in findlist" :key = "idx">
      {{item.id}},{{item.pwd}}
    </li>

  </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios"
import { chartreuse } from 'color-name'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      axiosdata : "",
      postdata : "",
      text : "",
      findlist : []
    }
  },
  methods : {
    async axiosfindTest(){
      try {
       this.findlist = await axios.get('/api/axiosfind')
       this.deletedata = await axios.post('/api/axiosdelete',{id : 'gktgnjftm'})
      }
      catch(err) {
        console.log(err);
      }
    },
    axiosgetTest(){
      
        axios.get('/api/axios',{test: 'from vue to node'})
        .then((res) => {
          this.axiosdata = res.data;  
        })
        .catch(err => console.log(err))

    },
    axiospostTest(){
        const text = this.text;
        axios.post('/api/axiospost',{id: 'gktgnjftm',pwd : 'dkqrnjs2',num: 1111, date: 111})
        .then(res => {
            this.text = res.data.test;
        })
        .catch(err => console.log(err))
    } ,
    axiospostDeleteTest(){
      axios.post('/api/axiosdelete',{id : 'gktgnjftm'})
      .then(res => {
          this.deletedata = res.data.test;
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
