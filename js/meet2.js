window.addEventListener('load',()=>{

	var room_id;
	var user;
	var local_stream;
	var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	user = window.location.search.split('&')[0].slice(6);
	room_id = window.location.search.split('&')[1].slice(5)


	var p = new Peer(user);
	p.on('open',(id)=>{
		console.log("connected wwith id-> "+id);

		var conn = p.connect(room_id);

		getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            var call = p.call(room_id,local_stream)
            call.on('stream', (stream)=>{
                var video = document.getElementById("remote-video");
                video.srcObject = stream;
    			video.play();
            })
        }, (err)=>{
            console.log(err)
        })

	})

})