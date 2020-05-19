 var deviceId;
 if(navigator.serviceWorker){
 		navigator.serviceWorker.register('./sw.js').then(function (registration){
 			registration.pushManager.subscribe({
 				userVisibleOnly: true
 			}).then(function (inscricao){
 				console.log(inscricao.endpoint);
 			})
 		}).catch(function(){
 			console.log("Service worker não funcionou");
 		})
 }