<template>
  <div class="form">
    <el-form :model="form" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder=" ">
          <el-option label="admin" value="admin"></el-option>
          <el-option label="user" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">submit</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { addUser } from '@/api/admin'
import { ElMessage } from 'element-plus'
const form = reactive({
  name: '',
  account: '',
  role: '',
})

const rules = {
  name: [{ required: true, message: '输入用户名', trigger: 'blur' }],
  account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

const onSubmit = async () => {
  try {
    const response = await addUser(form)
    console.log(response)

    if (!response) {
      ElMessage.error('添加失败')
      throw new Error('失败')
    }
    alert('添加成功')
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped>
.form {
  width: 300px;
}
</style>
