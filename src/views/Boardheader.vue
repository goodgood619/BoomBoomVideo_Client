<template>
    <div id = "Boardheader">
        <div id = "header">
         <v-btn color = "red" dark @click="onclick()">영상등록</v-btn>
         <div style = "position:absolute; right : 0px; top :0px">
            <v-btn v-show="page>0" @click="prevpagination">이전</v-btn>
            <v-btn color="yellow">{{page+1}}</v-btn>
            <v-btn v-show="page<total-1" @click="nextpagination">다음</v-btn>
         </div>
         
         <v-dialog v-model="overlay" content-class="centered-dialog">
             <v-container fill-height>
                  <v-layout column justify-center align-center>
                     <v-progress-circular color="red" :size="70" :width="7" indeterminate v-show="overlay"></v-progress-circular>
                     <h1 v-if="overlay">등록중입니다. 잠시만 기다려주세요</h1>
                  </v-layout>
             </v-container>
         </v-dialog>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <v-btn flat-small :class="{'active': selectedtoggle == 0}" @click="currentupload(0)">전체</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 1}" @click="lolupload(1)">LoL</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 2}" @click="gameupload(2)">게임</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 3}" @click="bgroundupload(3)">배그</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 4}" @click="owatchupload(4)">오버워치</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 5}" @click="humordataupload(5)">유머</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 6}" @click="musicupload(6)">음악</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 7}" @click="impressupload(7)">감동</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 8}" @click="animalupload(8)">동물</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 9}" @click="sportsupload(9)">스포츠</v-btn>
          <v-btn flat-small :class="{'active': selectedtoggle == 10}" @click="etcupload(10)">기타</v-btn>
        </tr>
      </thead>
    </template>
    </v-simple-table>
    <!-- 좋아요, 등록순 -->
    <div id = "r_side" style = "position: absolute; top :100px; left: 850px ; width :170px">
        <div :class="{'active': selectedtoggle == 11}" @click="likeupload(11)" style="cursor:pointer;text-align:center; background:#E8FFE0; width:150px; padding:4px; border:1px solid #CEA; margin:0 5px 5px 5px;">좋아요순</div>
        <div :class="{'active': selectedtoggle == 12}" @click="searchupload(12)" style="cursor:pointer;text-align:center; background:#E8EFF0; width:150px; padding:4px; border:1px solid #CEA; margin:0 5px 5px 5px;">검색</div>
        <div :class="{'active': selectedtoggle == 13}" @click="registerupload(13)" style="cursor:pointer;text-align:center; background:#F8EFE0; width:150px; padding:4px; border:1px solid #CEA; margin:0 5px 15px 5px;">등록순</div>
    </div>
    <form class="border-solid : 1px color:red;" action="http://fow.kr/" style="position: absolute ; top : 0px; left : 200px;">
        <input type="text" name="su" placeholder="소환사명 입력..." required="">
        <v-btn type="submit">롤전적 검색</v-btn>
    </form>
 </div>
        <!-- 게시물 등록폼 -->
            <v-dialog v-model ="dialog" max-width = "400px" max-height = "50px">
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
            <!-- 검색 폼 -->
            <v-dialog v-model ="searchdialog" max-width = "400px" max-height = "50px">
            <v-card>
                <v-card-title>
                    <h2>FOW 게시물검색</h2>
                </v-card-title>
                    <v-card-text>
                        <v-form class = "px-3">
                            <v-select :items = "searchitems" label = "분류" v-model="searchcategory"></v-select>
                            <v-textarea label ="게시물 제목을 입력해주세요" v-model="searchtitle"></v-textarea>
                            <v-btn class = "success mx-0 mt-3" @click="searchcontent()">검색</v-btn>
                            <v-btn class = "cancel mx-3 mt-3" @click="searchdialog = false">취소</v-btn>
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
    props : {
        page : {type: Number, default : 0},
        total : {type: Number, default : 0},
        overlay : {type : Boolean, default: false},
        selectedcategory : {type :String, default : "전체"}
    },
    data() {
        return {
            dialog : false,
            searchdialog : false,
            selectedtogglearray : [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
            selectedtoggle : Number,
            items : ['LOL','게임','배그','오버워치','유머','음악','감동','동물','스포츠','기타'],
            searchitems : ['전체','LOL','게임','배그','오버워치','유머','음악','감동','동물','스포츠','기타','좋아요','등록순'],
            category : "", linkaddress : "", title : "", author : "", password : "",
            searchcategory : "", searchtitle : "",
        }
    },
    methods : {
        onclick() {
            this.dialog = !this.dialog
        },
        registercontent() {
            if(this.linkaddress !== "" && this.category !==""){
                this.overlay = true
                this.$emit('registercontent',this.category,this.linkaddress,this.title,this.author,this.password)
                this.category = "", this.linkaddress = "", this.title = "", this.author = "", this.password = ""
            }
            else {
                alert('link와 출처를 꼭 입력해주세요.')
            }
        },
        searchcontent() {
            if(this.searchtitle !== "" && this.searchcategory !=="") {
                this.$emit('searchcontent',this.searchtitle, this.searchcategory)
            } else {
                alert('title을 입력해주세요')
            }
        },
        nextpagination(){
            this.$emit('nextpagination',this.page,this.selectedcategory,this.searchtitle,this.searchcategory)
        },
        prevpagination(){
            this.$emit('prevpagination',this.page,this.selectedcategory,this.searchtitle,this.searchcategory)
        },
        resetsearch() {
            if(this.searchtitle !=="") this.searchtitle = ""
            if(this.searchcategory !== "") this.searchcategory = ""
        },
        currentupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('currentupload')  
        },
        lolupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('lolupload')  
        },
        gameupload(selected){
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('gameupload')
        },
        bgroundupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('bgroundupload')
        },
        owatchupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('owatchupload')
        },  
        humordataupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch() 
            this.$emit('humordataupload')
        },
        musicupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('musicupload')
        },
        impressupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('impressupload')
        },
        animalupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('animalupload')
        },
        sportsupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('sportsupload')
        },
        etcupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('etcupload')
        },
        likeupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('likeupload')
        },
        searchupload(selected) {
           this.selectedtoggle = selected
           this.searchdialog = !this.searchdialog
        },
        registerupload(selected) {
            this.selectedtoggle = selected
            this.resetsearch()
            this.$emit('registerupload')
        }
    }
}
</script>

<style scoped>
.v-dialog.centered-dialog
 {
    background: red;
    box-shadow: none;
    border-radius: 6px;
    width: 30px;
  }
  .active {
      color : red;
  }
</style>