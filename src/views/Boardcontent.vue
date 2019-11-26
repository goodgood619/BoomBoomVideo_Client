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
    <div style = "position: relative; width:100%; height :90px; border-top : 1px solid rgb(135,177,226)" v-for = "(item,idx) in uploaddata" :key="idx">
        <!-- 좋아요 버튼 싫어요 버튼(추천) -->
        <div style="position:absolute; left:0px; top:4px; width:80px; text-align:center; line-height:150%;">
            <v-btn color = "blue" >좋아요</v-btn>
            <br>
            <span id="good_5ddca83c1d295a1d2c8b4567" title="28" score="28">{{item.likenumber}}</span>
            <br>
            <v-btn color = "red">싫어요</v-btn>
        </div>
        <!-- iframe 관련 이미지(thumbnail) -->
        <div class="ll_thumb" style="position:absolute; left:80px; top:4px; width:120px; height:80px; overflow:hidden; text-align:center; border:1px solid silver;">
            <div style="position:absolute; left:52px; top:32px;">
                <v-btn class = "mx-90 mt-90" @click='toggle = !toggle'>영상보기</v-btn>
            </div>
        </div>
        <!-- title 및 링크 -->
        <div style="position:absolute; left:210px; top:4px; width:515px; overflow:hidden;" class="ell">
            <a style="text-decoration:none;" target="_blank" href="http://www1.president.go.kr/petitions/583677">
            <span style="color:#2955BC; font-size:14pt; font-family:dotum; text-decoration:none;">
                <b>참여인원 : [ 190,491명 ]</b>
            </span>
                <img style="border:0px;" src="/img/new.png">
            <br>
                <span style="color:#BBB;">http://www1.president.go.kr/petitions/583677</span>
            </a>
            <br>
                <span style="color:#77D; font-size:11px;">{{item.author}} 님께서 올린 글 / 8시간 53분 17초  전</span>
            <br>
        </div>
        <!-- 댓글 갯수 -->
        <div style="position:absolute; width:500px; left:210px; bottom:0px;">
            <span class="comments ui-widget-content ui-corner-all" style="padding:3px; font-family:gulim; cursor:pointer;" tid="5ddca83c1d295a1d2c8b4567">[ 37 ]개의 댓글</span>
             <div style="position:absolute; right:160px; top:0px;">
                 <span class="send_report ui-widget-content ui-corner-all" style="background:#FDD; padding:3px; font-family:gulim; cursor:pointer;" tid="5ddca83c1d295a1d2c8b4567" title="">신고</span>
                  <span class="ui-widget-content ui-corner-all" style="background:#DDF; padding:3px; font-family:gulim;" tid="5ddca83c1d295a1d2c8b4567" title="">분류: LoL</span> 
            </div>
        </div>
        <!-- iframe link(toggle) -->
        <div v-show='toggle' id="memo_5ddb91ee1d295a806b8b4568" cid="5ddb91ee1d295a806b8b4568" style="vertical-align: middle; border-top: 1px dotted rgb(183, 209, 242); padding: 8px 8px 8px 75px; display: block;" isshow="1">
            <div style="margin-left:-85px;">
                <iframe height="411" width="730" frameborder="0" v-bind:src=testlink webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen">
                </iframe>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            uploaddata : [],
            testlink : "https://www.youtube.com/embed/Bhdcy2GoUFc",
            dialog : false,
            toggle : false
        }
    },
    methods : {
        async dataupload(){
            try {
                    const res = await axios({
                    method : 'get',
                    url : '/api/dataupload'
                })
                this.uploaddata = res.data.test
                alert(this.data)
            }
            catch(err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.dataupload()
    }
}
</script>

<style scoped>

</style>