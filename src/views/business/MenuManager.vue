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
                <a-form
                    layout="horizontal"
                    ref="addMenuForm"
                    :model="addMenuData"
                    :rules="addMenuData.rules">
                    <a-form-item label="名称:" name="menuName">
                        <a-input placeholder="请输入菜单名称" v-model:value="addMenuData.menuName"></a-input>
                    </a-form-item>
                    <a-form-item label="英文名称:" name="engTitle">
                        <a-input placeholder="请输入菜单英文名称" v-model:value="addMenuData.engTitle"></a-input>
                    </a-form-item>
                    <a-form-item label="编码:" name="menuCode">
                        <a-input placeholder="请输入菜单编码" v-model:value="addMenuData.menuCode"></a-input>
                    </a-form-item>
                    <a-form-item label="路径:" name="menuUrl">
                        <a-input placeholder="菜单路径: /{:父路径}/{:菜单编码}" v-model:value="addMenuData.menuUrl"></a-input>
                    </a-form-item>
                    <a-form-item label="描述:" name="description">
                        <a-input placeholder="请输入菜单描述信息" v-model:value="addMenuData.description"></a-input>
                    </a-form-item>
                    <a-form-item label="组件:" name="component">
                        <a-input placeholder="请输入组件信息" v-model:value="addMenuData.component"></a-input>
                    </a-form-item>
                    <a-form-item label="图标:" name="iconUrl">
                        <a-input placeholder="请输入图标信息" v-model:value="addMenuData.iconUrl"></a-input>
                        <g-icon :icon="addMenuData.iconUrl" :size="25"></g-icon>
                    </a-form-item>
                    <a-form-item label="排序:" name="sort">
                        <a-input placeholder="请输入菜单序号" v-model:value="addMenuData.sort"></a-input>
                    </a-form-item>
                    <a-form-item v-if="!addMenuData.isEditType" label="根子节点选择:" name="isRootMenu">
                        <!--                        <a-switch checked-children="根" un-checked-children="子" :checked="addMenuData.isRootMenu"/>-->
                        <a-switch checked-children="根" un-checked-children="子" @change="rootMenuCheck"/>
                    </a-form-item>


                    <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                        取消
                    </a-button>
                    <a-button type="primary" @click="saveMenu('addMenuForm')">
                        确认
                    </a-button>
                </a-form>

            </a-drawer>

            <!-- 主体列表部分 -->
            <a-table
                class="custome-table"
                :columns="columns"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :rowSelection="rowSelection"
                @change="handleTableChange"
                :scroll="{ x: '110%' }"
            >
                <template #isOpenSlot="{text, record, index}">
                    <a-switch disabled :checked="text===0"></a-switch>
                </template>

                <template #iconSlot="{text, record, index}">
                    <g-icon :icon="text" :size="25"></g-icon>
                </template>

                <template #operation="{text, record, index}">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleSelectMenu($event.key,text,record,index)">
                                <a-menu-item key="add">
                                    新增
                                    <PlusOutlined/>
                                </a-menu-item>
                                <a-menu-item key="edit">
                                    编辑
                                    <EditOutlined/>
                                </a-menu-item>
                                <a-menu-item key="del">
                                    删除
                                    <CloseOutlined/>
                                </a-menu-item>
                                <a-menu-item key="open">
                                    {{ record.isOpen === 0 ? '停用' : '启用' }}
                                    <EditOutlined/>
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button type="primary" style="margin-left: 8px"> 选项
                            <down-outlined></down-outlined>
                        </a-button>
                    </a-dropdown>
                </template>
            </a-table>

        </a-space>
    </div>
</template>

