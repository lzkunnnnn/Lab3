<template>
  <div class="page-container">
    <div class="input-section">
      <!-- 输入实验室ID的表单 -->
      <el-select v-model="labId" style="width: 300px">
        <el-option
          v-for="(l, index) in labs"
          :key="index"
          :value="l.id"
          :label="l.name + '实验室'"
        ></el-option>
      </el-select>
      <button @click="fetchReservations" class="fetch-button">查询</button>
    </div>
    <div v-if="loading" class="loading-message">正在加载课程数据...</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="class-table-container">
      <div class="table-title">课程表</div>
      <table class="course-table">
        <!-- 第一行 表格标题 -->
        <tr>
          <th class="table-header" rowspan="2">课时</th>
          <th v-for="(item, index) in datelist" :key="index" class="table-header" colspan="4">
            <p>{{ item.week }}</p>
          </th>
        </tr>
        <!-- 表格内容 -->
        <tr>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
          <td class="time-cell time-cell-1-2">1-2</td>
          <td class="time-cell time-cell-3-4">3-4</td>
          <td class="time-cell time-cell-5-6">5-6</td>
          <td class="time-cell time-cell-7-8">7-8</td>
        </tr>
        <!-- 课程信息 -->
        <tr class="class-tr" v-for="(weekindex, index) in 18" :key="index">
          <td class="table-header">
            第
            <br />
            {{ weekindex }}
            <br />
            周
          </td>

          <td class="class-td" v-for="(c, index) in datetd" :key="index">
            <div
              class="class-info"
              v-if="getCourseByWeekDaySection(weekindex, c.section, c.dayOfWeek)"
            >
              <span class="course-teacher"
                >{{ getCourseByWeekDaySection(weekindex, c.section, c.dayOfWeek).teacherName }}
              </span>
              <br />

              <span class="course-name">{{
                getCourseByWeekDaySection(weekindex, c.section, c.dayOfWeek).courseName
              }}</span>

            </div>
            <div v-else>
              <span class="no-course">无课程</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get } from '@/api/admin'
import axios from '@/stores/axios'
import { reactive, ref } from 'vue'

// 周和天的信息
const datelist = reactive([
  { id: 1, week: '星期一' },
  { id: 2, week: '星期二' },
  { id: 3, week: '星期三' },
  { id: 4, week: '星期四' },
  { id: 5, week: '星期五' },
  { id: 6, week: '星期六' },
  { id: 7, week: '星期日' },
])
const datetd = reactive([
  { section: 1, dayOfWeek: 1 },
  { section: 2, dayOfWeek: 1 },
  { section: 3, dayOfWeek: 1 },
  { section: 4, dayOfWeek: 1 },
  { section: 1, dayOfWeek: 2 },
  { section: 2, dayOfWeek: 2 },
  { section: 3, dayOfWeek: 2 },
  { section: 4, dayOfWeek: 2 },
  { section: 1, dayOfWeek: 4 },
  { section: 2, dayOfWeek: 3 },
  { section: 3, dayOfWeek: 3 },
  { section: 4, dayOfWeek: 3 },
  { section: 1, dayOfWeek: 4 },
  { section: 2, dayOfWeek: 4 },
  { section: 3, dayOfWeek: 4 },
  { section: 4, dayOfWeek: 4 },
  { section: 1, dayOfWeek: 5 },
  { section: 2, dayOfWeek: 5 },
  { section: 3, dayOfWeek: 5 },
  { section: 4, dayOfWeek: 5 },
  { section: 1, dayOfWeek: 6 },
  { section: 2, dayOfWeek: 6 },
  { section: 3, dayOfWeek: 6 },
  { section: 4, dayOfWeek: 6 },
  { section: 1, dayOfWeek: 7 },
  { section: 2, dayOfWeek: 7 },
  { section: 3, dayOfWeek: 7 },
  { section: 4, dayOfWeek: 7 },
])
const courses = ref<any[]>([]) // 用于保存课程数据
const labId = ref('') // 用于绑定输入的实验室ID
const loading = ref(false) // 加载状态
const errorMessage = ref<string | null>(null) // 错误信息提示
const appointments = ref([])

