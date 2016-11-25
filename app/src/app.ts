import * as $ from 'jquery'

let note_id = 0;
export function init_note_add() {
    let t1 = document.createElement("textarea");
    t1.id = `note_text_${note_id}`
    let t2 = document.createElement("br");
    $("#note_area_texts").append(t1, t2);
}

export function note_add() {
    let datas = $("#note_area_texts textarea")
    $('#note_area_texts textarea').eq(-1).remove();
}