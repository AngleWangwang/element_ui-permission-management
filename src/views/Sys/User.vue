<template>
    <div class="page-container">
        <el-row style="text-align:right;" class="mgb20">
            <el-button type="primary" plain @click="addUser()"> <span class="fa fa-edit"></span> 增加用户</el-button>
            <!-- <el-button  plain>主要按钮</el-button> -->
        </el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="index"
            label="编号"
            width="80"
            align="center"
            >
            </el-table-column>
            <el-table-column
            
            prop="id"
            label="用户账号"
            width="200"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户姓名"
            width="150"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="role"
            label="用户角色"
            width="150"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="address"
            label="住址"
            width="300"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="email"
            label="Email"
            width="200"
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
                    <el-button size="mini" @click="handleClick(scope.row)" icon="el-icon-edit">角色权限</el-button>
                    <el-button size="mini" @click="handleClick(scope.row)" icon="el-icon-edit">重置密码</el-button>
                    <el-button size="mini" @click="handleClick(scope.row)" icon="el-icon-edit">修改</el-button>
                    <el-button size="mini" @click="handleClick(scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 增加用户弹窗 -->
        <el-dialog
        title="增加用户"
        :visible.sync="addUserDialogVisible"
        width="30%"
        :before-close="addUserHandleClose">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户账号" prop="id" >
                    <el-input v-model="ruleForm.id"  placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="ruleForm.name"   placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住址" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserDialogVisible = false">确 定</el-button>
            </div>

        </el-dialog>

        <!-- 用户权限弹窗 -->
        <el-dialog
        title="角色权限"
        :visible.sync="roleDialogVisible"
        width="30%"
        :before-close="roleHandleClose">
        <el-tree
        :data="roleTreeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        
        :default-checked-keys="[2,3,5,6,7,8]"
        :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="roleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="roleDialogVisible = false">确 定</el-button>
        </div>
        </el-dialog>
        <!--  -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 用户列表
                tableData: [
                    {
                        index: "0",
                        id: '12552552552585',
                        name:"admin",
                        role:"管理员",
                        address: '上海市普陀区金沙江路 1518 弄',
                        email:"jsj@xx.com",
                    }
                ],
                // 用户权限弹窗显示状态
                roleDialogVisible:false,
                // 增加用户弹窗显示状态
                addUserDialogVisible:false,
                // 权限树
                roleTreeData:[
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
                // 权限树参数形式
                defaultProps: {
                children: 'children',
                label: 'label'
                },
                // 增加用户表单数据
                ruleForm: {
                    name: '你好是啊',
                    id: '',
                    role: '',
                    email: '',
                    address: '',
                },
                roleOptions: [
                    {
                        value:121,
                        label:"财务"
                    },
                    {
                        value:123,
                        label:"厂长"
                    }
                ],
                rules: {
                    name: [
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                    id: [
                        { required: true, message: '请输入用户账号', trigger: 'blur' },
                    ],
                    role:[
                        { required: true, message: '请选择用户角色', trigger: 'change' },
                    ]
                }
            }
        },
        methods: {
            handleClick(dom){
                this.roleDialogVisible = true
                console.log(dom)
            },
            roleHandleClose(){

            },
            addUserHandleClose(){},
            addUser(){
                this.addUserDialogVisible = true
            }
        },
    }
</script>
<style lang="scss" scoped>
    .page-container{
        padding: 20px;
    }
    .mgb20{
        margin-bottom: 20px;
    }
    .dialog-footer{
        text-align: center;
    }
</style>
