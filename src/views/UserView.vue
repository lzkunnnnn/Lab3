<template>
  <el-button type="primary" @click="dialogVisible=true">添加课程</el-button>

  <el-table :data="courses" style="width: 100%" v-loading="loading">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="课程名" width="100"></el-table-column>
    <el-table-column prop="lesson" label="课时" width="100"></el-table-column>
    <el-table-column prop="quantity" label="人数" width="100"></el-table-column>
    <el-table-column prop="major" label="所属学院" width="100"></el-table-column>
    <el-table-column prop="classInfo" label="课程描述 " width="100"></el-table-column>

  </el-table>

  <el-dialog title="添加实验室" v-model="dialogVisible" width="50%" :show-close="true">
    <CourseForm @add="()=>{dialogVisible=false,getCourses()}"></CourseForm>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { get } from '@/api/admin'
import { ref } from 'vue'
import CourseForm from '@/components/CourseForm.vue'
const courses = ref([])
const loading = ref(true)
const getCourses = async () => {
  try {
    const url = 'user/courses'
    courses.value = await get(url)
    loading.value = false
  } catch (error) {
    console.log('请求失败', error)
  }
}
onMounted(getCourses)




const dialogVisible=ref(false)
</script>
<style></style>
