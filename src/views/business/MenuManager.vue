<template>
    <div id="index">
        <a-space direction="vertical" size="middle">
            <!--            <a-row type="flex" justify="end" :gutter="1">-->
            <a-row type="flex" justify="space-between" :gutter="1">
                <a-col :span="6">
                    <span>菜单列表</span>
                </a-col>
                <!--                <a-col :span="1">-->
                <!--                    <a-space>-->
                <!--                        <a-button type="primary" @click="onDrawerOpen('add')">新增</a-button>-->
                <!--                        &lt;!&ndash;                        <a-button type="primary" @click="editMenu">编辑</a-button>&ndash;&gt;-->
                <!--                    </a-space>-->
                <!--                </a-col>-->
            </a-row>

            <!--  新增角色抽屉显示  -->
            <a-drawer
                :title="addMenuData.isEditType?'编辑菜单':'新增菜单'"
                :width="512"
                :visible="addMenuDradwrvisible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onDrawerClose('normal')"
            >
                <a-form-model
                    layout="horizontal"
                    ref="addMenuForm"
                    :model="addMenuData"
                    :rules="addMenuData.rules">
                    <a-form-model-item label="名称:" prop="menuName">
                        <a-input placeholder="请输入菜单名称" v-model="addMenuData.menuName"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="编码:" prop="menuCode">
                        <a-input placeholder="请输入菜单编码" v-model="addMenuData.menuCode"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="路径:" prop="menuUrl">
                        <a-input placeholder="菜单路径: /{:父路径}/{:菜单编码}" v-model="addMenuData.menuUrl"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="描述:" prop="description">
                        <a-input placeholder="请输入菜单描述信息" v-model="addMenuData.description"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="排序:" prop="sort">
                        <a-input placeholder="请输入菜单序号" v-model="addMenuData.sort"></a-input>
                    </a-form-model-item>
                    <a-form-model-item v-if="!addMenuData.isEditType" label="根子节点选择:" prop="isRootMenu">
<!--                        <a-switch checked-children="根" un-checked-children="子" :checked="addMenuData.isRootMenu"/>-->
                        <a-switch checked-children="根" un-checked-children="子" @change="rootMenuCheck"/>
                    </a-form-model-item>


                    <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                        取消
                    </a-button>
                    <a-button type="primary" @click="saveMenu('addMenuForm')">
                        确认
                    </a-button>
                </a-form-model>

            </a-drawer>

            <!-- 主体列表部分 -->
            <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :rowSelection="rowSelection"
                @change="handleTableChange"
                :scroll="{ x: '110%' }"
            >
                <template slot="isOpenSlot" slot-scope="text, record, index">
                    <a-switch disabled :checked="text===0"></a-switch>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <a-dropdown>
                        <a-menu slot="overlay" @click="handleSelectMenu($event.key,text,record,index)">
                            <a-menu-item key="add">
                                <a-icon type="user"/>
                                新增
                            </a-menu-item>
                            <a-menu-item key="edit">
                                <a-icon type="user"/>
                                编辑
                            </a-menu-item>
                            <a-menu-item key="del">
                                <a-icon type="user"/>
                                删除
                            </a-menu-item>
                            <a-menu-item key="open">
                                <a-icon type="user"/>
                                {{ record.isOpen === 0 ? '停用' : '启用' }}
                            </a-menu-item>
                        </a-menu>
                        <a-button type="primary" style="margin-left: 8px"> 选项
                            <a-icon type="down"/>
                        </a-button>
                    </a-dropdown>
                </template>
            </a-table>

        </a-space>
    </div>
</template>

<script>
import Api from '../../assets/api/api'
import DataUtils from '../../assets/js/DataUtils'

