<template>
    <div class = "boardcontent">
    <v-simple-table>
        <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">전체</th>
          <th class="text-left">LoL</th>
          <th class = "text-left">게임</th>
          <th class = "text-left">배그</th>
          <th class = "text-left">오버워치</th>
          <th class= "text-left">유머</th>
          <th class = "text-left">음악</th>
          <th class = "text-left">감동</th>
          <th class = "text-left">동물</th>
          <th class = "text-left">스포츠</th>
          <th class = "text-left">기타</th>
        </tr>
      </thead>
    </template>
    </v-simple-table>
    <div style = "position:relative; width:100%; height :90px; border-top : 1px solid rgb(135,177,226)" v-for = "(item,idx) in uploaddata" :key="idx">
        <!-- 좋아요 버튼 싫어요 버튼(추천) -->
        <div style="position:absolute; left:0px; top:4px; width:80px; text-align:center; line-height:150%;">
            <v-btn color = "blue" @click ="likeboardcontent(item.boardnumber,item.likenumber)">좋아요</v-btn>
            <br>
            <span id="good_5ddca83c1d295a1d2c8b4567" title="28" score="28">{{item.likenumber - item.dislikenumber}}</span>
            <br>
            <v-btn color = "red" @click ="dislikeboardcontent(item.boardnumber,item.dislikenumber)">싫어요</v-btn>
        </div>
        <!-- iframe 관련 이미지(thumbnail) -->
        <div class="ll_thumb" style="position:absolute; left:80px; top:4px; width:120px; height:80px; overflow:hidden; text-align:center; border:1px solid silver;">
            <div style="position:absolute; left:52px; top:32px;">
                <v-btn class = "mx-90 mt-90" @click="item.iframetoggle = !item.iframetoggle">영상보기</v-btn>
            </div>
        </div>
        <!-- title 및 링크 -->
        <div style="position:absolute; left:210px; top:4px; width:515px; overflow:hidden;" class="ell">
            <a style="text-decoration:none;" target="_blank" :href=item.linkaddress>
            <span style="color:#2955BC; font-size:10pt; font-family:dotum; text-decoration:none;">
                <b>{{item.title}}</b>
            </span>
            <br>
                <span style="color:#BBB;">{{item.linktitle}}</span>
            </a>
            <br>
                <span style="color:#77D; font-size:10px;">{{item.author}} 님께서 올린 글/{{item.linkauthor}}</span>
            <br>
        </div>
        <!-- 댓글 갯수 -->
        <div style="position:absolute; width:500px; left:210px; bottom:-5px;">
            <span class="comments ui-widget-content ui-corner-all" style="padding:3px; font-family:gulim; cursor:pointer;" @click="item.replytoggle = !item.replytoggle" tid="5ddca83c1d295a1d2c8b4567">[ 0 ]개의 댓글</span>
               <v-dialog v-model="deletetoggle" max-width = "200px" max-height = "30px">
                <template v-slot:activator="{on}">
                    <v-btn class="c_delete ui-widget-content ui-corner-all" dark v-on="on" style="padding:3px; font-family:gulim; cursor:pointer;">삭제</v-btn>
                </template>
            <v-card>
                <v-card-title>
                    <h2>게시물 삭제</h2>
                </v-card-title>
                    <v-card-text>
                        <v-form class = "px-3">
                            <v-textarea label = "암호" v-model="password"></v-textarea>
                            <v-btn class = "success mx-0 mt-3" @click="removeboardcontent(item.boardnumber,password)">삭제</v-btn>
                            <v-btn class = "cancel mx-3 mt-3" @click="deletetoggle = false">취소</v-btn>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog> 
             <div style="position:absolute; right:160px; top:0px;">
                 <span class="send_report ui-widget-content ui-corner-all" style="background:#FDD; padding:3px; font-family:gulim; cursor:pointer;" tid="5ddca83c1d295a1d2c8b4567" title="">신고</span>
                  <span class="ui-widget-content ui-corner-all" style="background:#DDF; padding:3px; font-family:gulim;" tid="5ddca83c1d295a1d2c8b4567" title="">분류: {{item.category}}</span> 
            </div>
        </div>
        <!-- iframe link(toggle) -->
        <div v-show ="item.iframetoggle" style="vertical-align: middle; border-top: 100px solid; padding: 8px 8px 8px 75px; display: block;">
            <div style="margin-left:-85px;">
                <iframe height="411" width="730" frameborder="0" v-bind:src=item.linkaddress webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen">
                </iframe>
            </div>
        </div>
        <div v-show="item.replytoggle" style="vertical-align: middle; border-top: 1px dotted rgb(183, 209, 242);">
            <div style="padding:5px; margin-left:80px;">이름: 
            <input name="name" value="" class="ui-widget-content ui-corner-all" style="width:80px;" maxlength="10"> &nbsp; 암호: 
            <input name="pass" class="ui-widget-content ui-corner-all" style="width:80px;"> &nbsp; 
            <span style="font-size:11px; color:#F88;">(이름 생략 가능 / 암호 생략 시 IP로 자동인증 됩니다.)</span>
            <br>
            내용: 
            <input name="comm" class="comment_memo ui-widget-content ui-corner-all" style="width:480px;"> &nbsp; 
            <input name="id" type="hidden" value="5ddfec8a1d295a71288b4567">
            <span class="do_comment ui-widget-content ui-corner-all" style="cursor:pointer; padding:3px">&nbsp;
             √ &nbsp;</span><span class="error" style="color:red;"></span>
             <br>
             <span style="color:red;">※ 추천유도!, 비방성 댓글, 허위사실, 비속어 등은 자제해 주세요.</span>
             </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props : {
        uploaddata : {type : Array, default : ()=>[]}
    },
    data() {
        return {
            testlink : "https://www.youtube.com/embed/Bhdcy2GoUFc",
            dialog : false,
            password : "",
            deletetoggle : ""
        }
    },
    methods : {
        removeboardcontent(boardnumber,password) {
            this.$emit("removeboardcontent",boardnumber,password)
            this.password = ""
        },
        likeboardcontent(boardnumber,likenumber) {
            this.$emit("likeboardcontent",boardnumber,likenumber)
        },
        dislikeboardcontent(boardnumber,dislikenumber) {
            this.$emit("dislikeboardcontent",boardnumber,dislikenumber)
        }
    }
}
</script>

<style scoped>

</style>