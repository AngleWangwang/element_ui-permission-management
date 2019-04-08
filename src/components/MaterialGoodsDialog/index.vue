<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="40%"
        max-height="400px"
        :before-close="closeDialogVisible">
            <el-form :model="dialogaRuleForm" :rules="rules" ref="dialogaRuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号/条形码" prop="no">
                    <el-input v-model="dialogaRuleForm.no"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogaRuleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="type">
                    <el-input v-model="dialogaRuleForm.type"></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand" v-if='dialogFlag == "m"'>
                    <el-input v-model="dialogaRuleForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="size">
                    <el-input v-model="dialogaRuleForm.size"></el-input>
                </el-form-item>
                <el-form-item label="规格" prop="model">
                    <el-input v-model="dialogaRuleForm.model"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="piece">
                    <el-input v-model="dialogaRuleForm.piece"></el-input>
                </el-form-item>
                
                <el-form-item label="标准价格" prop="max" v-if = 'dialogFlag == "g"'>
                    <el-input v-model="dialogaRuleForm.max"></el-input>
                </el-form-item>

                <el-form-item label="库存上限" prop="max">
                    <el-input v-model="dialogaRuleForm.max"></el-input>
                </el-form-item>
                <el-form-item label="库存下限" prop="min">
                    <el-input v-model="dialogaRuleForm.max"></el-input>
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
        props:['title','dialogVisible','dialogaRuleForm','dialogFlag'],
        data(){
            return{
                
                rules:{
                    no: [
                        { required: true, message: '原料编号/条形码不能为空', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '原料名称不能为空', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    piece: [
                        { required: true, message: '单位不能为空', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '标准价格不能为空', trigger: 'blur' },
                    ]

                }
                
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