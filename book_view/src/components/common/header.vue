<template>
    <div class="website-header">
        <h1 class="website-header-title">{{title}}</h1>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:function(){}
        }
    }
};
</script>

<style lang="less" scoped>
.website-header {
    &-title {
        font-size: 14px;
    }
}
</style>
