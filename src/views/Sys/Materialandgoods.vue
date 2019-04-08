<template>
    <div class="page-container">
        
        <el-tabs type="border-card">
            
            <el-tab-pane label="原料管理">
                <!-- 原料管理 -->
                <el-row style="text-align:right;" class="mgb20">
                    <el-button type="primary" plain @click="addMaterial()"> <span class="fa fa-edit"></span> 增加原料</el-button>
                </el-row>
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    type="index"
                    label="编号"
                    width="50"
                    align="center"
                    >
                    </el-table-column>
                
                    <el-table-column
                    prop="no"
                    label="原料编号/条形码"
                    width="130"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="原料名称"
                    width="120"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="type"
                    label="类别"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="brand"
                    label="品牌"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="size"
                    label="型号"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="model"
                    label="规格"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="piece"
                    label="单位"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="max"
                    label="库存上限"
                    width="100"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="max"
                    label="库存下限"
                    width="100"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="remark"
                    label="备注"
                    width="100"
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
                            
                            <el-button size="mini" @click="modifyMaterialGoods(scope.row)" icon="el-icon-delete">修改</el-button>
                            <el-button size="mini" @click="deleteMaterialGoods(scope.row)" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!-- 成品管理 -->
            <el-tab-pane label="成品管理">
                <el-row style="text-align:right;" class="mgb20">
                    <el-button type="primary" plain @click="addGoods()"> <span class="fa fa-edit"></span> 增加成品</el-button>
                </el-row>
                <el-table
                :data="goodsList"
                border
                style="width: 100%">
                    <el-table-column
                    type="index"
                    label="编号"
                    width="50"
                    align="center"
                    >
                    </el-table-column>
                
                    <el-table-column
                    prop="no"
                    label="成品编号/条形码"
                    width="130"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="成品名称"
                    width="120"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="type"
                    label="类别"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="size"
                    label="型号"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="model"
                    label="规格"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="piece"
                    label="单位"
                    width="80"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="price"
                    label="标准价格"
                    width="100"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="max"
                    label="库存上限"
                    width="100"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="max"
                    label="库存下限"
                    width="100"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="remark"
                    label="备注"
                    width="100"
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
                            
                            <el-button size="mini" @click="modifyGoods(scope.row)" icon="el-icon-delete">修改</el-button>
                            <el-button size="mini" @click="deletelGoods(scope.row)" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 修改原料弹窗 -->
        <MaterialGoods 
        :title='MmaterialTitle' 
        :dialogVisible = 'MmaterialDialogVisible' 
        :dialogaRuleForm = 'MmaterialDialogaRuleForm'
        :dialogFlag = 'MdialogFlag'
        @closeDialog='closeDialog'
        >
        </MaterialGoods>

        <!-- 增加原料弹窗 -->
        <MaterialGoods 
        :title='AmaterialTitle' 
        :dialogVisible = 'AmaterialDialogVisible' 
        :dialogaRuleForm = 'AmaterialDialogaRuleForm'
        :dialogFlag = 'MdialogFlag'
        @closeDialog='closeDialog'
        >
        </MaterialGoods>

        
        <!-- 修改成品弹窗 -->
        <MaterialGoods 
        :title='MgoodsTitle' 
        :dialogVisible = 'MgoodsDialogVisible' 
        :dialogaRuleForm = 'MgoodsDialogaRuleForm'
        :dialogFlag = 'GdialogFlag'
        @closeDialog='closeDialog'
        >
        </MaterialGoods>

        <!-- 增加原料弹窗 -->
        <MaterialGoods 
        :title='AgoodsTitle' 
        :dialogVisible = 'AgoodsDialogVisible' 
        :dialogaRuleForm = 'AgoodsDialogaRuleForm'
        :dialogFlag = 'GdialogFlag'
        @closeDialog='closeDialog'
        >
        </MaterialGoods>
    </div>
