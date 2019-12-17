<template>
        <v-app>
           <boardheader :page="page" :total="total" :overlay="overlay" :selectedcategory="selectedcategory" @registercontent ="registercontent" @nextpagination ="nextpagination" @prevpagination="prevpagination"
            @currentupload ="currentupload" @lolupload="lolupload" @gameupload="gameupload" @bgroundupload="bgroundupload" @owatchupload="owatchupload" 
            @humordataupload="humordataupload" @musicupload="musicupload" @impressupload="impressupload" @animalupload="animalupload" @sportsupload="sportsupload" @etcupload="etcupload"
            @likeupload="likeupload" @registerupload="registerupload" @searchcontent="searchcontent"
           />
           <boardcontent :uploaddata="uploaddata" :replydata="replydata" :rereplydata="rereplydata" @removeboardcontent="removeboardcontent" @likeboardcontent ="likeboardcontent" 
           @dislikeboardcontent ="dislikeboardcontent" @reportcontent="reportcontent"
           @savereplycontent="savereplycontent" @saverereplycontent="saverereplycontent"
           @likereplycontent="likereplycontent" @likerereplycontent="likerereplycontent"
           @reportreplycontent="reportreplycontent" @removeboardreplycontent="removeboardreplycontent"
           @removeboardrereplycontent="removeboardrereplycontent" @reportrereplycontent="reportrereplycontent"
           />
        </v-app>
</template>

