<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="formRef">
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
const form = reactive({
  name: null,
  account: null,
  role: null,
})
const formRef = ref(null)

const spaceValidator = (rule, value, callback) => {
  if (value && value.includes(' ')) {
    callback(new Error('输入值不能包含空格'))
  } else {
    callback()
  }
}


const rules = {
  name: [
    { required: true, message: '输入用户名', trigger: 'blur' },
    { validator: spaceValidator, trigger: 'blur' },
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { validator: spaceValidator, trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' },
    // 角色选择不需要检查空格
  ],
}
const emit = defineEmits(['add'])
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      addUser(form)
        .then((response) => {
          if (response) {
            alert('添加成功')
            emit('add','')
            formRef.value.resetFields()
          } else {
            alert('添加失败')
          }
        })
        .catch((error) => {
          console.error('添加失败', error)
        })
    } else {
      alert('非法输入')
    }
  })
}
</script>
<style scoped>
.form {
  width: 300px;
}
</style>
