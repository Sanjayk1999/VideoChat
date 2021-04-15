window.addEventListener('load',()=>{

	var mdiv = document.getElementById("message-div");
	var room_id;
	var local_stream;
	var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	room_id = window.location.search.slice(6);
	console.log(room_id);

	var p  = new Peer(room_id);


	p.on('open',(id)=>{
		console.log("A Room created with id -> "+id);
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream)
        },(err)=>{
            console.log(err)
        })
	})


	p.on('connection',(conn)=>{
		// console.log('peer connected with id -> '+conn.peer);
		var msg = document.createElement('h5')
		msg.textContent = conn.peer + " Joined Meeting";
		mdiv.appendChild(msg);

	})

	p.on('call',(call)=>{
		call.answer(local_stream);
	})

})

function setLocalStream(stream){
    
    var video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}