<script setup lang="ts">
import { login } from '@/api/users'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useTokenStore } from '@/stores/mytoken'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useTokenStore()
//表单响应式数据
const form = reactive({
/*   phone: '18201288771',
  password: '111111', */
    account: 'user1',
    password: '12345',
  
})
//登录事件处理
const onSubmit = async () => {
  isLoading.value = true
  // 表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败')
    isLoading.value = false
    throw err
  })

  //正式发送登录请求
  const data = await login(form).then((res) => {
    if (!res.data.success) {
      ElMessage.error('登录信息有误！')
      isLoading.value = false
      throw new Error('登录信息有误')
    }
    return res.data
  })

    console.log(data)
    //保存token信息
  store.saveToken(data.content)

    isLoading.value = false

    ElMessage.success('登录成功!')
    router.push((route.query.redirect as string) || '/')
}

//定义表单校验规则
const rules = reactive<FormRules>({
    /* phone: [{ required: true, message: '用户名不能为空', trigger: 'blur' }], */
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
      <!-- <el-form-item label="用户名" prop="phone"> -->
      <el-form-item label="用户名" prop="account">
        <!-- <el-input v-model="form.phone" /> -->
         <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
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

  .el-form {
    width: 300px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;

    .el-form.item {
      margin-bottom: 20px;
    }

    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
