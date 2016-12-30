$(function() {
  $('#articleUploadBtn').click(function() {
    $('#articleUploadFile').click();
  });

  $('#articleUploadFile').change(function() {
    $(this).closest('form').submit();
  });
});
