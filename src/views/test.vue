<template>
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<dialog :open="dialogVisible">
1123
</dialog>
<button @click="dialogVisible=true">123</button>
</template>
<script setup>
import 

    const  dialogVisible = false


</script>

<style></style>
