var indexof = require('indexof'),
	sendSignal,
	signals = {},

	useCustomEvent = false,
	useCreateEvent = false;

try{
	new CustomEvent('test');
	useCustomEvent = true;	
}catch(e){}

var PubSub = function(){

	if(useCustomEvent){

		document.addEventListener('pub-sub-signal', function(e){

			var subs = signals[e.detail.signal] || false;
			if(subs){

				var l = subs.length;
				while(l--){
					subs[l]( e.detail.data );
				}

			}

		});

		sendSignal = function( signal, data ){

			document.dispatchEvent( 
				new CustomEvent( "pub-sub-signal", 
					{ 
						detail : { 
							signal : signal, 
							data : data 
						}
					}
				) 
			);

			return true;
		};

	} else {

		sendSignal = function(signal, data){

			var subs = signals[signal] || false;
			if(subs){
				var l = subs.length;
				setTimeout(function(){
					while(l--){
						subs[l]( data );
					}
				},0)
			}
		}

	}

	return this;

};

PubSub.prototype = {

	publish : function( signal, data ){

		sendSignal( signal, data );
		return this;

	},

	subscribe : function( signal, callback ){

		if(!signals[signal]){
			signals[signal] = [];
		}
		signals[signal].push( callback );

		return this;
	},

	unsubscribe : function( signal, callback ){

		var i;
		if(signals[signal] && ( (i = indexof( signals[signal], callback ) ) !== -1 ))  {
			signals[signal].splice(i, 1);
			return true;			
		} else {
			return false;			
		}

	},

	query : function(){

		var q = {}

		for(var i in signals){
			if(signals.hasOwnProperty(i)){
				q[i] = signals[i].length;
			}
		}

		return q;

	}
}

var ps = new PubSub();

module.exports = ps;