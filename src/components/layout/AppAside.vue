<script setup lang="ts">
//import { ref } from 'vue';
import { isCollapse } from "./isCollapse"
</script>

<template>
  <el-aside>
    <el-menu router unique-opened :collapse="isCollapse">
      <a href="/" class="logo">
        <img src="@/assets/img/logo.png" alt="" />
        <h1>实验室预约</h1>
      </a>
      <!-- <el-menu-item index="/MenusView">
        <el-icon>
          <IEpConnection />
        </el-icon>
        <span>用户管理</span>
      </el-menu-item> -->

      <el-menu-item index="/CourseTableView">
        <el-icon>
          <IEpCalendar />
        </el-icon>
        <span>课程管理</span>
      </el-menu-item>

      <el-menu-item index="/NoticeView">
        <el-icon>
          <IEpMessageBox />
        </el-icon>
        <span>公告</span>
      </el-menu-item>

      <el-menu-item index="/admin/">
        <el-icon>
          <IEpAvatar />
        </el-icon>
       <span>管理员入口</span>
      </el-menu-item>

    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #f0f2f5; /* 背景颜色 */
  height: 100vh; // 整个屏幕
  width: auto;
}

.el-menu {
  width: 200px;
  border-right: none;
  background-color: #f0f2f5; /* 确保菜单背景与el-aside一致 */

  &.el-menu--collapse {
    width: 60px;
    & h1 {
        display: none;
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;
  background-color: #f0f2f5; /* 设置背景颜色与周围一致 */

  img {
    width: 60px;
    height: 60px;
  }

  h1 {
    margin-left: 10px; /* 调整标题与图片间距 */
    font-size: 1.2rem; /* 调整字体大小 */
  }
}
</style>
