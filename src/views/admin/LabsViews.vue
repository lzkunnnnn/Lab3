<template>
  <el-button type="primary" @click="addDialogVisible = true">添加实验室</el-button>

  <el-table :data="labs" style="width: 100%" v-loading="loading">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="名称" width="80"></el-table-column>
    <el-table-column prop="manage" label="管理员" width="100"></el-table-column>
    <el-table-column prop="quantity" label="可容纳人数" width="100"></el-table-column>
    <el-table-column prop="description" label="描述" width="180"></el-table-column>
    <el-table-column prop="state" label="状态" width="60"></el-table-column>

    <el-table-column label="操作" width="180" fixed="right">
      <template v-slot="scope">
        <el-button type="primary" size="small" @click="showDialog(scope.row.id, 1)">编辑</el-button>
        <el-button type="danger" size="small" @click="showDialog(scope.row.id, 2)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="提示" v-model="deleteDialogVisible" width="30%" :show-close="false">
    <span>确认删除</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="deleteLab(selectedLabId)">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    title="编辑"
    v-model="editDialogVisible"
    width="36%"
    :show-close="false"
    :destroy-on-close="true"
  >
    <UpdateLabForm :toEditLabId="selectedLabId"></UpdateLabForm>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="添加实验室" v-model="addDialogVisible" width="50%" :show-close="true">
    <AddLabForm @add="()=>{getLabs();success()}"></AddLabForm>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { deletex, get } from '@/api/admin'
import AddLabForm from '@/components/admin/AddLabForm.vue'
import UpdateLabForm from '@/components/admin/UpdateLabForm.vue'
import { ref } from 'vue'

const success = () => {
  ElMessage({
    message: '操作成功',
    type: 'success'
  });
};

const labs = ref([])
const loading = ref(true)

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

//对话框
const selectedLabId = ref('')
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
  selectedLabId.value = id
}

const closeDialog = () => {
  editDialogVisible.value = false
  addDialogVisible.value = false
  deleteDialogVisible.value = false
  getLabs()
}

const deleteLab = async (id: string) => {
  try {
    const url = 'admin/labs/' + id
    labs.value = await deletex(url)
    success()
  } catch (error) {
    console.log('删除失败', error)
  }
  deleteDialogVisible.value = false
}
//编辑
</script>
<style scoped></style>
