<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="closeDialogVisible">
            <el-form :model="dialogaRuleForm" :rules="rules" ref="dialogaRuleForm" label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="编号" prop="no">
                    <el-input v-model="dialogaRuleForm.no"></el-input>
                </el-form-item>

                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogaRuleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="保管员" prop="storehouse">
                    <el-select v-model="dialogaRuleForm.storehouse" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="电话" prop="tell">
                    <el-input v-model="dialogaRuleForm.tell"></el-input>
                </el-form-item>
                
                <el-form-item label="地址" prop="address">
                    <el-input v-model="dialogaRuleForm.address"></el-input>
                </el-form-item>
                
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="dialogaRuleForm.remark"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleModify">取 消</el-button>
                <el-button type="primary" @click="makeSure">确 定</el-button>
            </div>
        </el-dialog>
</template>
<script>
    export default{
        props:['title','dialogVisible','dialogaRuleForm'],
        data(){
            return{
                
                rules:{
                    name: [
                        { required: true, message: '仓库名称不能为空', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    no: [
                        { required: true, message: '仓库编号不能为空', trigger: 'blur' },
                    ],
                    storehouse: [
                        { required: true, message: '保管员不能为空', trigger: 'onchange' },
                    ]

                },
                roleOptions:[
                    {
                        label:'客户',
                        value:'c'
                    },
                    {
                        label:'供应商',
                        value:'s'
                    },
                ]
                
            }
        },
        methods:{
            makeSure(){
                this.$emit('closeDialog')
            },
            closeDialogVisible(){
                // done()
                this.$emit('closeDialog')
            },
            cancleModify(){
                this.$emit('closeDialog')
            }
        }
    }
</script>
<style>
    
</style>