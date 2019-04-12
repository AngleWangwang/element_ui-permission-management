<template>
    <div class="page-container">
        <el-row :gutter="20" class="mgb20">
            <el-col :span="3">
                <el-select v-model="typeValue" placeholder="全部类别">
                    <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="operatorValue" placeholder="全部品牌">
                    <el-option
                    v-for="item in operatorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="statusValue" placeholder="全部状态">
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
           
            <el-col :span="6">
                <el-input v-model="keyword" placeholder="请输入原料编号/原料名称"></el-input>
            </el-col>
            <el-col :span="2" class="ta-l">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
            <el-col :span="4">
                <el-checkbox v-model="checked" style="line-height:40px;">只显示库存不足或超库存超限的产品</el-checkbox>
            </el-col>
        </el-row>

        <el-table
        :data="materialList"
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
            prop="materialNo"
            label="原料编号"
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="materialName"
            label="原料名称"
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="type"
            label="类型"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="brand"
            label="品牌"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="size"
            label="型号"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="model"
            label="规格"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="piece"
            label="单位"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="sum"
            label="库存总量"
            sortable
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="min"
            label="库存下限"
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
            prop="lower"
            label="是否低于库存下限"
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="higher"
            label="是否高于库存上限"
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="handle"
            label="操作"
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <el-button size="mini" 
                    @click="handleOrder(scope.row)" 
                    icon="el-icon-delete" 
                    >入库记录</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 入库记录弹窗 -->
        <el-dialog
        title="入库记录"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">  
            <el-row :gutter="20" class="mgb20">
                <el-col :span="4">
                    <div class="block">
                        <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="起始日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="block">
                        <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="operatorValue" placeholder="全部操作员">
                        <el-option
                        v-for="item in operatorList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            
                <el-col :span="4" class="ta-l">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-col>
                <el-col :span="8"  class="ta-r">
                    <el-button  @click="downLoad" class="fa fa-cloud-download">下载</el-button>
                    <el-button  @click="pringting" class="fa fa-print">打印</el-button>
                </el-col>
            </el-row>

            <el-table
            :data="dialoglList"
            border
            style="width: 100%">
            
                <el-table-column
                prop="date"
                label="日期"
                width="150"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="type"
                label="操作类型"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="no"
                label="原料编号"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="mName"
                label="原料名称"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="brand"
                label="品牌"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="size"
                label="型号"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="model"
                label="规格"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="piece"
                label="单位"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="sum"
                label="数量"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="operator"
                label="操作员"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="feeder"
                label="送料人"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="sName"
                label="仓库名称"
                min-width="100"
                align="center"
                >
                </el-table-column>

                
            </el-table>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="makeSure">确 定</el-button>
            </div> -->
        </el-dialog>

    </div>
</template>
<script>
export default {
    data(){
        return{
            materialList:[
                {
                    materialNo:'12636366',
                    materialName:'125266885',
                    type:'xxxxx',
                    brand:'xxxxx',
                    size:'xxxxx',
                    model:'xxxxx',
                    piece:'xxxxx',
                    sum:125,
                    min:'xxxxx',
                    max:'xxxxx',
                    lower:'xxxxx',
                    higher:'xxxxx',
                },
                {
                    materialNo:'12636366',
                    materialName:'125266885',
                    type:'xxxxx',
                    brand:'xxxxx',
                    size:'xxxxx',
                    model:'xxxxx',
                    piece:'xxxxx',
                    sum:526,
                    min:'xxxxx',
                    max:'xxxxx',
                    lower:'xxxxx',
                    higher:'xxxxx',
                },
                {
                    materialNo:'12636366',
                    materialName:'125266885',
                    type:'xxxxx',
                    brand:'xxxxx',
                    size:'xxxxx',
                    model:'xxxxx',
                    piece:'xxxxx',
                    sum:269,
                    min:'xxxxx',
                    max:'xxxxx',
                    lower:'xxxxx',
                    higher:'xxxxx',
                },
            ],
            dialoglList:[
                {
                    date:'2018-05-09',
                    type:'xxxxx',
                    no:'xxxx',
                    mName:'xxxx',
                    brand:'xxxxx',
                    size:'xxxxx',
                    model:'xxxxx',
                    piece:'xxxxx',
                    sum:269,
                    operator:'xxxx',
                    feeder:'xxxx',
                    sName:'xxx'
                }
            ],
            typeValue:'',
            typeList:[
                {
                    value:"1552852",
                    label:"联强"
                },
                {
                    value:"11225252",
                    label:"华为"
                },
            ],
            operatorValue:'',
            operatorList:[
                {
                    value:"1552852",
                    label:"联强"
                },
                {
                    value:"11225252",
                    label:"华为"
                },
            ],
            statusValue:'',
            statusList:[
                {
                    value:"1552852",
                    label:"待入库"
                },
                {
                    value:"11225252",
                    label:"处理中"
                },
            ],
            keyword:'',
            checked:false,
            dialogVisible:false,
            startTime:'',
            endTime:''
        }
    },
    methods: {
        onSubmit(){},
        handleOrder(){
            this.dialogVisible = true
        },
        handleClose(done){
            done()
        },
        downLoad(){},
        pringting(){}
    },
}
</script>