<template>
  <el-table :data="users" style="width: 100%" v-loading="loading">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="account" label="账户" width="180" />
    <el-table-column prop="role" label="角色" width="180" />
    <el-table-column fixed="right" label="操作" width="180">
      <template v-slot="scope">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small" @click="showDialog(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="提示" v-model="dialogVisible" width="30%">
    <span>确认删除</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser(userToDelete)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

const users = ref([])
const token = ref(localStorage.getItem('token'))
//console.log(token.value)
const loading = ref(true)
onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/getUsers', {
      headers: {
        token: token.value,
      },
    })
    users.value = response.data.data
    loading.value = false
  } catch (error) {
    console.log('请求失败', error)
  }
})


const userToDelete = ref('')
//确认框
const dialogVisible = ref(false)
const showDialog = (id: string) => {
  dialogVisible.value = true
  userToDelete.value = id
}

//删除用户
const deleteUser = async (id: string) => {
  const url = 'api/admin/users/' + id
  try {
    const response = await axios.delete(url, {
      headers: {
        token: token.value,
      },
    })
    console.log(response.data.data)
  } catch (error) {
    console.log(' 删除失败', error)
  }
  dialogVisible.value = false
}
</script>
