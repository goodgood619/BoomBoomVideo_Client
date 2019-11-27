<template>
    <div id ="board">
        <section class = "boardapp">
            <v-app>
           <boardheader :page="page" @registercontent ="registercontent"/>
           <boardcontent :uploaddata="uploaddata" @removeboardcontent = "removeboardcontent"/>
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
            page : 1
        }
    },
    components : {
        boardheader,
        boardcontent,
        replycontent
    },
    methods : {
        async registercontent(category,linkaddress,title,author,password){
            try {
                    const res = await axios({
                        method : 'post',
                        url : '/api/saveboard',
                        data : {category : category , linkaddress : linkaddress , title : title, author : author, password : password}
                    })
                    const aa = res.data.test
                    this.uploaddata = [
                        ...this.uploaddata,
                        {
                            author : aa.author , boardnumber : aa.boardnumber, category : aa.category, dislikenumber : aa.dislikenumber,iframetoggle : aa.iframetoggle,
                             likenumber : aa.likenumber, linkaddress : aa.linkaddress, password : aa.password, reportcnt : aa.reportcnt, title : aa.title
                        }
                    ]
            }
            catch(err) {
                console.log(err)
            }
        },
        async dataupload(){
            try {
                    const res = await axios({
                    method : 'post',
                    url : '/api/dataupload',
                    data : {page : this.page}
                })
                this.uploaddata = res.data.test
                alert(this.uploaddata)
            }
            catch(err) {
                console.log(err)
            }
        },
        async removeboardcontent(boardnumber){
            try {
                const res = await axios({
                    method : 'post',
                    url : '/api/removeboardcontent',
                    data : {boardnumber : boardnumber}
                })
                alert(res.data.test)
                this.uploaddata = this.uploaddata.filter(uploaddata => uploaddata.boardnumber !== boardnumber)

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