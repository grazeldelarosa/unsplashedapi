var clientID = "b63847891c51c5247e92b4687bcb4ad0224ddf8cbb3908468c4f69495756d365"
var perPage = "18"

defaultDisplay();

function defaultDisplay(currentPage = 1){
  //console.log('https://api.unsplash.com/photos/?order_by=latest&per_page='+ perPage +'&client_id=' + clientID +'&page='+ currentPage);
      $.getJSON('https://api.unsplash.com/photos/?order_by=latest&per_page='+ perPage +'&client_id=' + clientID+'&page=' + currentPage, function(data) {
        console.log(data);
        $('.gallery').html("");
        $.each(data, function(index, value) {
            displayGallery(value);
        });
      });

    //page count
   
      $.getJSON('https://api.unsplash.com/stats/total/?client_id=' + clientID, function(data) {
       console.log(data);
       console.log(data.total_photos);
       var totalPhotos = data.total_photos;
        NumberOfImages(totalPhotos);
       var pageCount = (totalPhotos - (totalPhotos % 18)) / 18 ;
       var pageRemainder = (totalPhotos % 18);
       console.log(pageCount);
       if (pageRemainder != 0 ) {
         pageCount += 1;
       }
       console.log(pageCount);
       var i = 0;
       var text = '';
       for (i = 0; i < pageCount; i++) {
          text += "The number is " + i + "<br>";
       }
      });
      /* */
}




$.getJSON('https://api.unsplash.com/collections/?client_id=' + clientID, function(data) {
 console.log(data);
});



// SEARCH
function search(currentPage = 1) {
            var searchKey = document.getElementById("searchbox").value;
           // this.searchbox = searchKey;
            console.log('https://api.unsplash.com/search/photos/?page='+currentPage+'&query=' +searchKey+ '&order_by=latest&per_page='+ perPage +'&client_id=' + clientID);

        $.getJSON('https://api.unsplash.com/search/photos/?page='+currentPage+'&query=' +searchKey+ '&order_by=latest&per_page='+ perPage +'&client_id=' + clientID, function(data) {
          console.log(data);

          var countResult = data.total;
          var totalPages = data.total_pages;

          NumberOfImages(countResult);

          if(countResult > 0 )
          {
            $('.gallery').html("");
          }
          else if(searchKey.length == 0)
          {
            defaultDisplay();
          }
          else {
            $('.gallery').html("Search not found!");
            return;
          }
          
          $.each(data.results, function(index, value) {    
              displayGallery(value);
          });

        });
}
$(document).ready(function(){
  $("#searchbox").keyup(function(e){
    //press enter key
    if(e.keyCode == 13)
    {search();}
  })
  $("#searchbox").key
});

function NumberOfImages(count)
{
     $('.photo-total').html('<div class="col-12"> '+ count +' Images</div>');
}

function displayGallery(value) {

      var bio = value.user.bio;
      var imageURL = value.urls.regular;
      var imageLg = value.urls.full;
      var linkURL = value.links.html;
      var thumbId = value.id;
      var imageWidth = value.width;
      var imageHeight = value.height;
      var userName = value.user.first_name;
      var userLast = value.user.last_name;
      $('.gallery').append('\
      <div class="col-6 col-md-4"><div class="thumbnail"><div class="image"><a data-toggle="modal" data-target="#modal-' + thumbId + '" style=" background-image: url(' + imageURL + ');" ><img src="img/spacer.png"></a></div></div></div>\
      <div class="modal fade thumbnail-modal" id="modal-' + thumbId + '" tabindex="-1" role="dialog" aria-labelledby="modal-' + thumbId + 'Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">\
        <img src="'+ imageLg +'">\
        <h3 class="modal-title" id="modal-' + thumbId + 'Title">' + name + '</h3>\
        <div class="caption">\
          <p>'+ imageWidth + ' by ' + imageHeight +' px</p>\
          <p>Photograph by: ' + userName + ' ' + userLast +'</p>\
        </div>\
      </div></div></div></div>\
      ');

}
/// b63847891c51c5247e92b4687bcb4ad0224ddf8cbb3908468c4f69495756d365
