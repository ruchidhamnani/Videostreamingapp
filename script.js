$(document).ready(function () {


    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    // countries =[]
    document.getElementById("search").addEventListener("keyup", event =>{
      console.log(event.target.value)
      
      $.ajax({
        headers: { 'Access-Control-Allow-Origin': '*'},
        type: 'GET',
        url: `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${event.target.value}`,
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data, textStatus, request){
            // console.log(data[1]);
            countries = data[1];
            console.log(countries)
            autocomplete(document.getElementById("search"), countries);
        }
  });
    });
    var API_KEY = "AIzaSyAbsJtwYDfxZuboDRBSTcSp5RyB-Fj6ODM"
    var key = API_KEY;
    var video = ''
    var title = ''
    var npt = ''
    var query = ''
    function autocomplete(inp, arr) {
  
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              currentFocus++;
              addActive(x);
            } else if (e.keyCode == 38) { 
              currentFocus--;
              addActive(x);
            } else if (e.keyCode == 13) {
              e.preventDefault();
              if (currentFocus > -1) {
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          if (!x) return false;
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
         
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }
  
  
  
  
  
  
      autocomplete(document.getElementById("search"), countries);
  
  
  
  
  
  
  
  
  
  
  
  
    $("#form").submit(function (event) {
        event.preventDefault()
        document.getElementById("videoid").style.display = "block";
        var search = $("#search").val()
        query = search
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
                            playlistitem.addEventListener("click", function (e) {
                                $("#bigvideoplayer").empty()
                                bigvideo = `<iframe width="720" height="515" src="http://www.youtube.com/embed/${e.target.id.split('-')[1]}" frameborder="0" allowfullscreen allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"></iframe>`
  
                                $("#bigvideoplayer").append(bigvideo)
  
                                
                            })
                            playlistitem.addEventListener("mouseover", function (e) {
  
                                e.target.style.color = 'blue';
                            })
                            playlistitem.addEventListener("mouseout", function (e) {
  
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