<template>
    <div id = "Boardheader">
        <v-dialog v-model ="dialog" max-width = "400px" max-height = "50px">
            <template v-slot:activator="{on}">
            <v-btn color = "red" dark v-on="on">영상등록</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <h2>FOW 게시물등록</h2>
                </v-card-title>
                    <v-card-text>
                        <v-form class = "px-3">
                            <v-select :items = "items" label = "분류" v-model="category"></v-select>
                            <v-textarea label ="링크(필수입력)" v-model="linkaddress"></v-textarea>
                            <v-textarea label = "제목" v-model="title"></v-textarea>
                            <v-textarea label = "이름" v-model="author"></v-textarea>
                            <v-textarea label = "암호" v-model="password"></v-textarea>
                            <v-btn class = "success mx-0 mt-3" @click="registercontent()">등록</v-btn>
                            <v-btn class = "cancel mx-3 mt-3" @click="dialog = false">취소</v-btn>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import boardcontent from './Boardcontent'
export default {
    data() {
        return {
            dialog : false,
            items : ['LOL','게임','배그','오버워치','유머','음악','감동','동물','스포츠','기타'],
            category : "", linkaddress : "", title : "", author : "", password : ""
        }
    },
    methods : {
        onclick() {
            alert('test')
        },
        async registercontent() {
                try {
                    const res = await axios({
                        method : 'post',
                        url : '/api/saveboard',
                        data : {category : this.category, linkaddress : this.linkaddress, title : this.title, author : this.author, password : this.password}
                    })
                    alert(res.data);
                    this.category = "", this.linkaddress = "", this.title = "", this.author = "", this.password = ""
                }
                catch(err){
                    console.log(err)
                }
        }
    }
}
</script>

<style scoped>

</style>