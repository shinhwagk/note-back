import * as $ from "jquery"

$.ajax("test.html", {
  success: function () {
    alert("success");
  },
  error: function () {
    alert("error");
  }
});