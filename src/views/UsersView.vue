<template>
  <el-table :data="users" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="account" label="账户" width="180" />
    <el-table-column prop="role" label="角色" width="180"/>
  </el-table>
</template>

<script setup lang="ts">
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { onMounted } from 'vue'
const users = ref([])
const token = ref(localStorage.getItem('token'))
console.log(token.value)
onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/getUsers', {
      headers: {
        token: token.value,
      },
    })
    users.value = response.data.data
  } catch (error) {
    console.log('请求失败', error)
  }
})
</script>
<style scpoed></style>