export default {
    name: "MenuManager",
    props: [],
    watch: {
        '$route'(to, from) {
            console.log(to);
            console.log(from)
        }
    },
    data() {
        let col = [
            {
                title: '名称',
                dataIndex: 'name',
                sorter: true,
                // width: '40%',
                align: 'center',
                fixed: 'left'
                // scopedSlots: {customRender: 'name'},
            },
            {
                title: '编码',
                dataIndex: 'code',
                align: 'center',
                sorter: true,
            },
            {
                title: '路径',
                dataIndex: 'url',
                align: 'center',
                sorter: true,
            },
            {
                title: '描述',
                dataIndex: 'description',
                ellipsis: true,
                align: 'center',
                sorter: true,
            },
            {
                title: '层级',
                dataIndex: 'level',
                align: 'center',
                sorter: true,
            },{
                title: '排序',
                dataIndex: 'sort',
                align: 'center',
                sorter: true,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                sorter: true,
                align: 'center'
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                sorter: true,
                align: 'center'
            },
            {
                title: '是否启用',
                dataIndex: 'isOpen',
                fixed: 'right',
                scopedSlots: {customRender: 'isOpenSlot'}
            },
            {
                title: '操作',
                fixed: 'right',
                // dataIndex: 'operation',
                scopedSlots: {customRender: 'operation'},
            }
        ];
        let page = 0;
        let size = 100;
        let pagination = {
            //单页时隐藏分页
            "hideOnSinglePage": true,
            "defaultPageSize": size,
            "showSizeChanger": true
        };
        return {
            page: page,
            size: size,
            sortName: 'sort',
            orderType: 'asc',
            pagination: pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            columns: col,
            // rowSelection: rowselection,
            sourceData: [],
            data: [],
            addMenuDradwrvisible: false,
            addMenuData: {
                id: '',
                menuName: '',
                menuCode: '',
                menuUrl: '',
                pid: '',
                level: '',
                origion: 'pc',
                sort: 0,
                description: '',
                iconUrl: 'icon',
                //base
                isEditType: false,
                isRootMenu: false,
                isMenuOpen: false,
                rules: {
                    menuName: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                    ],
                    menuCode: [
                        {required: true, message: '请输入菜单编码', trigger: 'blur'},
                    ],
                    menuUrl: [
                        {required: true, message: '请输入菜单路径', trigger: 'blur'},
                    ]
                }
            }
        }
    },
    computed: {
        rowSelection() {
            const {selectedRowKeys} = this;
            //表格可选
            // return {
            //     onChange: this.onSelectChange,
            //     // selections: true,
            //     selectedRowKeys,
            //     type: 'radio'
            //     // type:'checkbox'
            // }
            return null;
        }
    },
    created() {
        this.getMenuData();

    },

    mounted() {

    },
    methods: {
        saveMenu(formName) {
            if (this.addMenuData.isEditType) {
                this.editMenu(formName);
            } else {
                this.addMenu(formName);
            }
        },
        addMenu(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.addMenuData);
                    let pid = this.addMenuData.isRootMenu ? '0' : this.addMenuData.pid;
                    let level = this.addMenuData.isRootMenu ? '1' : this.addMenuData.level;
                    let param = {
                        "name": this.addMenuData.menuName,
                        "code": this.addMenuData.menuCode,
                        "url": this.addMenuData.menuUrl,
                        "description": this.addMenuData.description,
                        "iconUrl": this.addMenuData.iconUrl,
                        "pid": pid,
                        "level": level,
                        "origion": this.addMenuData.origion,
                        "sort": this.addMenuData.sort
                    }
                    Api.addMenu(param).then(value => {
                        if (value.code === 0) {
                            console.log("新增成功")
                            this.$refs.addMenuForm.resetFields();
                            this.addMenuDradwrvisible = false;
                            this.getMenuData();
                        } else {
                            console.log("新增失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        editMenu(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.addMenuData);
                    // let pid = this.addMenuData.isRootMenu ? '0' : this.addMenuData.pid;
                    // let level = this.addMenuData.isRootMenu ? '1' : this.addMenuData.level;
                    let param = {
                        'id': this.addMenuData.id,
                        "name": this.addMenuData.menuName,
                        "code": this.addMenuData.menuCode,
                        "url": this.addMenuData.menuUrl,
                        "description": this.addMenuData.description,
                        "iconUrl": this.addMenuData.iconUrl,
                        // "pid": pid,
                        // "level": level,
                        // "origion": this.addMenuData.origion,
                        "sort": this.addMenuData.sort
                    }
                    Api.editMenu(param).then(value => {
                        if (value.code === 0) {
                            console.log("修改成功")
                            this.$refs.addMenuForm.resetFields();
                            this.addMenuDradwrvisible = false;
                            this.getMenuData();
                            this.initEmptyData();
                        } else {
                            console.log("修改失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        addMenuInit(data) {
            console.log(data);
            this.onDrawerOpen('add')
            this.addMenuData.isEditType = false;
            this.initEmptyData();
            this.addMenuData.pid = data.id;
            this.addMenuData.level = parseInt(data.level) + 1;
        },

        editMenuInit(data) {
            this.addMenuData.isEditType = true;
            this.onDrawerOpen()
            //初始化数据
            this.addMenuData.id = data.id;
            this.addMenuData.menuName = data.name;
            this.addMenuData.menuName = data.name;
            this.addMenuData.menuCode = data.code;
            this.addMenuData.menuUrl = data.url;
            this.addMenuData.description = data.description;
            this.addMenuData.sort = data.sort;
        },

        delMenu(data) {
            let that = this;
            let selectedRows = data;
            if (!selectedRows) {
                console.log("请选择一条数据")
                return false;
            }
            let content = "确认删除'" + selectedRows.name + "'吗？";
            console.log(content);

            this.$confirm({
                title: '删除角色',
                content: content,
                onOk() {
                    return Api.delMenu(selectedRows.id).then(value => {
                        if (value.code === 0) {
                            console.log("删除成功")
                            that.getMenuData();
                        } else {
                            console.log("删除失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                }

            })
        },

        getMenuData() {
            this.loading = true;
            let params = {
                "page": this.page,
                "size": this.size,
                "sort": this.sortName,
                "direction ": this.orderType,
            }
            console.log(params);
            Api.getMenuList(params).then(value => {
                console.log(value);
                this.loading = false;
                if (value.code === 0) {
                    const pagination = {...this.pagination};
                    pagination.total = value.data.totalElements;
                    this.sourceData = value.data.content;
                    this.data = DataUtils.initTreeData(value.data.content);
                    this.pagination = pagination;

                    ////TODO 【疑问】 不显示分页信息 by Janloong_Doo
                    // this.pagination.total = value.data.totalElements;
                    // this.data = value.data.content;
                } else {
                    console.log("获取失败")
                    console.log(value)
                }
                this.loading = false;
            }).catch(reason => {

            });
        },

        handleTableChange(pagination, filters, sorter) {
            this.pagination.current = pagination.current;
            this.size = pagination.pageSize;
            this.page = pagination.current - 1;
            let order = sorter.order;
            if (order) {
                this.sortName = sorter.field;
                this.orderType = order === 'ascend' ? 'asc' : 'desc';
            }
            this.getMenuData();
            this.sortName = '';
            this.orderType = '';
            // ...filters,
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            console.log(selectedRowKeys);
            console.log(selectedRows);
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
        },

        onDrawerOpen(type) {
            if (type === 'add') {
                this.addMenuData.isEditType = false;
            }
            this.addMenuDradwrvisible = true;
        },

        onDrawerClose(type) {
            console.log(type);
            if (type === 'reset') {
                console.log('重置');
                this.addMenuData.isEditType = false;
            }
            this.addMenuDradwrvisible = false;
        },
        changeMenuStatus(data) {
            let that = this;
            let selectedRows = data;
            if (!selectedRows) {
                console.log("请选择一条数据")
                return false;
            }
            let content = "确认修改菜单'" + selectedRows.name + "'的状态吗？";
            console.log(content);

            this.$confirm({
                title: '修改菜单',
                content: content,
                onOk() {
                    return Api.changeMenuStatus({'id': selectedRows.id}).then(value => {
                        if (value.code === 0) {
                            console.log(value.msg)
                            that.getMenuData();
                        } else {
                            console.log("修改失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                }

            })
        },
        handleSelectMenu(event, text, record, index) {
            switch (event) {
                case 'add':
                    this.addMenuInit(text);
                    break;
                case 'edit':
                    this.editMenuInit(text);
                    break;
                case 'del':
                    this.delMenu(text);
                    break;
                case 'open':
                    this.changeMenuStatus(text);
                    break;
                default :
                    return false;
            }
        },
        initEmptyData() {
            this.addMenuData.isEditType = false;
            this.addMenuData.menuName = '';
            this.addMenuData.menuCode = '';
            this.addMenuData.menuUrl = '';
            this.addMenuData.menupidUrl = '';
            this.addMenuData.level = '';
            this.addMenuData.description = '';
            this.addMenuData.sort = 0;
        },
        rootMenuCheck(check){
            this.addMenuData.isRootMenu=check;
            console.log(this.addMenuData.isRootMenu);
        }

    }

}
</script>

<style scoped>

</style>