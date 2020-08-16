  // Option
  var CLIENT_ID = gon.client_access_key;
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

  var SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');
  var content = document.getElementById('content');
  var channelForm = document.getElementById('channel-form');
  var channelInput = document.getElementById('channel-input');
  var videoContainer = document.getElementById('video-container');
  // var submitButton = document.getElementById('submits__btn');
  var defaultChannel = 'techguyweb';

  // Form submit and change channel
document.addEventListener("DOMContentLoaded", function(){
  channelForm.addEventListener('submit', function(e){
    e.preventDefault();

    var channel = channelInput.value;

    getChannel(channel);
  });
}, false);

  // Load auth2 libraly
  function handleClientLoad(){
    gapi.load('client:auth2' , initClient);
  }


  // Init API client library and set up sign in listeners
  function initClient(){
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(() => {
      //Listen for sign in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle initial sign in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }

  // Update UI sign in state changes
  function updateSigninStatus(isSignedIn) {
    if(isSignedIn){
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      content.style.display = 'block';
      videoContainer.style.display = 'inline-block';
      getChannel(defaultChannel);
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
      content.style.display = 'none';
      videoContainer.style.display = 'none';
    }
  }

  // handle login
  function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
  }

  // handle logout
  function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
  }

  // Display channel data
  function showChannelData(data){
    var channelData = document.getElementById('channel-data');
    channelData.innerHTML = data;
  }

  // Add commas to number
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  // Get channel from API
  function getChannel(channel){
    gapi.client.youtube.channels
      .list({
        part: 'snippet,contentDetails,statistics',
        forUsername: channel
      })
      .then(response => {
        console.log(response);
        var channel = response.result.items[0];

        var output = `
          <ul class='collection'>
            <li class='collection-item'><span class="dan">Title:</span><span class="dan2">${channel.snippet.title}</span></li>
            <li class='collection-item'><span class="dan">ID:</span><span class="dan2">${channel.id}</span></li>
            <li class='collection-item'><span class="dan">Subscribers:</span><span class="dan2, marg">${numberWithCommas(channel.statistics.subscriberCount)}</span></li>
            <li class='collection-item'><span class="dan">Views:</span><span class="dan2">${
              numberWithCommas(channel.statistics.viewCount)
            }</span></li>
            <li class='collection-item'><span class="dan">Videos:</span><span class="dan2">${
              numberWithCommas(channel.statistics.videoCount)
            }</span></li>
          </ul>
          <p class='channel-description'>${channel.snippet.description}</p>
          <hr>
          <a class='btn grey darken-2' target='_blank' href="https://youtube.com/${channel.snippet.customUrl}">Visit Channel</a>
        `;
        showChannelData(output);

        var playlistId = channel.contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId);
      })
      // .catch(error => alert('No Channel By That Name'));
  }

  function requestVideoPlaylist(playlistId) {
    var requestOptions = {
      playlistId: playlistId,
      part: 'snippet',
      maxResults: 8
    };

    var request = gapi.client.youtube.playlistItems.list(requestOptions);

    request.execute(function(response){
      console.log(response);
      var playListItems = response.result.items;
      if(playListItems){
      var output = '<h4 class="align-center">Latest Videos</h4>';

      // Loop through videos and append output
      playListItems.forEach(item => {
        var videoId = item.snippet.resourceId.videoId;

        output += `
          <div class="col s3">
          <iframe  height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      });

      // Output videos
      videoContainer.innerHTML = output;

      } else {
        videoContainer.innerHTML = 'No Uploaded Videos';
      }
    });
  }