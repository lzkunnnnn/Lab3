<script setup lang="ts">
import { RouterView } from 'vue-router'
import request from '@/utils/request'
request(
  {
    method: 'GET',
    // http://39.97.218.60/front/ad/getAdList
    //request 和 url 拼接起来
    //url: "/front/ad/getAdList"
    url: "/api/admin/users"
  }
).then(res => {
  console.log(res)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
