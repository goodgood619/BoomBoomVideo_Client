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
                            <v-select :items = "items" label = "분류" v-model= "selected"></v-select>
                            <v-textarea label ="링크(필수입력)"></v-textarea>
                            <v-textarea label = "제목"></v-textarea>
                            <v-textarea label = "이름"></v-textarea>
                            <v-textarea label = "암호"></v-textarea>
                            <v-btn class = "success mx-0 mt-3" @click= "testvmodel()">등록</v-btn>
                            <v-btn class = "cancel mx-3 mt-3" @click="dialog = false">취소</v-btn>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog : false,
            items : ['LOL','게임','배그','오버워치','유머','음악','감동','동물','스포츠','기타'],
            selected : ""
        }
    },
    methods : {
        onclick() {
            alert('test')
        },
        testvmodel() {
                alert(this.selected)
        }
    }
}
</script>

<style scoped>

</style>