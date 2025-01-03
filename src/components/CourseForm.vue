<template>
  <br />
  <div class="container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">

      <el-form-item label="课程名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="容纳人数" prop="quantity">
        <el-slider v-model="form.quantity" show-input></el-slider>
      </el-form-item>

      <el-form-item label="课时" prop="lesson">
        <el-slider v-model="form.lesson" show-input></el-slider>
      </el-form-item>
      <el-form-item label="课程信息" prop="classInfo">
        <el-input v-model="form.classInfo"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="form.major"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { addCourse, type Course } from '@/api/users'
import { reactive, ref } from 'vue'
const emit = defineEmits(['add'])
const formRef = ref()
const form = reactive<Course>({
  name: '',
  quantity: 0,
  lesson: 0,
  teacherId:localStorage.getItem("uid"),
  major: '',
  classInfo: '',
})

const rules = {
  id: [{ required: true, message: '请选择课程', trigger: 'blur' }],
}

const onSubmit = () => {
  console.log(form)
  formRef.value.validate((valid) => {
    if (valid) {
      addCourse(form)
        .then((response) => {
          if (response.data) {
            console.log(response)
            emit('add')
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
.container {
  width: 90%;
}
</style>
