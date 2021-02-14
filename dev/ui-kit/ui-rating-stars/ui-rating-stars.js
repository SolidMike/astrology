// Rating
if ($('.rating #starrating').length) {
  $('input[name=rating]').on('change', function(e){
    $('#starrating').val($(e.target).val());
  })
}
if ($('.reviews__rating.rating').length) {
  $('.reviews__rating.rating').each(function(){
    var starValue = $(this).attr('data-star-value');
    $(this).find(`input[value=${starValue}]`).prop("checked", true);
  })
}