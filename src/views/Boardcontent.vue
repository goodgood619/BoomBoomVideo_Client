<template>
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
      <!-- <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody> -->
    </template>
    </v-simple-table>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>