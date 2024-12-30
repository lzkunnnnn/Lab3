<template>
  <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
<!--   <RouterLink to="addUser">添加用户</RouterLink> <br /> -->

  <el-table :data="users" style="width: 100%" v-loading="loading">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="account" label="账户" width="180" />
    <el-table-column prop="role" label="角色" width="180" />
    <el-table-column fixed="right" label="操作" width="180">
      <template v-slot="scope">
        <el-button type="primary" size="small" @click="editDialog(scope.row.account)"
          >重置密码</el-button
        >
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

  <el-dialog title="提示" v-model="editDialogVisible" width="30%">
    <span>是否重置用户密码</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword(accountToReset)">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="添加用户" v-model="addDialogVisible" width="30%">
    <AddUserForm @add="getUser"></AddUserForm>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script setup lang="ts">
import { deletex, get } from '@/api/admin'
import axios from '@/stores/axios'
import { onMounted } from 'vue'
import AddUserForm from '@/components/admin/AddUserForm.vue'

//获取用户
const users = ref([])
const loading = ref(true)
const getUser = async () => {
  try {
    const url = 'admin/getUsers'
    users.value = await get(url)
    loading.value = false
  } catch (error) {
    console.log('请求失败', error)
  }
}
onMounted(getUser)

//删除用户
const userToDelete = ref('')
const dialogVisible = ref(false)
//显示确认框
const showDialog = (id: string) => {
  dialogVisible.value = true
  userToDelete.value = id
}
//真·删除
const deleteUser = async (id: string) => {
  const url = 'admin/users/' + id
  try {
    users.value=await deletex(url)
  } catch (error) {
    console.log('删除失败', error)
  }
  dialogVisible.value = false
}

//重置密码
const accountToReset = ref('')
const editDialogVisible = ref(false)

const editDialog = (account: string) => {
  accountToReset.value = account
  editDialogVisible.value = true
}

const resetPassword = async (account: string) => {
  const url = 'admin/users/' + accountToReset.value + '/password'
  try {
    const response = await axios.put(url)
    console.log(response.data)
  } catch (e) {
    console.log('失败')
  }
  editDialogVisible.value = false
}

const addDialogVisible = ref<boolean>(false)


</script>
