<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="容纳人数" prop="quantity">
      <el-slider v-model="form.quantity" show-input></el-slider>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-select v-model="form.state" placeholder=" ">
        <el-option label="未占用" value="0"></el-option>
        <el-option label="已占用" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="管理员" prop="manager">
      <el-input v-model="form.manager"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>

    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form>
</template>
<script setup lang="ts">
import { addLab } from '@/api/admin'

const form = reactive({
  name: null,
  manager: null,
  quantity: null,
  description: null,
  state: null,
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
  name: [
    { required: true, message: '请输入实验室名称', trigger: 'blur' },
    { min: 1, max: 10, message: '长度不超过10个字符', trigger: 'blur' },
    { validator: spaceValidator, trigger: 'blur' },
  ],
  quantity: [{ required: true, message: '请选择容纳人数', trigger: 'blur' }],
  state: [
    { required: true, message: '请选择状态', trigger: 'change' },
  ],
  description: [{ max: 200, message: '长度不超过200个字符', trigger: 'blur' }],
  manager: [{ max: 6, message: '长度不超过6个字符', trigger: 'blur' }],
}

const emit = defineEmits(['add'])
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      addLab(form)
        .then((response) => {
          if (response) {
            emit('add')
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
  width: 600px;
}
</style>
