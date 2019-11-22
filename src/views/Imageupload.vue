<template>
    <v-app id = "imageUpload">
         <div id = "imageUpload">
            <input type = "file" name= "myfile3" ref = "file" multiple="multiple" @change = "uploadFiles"/>
            <v-btn color = "imagetest" @click="upload()">Upload</v-btn>
        </div>
        <div v-for = "(item,idx) in testname" :key="idx">
            {{item.name}} <v-btn v-on:click="deleteFiles({item},idx)" color="red">취소</v-btn>
        </div>
        <v-list>
            <v-list-item v-for = "(item,idx) in receivedfile" :key="idx">
                <v-img v-bind:src = item height = "200" width="300"></v-img>
            </v-list-item>   
        </v-list> 
        <v-btn color = "blue" @click="videoupload()">video upload test</v-btn>
        <v-btn color = "warning" @click="videostop()">video stop</v-btn>
        <iframe src="https://youtu.be/8aGhZQkoFbQ" allowfullscreen></iframe>
    </v-app>
</template>
<script>
import axios from 'axios'
import myvideo from 'vue-video'
import { chartreuse } from 'color-name';
export default {
    data() {
        return {
            formdata : new FormData(),
            files : [],
            receivedfile : [],
            testname : [],
            uploadvideo : "",
            video : {
                sources : [{
                    src : 'https://youtu.be/8aGhZQkoFbQ',
                    type: 'video/mp4'
                }],
                options : {
                    autoplay : true,
                    volume : 0.6,
                }
            }
        }
    },
    methods : {

        uploadFiles() {
            let selected = this.$refs.file.files;
            for(var i =0 ;i<selected.length;i++){
                this.testname.push(selected[i])
            }
        },
        deleteFiles({deletedname,idx}) {
            this.formdata.delete(deletedname)
            this.testname.splice(idx,1)
        },
        async upload(){
            try {
                for(var j = 0;j<this.testname.length;j++){
                    this.formdata.append('myfile3',this.testname[j])
                }
                const response = await axios({
                    method: 'post',
                    url :'/api/imageupload',
                    data : this.formdata,
                    headers : {'Content-Type':'multipart/form-data'}
                })
                this.formdata.delete('myfile3')
                this.test = response.data.test
                for(var i = 0;i<response.data.file.length;i++) {
                    this.receivedfile.push("http://localhost:3001"+response.data.file[i]);
                }
                alert(this.test);
            }
            catch(err){
                console.log(err);
            }
        },
         videoupload(){
            this.$refs.videoRef.src = "https://youtu.be/8aGhZQkoFbQ";
            this.$refs.videoRef.play();
        }
    }
}
</script>