</template>
<script>
    import MaterialGoods from '@/components/MaterialGoodsDialog'
    export default{
        components:{
            MaterialGoods
        },
        data(){
            return{
                // 原料列表数据
               tableData:[
                  {
                      no:1236363636,
                      name:'原料列表',
                      type:'xxxxxxxx',
                      brand:'xxxxxxxx',
                      size:'xxxxxxxx',
                      model:'xxxxxxxx',
                      piece:'xxxxxxxx',
                      max:'xxxxxxxx',
                      min:'xxxxxxxx',
                      remark:'xxxxxxxx',
                  }
               ],
                // 成品列表数据
               goodsList:[
                  {
                      no:1236363636,
                      name:'成品列表',
                      type:'xxxxxxxx',
                      price:'xxxxxxxx',
                      size:'xxxxxxxx',
                      model:'xxxxxxxx',
                      piece:'xxxxxxxx',
                      max:'xxxxxxxx',
                      min:'xxxxxxxx',
                      remark:'xxxxxxxx',
                  }
               ],
               
            //    修改原料弹窗表单内容
               MmaterialDialogaRuleForm:
                  {
                      no:1236363636,
                      name:'修改原料弹窗',
                      type:'xxxxxxxx',
                      brand:'xxxxxxxx',
                      size:'xxxxxxxx',
                      model:'xxxxxxxx',
                      piece:'xxxxxxxx',
                      max:'xxxxxxxx',
                      min:'xxxxxxxx',
                      remark:'xxxxxxxx',
                  }
               ,
            //    修改原料弹窗表单内容
               AmaterialDialogaRuleForm:
                  {
                      no:'',
                      name:'',
                      type:'',
                      brand:'',
                      size:'',
                      model:'',
                      piece:'',
                      max:'',
                      min:'',
                      remark:'',
                  }
               ,
            //    修改成品弹窗表单内容
                MgoodsDialogaRuleForm:
                    {
                        no:'102020222',
                        name:'修改成品弹窗',
                        type:'XXXXX',
                        price:'XXXXX',
                        size:'XXXXX',
                        model:'XXXXX',
                        piece:'XXXXX',
                        max:'XXXXX',
                        min:'XXXXX',
                        remark:'XXXXX',
                    }
                ,
            //    增加成品弹窗表单内容
               AgoodsDialogaRuleForm:
                  {
                      no:'',
                      name:'',
                      type:'',
                      price:'',
                      size:'',
                      model:'',
                      piece:'',
                      max:'',
                      min:'',
                      remark:'',
                  }
               ,
            //    弹窗显示标识
                MmaterialDialogVisible:false,
                AmaterialDialogVisible:false,
                MgoodsDialogVisible:false,
                AgoodsDialogVisible:false,
                MmaterialTitle:'',
                AmaterialTitle:'',
                MgoodsTitle:'',
                AgoodsTitle:'',
                // 弹窗来源标识
                MdialogFlag:'m',
                GdialogFlag:'g',


            }
        },
        methods:{
            // 增加原料
            addMaterial(){
                this.AmaterialDialogVisible = true
                this.AmaterialTitle = '增加原料'
            },
            // 增加成品
            addGoods(){
                this.AgoodsDialogVisible = true
                this.AgoodsTitle = '增加成品'
            },
            // 原料管理
            modifyMaterialGoods(row){
                this.MmaterialDialogVisible = true
                this.MmaterialTitle = '修改原料'
            },
            deleteMaterialGoods(row){

            },
            closeDialog(){
            
                this.MmaterialDialogVisible = false
                this.AmaterialDialogVisible = false
                this.MgoodsDialogVisible = false
                this.AgoodsDialogVisible = false
            },
            // 成品管理
             modifyGoods(row){
                this.MgoodsDialogVisible = true
                this.MgoodsTitle = '修改原料'
            },
            deleteGoods(row){

            },
        }
    }
</script>