<script lang="ts">
import DataUtils from '../../assets/js/DataUtils'
import {CloseOutlined, DownOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons-vue';
import GIcon from "../../components/Icon";
import {getMenuList,getMenuListByUser,addMenu,editMenu,delMenu,changeMenuStatus} from "/@/api/menu";

export default {
    name: "MenuManager",
    props: [],
    components: {GIcon, DownOutlined, PlusOutlined, EditOutlined, CloseOutlined},
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
                dataIndex: 'title',
                sorter: true,
                // width: '40%',
                // align: 'center',
                fixed: 'left'
                // scopedSlots: {customRender: 'name'},
            },
            {
                title: '英文名称',
                dataIndex: 'engTitle',
                align: 'center',
                sorter: true,
            },
            {
                title: '编码',
                dataIndex: 'name',
                align: 'center',
                sorter: true,
            },
            {
                title: '路径',
                dataIndex: 'path',
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
                title: '组件',
                dataIndex: 'component',
                ellipsis: true,
                align: 'center',
                sorter: true,
            },
            {
                title: '图标',
                dataIndex: 'iconUrl',
                ellipsis: true,
                align: 'center',
                sorter: true,
                slots: {customRender: 'iconSlot'}
            },
            {
                title: '层级',
                dataIndex: 'level',
                align: 'center',
                sorter: true,
            }, {
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
                slots: {customRender: 'isOpenSlot'}
            },
            {
                title: '操作',
                fixed: 'right',
                key: 'operation',
                // dataIndex: 'operation',
                slots: {customRender: 'operation'},
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
                engTitle: '',
                menuCode: '',
                component: '',
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
            this.$refs[formName].validate().then(value => {
                console.log(this.addMenuData);
                let pid = this.addMenuData.isRootMenu ? '0' : this.addMenuData.pid;
                let level = this.addMenuData.isRootMenu ? '1' : this.addMenuData.level;
                let param = {
                    "title": this.addMenuData.menuName,
                    "engTitle": this.addMenuData.engTitle,
                    "name": this.addMenuData.menuCode,
                    "path": this.addMenuData.menuUrl,
                    "description": this.addMenuData.description,
                    "component": this.addMenuData.component,
                    "iconUrl": this.addMenuData.iconUrl,
                    "pid": pid,
                    "level": level,
                    "origion": this.addMenuData.origion,
                    "sort": this.addMenuData.sort
                }
                addMenu(param).then(value => {
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
            })
        },
        editMenu(formName) {
            this.$refs[formName].validate().then(value => {
                console.log(this.addMenuData);
                // let pid = this.addMenuData.isRootMenu ? '0' : this.addMenuData.pid;
                // let level = this.addMenuData.isRootMenu ? '1' : this.addMenuData.level;
                let param = {
                    'id': this.addMenuData.id,
                    "title": this.addMenuData.menuName,
                    "engTitle": this.addMenuData.engTitle,
                    "name": this.addMenuData.menuCode,
                    "path": this.addMenuData.menuUrl,
                    "description": this.addMenuData.description,
                    "component": this.addMenuData.component,
                    "iconUrl": this.addMenuData.iconUrl,
                    // "pid": pid,
                    // "level": level,
                    // "origion": this.addMenuData.origion,
                    "sort": this.addMenuData.sort
                }
                editMenu(param).then(value => {
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
            this.addMenuData.menuName = data.title;
            this.addMenuData.engTitle = data.engTitle;
            this.addMenuData.component = data.component;
            this.addMenuData.menuCode = data.name;
            this.addMenuData.menuUrl = data.path;
            this.addMenuData.description = data.description;
            this.addMenuData.iconUrl = data.iconUrl;
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
                    return delMenu(selectedRows.id).then(value => {
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
            getMenuList(params).then(value => {
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
                    return changeMenuStatus({'id': selectedRows.id}).then(value => {
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
            this.addMenuData.engTitle = '';
            this.addMenuData.iconUrl = '';
            this.addMenuData.menuCode = '';
            this.addMenuData.menuUrl = '';
            this.addMenuData.menupidUrl = '';
            this.addMenuData.component = '';
            this.addMenuData.level = '';
            this.addMenuData.description = '';
            this.addMenuData.sort = 0;
        },
        rootMenuCheck(check) {
            this.addMenuData.isRootMenu = check;
            console.log(this.addMenuData.isRootMenu);
        }

    }

}
</script>

<style lang="stylus">
.ant-table td {
    white-space: nowrap;
}

//.ant-table-body {
//    &::-webkit-scrollbar {
//        height: 5px;
//    }
//
//    &::-webkit-scrollbar-thumb {
//        border-radius: 5px;
//        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//        background: #f1f1f1;
//    }
//
//    &::-webkit-scrollbar-track {
//        -webkit-box-shadow: 0;
//        border-radius: 0;
//        background: #fffff;
//    }
//}
</style>