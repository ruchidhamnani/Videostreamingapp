$(document).ready(function () {


    var API_KEY = "AIzaSyCRqZHz1ORzfVW7dzyJyad-tiH6CHp8-R4"
    var key = API_KEY;
    var video = ''
    var title = ''
    var npt = ''
    var query = ''


    $("#form").submit(function (event) {
        event.preventDefault()
        document.getElementById("videoid").style.display = "block";
        var search = $("#search").val()
        videoSearch(API_KEY, search, 5)
    })


    jQuery(function ($) {
        $('#videoid').on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                // alert('end reached');
                var ctr = 0;
                var tot = 0;
                var t0 = performance.now();
                videoSearch(API_KEY, search, 5, npt)
                var t1 = performance.now();
                // console.log(t1-t0)
                tot += (t1 - t0);
                ctr++;
                console.log("Current average = " + (tot) / ctr + " miliseconds")
            }
        })
    });

    function videoSearch(key, search, maxResults, pagetoken = "") {
        if (search) {
            if (pagetoken === "") {
                $("#bigvideoplayer").empty();

                $("#videos").empty();

                $("#unorderedlist").empty();
            }


            $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&pageToken=" + pagetoken + "&q=" + query, function (data) {
                // console.log(data)
                query = search;
                npt = data.nextPageToken;
                data.items.forEach(item => {
                    videoId = item.id.videoId
                    var buttonid = "addtofav-" + String(item.id.videoId)
                    // title  = item.snippet.title;
                    listitem = `<li id= "${item.id.videoId}" >${item.snippet.title}</li> 
                                <img src="${item.snippet.thumbnails.default.url}"/>
                                        <button id= "${buttonid}">Add to playlist</button>
                                        `
                    $("#unorderedlist").append(listitem)
                    $(document).ready(function () {
                        document.getElementById(String(buttonid)).addEventListener("click", function (e) {
                            
                            var x = document.getElementById("playlist");
                              x.style.display = "block";

                             
                            
                            var itemid = "plist-" + item.id.videoId;
                            var butitemid = "but-plist-" + item.id.videoId;
                            var playlistitem = document.createElement('li');
                            playlistitem.innerText = item.snippet.title;
                            playlistitem.setAttribute("id", itemid);
                            // $("#listofplaylist").append(`<li id="${itemid}" > ${item.snippet.title} </li>`)
                            var xbtn = document.createElement('button')
                            xbtn.innerText = 'Remove'
                            xbtn.onclick = function (e) {
                                event.stopPropagation();
                                e.target.parentElement.remove();
                            }
                            var img = document.createElement("img");
                            img.src = item.snippet.thumbnails.default.url;
                            var br = document.createElement("br");
                                playlistitem.appendChild(br);
                            playlistitem.appendChild(img);
                            
                            playlistitem.appendChild(xbtn);
                            

                            
                            
                            $("#listofplaylist").append(playlistitem);
                            document.getElementById(itemid).addEventListener("click", function (e) {
                                $("#bigvideoplayer").empty()
                                bigvideo = `<iframe width="720" height="515" src="http://www.youtube.com/embed/${e.target.id.split('-')[1]}" frameborder="0" allowfullscreen allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"></iframe>`

                                $("#bigvideoplayer").append(bigvideo)

                                
                            })
                            document.getElementById(itemid).addEventListener("mouseover", function (e) {

                                e.target.style.color = 'blue';
                            })
                            document.getElementById(itemid).addEventListener("mouseout", function (e) {

                                e.target.style.color = 'black';
                            })
                        });
                    });
                    document.getElementById(item.id.videoId).addEventListener("click", function (e) {
                        $("#bigvideoplayer").empty()
                        bigvideo = `<iframe width="720" height="515" src="http://www.youtube.com/embed/${e.target.id}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"></iframe>`

                        $("#bigvideoplayer").append(bigvideo)
                    })
                    document.getElementById(item.id.videoId).addEventListener("mouseover", function (e) {

                        e.target.style.color = 'blue';
                    })
                    document.getElementById(item.id.videoId).addEventListener("mouseout", function (e) {

                        e.target.style.color = 'black';
                    })
                });
            })
        }
    }
})