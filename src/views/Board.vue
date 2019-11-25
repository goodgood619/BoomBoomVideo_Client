<template>
    <div id ="board">
        <section class = "boardapp">
            <v-app>
           <boardheader/>
           <boardcontent/>
           <replycontent/>
           </v-app>
        </section>
    </div>
</template>

<script>
import boardheader from "./Boardheader"
import boardcontent from "./Boardcontent"
import replycontent from "./Replycontent"
export default {
    components : {
        boardheader,
        boardcontent,
        replycontent
    }
}
</script>

<style scoped>

</style>