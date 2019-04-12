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
            <div>
                <el-row style="padding:0 0 20px 0;">
                    <el-col :span="6"><div class="grid-content ta-r pdr10">预警类别：</div></el-col>
                    <el-col :span="18">
                        <div class="grid-content ta-l">
                            <input type="text" value="" v-model="roleList.type" name="type" class="el-input-own">
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"><div class="grid-content ta-r pdr10">角色权限：</div></el-col>
                    <el-col :span="18">
                        <div class="grid-content ta-l">
                            <el-row>
                                <el-col :span="6" v-for="(item,index) in roleList.list" :key="index"> 
                                    <!-- <div class="grid-content">
                                        <input type="checkbox" v-model="item.value" name="item.name">
                                        <label for="item.name">{{item.label}}</label>
                                    </div> -->
                                    <el-checkbox v-model="item.checked" style="margin-bottom:10px;">{{item.label}}</el-checkbox>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="makeSure">确 定</el-button>
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
                roleList:{
                    type:"库存超上限",
                    list:[
                        {
                            name:'test',
                            checked:true,
                            label:'测试'
                        },
                        {
                            name:'test1',
                            checked:true,
                            label:'测试1'
                        },
                        {
                            name:'test',
                            checked:true,
                            label:'测试'
                        },
                        {
                            name:'test1',
                            checked:true,
                            label:'测试1'
                        },
                        {
                            name:'test',
                            checked:true,
                            label:'测试'
                        },
                        {
                            name:'test1',
                            checked:true,
                            label:'测试1'
                        },
                        
                    ]
                }
                    
                    
            }
        },
        methods:{
            modifyWarning(){
                this.dialogVisible = true
            },
            deletelWarning(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })     
                })
            },
            handleClose(done){
                done()
            },
            makeSure(){
                this.dialogVisible = false
                console.log(this.roleList)
            }
        }
    }
</script>
<style lang="scss">
    // .el-dialog__body{
    //     padding: 0;
    // }
    .el-input-own{
        border:none;
    }
</style>