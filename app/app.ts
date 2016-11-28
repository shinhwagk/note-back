import * as $ from 'jquery'

let note_textarea_number = 0;

export function init_note_add() {
    let txt = `<textarea id="note_${note_textarea_number += 1}"></textarea>`;
    let br = `<br>`;
    $("#note_area_texts").append(txt, br);
}

export function note_add() {
    let data = []

    for (let i = 0; i <= note_textarea_number - 1; i += 1) {
        data[i] = $(`#note_${i + 1}`).val()
    }

    $.ajax({
        type: "POST",
        url: "/api/node",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (message) {
            alert("请求已提交！我们会尽快与您取得联系");
        },
        error: function (message) {
            alert("请求已提交！我们会尽快与您取得联2系");
        }
    });
}

export function note_label_add() {
    const labelsStr: string = $("#note_label_add_input").val()
    const labelArr: string[] = labelsStr.split('-');
}
