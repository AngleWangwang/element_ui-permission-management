<template>
    <div class="page-container">
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            width="200"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="type"
            label="预警类别"
            width="300"
            align="center"
            >
            </el-table-column>          
            <el-table-column
            prop="warning"
            label="预警报告对象"
            width="300"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="handle"
            label="操作"
            align="center"
            min-width="200"
            :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    
                    <el-button size="mini" @click="modifyWarning(scope.row)" icon="el-icon-delete">修改</el-button>
                    <el-button size="mini" @click="deletelWarning(scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
        title="修改预警设置"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="预警类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="角色权限">
                    <el-checkbox-group v-model="form.role">
                        <el-checkbox v-for="item in roleList" 
                        :key="item.value"
                        :label="item.label" 
                        :value="item.value"
                        :name="role">
                        </el-checkbox>
                        
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData:[
                    {
                        type:'xxxx',
                        warning:'xxxxxxxx'
                    }
                ],
                dialogVisible:false,
                form:{
                    role:''
                },
                roleList:[
                    {}
                ]
            }
        },
        methods:{
            modifyWarning(){
                this.dialogVisible = true
            },
            deletelWarning(){},
            handleClose(done){
                done()
            }
        }
    }
</script>