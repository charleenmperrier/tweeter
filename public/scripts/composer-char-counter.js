$(document).ready(function() {
  // --- our code goes here ---
  
  $('#tweet-text').on('input', function() {
    $('.counter').val(140 - this.value.length);
    
    if (this.value.length > 140) {
      //make code red here css?
      $('.counter').addClass('overCounter');
    } else {
      $('.counter').removeClass('overCounter');
    }
    
  }) 
    
  
});