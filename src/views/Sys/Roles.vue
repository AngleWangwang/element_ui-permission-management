<template>
    <div class="page-container">
        <el-row style="text-align:right;" class="mgb20">
            <el-button type="primary" plain @click="addRole()"> <span class="fa fa-edit"></span> 增加角色</el-button>
            <!-- <el-button  plain>主要按钮</el-button> -->
        </el-row>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
            type="index"
            
            label="编号"
            width="120"
            align="center"
            >
            </el-table-column>
           
            <el-table-column
            prop="name"
            label="角色名称"
            width="250"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="handle"
            label="操作"
            align="center"
            min-width="400"
            :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <el-button size="mini" @click="rolePremission(scope.row)" icon="el-icon-edit">权限</el-button>
                    <el-button size="mini" @click="member(scope.row)" icon="el-icon-edit">成员</el-button>
                    <el-button size="mini" @click="deleteRole(scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 增加角色弹窗 -->
        <el-dialog
        title="增加角色"
        :visible.sync="addRoleDialogVisible"
        width="30%"
        :before-close="addRoleHandleClose">

            <RoleTree 
            :roleTreeData = 'addRoleTreeData' 
            :defaultProps = 'defaultProps'
            v-on:get-checked-nodes = 'getAddRoleNodes'
            >
            </RoleTree>  


            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 权限弹窗 -->
        <el-dialog
        title="权限"
        :visible.sync="permissionDialogVisible"
        width="30%"
        :before-close="permissionHandleClose">

            <RoleTree 
            :roleTreeData = 'permissionTreeData' 
            :defaultCheckedKey = 'permissionDefaultCheckedKey' 
            :defaultProps = 'defaultProps'
            v-on:get-checked-nodes = 'getPermissionNodes'
            >
            </RoleTree>  


            <div slot="footer" class="dialog-footer">
                <el-button @click="permissionDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="permissionDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 成员弹窗 -->
        <el-dialog
        title="权限"
        :visible.sync="memberDialogVisible"
        width="40%"
        :before-close="memberHandleClose">
        <el-row :gutter="20" class="mgb20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-input v-model="keyword" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                </div>
            </el-col>
        </el-row>       
            <el-table
            :data="menberList"
            border
            style="width: 100%">
                <el-table-column
                type="index"
                label="编号"
                width="80"
                align="center"
                >
                </el-table-column>
            
                <el-table-column
                prop="id"
                label="用户账号"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="name"
                label="用户姓名"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                align="center"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="asignUser(scope.row)" icon="el-icon-delete">分配</el-button>
                        <el-button size="mini" @click="deleteUser(scope.row)" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="memberDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="memberDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import RoleTree from '@/components/RoleTree'
    export default {
        components:{
            RoleTree
        },
        data(){
            return {
                keyword:'',
                // 角色列表
                tableData: [
                    {
                        name:"财务",
                    },
                    {
                        name:"人事",
                    },
                ],
                // 成员列表
                menberList: [
                    {
                        id:45566,
                        name:"zhangs"
                    },
                    {
                        id:45966,
                        name:"zhangs"
                    }
                ],
                // 弹窗显示标识
                addRoleDialogVisible:false,
                permissionDialogVisible:false,
                memberDialogVisible:false,
                assignUserVisible:false,
                // 弹窗权限树数据
                addRoleTreeData:[
                    {
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [{
                            id: 9,
                            label: '三级 1-1-1'
                            }, {
                            id: 10,
                            label: '三级 1-1-2'
                            }]
                        }]
                        }, {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                        }, {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }
                ],
                permissionTreeData:[
                    {
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [{
                            id: 9,
                            label: '三级 1-1-1'
                            }, {
                            id: 10,
                            label: '三级 1-1-2'
                            }]
                        }]
                        }, {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                        }, {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }
                ],
                //权限树默认选中节点
                addRoleDefaultCheckedKey:'',
                permissionDefaultCheckedKey:[1,3,6],
                // 权限树参数形式
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        methods:{
            // 增加角色
            addRole(){
                this.addRoleDialogVisible = true
            },
            // 获取增加角色导航树选中节点
            getAddRoleNodes(halfNode,checkedNodes){
                console.log(halfNode,checkedNodes)
            },
            getPermissionNodes(halfNode,checkedNodes){
                console.log(halfNode,checkedNodes)
            },
            // 增加用户弹窗关闭
            addRoleHandleClose(done){
                done()
            },
            // 权限弹窗关闭
            permissionHandleClose(done){
                done()
            },
            // 成员弹窗关闭
            memberHandleClose(done){
                done()
            },
            // 权限
            rolePremission(dom){
                this.permissionDialogVisible = true
            },
            // 成员
            member(dom){
                this.memberDialogVisible = true
            },
            // 删除
            deleteRole(dom){},
            
        }
    }
</script>