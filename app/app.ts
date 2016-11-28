import * as $ from 'jquery'

let note_textarea_number = 0;

let labels_id: number
let category_id: number

export function init_note_add() {
    const id = note_textarea_number += 1
    let txt = `<textarea id="note_${id}" rows="3" cols="100"></textarea>
               <button id="note_delete_${id}" onclick="nlib.delete_note_areatext('note_${id}','note_delete_${id}')">del</button>`;
    let br = `<br>`;
    $("#note_area_texts").append(txt, br);
}

export function note_label_apply() {
    const labelsStr: string = $("#note_label_apply_input").val()
    const labelArr: string[] = labelsStr.split('-');
    $.ajax({
        type: "POST",
        url: "/api/node/label",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(labelArr),
        dataType: "json",
        success: function (message) {
            labels_id = message
            $("#label_display").html(labels_id.toString())
        },
        error: function (message) {
            alert("请求已提交！我们会尽快与您取得联2系");
        }
    });
}

export function note_category_apply() {
    const category: string = $("#note_category_apply_input").val()
    $.ajax({
        type: "POST",
        url: "/api/node/category",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify([category, labels_id]),
        dataType: "json",
        success: function (message) {
            category_id = message
            $("#category_display").html(category_id.toString())
        },
        error: function (message) {
            alert("请求已提交！我们会尽快与您取得联2系");
        }
    });
}

export function note_add() {
    let data = []
    for (let i = 0; i <= note_textarea_number - 1; i += 1) {
        data[i] = $(`#note_${i + 1}`).val()
    }

    $.ajax({
        type: "POST",
        url: "/api/node/node",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ c_id: category_id, data: data }),
        success: (message) => alert(message),
        error: (message) => alert(message.error + "f")
    });
}

export function delete_note_areatext(text_id, text_del_id) {
    $(`#${text_id}`).remove()
    $(`#${text_del_id}`).remove()
}