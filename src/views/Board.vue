<template>
    <div id ="board">
        <section class = "boardapp">
            <v-app>
           <boardheader :page="page" :total="total" @registercontent ="registercontent" @nextpagination ="nextpagination" @prevpagination="prevpagination"/>
           <boardcontent :uploaddata="uploaddata" @removeboardcontent = "removeboardcontent" @likeboardcontent = "likeboardcontent" @dislikeboardcontent = "dislikeboardcontent"/>
           <replycontent/>
           </v-app>
        </section>
    </div>
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
                this.uploaddata = res.data.data[0].test
                this.total = res.data.data[1].total / 3
                alert(this.uploaddata)
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
        async removeboardcontent(boardnumber){
            try {
                //현재 페이지 다시 계산, 전체 게시글 수 다시 계산
                const res = await axios({
                    method : 'post',
                    url : '/api/removeboardcontent',
                    data : {boardnumber : boardnumber}
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
                alert('좋아요가 반영되었습니다')
                let idx = this.uploaddata.findIndex((obj => obj.boardnumber == boardnumber))
                this.uploaddata[idx].likenumber = res.data.test.likenumber
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
                alert('싫어요가 반영되었습니다')
                let idx = this.uploaddata.findIndex((obj => obj.boardnumber == boardnumber))
                this.uploaddata[idx].dislikenumber = res.data.test.dislikenumber
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