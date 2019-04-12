<template>
    <div class="page-container">
        <el-row :gutter="20" class="mgb20">
            <el-col :span="3">
                <el-select v-model="supplierValue" placeholder="全部供应商">
                    <el-option
                    v-for="item in supplierList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="buyerValue" placeholder="全部采购员">
                    <el-option
                    v-for="item in buyerList"
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
            <el-col :span="4">
                <div class="block">
                    <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="开始日期">
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
                <el-input v-model="keyword" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="3" class="ta-l">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
        </el-row>
        <el-table
        :data="inputList"
        border
        style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            width="100"
            align="center"
            >
            </el-table-column>
        
            <el-table-column
            prop="inputNo"
            label="入库单号"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="source"
            label="来源单号"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="supplierName"
            label="供应商名称"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="buyer"
            label="采购员"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="operator"
            label="操作员"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="storeName"
            label="仓库名称"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="date"
            label="到货日期"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="status"
            label="状态"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="sum"
            label="订单总数"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="hasIn"
            label="已入库"
            width="120"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="hasNot"
            label="未入库"
            width="120"
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
                    
                    <el-button size="mini" 
                    @click="scope.row.handleStatus == 'h' ? handleOrder(scope.row) : checkOrder(scope.row)" 
                    icon="el-icon-delete" 
                    >{{scope.row.handleStatus == 'h' ? '处理订单' : '查看'}}</el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 查看订单弹窗 -->
        <inputDialog 
        :title='cTitle'
        :dialogVisible = 'cDialogVisible'
        :dialogRuleForm = 'cDialogRuleForm'
        :flag = 'false'
        :inputDialogList = 'cInputDialogList'
        @closeDialog = 'cCloseDialog'
        >
        </inputDialog>

        <!-- 处理订单弹窗 -->
        <inputDialog 
        :title='hTitle'
        :dialogVisible = 'hDialogVisible'
        :dialogRuleForm = 'hDialogRuleForm'
        :flag = 'true'
        :inputDialogList = 'hInputDialogList'
        @closeDialog = 'hCloseDialog'
        >
        </inputDialog>
    </div>
</template>
<script>
import inputDialog from "@/components/inputDialog"
export default {
    components:{
        inputDialog
    },
    data(){
        return{
            inputList:[
                {
                    inputNo:'12636366',
                    source:'125266885',
                    supplierName:'xxxxx',
                    buyer:'xxxxx',
                    operator:'xxxxx',
                    storeName:'xxxxx',
                    date:'xxxxx',
                    status:'xxxxx',
                    sum:'xxxxx',
                    hasIn:'xxxxx',
                    hasNot:'xxxxx',
                    handleStatus:"h"//h为处理订单，c为查看
                },
                {
                    inputNo:'12636366',
                    source:'125266885',
                    supplierName:'xxxxx',
                    buyer:'xxxxx',
                    operator:'xxxxx',
                    storeName:'xxxxx',
                    date:'xxxxx',
                    status:'xxxxx',
                    sum:'xxxxx',
                    hasIn:'xxxxx',
                    hasNot:'xxxxx',
                    handleStatus:"l"//h为处理订单，l为查看
                }
            ],
            supplierValue:'',
            supplierList:[
                {
                    value:"1552852",
                    label:"联强"
                },
                {
                    value:"11225252",
                    label:"华为"
                },
            ],
            buyerValue:'',
            buyerList:[
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
            startTime:'',
            endTime:'',
            keyword:'',
            cTitle:'原料入库登记单',
            cDialogVisible:false,
            hTitle:'原料入库登记单',
            hDialogVisible:false,
            cDialogRuleForm:{
                inputNo:'xxxx',
                buyNo:'xxxx',
                inputDate:'xxxx',
                operator:'xxxx',
                stockName:'xxxx',
                feeder:'xxxx',
                buyer:'xxxx'
            },
            hDialogRuleForm:{
                inputNo:'xxxx',
                buyNo:'xxxx',
                inputDate:'xxxx',
                operator:'xxxx',
                stockName:'xxxx',
                feeder:'xxxx',
                buyer:'xxxx'
            },
            cInputDialogList:[
                {
                    stockName:'xxx',
                    no:'xxxx',
                    brand:'xxx',
                    size:'xxx',
                    type:'xxx',
                    piece:'xxx',
                    remark:'xxx',
                    name:'xxx',
                    orderNum:'xxx',
                    intoNum:'xxx',
                    shortNum:'xxx',

                }
            ]
        }
    },
    methods: {
        onSubmit(){},
        handleOrder(){
            this.hDialogVisible = true
        },
        checkOrder(){
            this.cDialogVisible = true

        },
        cCloseDialog(){
            this.cDialogVisible = false
        },
        hCloseDialog(){
            this.hDialogVisible = false
        },

    },
}
</script>