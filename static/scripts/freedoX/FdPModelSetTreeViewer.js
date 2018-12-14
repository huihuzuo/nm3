/*
 * @Author: tommy
 * @Date:   2017-11-27 13:56:06
 * @Last Modified by:   tommy
 * @Last Modified time: 2017-12-25 11:40:21
 */

// import引入会报错，这是因为不支持ES6的语法
// import './example29.css';

// 暂时这么引入CSS文件，以后可以使用babel的时候转成上面的引入方式
function includeLinkStyle(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

includeLinkStyle('example28/mvc/FdPModelSetTreeUI.css');

function registerTreeItemComponent(pModelAndsceneObjectID, project) {
    let template = `
    <li class="FD-tree-root" :class="{'FD-optional-open': selected}">
        <span v-show="isFolder" class="FD-tree-div" :class="{'haschild': isFolder}" @click="toggle(model)">
            <i class="fa fa-caret-down" v-if="open"></i>
            <i class="fa fa-caret-right" v-else></i>
        </span>
        <span v-show="!isFolder" class="FD-tree-div FD-in-folder">
            <i class="fa fa-circle"></i>
        </span>
        <span class="FD-tree-span" :class="{'open': selected}" @click="toggleSelected(model)">{{model.treename}}</span>
        <div class="FD-optional-buttons" v-show="selected">
            <span class="Fd-tree-icon" @click="flyToItem(model)">
                <i class="fa fa-paper-plane"></i>
            </span>
        </div>
        <ul class="FD-tree-child" v-show="open" v-if="isFolder">
            <pmodelsettreeitem class="FD-tree-item" v-for="(model, index) in model.child"
                :model="model"
                :key="index"
                @enable_tree_item_event="onTreeItemEnable"
                @fly_to_pmodel_event="onChildFlytoPModel"
                >
            </pmodelsettreeitem>
        </ul>
    </li>
    `;

    // 组件获取到结构树的信息
    Vue.component('pmodelsettreeitem', {
        template: template,
        props: {
            model: Object
        },
        data: function () {
            return {
                open: false,
                treeItemEnable: true,
                selected: false,
            }
        },
        computed: {
            isFolder: function () {
                //return this.model.child && this.model.child.length;
                return this.model.child;
            }
        },
        watch: {
            treeItemEnable: function (val) {
                this.enableTreeItem(this.model, val);
            }
        },
        methods: {
            toggle: function (data) {
                // return true;
                // if (!data.uid) { // 如果存在uid是空值的话 是不需要请求的
                //     return false;
                // }
                if (this.isFolder) {
                    this.open = !this.open;
                }
    
                for (let ck in data.child) {
                    let item = data.child[ck];
                    if (item.child && item.child.length === 0) {
                        if (item.attachObject instanceof FdPModelSet) {
                            // do nothing.
                        } else if (item.attachObject instanceof FdPModel) {
                            item.attachObject._rootComponent.getCid(function (cid) {
                                for (let ck in cid) {
                                    let c = cid[ck];
                                    item.child.push({
                                        treename: c.Name || c.name,
                                        attachObject: new FdPMComponent(item.attachObject._pModelSet,
                                            c.uid),
                                        child: c.cids.length === 0 ? undefined : []
                                    });
                                }
                            });
                        } else if (item.attachObject instanceof FdPMComponent) {
                            item.attachObject.getCid(function (cid) {
                                for (let ck in cid) {
                                    let c = cid[ck];
                                    item.child.push({
                                        treename: c.Name || c.name,
                                        attachObject: new FdPMComponent(item.attachObject
                                            ._pModelSet, c.uid),
                                        child: c.cids.length === 0 ? undefined : []
                                    });
                                }
                            });
                        }
                    }
                }
            },
            flyToItem: function (treeItemData) {
                this.$emit('fly_to_pmodel_event', treeItemData);
            },
            onChildFlytoPModel: function (treeItemData) {
                this.$emit('fly_to_pmodel_event', treeItemData);
            },
            enableTreeItem: function (treeItemData, enable) {
                this.$emit('enable_tree_item_event', treeItemData, enable);
            },
            onTreeItemEnable: function (treeItemData, enable) {
                this.$emit('enable_tree_item_event', treeItemData, enable);
            },
            toggleSelected: function (treeItemData) {
                let rootNode = this.getRootNode(this);
                this.refreshAllSonNodes(this, rootNode);
            },
            getRootNode: function (node) {
                if (node.$parent) {
                    return this.getRootNode(node.$parent);
                } else {
                    return node;
                }
            },
            refreshAllSonNodes: function (node, rootNode) {
                // 递归 全部false掉
                if (rootNode.$children.length) {
                    for (let index in rootNode.$children) {
                        if (node === rootNode.$children[index]) {
                            rootNode.$children[index].selected = !node.selected;
                        } else {
                            rootNode.$children[index].selected = false;
                        }
                        this.refreshAllSonNodes(node, rootNode.$children[index]);
                    }
                }
            }
        }
    })
}

registerTreeItemComponent();

class FdPModelSetTreeViewer {
    constructor(container, webglViewer) {
    
        if (typeof container === "string") {
            container = document.getElementById(container);
        } else if (typeof container === "object") {
            // do nothing.
        } else {
            container = document.body;
        }

        this._container = container;

        // 创建一个div
        let ele_ui = document.createElement("div");
        let id = "fd_pmodelsettree_" + Date.now();
        // 在body内创建一个div
        this._container.appendChild(ele_ui);

        this._ui = ele_ui;
        ele_ui.innerHTML = `
        <div id="${id}">
            <div class="FD-pmodelset-treeui">
                <ul class="FD-scenetree-container" v-if="treeData.length>0">
                    <pmodelsettreeitem class="FD-tree-item" v-for="(item, index) in treeData"
                        :model="item"
                        :key="index"
                        @enable_tree_item_event="onTreeItemEnable"
                        @fly_to_pmodel_event="onChildFlytoPModel">
                    </pmodelsettreeitem>
                </ul>
            </div>
        </div>
        `;

        let that = this;
        this._freedoUI = new Vue({
            el: "#" + id,
            data: {
                treeData: [],
            },
            methods: {
                flyToComponent: function (component) {
                    if (that.flytoComponentCmd) {
                        that.flyToComponentCmd(component);
                    }
                },
                onChildFlytoPModel: function (treeItemData) {
                    let ao = treeItemData.attachObject;
                    if (ao instanceof FdPModel) {
                        if (that.flytoPModelCmd) {
                            that.flytoPModelCmd(ao);
                        }
                    } else if (ao instanceof FdPMComponent) {
                        if (that.flytoComponentCmd) {
                            that.flytoComponentCmd(ao);
                        }
                    } else if (ao instanceof FdPModelSet) {

                        let pModelSet = ao;
                        let pModelIDs = pModelSet.getPModelIDs();
                        if (pModelIDs.length > 0) {
                            let pModel = pModelSet.getPModel(pModelIDs[0]);
                            if (that.flytoPModelCmd) {
                                that.flytoPModelCmd(pModel);
                            }
                        }
                    }
                },
                onTreeItemEnable: function (treeItemData, enable) {
                    let ao = treeItemData.attachObject;
                    if (ao instanceof FdPModel) {
                        let pModel = ao;
                        if (enable) {
                            if (that.addPModelTo3DViewerCmd) {
                                that.addPModelTo3DViewerCmd(pModel);
                            }
                        } else {
                            if (that.deletePModelFrom3DViewerCmd) {
                                that.deletePModelFrom3DViewerCmd(pModel);
                            }
                        }
                    } else if (ao instanceof FdPMComponent) {
                        let component = ao;
                        if (that.showComponentCmd) {
                            that.showComponentCmd({component, enable});
                        }
                    }
                }
            }
        });
    }

    // _eventCallback(eventType, params) {
    //     if (eventType === "added") {
    //         let pModelSet = params;
    //         this._addPModelSetByObject(pModelSet);
    //     } else if (eventType === "deleted") {
    //         let pModelSet = params;
    //         this._deletePModelSetByObject(pModelSet);
    //     }
    // }

    // deletePModelSet(pModelSetID) {
    //     let pModelSet = this._model.getPModelSet(pModelSetID);
    //     this._deletePModelSetByObject(pModelSet);
    //     this._pModelDataManager.deletePModelSet(pModelSetID);
    // }

    _addPModelSetByObject(pModelSet) {
        let treenode = {
            treename: pModelSet.LayerIdentifier,
            attachObject: pModelSet
        };

        for (let pModelKey in pModelSet._pModelsByIdentifier) {
            let pModel = pModelSet._pModelsByIdentifier[pModelKey];
            if (!treenode.child) {
                treenode.child = [];
            }
            treenode.child.push({
                treename: pModel.Identifier,
                attachObject: pModel,
                child: []
            });
        }
        this._freedoUI.treeData.push(treenode);
    }

    _deletePModelSetByObject(pModelSet) {
        let index = this._freedoUI.treeData.findIndex(function (value, index) {
            return value.attachObject === pModelSet;
        });
        if (index !== -1) {
            this._freedoUI.treeData.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    reset() {
        //this._model = null;
        this._freedoUI.treeData = [];
    }

    // 未验证
    // 对象删除之前调用
    dispose() {
        reset();
        this._container.removeChild(this._treeui);
        this._container = null;
        this._treeui = null;
        this._freedoUI = null;
    }
}
