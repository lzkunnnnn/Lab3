<script setup lang="ts">
import { login } from '@/api/users'
import { useTokenStore } from '@/stores/mytoken'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useTokenStore()

// 表单响应式数据
const form = reactive({
  account: 'user0',
  password: 'user0',
})
// 登录事件处理
const onSubmit = async () => {
  isLoading.value = true
  try {
    await formRef.value?.validate()

    const response = await login(form)
    console.log('API 返回数据:', response) // Debug log

    if (response.data.code === 400) {
      // 确保 data 存在
      ElMessage.error('登录信息有误！')
      throw new Error('登录信息有误')
    } else {
      store.saveToken(response.data.data)
      const token = response.headers.token
      const userInfo = response.data.data // 假设userInfo是包含用户详细信息的数据对象
      //ElMessage.success('登录成功!')
      alert('登录成功！')
    }

    store.saveToken(response.data.data) // 确保保存完整的用户数据
    console.log(response.headers.token)
    console.log(response.headers.role)
    console.log(response.data.data.id)
    localStorage.setItem('token', response.headers.token)
    localStorage.setItem('role', response.headers.role)
    localStorage.setItem('uid',response.data.data.id)

    //ElMessage.success('登录成功!')
    router.push((route.query.redirect as string) || '/')
  } catch (error) {
    console.error('登录错误:', error)
    //ElMessage.error('登录失败，请重试！')
    alert('登录失败，请重试！')
  } finally {
    isLoading.value = false
  }
}

// 定义表单校验规则
const rules = reactive<FormRules>({
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
})

// 定义是否登录加载中
const isLoading = ref(false)
const formRef = ref<FormInstance>()
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="120px"
      label-position="top"
      size="large"
    >
      <h2>登录</h2>
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #ccc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/主楼.jpg'); // 添加背景图片设置，这里要确保路径正确且资源可访问
  background-size: cover; // 让背景图片覆盖整个区域，可根据需求调整为其他值，如contain等
  background-position: center; // 图片居中显示，也可调整位置属性
  background-repeat: no-repeat; // 不重复显示图片

 .el-form {
    width: 300px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    opacity: 0.92;

   .el-form-item {
      margin-bottom: 20px;
    }

   .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
