$(document).ready(function(){


	var API_KEY = "AIzaSyBdhdSIQxa6chUqY9rPVsdGcmXvkpqgutU"
	
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
					var buttonid = "addtofav-"+String(item.id)
					abc.items.forEach(item=>{listitem = `<li id= ${item.id} >${item.snippet.title}
						
					</li> 
					<button id= "${buttonid}">Add to playlist</button>
					`
					$("#unorderedlist").append(listitem) 
					$(document).ready(function(){
						document.getElementById(buttonid).click(function(){
							alert("Hello World");   
						});
					  });
					// document.getElementById("button-"+item.id).addEventListener("click",function(e){
						
					// })
					// function funcplaylist(){
					// 	console.log("====================")
					// 	litem = `<li>constant</li>`
					// 				$("#listofplaylist").append(litem)
					// }
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