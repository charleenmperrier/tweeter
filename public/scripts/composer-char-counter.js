$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    $('.counter').val(140 - this.value.length);
    
    if (this.value.length > 140) {
      
      //adding/removing css class name for counter 
      $('.counter').addClass('overCounter');
    } else {
      $('.counter').removeClass('overCounter');
    }
    
  });
    
});