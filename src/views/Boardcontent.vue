<template>
<div class = "boardcontent">
    <div v-for = "(item,idx) in uploaddata" :key="idx">
    <div style = "position:relative; width:100%; height :90px;">
        <!-- 좋아요 버튼 싫어요 버튼(추천) -->
        <div style="position:absolute; left:0px; top:4px; width:80px; text-align:center; line-height:150%;">
            <v-btn color = "blue" @click ="likeboardcontent(item.boardnumber,item.likenumber)">좋아요</v-btn>
            <br>
            <span title="28" score="28">{{item.likenumber - item.dislikenumber}}</span>
            <br>
            <v-btn color = "red" @click ="dislikeboardcontent(item.boardnumber,item.dislikenumber)">싫어요</v-btn>
        </div>
        <!-- iframe 관련 이미지(thumbnail) -->
        <div class="ll_thumb" style="position:absolute; left:80px; top:4px; width:120px; height:90px; overflow:hidden; text-align:center; border:1px solid silver;">
            <div style="position:absolute; left:52px; top:32px;">
                <img class="play_btn" src="http://z.fow.kr/img/play.png" @click="item.iframetoggle = !item.iframetoggle" style="position: absolute; left: -23px; top: -17px; border: 0px; cursor: pointer">
                <!-- <v-btn big class = "mx-100 mt-90">영상보기</v-btn> -->
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
            <span class="position: relative; comments ui-widget-content ui-corner-all" style="padding:3px; font-family:gulim; cursor:pointer;" @click="item.replytoggle = !item.replytoggle">[{{getreplycnt(item.boardnumber)}}]개의 댓글</span>
            <v-btn small dark @click ="removebutton(item.boardnumber)" style="padding:3px; font-family:gulim; cursor:pointer;">삭제</v-btn>
            <v-btn small white @click="registerreplybutton(item.boardnumber)" style="padding:3px; font-family:gulim; cursor:pointer;">댓글등록</v-btn>
        <v-dialog v-model="deletetoggle" max-width = "200px" max-height = "30px" :retain-focus="false">
            <v-card>
                <v-card-title>
                    <h2>게시물 삭제</h2>
                </v-card-title>
                    <v-card-text>
                        <v-form class = "px-3">
                            <v-textarea label = "암호" v-model="password"></v-textarea>
                            <v-btn class = "success mx-0 mt-3" @click="removeboardcontent(testboardnumber,password)">삭제</v-btn>
                            <v-btn class = "cancel mx-3 mt-3" @click="deletetoggle = false">취소</v-btn>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog> 
                <div style="position:absolute; right:160px; top:10px;">
                    <span class="send_report ui-widget-content ui-corner-all" style="background:#FDD; padding:3px; font-family:gulim; cursor:pointer;" @click="reportcontent(item.boardnumber,item.reportcnt)">신고</span>
                    <span class="ui-widget-content ui-corner-all" style="background:#DDF; padding:3px; font-family:gulim;" title="">분류: {{item.category}}</span> 
                </div>
        </div>
    </div>
        <!-- iframe link(toggle) -->
        <div v-show ="item.iframetoggle" style="vertical-align: middle; border-top:0px solid; padding: 8px 8px 8px 75px;color:white">
            <div style="margin-left:-85px;">
                <iframe height="411" width="730" frameborder="0" v-bind:src=item.videolinkaddress>
                </iframe>
            </div>
        </div>
        <!-- 댓글 등록 v-dialog -->
        <v-dialog v-model="replytoggle" max-width = "400px" max-height = "30px" :retain-focus="false">
            <v-card>
                <v-card-title>
                    <h2>댓글등록</h2>
                </v-card-title>
                    <v-card-text>
                        <v-form class = "px-3">
                            <div style="padding:5px; margin-left:80px;">이름: 
                            <input v-model="reauthor" class="ui-widget-content ui-corner-all" style="width:200px;">
                            &nbsp; 
                            암호: 
                            <input v-model ="repassword" class="ui-widget-content ui-corner-all" style="width:200px;"> &nbsp; 
                            <br>
                            내용: <input v-model="recontent" class="comment_memo ui-widget-content ui-corner-all" style="width:480px;"> &nbsp; 
                        <br>
                        <span style="color:red;">※ 추천유도!, 비방성 댓글, 허위사실, 비속어 등은 자제해 주세요.</span>
                            <v-btn class = "success mx-0 mt-3" @click="savereplycontent(testboardnumber,reauthor,repassword,recontent)">등록</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog> 
        <!-- 여기서 이제 댓글리스트들을 반복문을 쫙돌면서 그냥 div공간을 할당시켜주면 된다 -->
        <div v-show ="item.replytoggle" style="vertical-align: middle; border-top:0px solid; padding: 8px 8px 8px 75px;">
            <div v-for ="(item2,idx) in getreplycontent(item.boardnumber)" :key="idx">
                <div>
                    <div style="position:relative; color:#77D; font-size:9pt; width:100%; background:#F0F0F0; padding:2px; border-top:1px solid #AAA; border-bottom:1px dotted #CCC;">{{item2.reauthor}} 
                        <img title="답글" class="show_reply_comment" style="cursor:pointer; vertical-align:middle;" src="http://z.fow.kr/img/reply_comment.gif" 
                        @click="registerrereplycontent(item.boardnumber,item2.reboardnumber)">&nbsp;
                        <img title="삭제" class="delete_comment" style=" vertical-align:middle;" src="http://z.fow.kr/img/delete.gif" @click="removereplybutton(item2.reboardnumber)">
                        <div style="filter:alpha(opacity=70); opacity:0.7; color:#E5E5E5; position:absolute; top:3px; right:0px;">b8ed4ded 
                            <a class="sbtn small good_comment" gc="0">
                                <span style="color:#3333CC;" @click="likereplycontent(item2.reboardnumber,item2.relikenumber)">추천{{item2.relikenumber}}</span>
                            </a>  
                            <a class="sbtn small report_comment">
                                <span style="color:#CC3333;" @click="reportreplycontent(item2.reboardnumber,item2.re_reportcnt)">신고</span>
                            </a>
                        </div>
                    </div>
                    <div style="padding:5px 0px 10px 5px;" :class="{'blindforreport':item2.re_reportcnt >= 5}">{{item2.recontent}}</div>
                    <!-- 대댓글리스트 할당 -->
                    <div v-for ="(item3,idx) in getrereplycontent(item2.reboardnumber)" :key="idx">
                        <div style = "padding-left : 50px">
                        <div style="position:relative; color:#77D; font-size:9pt; width:100%; background:#F0F0F0; padding:2px; border-top:1px solid #AAA; border-bottom:1px dotted #CCC;">{{item3.rereauthor}} 
                        &nbsp;
                        <img title="삭제" class="delete_comment" style=" vertical-align:middle;" src="http://z.fow.kr/img/delete.gif" @click="removerereplybutton(item3.rereboardnumber)">
                            <div style="filter:alpha(opacity=70); opacity:0.7; color:#E5E5E5; position:absolute; top:3px; right:0px;">
                                <a class="sbtn small good_comment" gc="0">
                                    <span style="color:#3333CC;" @click="likerereplycontent(item3.rereboardnumber,item3.rerelikenumber)">추천{{item3.rerelikenumber}}</span>
                                </a>  
                                <a class="sbtn small report_comment">
                                    <span style="color:#CC3333;" @click="reportrereplycontent(item3.rereboardnumber,item3.rere_reportcnt)">신고</span>
                                </a>
                            </div>
                        </div>
                    <div style="padding:5px 0px 10px 5px;" :class="{'blindforreport':item3.rere_reportcnt >= 5}">{{item3.rerecontent}}</div>
                        </div>
                    </div>
                    <!-- 대댓글 등록 v-dialog -->
                    <v-dialog v-model="rereplytoggle" max-width = "400px" max-height = "30px" :retain-focus="false">
                        <v-card>
                            <v-card-title>
                                <h2>대댓글등록</h2>
                            </v-card-title>
                                <v-card-text>
                                    <v-form class = "px-3">
                                        <div style="padding:5px; margin-left:80px;">이름: 
                                        <input v-model="rereauthor" class="ui-widget-content ui-corner-all" style="width:200px;">
                                        &nbsp; 
                                        암호: 
                                        <input v-model ="rerepassword" class="ui-widget-content ui-corner-all" style="width:200px;"> &nbsp; 
                                        <br>
                                        내용: <input v-model="rerecontent" class="comment_memo ui-widget-content ui-corner-all" style="width:480px;"> &nbsp; 
                                    <br>
                                    <span style="color:red;">※ 추천유도!, 비방성 댓글, 허위사실, 비속어 등은 자제해 주세요.</span>
                                        <v-btn class = "success mx-0 mt-3" @click="saverereplycontent(testboardnumber,testboardreplynumber,rereauthor,rerepassword,rerecontent)">등록</v-btn>
                                        </div>
                                    </v-form>
                                </v-card-text>
                        </v-card>
                    </v-dialog> 
                    <!-- 댓글 삭제 dialog-->
                    <v-dialog v-model="removereplytoggle" max-width = "200px" max-height = "30px" :retain-focus="false">
                        <v-card>
                            <v-card-title>
                                <h2>댓글 삭제</h2>
                            </v-card-title>
                        <v-card-text>
                            <v-form class = "px-3">
                                <v-textarea label = "암호" v-model="password"></v-textarea>
                                <v-btn class = "success mx-0 mt-3" @click="removeboardreplycontent(testboardreplynumber,password)">삭제</v-btn>
                                <v-btn class = "cancel mx-3 mt-3" @click="removereplytoggle = false">취소</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog> 
                <!-- 대댓글 삭제 dialog -->
                <v-dialog v-model="removerereplytoggle" max-width = "200px" max-height = "30px" :retain-focus="false">
                        <v-card>
                            <v-card-title>
                                <h2>대댓글 삭제</h2>
                            </v-card-title>
                        <v-card-text>
                            <v-form class = "px-3">
                                <v-textarea label = "암호" v-model="password"></v-textarea>
                                <v-btn class = "success mx-0 mt-3" @click="removeboardrereplycontent(testboardrereplynumber,password)">삭제</v-btn>
                                <v-btn class = "cancel mx-3 mt-3" @click="removerereplytoggle = false">취소</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog> 
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    props : {
        uploaddata : {type : Array, default : ()=>[]},
        replydata : {type : Array,default : ()=>[]},
        rereplydata : {type : Array,default : ()=>[]},
    },
    data() {
        return {
            dialog : false,
            password : "",
            deletetoggle : false,
            replytoggle : false,
            removereplytoggle : false,
            removerereplytoggle : false,
            rereplytoggle :false,
            testboardnumber : Number,
            testboardreplynumber : Number,
            testboardrereplynumber : Number,
            recontent : "", repassword : "", reauthor : "",
            rerecontent :"" , rerepassword : "",rereauthor : ""
        }
    },
    methods : {
        removebutton(boardnumber){
                this.testboardnumber = boardnumber
                this.deletetoggle = !this.deletetoggle
        },
        registerreplybutton(boardnumber) {
            this.testboardnumber = boardnumber
            this.replytoggle = !this.replytoggle
        },
        removereplybutton(reboardnumber) {
            this.testboardreplynumber = reboardnumber
            this.removereplytoggle = !this.removereplytoggle
        },
        removerereplybutton(rereboardnumber){
            this.testboardrereplynumber = rereboardnumber
            this.removerereplytoggle = !this.removerereplytoggle
        },
        registerrereplycontent(boardnumber,reboardnumber) {
            this.testboardnumber = boardnumber
            this.testboardreplynumber = reboardnumber
            this.rereplytoggle = !this.rereplytoggle
        },
        removeboardcontent(boardnumber,password) { 
            this.$emit("removeboardcontent",boardnumber,password)
            this.password = ""
        },
        removeboardreplycontent(reboardnumber,password) {
            this.$emit("removeboardreplycontent",reboardnumber,password)
            this.password = ""
        },
        removeboardrereplycontent(rereboardnumber,password){
            this.$emit("removeboardrereplycontent",rereboardnumber,password)
            this.password = ""
        },
        likeboardcontent(boardnumber,likenumber) {
            this.$emit("likeboardcontent",boardnumber,likenumber)
        },
        likereplycontent(reboardnumber,relikenumber) {
            this.$emit("likereplycontent",reboardnumber,relikenumber)
        },
        likerereplycontent(rereboardnumber,rerelikenumber) {
            this.$emit("likerereplycontent",rereboardnumber,rerelikenumber)
        },
        dislikeboardcontent(boardnumber,dislikenumber) {
            this.$emit("dislikeboardcontent",boardnumber,dislikenumber)
        },
        reportcontent(boardnumber,reportcnt) {
            this.$emit("reportcontent",boardnumber,reportcnt)
        },
        reportreplycontent(reboardnumber,re_reportcnt) {
            this.$emit("reportreplycontent",reboardnumber,re_reportcnt)
        },
        reportrereplycontent(rereboardnumber,rere_reportcnt) {
            this.$emit("reportrereplycontent",rereboardnumber,rere_reportcnt)
        },
        savereplycontent(boardnumber,reauthor,repassword,recontent) {
            this.$emit("savereplycontent",boardnumber,reauthor,repassword,recontent)
            this.reauthor = "", this.repassword = "", this.recontent = ""
        },
        saverereplycontent(boardnumber,boardreplynumber,rereauthor,rerepassword,rerecontent) {
            this.$emit("saverereplycontent",boardnumber,boardreplynumber,rereauthor,rerepassword,rerecontent)
            this.rereauthor = "",this.rerepassword = "",this.rerecontent = ""
        },
        getreplycontent(boardnumber) {
            let ret = [];
            for(let i in this.replydata) {
                if(boardnumber === this.replydata[i].boardnumber) {
                    if(this.replydata[i].re_reportcnt >= 5){
                        this.replydata[i].recontent = "다수의 신고로 인해 해당 내용은 블라인드처리 되었습니다"
                    }
                    ret.push(this.replydata[i])
                }
            }
            return ret
        },
        getreplycnt(boardnumber) {
            let ret = 0
            for(let k in this.replydata) {
                if(boardnumber === this.replydata[k].boardnumber){
                    ret++
                }
            }
            return ret
        },
        getrereplycontent(reboardnumber) {
            let ret = [];
            for(let i in this.rereplydata) {
                if(reboardnumber === this.rereplydata[i].reboardnumber) {
                    if(this.rereplydata[i].rere_reportcnt >= 5){
                        this.rereplydata[i].rerecontent = "다수의 신고로 인해 해당 내용은 블라인드처리 되었습니다"
                    }
                    ret.push(this.rereplydata[i])
                }
            }
            return ret
        }
    }
}
</script>

<style scoped>
.blindforreport {
    color: red;
}
</style>