Ext.define('MoMo.admin.view.panel.layer.Metadata',{
    extend: 'Ext.panel.Panel',

    xtype: 'momo-layer-metadata',

    requires: [
        'Ext.form.FieldContainer',
        'MoMo.admin.store.Epsg',
        'MoMo.admin.store.MetadataTopics',

        'MoMo.admin.view.panel.layer.MetadataController',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea'
        ],

        controller: 'momo-layer-metadata',

        routeId: 'metadata',

        title: 'Metadata', // TODO use title formula from viewmodel

        scrollable: 'y',

        padding: 20,

        listeners: {
            show: 'onShow'
        },

        items: [{
            xtype: 'fieldset',
            title: 'Metadata',
            layout: 'hbox',
            scrollable: 'y',
            items: [{
                xtype: 'fieldcontainer',
                flex: 1,
                margin: '0 5px 0 5px',
                defaults: {
                    width: '100%',
                    labelWidth: 150
                },
                items: [{
                    xtype: 'textfield',
                    name: 'metadata-title',
                    margin: '20px 0 10px 0',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.title}',
                        value: '{metadata.title}'
                    }
                }, {
                    xtype: 'textarea',
                    name: 'metadata-abstract',
                    maxLength: 2000,
                    allowBlank: false,
                    // Check input for WhiteSpaces and empty row at the beginning.
                    // And check import for empty rows and more than one white spaces.
                    /*
                    msgTarget: 'under',
                    validator: function(val) {
                        var startsWithWhiteSpace = val.startsWith(' ');
                        var startsWithWhiteSpaceErrMsg = 'No whitespaces allowed at the beginning!';
                        var startsWithEmptyRow = val.startsWith('\n');
                        var startsWithEmptyRowErrMsg = 'No empty row allowed at the beginning!';

                        var containsTwoWhitespaces = val.indexOf('  ') > -1;
                        var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';
                        var containsTowEmptyRows = val.indexOf('\n\n') > -1;
                        var containsTowEmptyRowsErrMsg = 'Not empty row allowed!';

                        if(! startsWithWhiteSpace && ! containsTwoWhitespaces && ! startsWithEmptyRow && ! containsTowEmptyRows) {
                            return true;
                        }
                        else if(! startsWithWhiteSpace && ! containsTwoWhitespaces && ! startsWithEmptyRow && containsTowEmptyRows) {
                            return containsTowEmptyRowsErrMsg;
                        }
                        else if(! startsWithWhiteSpace && ! containsTwoWhitespaces && startsWithEmptyRow && ! containsTowEmptyRows) {
                            return startsWithEmptyRowErrMsg;
                        }
                        else if(! startsWithWhiteSpace && ! containsTwoWhitespaces && startsWithEmptyRow && containsTowEmptyRows) {
                            return startsWithEmptyRowErrMsg + ' ' + containsTowEmptyRowsErrMsg;
                        }
                        else if(! startsWithWhiteSpace && containsTwoWhitespaces && ! startsWithEmptyRow && ! containsTowEmptyRows) {
                            return containsTwoWhitespacesErrMsg;
                        }
                        else if(! startsWithWhiteSpace &&  containsTwoWhitespaces && ! startsWithEmptyRow &&  containsTowEmptyRows) {
                            return containsTwoWhitespacesErrMsg + ' ' + containsTowEmptyRowsErrMsg;
                        }
                        else if(! startsWithWhiteSpace &&  containsTwoWhitespaces &&  startsWithEmptyRow && ! containsTowEmptyRows) {
                            return startsWithEmptyRowErrMsg + ' ' + containsTwoWhitespacesErrMsg;
                        }
                        else if(! startsWithWhiteSpace &&  containsTwoWhitespaces &&  startsWithEmptyRow &&  containsTowEmptyRows) {
                            return startsWithEmptyRowErrMsg + ' ' + containsTwoWhitespacesErrMsg + ' '+ containsTowEmptyRowsErrMsg;
                        }
                        else if( startsWithWhiteSpace && ! containsTwoWhitespaces && ! startsWithEmptyRow && ! containsTowEmptyRows) {
                            return startsWithWhiteSpaceErrMsg;
                        }
                        else if( startsWithWhiteSpace && ! containsTwoWhitespaces && ! startsWithEmptyRow && ! containsTowEmptyRows) {
                            return startsWithWhiteSpaceErrMsg + ' ' + containsTwoEmptyRowsErrMsg;
                        }
                        else if( startsWithWhiteSpace && containsTwoWhitespaces && ! startsWithEmptyRow && ! containsTowEmptyRows) {
                            return startsWithWhiteSpaceErrMsg + ' '+ containsTwoWhitespacesErrMsg;
                        }
                        else if( startsWithWhiteSpace &&  containsTwoWhitespaces && ! startsWithEmptyRow && containsTowEmptyRows) {
                            return startsWithWhiteSpaceErrMsg + ' '+ containsTwoWhitespacesErrMsg + ' '+ containsTowEmptyRowsErrMsg;
                        }
                    },*/
                    bind: {
                        fieldLabel: '{i18n.metadata.abstract}',
                        value: '{metadata.abstract}'
                    }
                }, {
                    xtype: 'combobox',
                    name: 'metadata-topic',
                    displayField: 'value',
                    valueField: 'value',
                    anyMatch: true,
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    bind: {
                        fieldLabel: '{i18n.metadata.topic}',
                        value: '{metadata.topic}'
                    },
                    store: {
                        type: 'metadatatopics'
                    }
                }, {
                    xtype: 'datefield',
                    name: 'metadata-referenceDate',
                    format: 'Y-m-d',
                    allowBlank: false,
                    bind: {
                        fieldLabel: '{i18n.metadata.referenceDate}',
                        value: '{metadata.referenceDate}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'metadata-format',
                    bind: {
                        fieldLabel: '{i18n.metadata.format}',
                        value: '{metadata.format}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'metadata-limitations',
                    bind: {
                        fieldLabel: '{i18n.metadata.limitations}',
                        value: '{metadata.limitations}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'metadata-onlineResource',
                    bind: {
                        fieldLabel: '{i18n.metadata.onlineResource}',
                        value: '{metadata.onlineResource}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'metadata-dataSource',
                    disabled: true,
                    bind: {
                        fieldLabel: '{i18n.metadata.dataSource}',
                        value: '{metadata.dataSource}'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'metadata-publications',
                    disabled: true,
                    bind: {
                        fieldLabel: '{i18n.metadata.publications}',
                        value: '{metadata.publications}'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                flex: 1,
                defaults: {
                    width: '100%',
                    labelWidth: 150
                },
                items: [{
                    xtype: 'fieldset',
                    name: 'metadata-organisation',
                    width: '100%',
                    bind: {
                        title: '{i18n.metadata.organisation}'
                    },
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'metadata-organisation-name',
                        allowBlank: false,
                        msgTarget: 'under',
                        validator: function(val) {
                            var startsWith = val.startsWith(' ');
                            var startsWithErrMsg = 'No whitespaces allowed at the beginning!';

                            var containsTwoWhitespaces = val.indexOf('  ') > -1;
                            var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';

                            if(! startsWith && ! containsTwoWhitespaces) {
                                return true;
                            }
                            else if((startsWith && ! containsTwoWhitespaces) || (!startsWith && containsTwoWhitespaces)) {

                                return startsWithErrMsg || containsTwoWhitespacesErrMsg;
                            }
                            else if(!startsWith && containsTwoWhitespaces) {
                                return containsTwoWhitespacesErrMsg;
                            }
                            else {
                                return startsWithErrMsg +' '+ containsTwoWhitespacesErrMsg;
                            }
                        },
                        bind: {
                            fieldLabel: '{i18n.metadata.name}',
                            value: '{metadata.organisation.name}'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'metadata-organisation-website',
                        vtype: 'url',
                        bind: {
                            fieldLabel: '{i18n.metadata.website}',
                            value: '{metadata.organisation.website}'
                        }
                    }, {
                        xtype: 'fieldset',
                        name: 'metadata-organisation-address',
                        width: '100%',
                        bind: {
                            title: '{i18n.metadata.address}'
                        },
                        defaults: {
                            width: '100%'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'metadata-organisation-address-deliveryPoint',
                            allowBlank: false,
                            msgTarget: 'under',
                            validator: function(val) {
                                var startsWith = val.startsWith(' ');
                                var startsWithErrMsg = 'No whitespaces allowed at the beginning!';

                                var containsTwoWhitespaces = val.indexOf('  ') > -1;
                                var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';

                                if(! startsWith && ! containsTwoWhitespaces) {
                                    return true;
                                }
                                else if((startsWith && ! containsTwoWhitespaces) || (!startsWith && containsTwoWhitespaces)) {

                                    return startsWithErrMsg || containsTwoWhitespacesErrMsg;
                                }
                                else if(!startsWith && containsTwoWhitespaces) {
                                    return containsTwoWhitespacesErrMsg;
                                }
                                else {
                                    return startsWithErrMsg +' '+ containsTwoWhitespacesErrMsg;
                                }
                            },
                            bind: {
                                fieldLabel: '{i18n.metadata.deliveryPoint}',
                                value: '{metadata.organisation.address.deliveryPoint}'
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'metadata-organisation-address-postalCode',
                            allowBlank: false,
                            minLength: 3,
                            maxLength: 10,
                            msgTarget: 'under',
                            validator: function(val) {
                                var startsWith = val.startsWith(' ');
                                var startsWithErrMsg = 'No whitespaces allowed at the beginning!';

                                var containsTwoWhitespaces = val.indexOf('  ') > -1;
                                var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';

                                if(! startsWith && ! containsTwoWhitespaces) {
                                    return true;
                                }
                                else if((startsWith && ! containsTwoWhitespaces) || (!startsWith && containsTwoWhitespaces)) {

                                    return startsWithErrMsg || containsTwoWhitespacesErrMsg;
                                }
                                else if(!startsWith && containsTwoWhitespaces) {
                                    return containsTwoWhitespacesErrMsg;
                                }
                                else {
                                    return startsWithErrMsg +' '+ containsTwoWhitespacesErrMsg;
                                }
                            },
                            bind: {
                                fieldLabel: '{i18n.metadata.postalCode}',
                                value: '{metadata.organisation.address.postalCode}'
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'metadata-organisation-address-city',
                            allowBlank: false,
                            msgTarget: 'under',
                            validator: function(val) {
                                var startsWith = val.startsWith(' ');
                                var startsWithErrMsg = 'No whitespaces allowed at the beginning!';

                                var containsTwoWhitespaces = val.indexOf('  ') > -1;
                                var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';

                                if(! startsWith && ! containsTwoWhitespaces) {
                                    return true;
                                }
                                else if((startsWith && ! containsTwoWhitespaces) || (!startsWith && containsTwoWhitespaces)) {

                                    return startsWithErrMsg || containsTwoWhitespacesErrMsg;
                                }
                                else if(!startsWith && containsTwoWhitespaces) {
                                    return containsTwoWhitespacesErrMsg;
                                }
                                else {
                                    return startsWithErrMsg +' '+ containsTwoWhitespacesErrMsg;
                                }
                            },
                            bind: {
                                fieldLabel: '{i18n.metadata.city}',
                                value: '{metadata.organisation.address.city}'
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'metadata-organisation-address-country',
                            allowBlank: false,
                            msgTarget: 'under',
                            validator: function(val) {
                                var startsWith = val.startsWith(' ');
                                var startsWithErrMsg = 'No whitespaces allowed at the beginning!';

                                var containsTwoWhitespaces = val.indexOf('  ') > -1;
                                var containsTwoWhitespacesErrMsg = 'Not more than one whitespaces allowed!';

                                if(! startsWith && ! containsTwoWhitespaces) {
                                    return true;
                                }
                                else if((startsWith && ! containsTwoWhitespaces) || (!startsWith && containsTwoWhitespaces)) {

                                    return startsWithErrMsg || containsTwoWhitespacesErrMsg;
                                }
                                else if(!startsWith && containsTwoWhitespaces) {
                                    return containsTwoWhitespacesErrMsg;
                                }
                                else {
                                    return startsWithErrMsg +' '+ containsTwoWhitespacesErrMsg;
                                }
                            },
                            bind: {
                                fieldLabel: '{i18n.metadata.country}',
                                value: '{metadata.organisation.address.country}'
                            }
                        }]
                    }]
                }, {
                    xtype: 'fieldset',
                    name: 'metadata-person',
                    width: '100%',
                    bind: {
                        title: '{i18n.metadata.person}'
                    },
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'metadata-person-name',
                        allowBlank: false,
                        bind: {
                            fieldLabel: '{i18n.metadata.name}',
                            value: '{metadata.person.name}'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'metadata-person-email',
                        allowBlank: false,
                        vtype: 'email',
                        bind: {
                            fieldLabel: '{i18n.metadata.email}',
                            value: '{metadata.person.email}'
                        }
                    }]
                }, {
                    xtype: 'fieldset',
                    name: 'metadata-timeExtent',
                    width: '100%',
                    bind: {
                        title: '{i18n.metadata.timeExtent}'
                    },
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'datefield',
                        name: 'metadata-timeExtent-start',
                        format: 'Y-m-d',
                        allowBlank: false,
                        bind: {
                            fieldLabel: '{i18n.metadata.start}',
                            value: '{metadata.timeExtent.start}'
                        }
                    }, {
                        xtype: 'datefield',
                        name: 'metadata-timeExtent-end',
                        format: 'Y-m-d',
                        allowBlank: false,
//                      minValue: '{metadata.timeExtent.start}',
                        bind: {
                            fieldLabel: '{i18n.metadata.end}',
                            value: '{metadata.timeExtent.end}',
                            minValue: '{metadata.timeExtent.start}'
                        }
                    }]
                }, {
                    xtype: 'fieldset',
                    name: 'metadata-geography',
                    width: '100%',
                    bind: {
                        title: '{i18n.metadata.geography}'
                    },
                    defaults: {
                        width: '100%'
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            labelWidth: 45,
                            margin: '0 5px 0 0',
                            flex: 1
                        },
                        items: [{
                            name: 'metadata-extent-minX',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{i18n.metadata.minX }',
                                value: '{metadata.geography.extent.minX}'
                            }
                        }, {
                            name: 'metadata-extent-minY',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{i18n.metadata.minY}',
                                value: '{metadata.geography.extent.minY}'
                            }
                        }, {
                            name: 'metadata-extent-maxX',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{i18n.metadata.maxX}',
                                value: '{metadata.geography.extent.maxX}'
                            }
                        }, {
                            name: 'metadata-extent-maxY',
                            allowBlank: false,
                            bind: {
                                fieldLabel: '{i18n.metadata.maxY}',
                                value: '{metadata.geography.extent.maxY}'
                            }
                        }]
                    }, {
                        xtype: 'combobox',
                        name: 'metadata-geography-projection',
                        labelWidth: 150,
                        allowBlank: false,
                        bind: {
                            fieldLabel: '{i18n.metadata.projection}',
                            value: '{metadata.geography.projection}'
                        },
                        displayField: 'name',
                        valueField: 'code',
                        store: {
                            type: 'epsg',
                            autoLoad: true
                        },
                        anyMatch: true,
                        queryMode: 'local',
                        triggerAction: 'all'
                    }]
                }]
            }]
        }]
});
