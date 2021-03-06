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

    const textLength = $('#tweet-text').val().length; // length of text-box input

    
    //error alerts
    if (!textLength) {
      $('#empty-tweet').text("We don't see a tweet??? Please try again.");
      $('#empty-tweet').slideDown('linear');

    }

    if (textLength > 140) {
      $('#long-tweet').text("Oops that tweet is toooo looong! Please try again."); // add error message in here
      $('#long-tweet').slideDown('linear');
    }

   
    //no alert, ajax post request
    if (textLength > 0 && textLength <= 140) {
    
      // removes error alerts after successful tweet input
      $('#empty-tweet').slideUp('linear'); 
      $('#long-tweet').slideUp('linear');

      $.post('/tweets', textInput, function() { 
        
        $(".tweet-form").trigger("reset"); // clears tweet in input after posting

        $('article').remove();  //clears all past tweets, then load newly updated tweet container
        loadTweets();
       
      });
    }

  });

  loadTweets();   // loads all tweets on page
  
});

//secure input of text
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
 //func for get request of tweet data
 const loadTweets = () => {
  $.get('/tweets', function(data, status) {
    
    renderTweets(data);
    
  });
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
          <p>${tweetObj.user.name}</p>
        </div>
        <h6 class="tweeter-handle">${tweetObj.user.handle}</h6>
      </header>

      ${safeHTML}

      <footer class="past-tweets-footer">
          <p>${dateOfTweet(tweetObj.created_at)}</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
      </footer>

    </article>`);

};

//converting the timestamp
const dateOfTweet = function(timestamp) {
  const howLongAgoMilliseconds = Date.now() - timestamp;
  const millsecondsPerMin = 1000*60;
  const millsecondsPerHour = 1000*60*60;
  const millsecondsPerDay = 1000*60*60*24;
  if (howLongAgoMilliseconds > millsecondsPerDay) {
    const howLongAgoDays = Math.ceil(howLongAgoMilliseconds / millsecondsPerDay);
    return `${howLongAgoDays} days ago`;
  }
  if (howLongAgoMilliseconds > millsecondsPerHour) {
    const howLongAgoHours = Math.ceil(howLongAgoMilliseconds / millsecondsPerHour);
    return `${howLongAgoHours} hours ago`;
  }
  if (howLongAgoMilliseconds > millsecondsPerMin) {
    const howLongAgoMins = Math.ceil(howLongAgoMilliseconds / millsecondsPerMin);
    return `${howLongAgoMins} minutes ago`
  }
  return "just now"
};