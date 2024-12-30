import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 更新 Token 接口，包含更多用户信息
interface Token {
  id: string
  name: string
  account: string
  password: string
  role: string
  createTime: string
  updateTime: string
  avatar: string
}

export const useTokenStore = defineStore('mytoken', () => {
  const tokenJson = ref<string>('')

  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}')
    } catch (err) {
      ElMessage.error('JSON 字符串格式不对，转化对象时失败')
      window.localStorage.setItem('TokenInfo', '')
      throw err
    }
  })

  // 保存 Token，您可以根据需要更新传入的数据结构
  function saveToken(data: Token) {
    tokenJson.value = JSON.stringify(data) // 确保将对象序列化为 JSON 字符串
    window.localStorage.setItem('TokenInfo', JSON.stringify(data))
  }


  // 向外暴露
  return { token, saveToken }
})
