var defaultText = "Click me and enter some text";

function endEdit(e) {
  var input = $(e.target),
    label = input && input.prev();

  label.text(input.val() === "" ? defaultText : input.val());
  input.hide();
  label.show();
}

$(".clickedit")
  .hide()
  .focusout(endEdit)
  .keyup(function(e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
      endEdit(e);
      return false;
    } else {
      return true;
    }
  })
  .prev()
  .click(function() {
    $(this).hide();
    $(this)
      .next()
      .show()
      .focus();
  });
