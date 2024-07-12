var stompClient=null

function connect(){
	
	let socket=new SockJS("/server1")
	
	stompClient=Stomp.over(socket)
	stompClient.connect({},function(frame){
		console.log("connected: "+frame)
		
		$("#name-from").addClass('d-none') //hiding #name-from using bootstrap property
		$("#chat-room").removeClass('d-none') //removing dnone from #chatroom which previously initialized
		
		//sunscribe
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body))
		})
	
	
	})
}

function sendMessage(){
	let jsonOb={
		
		name:localStorage.getItem("name"),
		content:$("#message-value").val()
	}
	stompClient.send("/app/message",{},JSON.stringify(jsonOb));
}

function showMessage(message){
	$("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

$(document).ready((e)=>{
	
	$("#login").click(()=>{
		
		let name=$("#name-value").val()
		localStorage.setItem("name",name)
		$("#name-title").html(`Welcome, <b>${name} </b>`)
		
		connect();
	})
	
	$("#send-btn").click(()=>{
		sendMessage()
	})
	
	$("#logout").click(()=>{
		localStorage.removeItem("name")
		if(stompClient!==null){
			
			stompClient.disconnect()
			$("#name-from").removeClass('d-none')
		    $("#chat-room").addClass('d-none') 
		    console.log(stompClient)
		}
	})
})