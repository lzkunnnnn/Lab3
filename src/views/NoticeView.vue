<template>
  <el-timeline>
    <el-timeline-item v-for="(a, index) in announcements" :key="index" :timestamp="a.updateTime" placement="top">
      <el-card class="elcard" shadow="always">
        <div class="card">
          <img
            src="../assets/img/logo.png"
          />

          <el-descriptions :title="a.title">
            <el-descriptions-item>{{ a.content }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <el-skeleton :rows="16" animated v-if="loading" />
</template>
<script setup lang="ts">
import { get } from '@/api/admin'
import { ref } from 'vue'

const announcements = ref([])
const loading = ref(true)

const getAnnouncements = async () => {
  const url = 'admin/announcements'
  try {
    announcements.value = await get(url)
    loading.value = true
  } catch (error) {
    console.log('请求失败', error)
  }
  loading.value = false
}
onMounted(getAnnouncements)
</script>

<style scoped>
.text {
  font-size: 14px;
}

.elcard {
  width: 98%;
  margin: 10px;
}
.card {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.el-timeline-item__timestamp {
  margin-right: 20px; /* 根据需要调整这个值 */
}
img {
  width: 200px;
  object-fit: fill;
  margin-right: 16px;
}
*{
  padding:0px;
}
</style>
