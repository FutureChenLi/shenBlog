<!--
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-22 21:23:56
 -->
<template>
    <div class="add-collection">
        <TaskBar :firstName="'收藏管理'" :lastName="'收藏追加'" />
        <div class="blog-content" >
            <a-spin :spinning="$store.state.spinning">
                <CollectionOp ref="op" />
                <Editor />
                <a-button type="primary" @click="handleClick">提交</a-button>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" src="./addCollection.ts">
</script>

<style lang="less">
</style>
