class Fd3DViewer {
    constructor(container) {
        if (typeof container === "string") {
            container = document.getElementById(container);
        } else if (typeof container === "object") {
            // do nothing.
        } else {
            container = document.body;
        }

        var project = Freedo.FdApp.createProject(container);
        //project.getViewer().scene.screenSpaceCameraController.fdInteractMode = "BIM";

        this._project = project;

        this._sceneObjectIDAndPModel = new Map();
        this._pModelAndSceneObjectID = new Map();
    }

    getPModel(sceneObjectID) {
        return this._sceneObjectIDAndPModel.get(sceneObjectID);
    }
    getSceneObjectID(pmodel) {
        return this._pModelAndSceneObjectID.get(pmodel);
    }

    _flytoPModelCmd(pModel) {
        let sceneObjectID = this._pModelAndSceneObjectID.get(pModel);
        if (sceneObjectID) {
            var sceneManager = this._project.getSceneManager();
            sceneManager.flyto(sceneObjectID);
        }
    }

    _highlightComponent(component) {
        let project = this._project;
        project.getSceneManager().unhighlightAllComponents();
        let pModelIDs = component.pModelSet.getPModelIDs();
        for (let i in pModelIDs) {
            let pModel = component.pModelSet.getPModel(pModelIDs[i]);
            let sceneObjectID = this._pModelAndSceneObjectID.get(pModel);
            project.getSceneManager().highlightComponent(component._uid, sceneObjectID,
                255, 100, 100, 1.0);
            project.getSceneManager().setBaseColor(255, 255, 0, 0.02);
        }
    }

    _flytoComponentCmd(component) {
        let project = this._project;
        component.getBoundingSphere((bs) => {
            project.getCamera().flyToBoundingSphere(bs, {
                offset: new Freedo.HeadingPitchRange(0.0,
                    Freedo.Math.toRadians(-90),
                    bs.radius * 3.0),
                duration: 1.0,
                // complete: showBoundingBox(sphere)
            });

            project.getCamera().trackByBoundingSphere(bs);
        });

        this._highlightComponent(component);
    }

    _addPModelSetTo3DViewerCmd(pModelSet) {
        let pModelIDs = pModelSet.getPModelIDs();
        for (let i = 0; i < pModelIDs.length; ++i) {
            let pModelID = pModelIDs[i];
            let pModel = pModelSet.getPModel(pModelID);
            this._addPModelTo3DViewerCmd(pModel);
        }
    }

    // _addPModelSetTo3DViewerCmd(pModelSet) {
    //     for (let pModelKey in pModelSet._pModelsByIdentifier) {
    //         let pModel = pModelSet._pModelsByIdentifier[pModelKey];
    //         this._addPModelTo3DViewerCmd(pModel);
    //     }
    // }

    // _deletePModelSetFrom3DViewerCmd(pModelSet) {
    //     for (let pModelKey in pModelSet._pModelsByIdentifier) {
    //         let pModel = pModelSet._pModelsByIdentifier[pModelKey];
    //         this._deletePModelFrom3DViewerCmd(pModel);
    //     }
    // }

    _addPModelTo3DViewerCmd(pModel) {
        let pModelURI = pModel.getPModelURI();
        var sceneManager = this._project.getSceneManager();
        var sceneObjectID = sceneManager.addSceneObject(pModel.LayerName, "PModel", {
            url: pModelURI,
            show: true,
            maximumScreenSpaceError: 16
        });
        this._addSceneObjectIDAndPModelPair(sceneObjectID, pModel);
    }

    _deletePModelFrom3DViewerCmd(pModel) {
        let sceneObjectID = this._pModelAndSceneObjectID.get(pModel);
        var sceneManager = this._project.getSceneManager();
        sceneManager.removeSceneObject(sceneObjectID);
        this._deleteSceneObjectIDAndPModelPair(sceneObjectID);
    }

    _showComponentCmd({component, enable}) {
        // let sceneObjectID = this._pModelAndSceneObjectID.get(component._pModel);
        // this._project.getSceneManager().showComponent(component._uid, sceneObjectID, enable);

        let project = this._project;
        let pModelIDs = component.pModelSet.getPModelIDs();
        for (let i in pModelIDs) {
            let pModel = component.pModelSet.getPModel(pModelIDs[i]);
            let sceneObjectID = this._pModelAndSceneObjectID.get(pModel);
            this._project.getSceneManager().showComponent(component._uid, sceneObjectID, enable);
        }
    }

    _addSceneObjectIDAndPModelPair(sceneObjectID, pModel) {
        if (this._sceneObjectIDAndPModel.get(sceneObjectID)) {
            throw new Error("addSceneObjectIDAndPModelPair got error!");
        }
        this._sceneObjectIDAndPModel.set(sceneObjectID, pModel);
        this._pModelAndSceneObjectID.set(pModel, sceneObjectID);
    }

    _deleteSceneObjectIDAndPModelPair(sceneObjectIDorPModel) {
        if (typeof sceneObjectIDorPModel === "string") {
            let sceneObjectID = sceneObjectIDorPModel;
            let pModel = this._sceneObjectIDAndPModel.get(sceneObjectID);
            if (pModel) {
                this._sceneObjectIDAndPModel.delete(sceneObjectID);
                this._pModelAndSceneObjectID.delete(pModel);
                return true;
            } else {
                return false;
            }
        } else if (sceneObjectIDorPModel instanceof FdPModel) {
            let pModel = sceneObjectIDorPModel;
            let sceneObjectID = this._pModelAndSceneObjectID.get(pModel);
            if (sceneObjectID) {
                this._sceneObjectIDAndPModel.delete(sceneObjectID);
                this._pModelAndSceneObjectID.delete(pModel);
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error("deleteSceneObjectIDAndPModelPair got error!");
        }
    }
}
