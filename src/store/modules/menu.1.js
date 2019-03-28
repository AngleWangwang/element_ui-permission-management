export default {
    state: {
        // navTree: [],  // 导航菜单树
        navTree:[
            {
                id:1,
                name:'采购管理',
                icon:'fa fa-truck',
                url:'/purchase' 
            },
            {
                id:2,
                name:'销售管理',
                icon:'fa fa-pie-chart',
                url:'/sell' 
            },
            {
                id:3,
                name:'库存管理',
                icon:'fa fa-database',
                children:[
                    {   id:3.1,
                        name:'入库登记',
                        icon:'fa fa-hand-o-right',
                        url:'/stock/input' 
                    },
                    {   id:3.2,
                        name:'出库登记',
                        icon:'fa fa-hand-o-left',
                        url:'/stock/output' 
                    },
                    {   id:3.3,
                        name:'原料库存',
                        icon:'fa fa-cube',
                        url:'/stock/material' 
                    },
                    {   id:3.4,
                        name:'成品库存',
                        icon:'fa fa-cubes',
                        url:'/stock/goods' 
                    },
                    {   id:3.5,
                        name:'出入库记录',
                        icon:'fa fa-calendar',
                        url:'/stock/inorout' 
                    },
                    {   id:3.6,
                        name:'库存盘点',
                        icon:'fa fa-pencil-square',
                        url:'/stock/check' 
                    },
                ],
                url:'' 
            },
            {
                id:4,
                name:'财务管理',
                icon:'fa fa-balance-scale',
                url:'/finance' 
            },
            {
                id:5,
                name:'通知管理',
                icon:'fa fa-bell-o',
                url:'/notice' 
            },
            {
                id:6,
                name:'基础管理',
                children:[
                    {
                        id:6.1,
                        name:'用户管理',
                        icon:'fa fa-user-circle-o',
                        url:'/sys/user'
                    },
                    {
                        id:6.2,
                        name:'角色管理',
                        icon:'fa fa-users',
                        url:'/sys/roles'
                    },
                    {
                        id:6.3,
                        name:'原料/成品管理',
                        icon:'fa fa-hourglass-end',
                        url:'/sys/materialandgoods'
                    },
                    {
                        id:6.4,
                        name:'客户/供应商资料',
                        icon:'fa fa-handshake-o',
                        url:'/sys/customerandsupplier'
                    },
                    {
                        id:6.5,
                        name:'仓库管理',
                        icon:'fa fa-cubes',
                        url:'/sys/store'
                    },
                    {
                        id:6.6,
                        name:'预警设置',
                        icon:'fa fa-warning',
                        url:'/sys/warning'
                    },
                ],
                icon:'fa fa-cog',
                url:''
            },
            {
                id:7,
                name:'统计分析',
                icon:'fa fa-bar-chart',
                url:'/statistics' 
            },
        ]
    },
    getters: {
   
    },
    mutations: {
        setNavTree(state, navTree){  // 设置导航菜单树
            state.navTree = navTree;
        }
    },
    actions: {
        
    }
}