(function () {
    $('link').remove();
    var app = {
        init: function () {
            this.loadCSSLibs();
            this.loadCSS();
            this.loadJSA();
        },
        loadCSS: function () {
            let icons = $.ajax({
                method: "GET",
                url: "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=2fa8f79b-6c90-4e84-a10e-4a0b39f9c6b8&attachmentId=683311"
            });
            let dataTable = $.ajax({
                method: "GET",
                url: "//cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css"
            });
            let dataTableB = $.ajax({
                method: "GET",
                url: "https://cdn.datatables.net/buttons/1.2.4/css/buttons.dataTables.min.css"
            });
            let dataTableS = $.ajax({
                method: "GET",
                url: "https://cdn.datatables.net/select/1.2.1/css/select.dataTables.min.css"
            });
            $.when(icons, dataTable, dataTableB, dataTableS).then(function (iconsResponse, DataTableResponse, DataTableBResponse, DataTableSResponse) {
                //$("<style />").text(bootstrapResponse).appendTo($("head"));
                $("<style />").text(iconsResponse).appendTo($("head"));
                $("<style />").text(DataTableResponse).appendTo($("head"));
                $("<style />").text(DataTableBResponse).appendTo($("head"));
                $("<style />").text(DataTableSResponse).appendTo($("head"));
                console.log("load css has loaded");
            });
        },
        loadJSA: function () {
            let reference = this;
            let bootstrap = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=a15d9447-2fb3-4090-9f3a-d0cb99cad500&attachmentId=690988"
            });
            let jqueryDataTables = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"
            });

            $.when(bootstrap, jqueryDataTables).then(function (bootstrapResponse, jqueryDataTablesResponse) {
                console.log("load JsA has loaded");
                reference.loadJSAA();
                //reference.changePage();
                //reference.loadPage('page-005');
            });

        },
        loadJSAA: function () {
            console.log("Call loadJsAA");
            let reference = this;
            let jqueryAccordion = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=73090f1e-8f81-4c99-802a-c7a46f196d09&attachmentId=689850"
            });

            $.when(jqueryAccordion).then(function (jqueryAccordionResponse) {
                console.log("load Js AA has loaded");
                reference.loadJSB();
            });
        },
        loadJSB: function () {
            console.log("Call loadJsB");
            let reference = this;
            let jqueryScrollTo = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=6055fc53-b91c-42c5-9c4a-0976291ebb8d&attachmentId=690672"
            });
            let jqueryDataTable = $.ajax({
                method: "GET",
                datatype: "script",
                url: "//cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"
            });

            $.when(jqueryScrollTo, jqueryDataTable).then(function (jqueryScrollToResponse, jqueryDataTablesResponse) {
                console.log("load Js B has loaded");
                reference.loadJSC();
            });
        },
        loadJSC: function () {
            console.log("Call loadJsC");
            let reference = this;
            let commonScripts = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=fc21e287-9fbe-437a-b103-6c037fbc5669&attachmentId=690673"
            });
            let TableB = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js"
            });
            let TableS = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://cdn.datatables.net/select/1.2.1/js/dataTables.select.min.js"
            });
            let TableBH = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://cdn.datatables.net/buttons/1.2.4/js/buttons.html5.min.js"
            });
            let TableZip = $.ajax({
                method: "GET",
                datatype: "script",
                url: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"
            });
            $.when(commonScripts, TableB, TableS, TableBH, TableZip).then(function (commonScriptsResponse, TableBResponse, TableSResponse, TableBHResponse, TableZipResponse) {
                console.log("load Js C has loaded");
                reference.loadPageMain('page-005');
            });
        },
        changePage: function () {
            console.log("Change Page");
            let reference = this;
            $("#new_quotation").click(function () {
                reference.loadPage('page-002');
            });
            $("#quotation").click(function () {
                reference.loadPage('page-003');
            });
        },
        loadCSSLibs: function () {
            MessageProcessor.process({
                serviceId: "bs_css_lib_getList",
                data: {
                    "start": 0,
                    "limit": 100,
                    "active": 1,
                    "dir": true,
                    "sort": "lib_id"
                },
                success: function (data) {
                    console.log(data);
                    var css_stack = [];
                    data.results.forEach(function cssGetList(cssVal, cssIndex, cssAtr) {
                        attachmentId = cssVal.lib_file.attachment[0].attachmentId;
                        batchId = cssVal.lib_file.attachment[0].batchId;
                        console.log(cssVal.lib_name);
                        console.log(data.results.length);

                        $.when($.get("https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=" + batchId + "&attachmentId=" + attachmentId))
                            .done(function (response) {
                                $('<style />').text(response).appendTo($('head'));
                                css_stack[cssIndex] = {
                                    "id": cssIndex,
                                    "code": response,
                                    "location": "https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=" + batchId + "&attachmentId=" + attachmentId
                                };
                                localStorage.setItem("appBSCSS", JSON.stringify(css_stack));
                            });
                        if (cssIndex == data.results.length - 1) {
                            console.log("Termine de cargar las librerias CSS");
                        }
                    });
                }
            });
        },
        loadPageMain: function (id_page) {
            let reference = this;
            MessageProcessor.process({
                serviceId: "bs_page_get",
                data: {
                    "id_page": id_page,
                },
                success: function (data) {
                    var attachmentId = data.result.page_html.attachment[0].attachmentId;
                    var batchId = data.result.page_html.attachment[0].batchId;
                    $.get("https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=" + batchId + "&attachmentId=" + attachmentId, function (pageCode) {
                        $('body').html(pageCode);
                        $('body').css('background-color', '#f2f2f2');
                        reference.changePage();
                        reference.loadPage('page-001');
                    });
                }
            });
        },
        //FUNCION QUE REEMPLAZA EL CONTAINER DE LA PAGINA
        loadPage: function (id_page) {
            $('#contain_page').html("");
            let reference = this;
            MessageProcessor.process({
                serviceId: "bs_page_get",
                data: {
                    "id_page": id_page,
                },
                success: function (data) {
                    var attachmentId = data.result.page_html.attachment[0].attachmentId;
                    var batchId = data.result.page_html.attachment[0].batchId;
                    $.get("https://100l-app.teleows.com/servicecreator/fileservice/get?batchId=" + batchId + "&attachmentId=" + attachmentId, function (pageCode) {
                        //$('#contain_page').html("");
                        $('#contain_page').append(pageCode);
                        //reference.changePage();
                        reference.loadList();
                        reference.sdmList();
                        reference.loadEventSite();
                    });
                }
            });

        }, //FIN DE LA FUNCION QUE REEMPLAZA EL CONTARINER
        sdmList: function () {
            MessageProcessor.process({
                serviceId: "cuttm_plmtroubleticket_getList2",
                data: {
                    "start": 0, "limit": 10
                },
                success: function (data) {
                    console.log(data.results);
                    for (let user of data.results) {

                        console.log(user);
                        $("#sdmticket").append("<option value='" + user.orderid + "'>" + user.orderid + "a</option>");
                    }
                }
            });
        },
        loadEventSite: function () {
            let reference = this;
            //Get the answer and show it in the console
            $("input[id='sdmlist']").on('focusout', function (e) {
                var opt = $('option[value="' + $(this).val() + '"]');
                if (opt.length) {
                    console.log(opt.attr('value'));
                    $("#sdmticket").val(opt.attr('value'));


                    //Event load
                    let sdmticket = $("#sdmticket").val();
                    //console.log(sdmticket);
                    MessageProcessor.process({
                        serviceId: "cuttm_plmtroubleticket_get2",
                        data: {
                            "orderid": sdmticket
                        },
                        success: function (data) {
                            var site = data.result.site;
                            var project = data.result.project;
                            var region = data.result.region;
                            var cooperator = data.result.site_contractor;
                            var description = data.result.description;
                            var customer = data.result.customer_tt;
                            var status = data.result.status;

                            reference.changeSiteInput(site);
                            reference.changeProjectInput(project);
                            reference.changeRegionInput(region);
                            reference.changeCooperatorInput(cooperator);
                            reference.changeDescriptionInput(description);
                            reference.changeCustomerInput(customer);
                            reference.changeStatusInput(status);
                            //console.log(site);

                            reference.disabledSubmit();
                        }

                    });

                } else {
                    //$("input[id='sdmlist']").val("");
                    $("#sdmticket").val(opt.attr(""));
                    console.log("Invalid Option");
                }
            });

        },

        changeSiteInput: function (site) {
            $("#site").val(site).attr('readonly', true);
        },
        changeProjectInput: function (project) {
            $("#project").val(project).attr('readonly', true);;
        },
        changeRegionInput: function (region) {
            $("#region").val(region).attr('readonly', true);
        },
        changeCooperatorInput: function (cooperator) {
            $("#cooperator").val(cooperator).attr('readonly', true);;
        },
        changeDescriptionInput: function (description) {
            $("#description").val(description).attr('readonly', true);
        },
        changeCustomerInput: function (customer) {
            $("#customer").val(customer).attr('readonly', true);
        },
        changeStatusInput: function (status) {
            $("#status").val(status).attr('readonly', true);
        },
        disabledSubmit: function () {
            let reference = this;
            $("#submit").attr("disabled", false);
            $("#submit").click(function () {
                reference.createQuotation();

            });
        },


        createQuotation: function () {
            let reference = this;
            var datatoSend = {
                "site": $("#site").val(),
                "project": $("#project").val(),
                "region": $("#region").val(),
                "cooperator": $("#cooperator").val(),
                "description": $("#description").val(),
                "customer": $("#customer").val(),
                "status": $("#status").val()
            }

            MessageProcessor.process({
                serviceId: "bs_quotation_create",
                data: datatoSend,
                success: function (data) {
                    console.log(data);
                    reference.loadPage('page-003');
                }
            });
        },
        loadList: function () {
            MessageProcessor.process({
                serviceId: "bs_quotation_getList",
                data: {
                    "start": 0, "limit": 10
                },
                success: function (data) {
                    console.log(data.results);
                    for (let list of data.results) {
                        console.log(list);
                        $("#quotationlist > tbody").append("<tr><td></td> <td> " + list.orderid + "</td> <td>" + list.site + "</td><td>" + list.project + "</td><td>" + list.region + "</td><td>" + list.coperator + "</td><td>" + list.customer + "</td><td>" + list.description + "</td><td>" + list.status + "</td></tr>");
                    }
                    console.log("Lista cargada")
                    /*$('#itemlist').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'excel'
                    ]
                });*/

                    var table = $('#quotationlist').DataTable({

                        columnDefs: [{
                            orderable: false,
                            className: 'select-checkbox',
                            targets: 0
                        }],
                        select: {
                            style: 'os',
                            selector: 'td:first-child'
                        },
                        order: [[1, 'asc']],

                        dom: 'Bfrtip',
                        select: true,

                        buttons: [
                            {

                                text: 'Get selected data',
                                action: function () {
                                    var count = table.rows({ selected: true }).count();

                                    console.log('<div>' + count + ' row(s) selected</div>');
                                }
                            },

                            'copy',
                            'excel',
                            {
                                text: 'Select all',
                                action: function () {
                                    table.rows().select();
                                }
                            },
                            {
                                text: 'Select none',
                                action: function () {
                                    table.rows().deselect();
                                }
                            }
                        ],
                    });
                    table
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            var rowD = table.rows(indexes).data();
                            //events.prepend( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );

                            console.log(rowData[0]);
                            console.log(typeof (rowData[0]));
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            var rowD = table.rows(indexes);
                            //events.prepend( '<div><b>'+type+' <i>de</i>selection</b> - '+JSON.stringify( rowData )+'</div>' );

                            console.log(rowData);
                        });


                }

            });

        }
    }


    app.init();
})();