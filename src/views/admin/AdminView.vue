<template>
  <el-tabs v-model="activeTab" @click="show">
    <el-tab-pane label="用户管理" name="Users" >
      <!-- <RouterLink to="getUsers">获取全部用户</RouterLink> <br /> -->
      </el-tab-pane>
    <el-tab-pane label="实验室管理" name="Labs" >
      <!-- <RouterLink to="getLabs">获取全部实验室</RouterLink> <br /> -->


    </el-tab-pane>
    <el-tab-pane label="公告管理" name="Announcements">
      <!-- <RouterLink to="getAnnouncements">获取全部公告</RouterLink><br /> -->
    </el-tab-pane>
  </el-tabs>
  <RouterView></RouterView>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const activeTab = ref('Users')
onMounted(() => {
  activeTab.value = router.currentRoute.value.name
})
const router = useRouter()
const show=()=>{
  router.push({name:activeTab.value})
}
</script>
<style></style>
