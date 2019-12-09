<template>
        <v-app>
           <boardheader :page="page" :total="total" @registercontent ="registercontent" @nextpagination ="nextpagination" @prevpagination="prevpagination"/>
           <boardcontent :uploaddata="uploaddata" :replydata="replydata" :rereplydata="rereplydata" @removeboardcontent = "removeboardcontent" @likeboardcontent = "likeboardcontent" 
           @dislikeboardcontent ="dislikeboardcontent" @reportcntcontent="reportcntcontent"
           @savereplycontent="savereplycontent" @saverereplycontent="saverereplycontent"
           @likereplycontent="likereplycontent" @likerereplycontent="likerereplycontent"
           />
           <replycontent/>
        </v-app>
</template>

<script>
import boardheader from "./Boardheader"
import boardcontent from "./Boardcontent"
import replycontent from "./Replycontent"
import axios from 'axios'
import { link } from 'fs'
export default {
    data() {
        return {
            uploaddata : [],
            replydata : [],
            rereplydata: [],
            page : 0,
            total : 0
        }
    },
    components : {
        boardheader,
        boardcontent,
        replycontent
    },
    methods : {
        async dataupload(){
            try {
                    const res = await axios({
                    method : 'post',
                    url : '/api/dataupload',
                    data : {page : this.page}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.replydata = res.data.replydata[0].reply
            }
            catch(err) {
                console.log(err)
            }
        },
        async registercontent(category,linkaddress,title,author,password){
            
            try {
                //현재 페이지 다시 계산, 전체 게시글 수 다시 계산
                    const res = await axios({
                        method : 'post',
                        url : '/api/saveboard',
                        data : {category : category , linkaddress : linkaddress , title : title, author : author, password : password}
                    })
                    const aa = res.data.test
                    if(aa!= undefined){
                        this.uploaddata = [
                            ...this.uploaddata,
                            {
                                author : aa.author , boardnumber : aa.boardnumber, category : aa.category, dislikenumber : aa.dislikenumber,iframetoggle : aa.iframetoggle,
                                likenumber : aa.likenumber, linkaddress : aa.linkaddress, password : aa.password, reportcnt : aa.reportcnt, title : aa.title
                            }
                        ]
                        alert('등록이 완료되었습니다')
                        this.dataupload()
                    }
                    else {
                        alert(res.data.err.name)
                    }
            }
            catch(err) {
                console.log(err)
            }
        },
        async removeboardcontent(boardnumber,password){
            try {
                //현재 페이지 다시 계산, 전체 게시글 수 다시 계산
                const res = await axios({
                    method : 'post',
                    url : '/api/removeboardcontent',
                    data : {boardnumber : boardnumber,password: password}
                })
                alert(res.data.test)
                this.uploaddata = this.uploaddata.filter(uploaddata => uploaddata.boardnumber !== boardnumber)
                this.dataupload()
            }
            catch(err){
                console.log(err)
            }
        },
        async nextpagination(page){
            var aa = page
            aa++
            try {
                const res = await axios({
                    method : 'post',
                    url :'/api/nextpagination',
                    data : {page : aa}
                })
                alert(res.data.test)
                this.uploaddata = res.data.test
                this.page = aa
            }
            catch(err) {
                console.log(err)
            }
        },
        async prevpagination(page) {
            var aa = page
            aa--
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/pastpagination',
                    data : {page : aa}
                })
                alert(res.data.test)
                this.uploaddata = res.data.test
                this.page = aa
            }
            catch(err){
                console.log(err)
            }
        },
        async likeboardcontent(boardnumber,likenumber) {
            try {
                const res = await axios({
                    method :'post',
                    url :'/api/likeboardcontent',
                    data : {boardnumber : boardnumber,likenumber : likenumber}
                })
                let idx = this.uploaddata.findIndex((obj => obj.boardnumber == boardnumber))
                if(res.data.test !=="no"){
                    alert('좋아요가 반영되었습니다')
                    this.uploaddata[idx].likenumber = res.data.test.likenumber
                }
                else {
                    alert('이미 좋아요를 눌렀습니다, 다른 IP를 이용해주세요')
                }
            }
            catch(err) {
                console.log(err)
            }
        },
        async likereplycontent(reboardnumber,relikenumber){
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/likereplycontent',
                    data : {reboardnumber : reboardnumber, relikenumber : relikenumber}
                })
                let idx = this.replydata.findIndex((obj=>obj.reboardnumber == reboardnumber))
                if(res.data.test !=="no"){
                    alert('댓글에 추천이 신청되었습니다')
                    this.replydata[idx].relikenumber = res.data.test.relikenumber
                } else {
                    alert('이미 좋아요를 눌렀습니다, 다른 IP를 이용해주세요')
                }
            }
            catch(err){
                console.log(err)
            }
        },
        async likerereplycontent(rereboardnumber,rerelikenumber){
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/likerereplycontent',
                    data : {rereboardnumber : rereboardnumber, rerelikenumber : rerelikenumber}
                })
                let idx = this.rereplydata.findIndex((obj => obj.rereboardnumber == rereboardnumber))
                if(res.data.test !== "no") {
                    alert('답글에 추천이 신청되었습니다')
                    this.rereplydata[idx].rerelikenumber = res.data.test.rerelikenumber
                } else {
                    alert('이미 좋아요를 눌렀습니다, 다른 IP를 이용해주세요')
                }
                
            }
            catch(err) {
                console.log(err)
            }
        },
        async dislikeboardcontent(boardnumber,dislikenumber) {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/dislikeboardcontent',
                    data : {boardnumber : boardnumber, dislikenumber : dislikenumber}
                })
                let idx = this.uploaddata.findIndex((obj => obj.boardnumber == boardnumber))
                if(res.data.test !== "no") {
                    alert('싫어요가 반영되었습니다')
                    this.uploaddata[idx].dislikenumber = res.data.test.dislikenumber
                }
                else {
                    alert('이미 싫어요를 눌렀습니다.')
                }
            }
            catch(err){
                console.log(err)
            }
        },
        async reportcntcontent(boardnumber,reportcnt) {
            try {
                const res = await axios({
                    method: 'post',
                    url : '/api/reportcntcontent',
                    data : {boardnumber : boardnumber,reportcnt :reportcnt}
                })
                let idx = this.uploaddata.findIndex((obj => obj.boardnumber == boardnumber))
                if(res.data.test.reportcnt >= 5) {
                    alert('신고 횟수가 5회가 넘어 게시글이 삭제됩니다')
                    this.removeboardcontent(boardnumber,res.data.test.password)
                }
                else if(res.data.test !== "no") {
                    alert('신고가 반영되었습니다')
                    this.uploaddata[idx].reportcnt = res.data.test.reportcnt
                }
                else {
                    alert('이미 신고를 눌렀습니다.')
                }
            }
            catch(err){
                console.log(err)
            }
        },
        async savereplycontent(boardnumber,reauthor,repassword,recontent){
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/savereply',
                    data : {boardnumber : boardnumber, reauthor : reauthor , repassword : repassword, recontent : recontent}
                })
                alert('댓글이 성공적으로 저장되었습니다')
            }
            catch(err){
                console.log(err)
            }
        },
        async saverereplycontent(boardreplynumber,rereauthor,rerepassword,rerecontent) {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/saverereply',
                    data : { boardreplynumber : boardreplynumber, rereauthor : rereauthor, rerepassword: rerepassword, rerecontent : rerecontent}
                })
                alert('대댓글이 성공적으로 저장되었습니다')
            }
            catch(err){
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