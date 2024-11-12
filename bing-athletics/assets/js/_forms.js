window.forms = {
    // sports_form:
    // {
    //     legend: "",
    //     name: "sports_form",
    //     actions: [],
    //     fields: [
    //         {
    //             type: "select",
    //             label: "Sport",
    //             name: "sport_id",
    //             "options": [
    //                 {
    //                     "label": "",
    //                     "type": "optgroup",
    //                     "path": "sports",
    //                     "format": {
    //                         "label": "{{sportInfo.sport_title}}",
    //                         "value": "{{sport}}"
    //                     }
    //                 }
    //             ]    
    //         }
    //     ]
    // },
    shortcut_form:
    {
        legend: "Add Shortcut",
        name: "shortcut_form",
        autoFocus: true,
        horizontal: true,
        actions: [
            {
                type: "cancel",
                action: "cancel",
                label: "<i class=\"fa fa-times\"></i> Cancel",
                modifiers: "btn btn-danger"
            },
            {
                type: "save",
                action: "save",
                label: "<i class=\"fa fa-check\"></i> Done",
                modifiers: "btn btn-success"
            }
        ],
        fields: [
            {
                label: "URL",
                name: "url",
                edit: true,
                showColumn: true,
                type: "text"
            },
            {
                label: "Title",
                name: "title",
                edit: true,
                showColumn: true,
                type: "text"
            }
        ]
    }
}