<template>
<div>
    <el-tree
    :data="roleTreeData"
    show-checkbox
    default-expand-all
    node-key="id"
    ref="tree"
    highlight-current
    
    :default-checked-keys="defaultCheckedKey"
    
    :props="defaultProps"
    @check="getCheckedNodes"
    >
    </el-tree>
</div>
    
</template>
<script>
export default {
    props:['roleTreeData','defaultCheckedKey','defaultProps'],//[2,3,5,6,7,8],
    methods: {
        getCheckedNodes(halfNode,checkedNodes) {
            // console.log(halfNode,checkedNodes)
            // var checkedNodes = this.$refs.tree.getCheckedNodes()
            // var checkedKey = this.$refs.tree.getCheckedKeys()
            this.$emit('get-checked-nodes',halfNode,checkedNodes)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>