<script>
import boardheader from "./Boardheader"
import boardcontent from "./Boardcontent"
import axios from 'axios'
import { link } from 'fs'
export default {
    data() {
        return {
            uploaddata : [],
            replydata : [],
            rereplydata: [],
            page : 0,
            selectedcategory : "",
            total : 0,
            overlay : false
        }
    },
    components : {
        boardheader,
        boardcontent,
    },
    watch: {
        uploaddata() {
            this.overlay = false
        }
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
                this.selectedcategory = "최신순"
            }
            catch(err) {
                console.log(err)
            }
        },
        async searchcontent(searchtitle, searchcategory) {
                try {
                    const res = await axios({
                        method : 'post',
                        url : '/api/searchcontent',
                        data : {searchtitle : searchtitle, searchcategory : searchcategory}
                    })
                    this.uploaddata = res.data.uploaddata[0].uploaddata
                    this.replydata = res.data.replydata[0].reply
                    this.rereplydata = res.data.rereplydata[0].rereply
                    this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                    this.page = 0
                    this.selectedcategory = "검색"
                } catch(err) {
                    console.log(err)
                }
        },
        async currentupload(selectedcategory){
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/currentupload'
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.page = 0
                this.selectedcategory = "최신순"
            } catch(err){
                console.log(err)
            }
        },
        async lolupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/lolupload',
                    data : {category : 'LOL'}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "LOL"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async gameupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/gameupload',
                    data : {category : "게임"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "게임"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async bgroundupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/bgroundupload',
                    data : {category : "배그"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "배그"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async owatchupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/owatchupload',
                    data : {category : "오버워치"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "오버워치"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async humordataupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/humordataupload',
                    data : {category : '유머'} 
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "유머"
                this.page = 0
            } catch(err){
                console.log(err)
            }
        },
        async musicupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/musicupload',
                    data : {category : "음악"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "음악"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async impressupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/impressupload',
                    data : {category : "감동"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "감동"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async animalupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/animalupload',
                    data : {category : "동물"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "동물"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async sportsupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/sportsupload',
                    data : {category : "스포츠"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "스포츠"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async etcupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/etcupload',
                    data : {category : "기타"}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "기타"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async likeupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/likeupload'
                })
                alert(res.data.test)
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "좋아요"
                this.page = 0
            } catch(err) {
                console.log(err)
            }
        },
        async registerupload() {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/registerupload'
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.total = res.data.totalboardcontent[0].totalboardcnt / 3
                this.selectedcategory = "등록순"
                this.page = 0
            } catch(err){
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
                    if(aa != undefined){
                        this.uploaddata = [
                            ...this.uploaddata,
                            {
                                author : aa.author , boardnumber : aa.boardnumber, category : aa.category, dislikenumber : aa.dislikenumber,iframetoggle : aa.iframetoggle,
                                likenumber : aa.likenumber, linkaddress : aa.linkaddress, password : aa.password, reportcnt : aa.reportcnt, title : aa.title
                            }
                        ]
                        alert('등록이 완료되었습니다')
                        this.dataupload()
                    } else {
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
        async removeboardreplycontent(reboardnumber,repassword) {
            try {
                const res = await axios({
                    method: 'post',
                    url : '/api/removeboardreplycontent',
                    data : {reboardnumber : reboardnumber, repassword : repassword}
                })
                alert(res.data.test)
                this.replydata = this.replydata.filter(replydata => replydata.reboardnumber !== reboardnumber)
                this.dataupload()
            } catch(err) {
                console.log(err)
            }
        },
        async removeboardrereplycontent(rereboardnumber,rerepassword){
            try {
                const res = await axios({
                    method: 'post',
                    url : '/api/removeboardrereplycontent',
                    data : {rereboardnumber : rereboardnumber, rerepassword : rerepassword}
                })
                alert(res.data.test)
                this.rereplydata = this.rereplydata.filter(rereplydata => rereplydata.rereboardnumber !== rereboardnumber)
                this.dataupload()
            } catch(err){ 
                console.log(err)
            }
        },
        async nextpagination(page,selectedcategory,searchtitle,searchcategory){
            var aa = page
            aa++
            try {
                const res = await axios({
                    method : 'post',
                    url :'/api/nextpagination',
                    data : {page : aa ,category : selectedcategory, searchtitle : searchtitle, searchcategory : searchcategory}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.page = aa
                this.selectedcategory = selectedcategory
            }
            catch(err) {
                console.log(err)
            }
        },
        async prevpagination(page,selectedcategory,searchtitle,searchcategory) {
            var aa = page
            aa--
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/pastpagination',
                    data : {page : aa , category : selectedcategory, searchtitle: searchtitle, searchcategory : searchcategory}
                })
                this.uploaddata = res.data.uploaddata[0].uploaddata
                this.replydata = res.data.replydata[0].reply
                this.rereplydata = res.data.rereplydata[0].rereply
                this.page = aa
                this.selectedcategory = selectedcategory

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
        async reportcontent(boardnumber,reportcnt) {
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
        async reportreplycontent(reboardnumber,re_reportcnt) {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/reportreplycontent',
                    data : {reboardnumber : reboardnumber, re_reportcnt : re_reportcnt}
                })
                let idx = this.replydata.findIndex((obj=> obj.reboardnumber == reboardnumber))
                if(res.data.test.re_reportcnt>=5 ) {
                    alert('신고 횟수가 5회가 되었습니다, 이 댓글은 블라인드 처리됩니다')
                }
                else if(res.data.test !== "no"){
                    alert('댓글에 대해 신고가 반영되었습니다')
                    this.replydata[idx].re_reportcnt = res.data.test.re_reportcnt
                }
                else {
                    alert('이미 신고를 눌렀습니다')
                }
            }
            catch(err) {
                console.log(err)
            }
        },
        async reportrereplycontent(rereboardnumber,rere_reportcnt) {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/reportrereplycontent',
                    data : {rereboardnumber : rereboardnumber, rere_reportcnt : rere_reportcnt}
                })
                let idx = this.rereplydata.findIndex((obj=> obj.rereboardnumber == rereboardnumber))
                if(res.data.test.rere_reportcnt >= 5) {
                    alert('신고 횟수가 5회가 되었습니다, 이 댓글은 블라인드 처리됩니다')

                }
                else if(res.data.test !== "no") {
                    alert('대댓글에 대해 신고가 반영되었습니다')
                    this.rereplydata[idx].rere_reportcnt = res.data.test.rere_reportcnt
                }
                else {
                    alert('이미 신고를 눌렀습니다')
                }
            } catch(err){
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
        async saverereplycontent(boardnumber,boardreplynumber,rereauthor,rerepassword,rerecontent) {
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/saverereply',
                    data : { boardnumber : boardnumber, boardreplynumber : boardreplynumber, rereauthor : rereauthor, rerepassword: rerepassword, rerecontent : rerecontent}
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