<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="closeDialogVisible">
            <el-form :model="dialogaRuleForm" :rules="rules" ref="dialogaRuleForm" label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogaRuleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="类别" prop="type">
                    <el-select v-model="dialogaRuleForm.type" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="类别" prop="type">
                    <el-input v-model="dialogaRuleForm.type"></el-input>
                </el-form-item>
            
                <el-form-item label="联系人" prop="contacts">
                    <el-input v-model="dialogaRuleForm.contacts"></el-input>
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
                        { required: true, message: '客户/供应商不能为空', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '类别不能为空', trigger: 'blur' },
                    ],
                    contacts: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' },
                    ],
                    tell: [
                        { required: true, message: '电话不能为空', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '地址不能为空', trigger: 'blur' },
                    ],

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