<template>
  <br />
  <div class="container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="课程" prop="courseId">
        <el-select v-model="form.courseId" placeholder="请选择课程">
          <el-option v-for="c in courses" :label="c.name" :value="c.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="实验室" prop="labId">
        <el-select v-model="form.labId" placeholder="请选择实验室">
          <el-option v-for="l in labs" :label="l.name" :value="l.id"></el-option>
        </el-select>
      </el-form-item>

      <br />
      <el-form-item label="预约周次">
        <el-slider v-model="value" :marks="marks" range show-stops :max="18"> </el-slider>
      </el-form-item>
      <br />
      <el-form-item label="预约星期" prop="dayOfWeek">
        <el-select v-model="form.dayOfWeek" placeholder="请选择星期">
          <el-option v-for="d in datelist" :label="d.week" :value="d.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="预约节次" prop="section">
        <el-select v-model="form.section" placeholder="请选择节次">
          <el-option v-for="s in sections" :label="s.section" :value="s.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { get } from '@/api/admin'
import { appoint, type appointInfo } from '@/api/users'
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive<appointInfo>({
  courseId: '',
  courseName: '',
  labId: '',
  startWeek: '',
  endWeek: '',
  dayOfWeek: '',
  section: '',
})

 const rules = {
  courseId: [{ required: true, message: '请选择课程', trigger: 'blur' }],
  labId: [{ required: true, message: '请选择实验室', trigger: 'blur' }],
  dayOfWeek: [{ required: true, message: '请选择星期', trigger: 'blur' }],
  section: [{ required: true, message: '请选择节次', trigger: 'blur' }],
}

const value = ref([0, 0])
const marks = ref({
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
  18: '18',
})
const datelist = reactive([
  { id: 1, week: '星期一' },
  { id: 2, week: '星期二' },
  { id: 3, week: '星期三' },
  { id: 4, week: '星期四' },
  { id: 5, week: '星期五' },
  { id: 6, week: '星期六' },
  { id: 7, week: '星期日' },
])
const sections = reactive([
  { id: 1, section: '1-2' },
  { id: 2, section: '3-4' },
  { id: 3, section: '5-6' },
  { id: 4, section: '7-8' },
])
const labs = ref([])
const getLabs = async () => {
  const url = 'user/labs'
  try {
    labs.value = await get(url)
  } catch (error) {
    console.log('请求失败', error)
  }
}

const courses = ref([])
const getCourses = async () => {
  const url = 'user/courses'
  try {
    courses.value = await get(url)
    console.log(courses)
  } catch (error) {
    console.log('请求失败', error)
  }
}
console.log(getCourses())
onMounted(() => {
  getCourses()
  getLabs()
})

/*
form.startWeek = computed(() => value.value[0])
form.endWeek = computed(() => value.value[1])
form.courseName = computed(() => {
  return courses.value.find((c) => c.id === form.courseId)?.name
}) */

const onSubmit = () => {

  form.startWeek=value.value[0]
  form.endWeek=value.value[1]
  form.courseName = courses.value.find((c)=>c.id===form.courseId).name

  console.log(form)
  formRef.value.validate((valid) => {
    console.log('Validation result:', valid);
    if (valid) {
      appoint(form)
        .then((response) => {
          if (response) {
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
.container {
  width: 90%;
}
</style>
