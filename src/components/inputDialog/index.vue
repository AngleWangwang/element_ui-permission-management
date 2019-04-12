<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="70%"
        style="position:reletive"
        :before-close="closeDialogVisible">
            <span class="vlog">已出库</span>
            <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm" label-width="100px" class="demo-ruleForm mgb20">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="入库单号" prop="inputNo" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.inputNo" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="采购单号" prop="buyNo" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.buyNo" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库日期" prop="inputDate" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.inputDate" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="操作员" prop="operator" style="margin-bottom:0px;">

                            <el-input v-model="dialogRuleForm.operator" size="mini" disabled   v-if="flag == false"></el-input>
                            <el-input v-model="dialogRuleForm.operator" size="mini" v-if="flag == true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="仓库名称" prop="stockName" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.stockName" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="送料人" prop="feeder" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.feeder" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="采购员" prop="buyer" style="margin-bottom:0px;">
                            <el-input v-model="dialogRuleForm.buyer" size="mini" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
            :data="inputDialogList"
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
                prop="stockName"
                label="仓库名称"
                width="120"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="no"
                label="原料编号"
                width="120"
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
                prop="brand"
                label="品牌"
                width="120"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="type"
                label="型号"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="size"
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
                prop="orderNum"
                label="订料数"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="intoNum"
                label="入库数"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="shortNum"
                label="欠货数"
                width="100"
                align="center"
                >
                </el-table-column>

                <el-table-column
                prop="remark"
                label="备注"
                min-width="100"
                align="center"
                >
                </el-table-column>

                
            </el-table>
            <div slot="footer" class="dialog-footer" v-if="flag == true">
                <el-button type="primary" @click="makeSure">确 定</el-button>
            </div>
        </el-dialog>
</template>
<script>
export default {
    props:['title','dialogVisible','dialogRuleForm','flag','inputDialogList'],
    data(){
        return{
            rules:{}

            
        }
    },
    methods: {
        closeDialogVisible(){
            // done()
            this.$emit('closeDialog')
        },
        makeSure(){
            this.$emit('closeDialog')
        }
    },
}
</script>
<style lang="scss">
    .vlog{
        padding: 0px 5px;
        position: absolute;
        top: 20px;
        left: 60%;
        font-size: 14px;
        border: 1px solid #e9345b;
        border-radius: 2px;
        background-color: rgb(255, 215, 225);
    }
    .el-input--mini .el-input__inner{
        border: none;
        border-bottom: 1px solid #bbb;
        border-radius: 0px;
    }
</style>
