$(document).ready(function(){


	var API_KEY = "AIzaSyCWDdo6NIuLxbImrY3joCeYmTiwOLEaa98"
	
	var video = ''
	
	
	
	$("#form").submit(function(event){
		event.preventDefault()
		
		
		var search = $("#search").val()
		
		videoSearch(API_KEY,search,5)
	
	
	})
	
	function videoSearch(key, search, maxResults){
		$("#bigvideoplayer").empty()
		$("#videos").empty()
		$("#unorderedlist").empty()
		
		$.get("https://www.googleapis.com/youtube/v3/search?key="+ key + "&type=video&part=snippet&maxResults=" +maxResults + "&q=" + search,function(data){
			console.log(data)
			
			data.items.forEach(item=>{
				videoId = item.id.videoId
				$.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&fields=items/snippet/title,items/snippet/description,items&key=" +key,function(abc){
					
					abc.items.forEach(item=>{listitem = `<li id= ${item.id} >${item.snippet.title}</li> 
					<button>Add to playlist</button>` 
					$("#unorderedlist").append(listitem)
					document.getElementById(item.id).addEventListener("click",function(e){
						$("#bigvideoplayer").empty()
						bigvideo= `<iframe width="720" height="515" src="http://www.youtube.com/embed/${e.target.id}" frameborder="0" allowfullscreen></iframe>`
						
						$("#bigvideoplayer").append(bigvideo)
					})
					document.getElementById(item.id).addEventListener("mouseover",function(e){
						
						e.target.style.color = 'blue';
					})
					document.getElementById(item.id).addEventListener("mouseout",function(e){
						
						e.target.style.color = 'black';
					})




					}
					
					
					);
					
				})
				
				
				//video = 
				//`<iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`
				
				//listitem = `<li> ${item.id.videoId} </li>`
				
				//$("#videos").append(video)
				
				//$("#unorderedlist").append(listitem)
			
			
			
			});
		})
	
	}



})