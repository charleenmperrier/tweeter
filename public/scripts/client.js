/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  //listening for tweet submission
  $('.tweet-form').on('submit', function() {
      
    event.preventDefault(); //stops browser from reloading/staying on homepage
    const textInput = $('.tweet-form').serialize(); //bringing in readable text from text-box form
 
    //error alerts
    if (textInput === 'text=') {
      $('#empty-tweet').slideDown('linear');
    }

    // 145 to include the default 'text=' characters
    if (textInput.length > 145) {
      $('#long-tweet').slideDown('linear');
    }

    //no alert, ajax post request
    if (textInput.length < 145) {

      $.post('/tweets', textInput, function() { 
        // removes error alerts after successful post
        $('#empty-tweet').slideUp('linear');
        $('#long-tweet').slideUp('linear');
      })
    }

    $(".tweet-form").trigger("reset");   // prevents having to reload page to see new tweets

    
    $('article').remove();  //clears tweets, then load second time
    loadTweets();

  });

  loadTweets();   // first load of tweets
  
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
 //func for get request of tweet data
 const loadTweets = () => {
  $.get('/tweets', function(data, status) {
    
    renderTweets(data);
    
  })
};

//func to loop through the tweetObj and append new tweets
const renderTweets = (tweets) => {
  for (let tweetObj of tweets) {
    const $tweet = createTweetElement(tweetObj);
    $('#tweet-container').prepend($tweet);
  }
};

//func to take in tweet data and return article structure
const createTweetElement = (tweetObj) => {
  const safeHTML = `<p class="tweet-message">${escape(tweetObj.content.text)}</p>`;
  return $(`
    <article>
      <header class="past-tweets-header">
        <div>
          <img class="profile-pic" src="${tweetObj.user.avatars}">
          <h5>${tweetObj.user.name}</h5>
        </div>
        <h6 class="tweeter-handle">${tweetObj.user.handle}</h6>
      </header>
      <footer class="past-tweets-footer">
        <p>${safeHTML}</p>
        <div>
          <p>${tweetObj.created_at}</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </footer>
    </article>`);

}


