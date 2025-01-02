<script setup lang="ts">
import { isCollapse } from "./isCollapse"
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import { useTokenStore } from "@/stores/mytoken";

const store = useTokenStore()
const router = useRouter();
const handleLogout = () => {
    // 这里可以添加一些额外的退出相关逻辑，比如清除本地存储的用户登录信息等

    // 使用router.push方法跳转到指定地址，假设要跳转到'/login'页面
    router.push('/login');
};

</script>

<template>
  <el-header>
    <el-icon @click="isCollapse =!isCollapse">
      <IEpExpand v-if="isCollapse" />
      <IEpFold v-else />
    </el-icon>

    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb-wrapper">
      <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-item">
        欢迎{{ store.token.role }}:  {{ store.token.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下拉菜单 -->
    <el-dropdown class="dropdown-wrapper">
      <span class="el-dropdown-link">
        <el-avatar 
        :size="32"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        <el-icon class="el-icon--right">
            <i-ep-arrow-down />
        </el-icon>       
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ store.token.name }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    background-color: skyblue;
    padding: 10px 20px;

  .breadcrumb-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

      .breadcrumb-item {
            font-size: 20px;
            font-family: '楷体';
            color: white;
        }
    }

  .dropdown-wrapper {
        margin-left: auto;
      .el-dropdown-link {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
}

.el-icon {
    margin-right: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: white;
    }
}

.el-avatar {
    margin-right: 5px;
}
</style>