const fetchReservations = async () => {
  loading.value = true
  errorMessage.value = null
  try {
    const response = await axios.get(`user/lab/${labId.value}/reservations`)
    console.log(response)
    appointments.value = response.data.data
    console.log(appointments.value)
    if (response.data && response.data.code === 200) {
      courses.value = response.data.data
    } else {
      console.error('Unexpected response structure:', response.data)
      errorMessage.value = '返回数据结构不符合预期，请检查后端接口'
    }
  } catch (error) {
    console.error('Failed to fetch reservations:', error)
    if (error.response && error.response.status === 401) {
      console.error('未授权: 请重新登录。')
      errorMessage.value = '未授权，请重新登录'
    } else {
      errorMessage.value = '网络请求出现问题，请稍后再试'
    }
  }
  loading.value = false
}

// 根据周、天、节次获取课程（修复查找逻辑，确保准确匹配课程）
const getCourseByWeekDaySection = (week: number, section: number, dayOfWeek: number) => {
  return (
    appointments.value.find((course) => {
      return (
        course.week === week &&
        course.dayOfWeek === dayOfWeek &&
        course.section === section &&
        week <= 18
      )
    }) || null
  )
}
const labs = ref([])
const getLabs = async () => {
  const url = 'user/labs'
  try {
    labs.value = await get(url)
    loading.value = true
  } catch (error) {
    console.log('请求失败', error)
  }
  loading.value = false
}
onMounted(getLabs)
console.log(labs)
</script>

<style scoped>
/* 整体页面容器样式 */
.page-container {
  background-color: #f8f9fa; /* 浅灰色背景，使页面更柔和 */
  font-family: Arial, sans-serif; /* 设置通用字体 */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
}

/* 输入框和按钮所在区域样式 */
.input-section {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.input-field {
  padding: 12px 15px;
  width: 300px;
  border: 1px solid #ced4da; /* 更柔和的边框颜色 */
  border-radius: 4px;
  font-size: 16px;
  color: #495057; /* 输入框文字颜色 */
}

.fetch-button {
  padding: 12px 20px;
  border: none;
  background-color: #007bff; /* 主题色按钮 */
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  font-size: 16px;
}

.fetch-button:hover {
  background-color: #0056b3; /* 按钮悬停颜色 */
}

/* 加载和错误提示信息样式 */
.loading-message {
  text-align: center;
  margin-top: 20px;
  color: #6c757d; /* 灰色提示文字颜色 */
  font-size: 16px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
}

/* 课程表容器样式 */
.class-table-container {
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 给表格添加轻微阴影 */
  border-radius: 5px;
}

/* 课程表标题样式 */
.table-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 0;
  background-color: #e9ecef; /* 标题栏背景色 */
  color: #343a40; /* 标题文字颜色 */
}

.course-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background-color: #dee2e6; /* 表头背景色 */
  padding: 12px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #343a40; /* 表头文字颜色 */
  border-bottom: 2px solid #ccc; /* 表头底部边框 */
}

.class-td {
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6; /* 单元格底部边框 */
  font-size: 16px;
  color: #343a40; /* 单元格文字颜色 */
}

.week-cell {
  background-color: #f1f3f5; /* 周标题单元格背景色 */
}

.week-cell-dark {
  background-color: #ccc; /* 加深的周标题单元格背景色 */
}

.class-info {
  width:60px;
  margin-bottom: 5px;
}

.course-teacher {
  display: block;
  width:60px;
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.course-name {
  color: #333;
  font-size: 16px;
}

.no-course {
  color: #adb5bd; /* 无课程时文字颜色更协调 */
  font-size: 16px;
}

/* 课时单元格样式，针对1-2、3-4等课时部分 */
.time-cell {
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ccc; /* 添加边框，使其更清晰 */
}

.time-cell-1-2 {
  background-color: #e6e6e6; /* 1-2节的背景色，可根据需求调整对比效果 */
  color: #333; /* 文字颜色 */
}

.time-cell-3-4 {
  background-color: #d9d9d9; /* 3-4节的背景色，可根据需求调整对比效果 */
  color: #333; /* 文字颜色 */
}

.time-cell-5-6 {
  background-color: #f2f2f2; /* 5-6节的背景色，可根据需求调整对比效果 */
  color: #333; /* 文字颜色 */
}

.time-cell-7-8 {
  background-color: #ebebeb; /* 7-8节的背景色，可根据需求调整对比效果 */
  color: #333; /* 文字颜色 */
}
</style>
