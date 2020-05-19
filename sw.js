/**
 * Este arquivo é destinado somente para o código do seu Service Worker
 * Como já foi dito em aula, o Service Worker não tem acesso aos elementos que sua página HTML tem
 * então nele você só vai cuidar do que acontece com a sua rede
 */

/************************************************************
 *                                                          *
 *           COLOQUE SEU CÓDIGO AQUI EM BAIXO               *
 *                                                          *
 ************************************************************/
 self.addEventListener('install',function (evento){
 	evento.waitUntil(
 		caches.open('aula2').then(function (cache){
 			return cache.addAll|([

 					'/',
 					'styles/app.css',
 					'scripts/app.js',
 					'scripts/feedback.js',
 					'scripts/moment.js' 				
 			])
 		})
 	)
 });

 self.addEventListener('fetch',function (evento){
 	evento.respondWith(caches.match(evento.request).then(function (match){
 		if(match){
 			return match;
 		}else{
 			return fetch(evento.request);
 		}
 	})
 )
 })
self.addEventListener('push',function (evento){
	evento.waitUntil(
			self.registration.showNotification('Notificação',{
				body:'Mensagem Recebida',
				icon:'images/webchat.png'
			})
		)
})