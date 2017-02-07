Ext.define('MoMo.admin.view.tab.CreateOrEditLayerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.momo-create-or-edit-layer',

    requires: [
        'MoMo.shared.MetadataUtil'
    ],

    /**
     * Cleanup Layerdata to avoid artifacts when navigating through the
     * admin frontend.
     */
    onHide: function(){
        var me = this;
        var viewModel = me.getViewModel();
        viewModel.set('entityId', null);

        var cleanLayer = Ext.create('MoMo.admin.model.Layer');
        var cleanLayerAppearance = Ext.create(
                'MoMo.admin.model.LayerAppearance');

        cleanLayer.setAppearance(cleanLayerAppearance);

        viewModel.set('layer', cleanLayer);
        viewModel.get('layer').set('id', undefined);

        // ATTENTION !!!
        // We destroy the view in the onHide method for cleanup reasons.
        me.getView().destroy();
    },

    /**
     *
     */
    loadLayerData: function(){
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();
        var layerId = viewModel.get('entityId');

        if (layerId) {

            MoMo.admin.model.Layer.load(layerId, {
                scope: this,
                success: function(record) {
                    viewModel.set('layer', record);
                    view.down('momo-panel-style-styler')
                            .setLayerName(record.getSource().get('layerNames'));
                    var uuid = record.get('metadataIdentifier');
                    if(uuid){
                        me.loadMetadata(uuid);
                    }
                },
                failure: function() {
                    Ext.toast('Error loading Layer Data.');
                }
            });
        } else {
            var cleanLayer = Ext.create('MoMo.admin.model.Layer');
            var cleanLayerAppearance = Ext.create(
                    'MoMo.admin.model.LayerAppearance');

            cleanLayer.setAppearance(cleanLayerAppearance);

            viewModel.set('layer', cleanLayer);
            viewModel.get('layer').set('id', undefined);
        }
    },

    /**
     *
     */
    loadMetadata: function(uuid){
        var me = this;
        var viewModel = me.getViewModel();
        Ext.Ajax.request({
            url: BasiGX.util.Url.getWebProjectBaseUrl() + 'metadata/csw.action',
            method: "POST",
            params: {
                xml: MoMo.shared.MetadataUtil.getLoadXml(uuid)
            },
            defaultHeaders: BasiGX.util.CSRF.getHeader(),
            success: function(response){
                var responseObj = Ext.decode(response.responseText);
                var metadataObj = MoMo.shared.MetadataUtil.parseMetadataXml(
                        responseObj.data);
                viewModel.set('metadata', metadataObj);
            },
            failure: function(){
                Ext.toast('Warning: Couldn\'t load Metadata for layer.');
            }
        });
    },

    onSaveClick: function() {
        var me = this;
        var allFieldsValid = me.validateFields();
        var view = me.getView();
        var viewModel = me.getViewModel();
        var stylerPanel = view.down('momo-panel-style-styler');
        var metadataPanel = view.down('momo-layer-metadata');
        var layer = viewModel.get('layer');
        var appearance = layer.getAppearance();

        if (allFieldsValid) {

            view.setLoading(true);

            if (stylerPanel && layer.get('dataType').toLowerCase() !==
                    'raster') {
                var stylerPanelCtrl = stylerPanel.getController();
                stylerPanelCtrl.applyAndSave();
            }

            if (Ext.isEmpty(layer.get('metadataIdentifier'))){
                // TODO Handle update for layer without metadata UUID
                metadataPanel.getController().createMetadataEntry();
            } else {
                metadataPanel.getController().updateMetadataEntry();
            }

            if (layer && layer.getId()) {
                layer.save({
                    callback: function(rec,operation,success) {
                        view.setLoading(false);
                        if (success) {
                            Ext.toast("Layer " + layer.get('name') + " saved.");

                        } else {
                            Ext.toast("Layer " + layer.get('name') +
                                " could not be saved.");
                        }
                    }
                });
            }

            if (layer && layer.getId() && appearance && appearance.getId()) {
                appearance.save({
                    callback: function(rec,operation,success) {
                        view.setLoading(false);
                        if (success) {
                            Ext.toast("Layerappearance for layer " +
                                    layer.get('name') + " saved.");
                        } else {
                            Ext.toast("Layerappearance for layer " +
                                    layer.get('name') + " could not be saved.");
                        }
                    }
                });
            }

            me.redirectTo('layers');
        } else {
            Ext.toast("Please fill out the required fields.");
        }
    },

    /**
     *
     */
    onCancelClick: function() {
        var me = this;

        Ext.Msg.confirm(
            'Please confirm',
            'All unsaved changes will be lost. Do you really want to quit?',
            function(choice) {
                if (choice === 'yes') {
                    this.redirectTo('layers');
                } else {
                    return false;
                }
            }, me
        );
    },

    /**
     *
     */
    validateFields: function() {
        var view = this.getView();
        var valid = true;
        Ext.each(view.query('field'), function(field) {
            if(!(field instanceof Ext.form.field.File) && !field.validate()){
                valid = false;

                // set active tab where validation failed
                var invalidPanel = field.up('panel[xtype^=momo\-layer\-]');
                invalidPanel.up().setActiveTab(invalidPanel);
            }
        });

        return valid;
    }

});
