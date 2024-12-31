<template>
  <el-button type="primary" @click="addDialogVisible = true">添加公告</el-button>

  <el-table :data="announcements" style="width: 100%" v-loading="loading">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="title" label="标题" width="200"></el-table-column>
    <el-table-column prop="content" label="内容" width="500"></el-table-column>

    <el-table-column label="操作" width="180" fixed="right">
      <template v-slot="scope">
<!--         <el-button type="primary" size="small" @click="showDialog(scope.row.id, 1)">编辑</el-button> -->
        <el-button type="danger" size="small" @click="showDialog(scope.row.id, 2)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="提示" v-model="deleteDialogVisible" width="30%">
    <span>确认删除</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteLab(selectedAnnounceId)">确 定</el-button>
      </span>
    </template>
  </el-dialog>

<!--   <el-dialog title="提示" v-model="editDialogVisible" width="30%">
    <span>编辑</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </template>
  </el-dialog> -->

  <el-dialog title="添加公告" v-model="addDialogVisible" width="50%">
    <AddAnnounceForm @add="()=>{getAnnouncements();success()}"></AddAnnounceForm>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { deletex, get } from '@/api/admin'
import { ref } from 'vue'

const success = () => {
  ElMessage({
    message: '操作成功',
    type: 'success'
  });
};


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

//删除公告
const selectedAnnounceId = ref('')
const editDialogVisible = ref<boolean>(false)
const deleteDialogVisible = ref<boolean>(false)
const addDialogVisible = ref<boolean>(false)

const showDialog = (id: string, num: number) => {
  if (num == 2) {
    deleteDialogVisible.value = true
  }
  if (num == 1) {
    editDialogVisible.value = true
  }
  selectedAnnounceId.value = id
}

const deleteLab = async (id: string) => {
  try {
    const url = 'admin/announcements/' + id
    announcements.value = await deletex(url)
    success()
  } catch (error) {
    console.log('删除失败', error)
  }
  deleteDialogVisible.value = false
}
</script>
<style scoped></style>
