<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="formRef"
    hide-required-asterisk="true"
    label-width="120px"
  >
    <el-form-item label="编辑管理员" prop="manage">
      <el-input v-model="form.manage"></el-input>
    </el-form-item>
    <el-form-item label="编辑状态" prop="state">
      <el-input v-model="form.state"></el-input>
    </el-form-item>
    <el-form-item label="编辑实验室描述" prop="desc">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { update, type updateLab } from '@/api/admin'
import { reactive, ref } from 'vue'

const form = reactive<updateLab>({
  id: '',
  manage: '',
  description: '',
  state: '',
})

const rules = {
  manage: [{ max: 6, message: '长度不超过6个字符', trigger: 'blur' }],
  desc: [{ max: 200, message: '不超过200个字符' }],
}

const props = defineProps(['toEditLabId'])
const emit = defineEmits(['success'])
const formRef = ref()

const onSubmit = () => {
  /*   console.log(form)
  console.log(props.toEditLabId) */
  formRef.value.validate((valid) => {
    if (valid) {
      update(form, props.toEditLabId)
        .then((response) => {
          if (response) {
            alert('添加成功')
            emit('success')
            console.log(response.data)
            formRef.value.resetFields()
            form.description = ''
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
<style></style>
