<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">submit</el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { addAnnouncement } from '@/api/admin'
const form = reactive({
  title: '',
  content: '',
})
const formRef = ref(null)

const spaceValidator = (rule, value, callback) => {
  if (value && value.includes(' ')) {
    callback(new Error('名称不能包含空格'))
  } else {
    callback()
  }
}

const rules = {
  title: [
    { required: true, message: '请输入公告标题', trigger: 'blur' },
    { max: 100, message: '长度不超过100个字符', trigger: 'blur' },
    { validator: spaceValidator, trigger: 'blur' },
  ],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
}

const emit = defineEmits(['add'])
const onSubmit = () => {
  formRef.value!.validate((valid) => {
    if (valid) {
      addAnnouncement(form)
        .then((response) => {
          if (response) {
            alert('添加成功')
            emit('add')
            formRef.value!.resetFields()
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
  width: 600px;
}
</style>
