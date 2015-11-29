angular.module('dfa', []).controller('dfaController', function() {

	var dfa = this;
	dfa.inputEstados = "";
	dfa.inputAlfabeto = "";
	dfa.cadena = "";
	dfa.estados = {};
	dfa.alfabeto = {};
	dfa.estadoInicial = {};


	dfa.parsearEstados = function(){
		dfa.estados = {};
		$.each(dfa.inputEstados.split(","), function( index, value ) {
			dfa.estados[value] = {
				estadoFinal: false,
				caminos: {}
			};
		});
	}


	dfa.parsearAlfabeto = function(){
		dfa.alfabeto = dfa.inputAlfabeto.split(",");
	}


	dfa.consumirCadena = function(){
		dfa.resultado = 1;
		if (!dfa.estadoActual){
			dfa.estadoActual = "" + dfa.estadoInicial;
		}
		if (dfa.cadena.length > 0){
			var simbolo = dfa.cadena.charAt(0);
			dfa.cadena = dfa.cadena.substring(1, dfa.cadena.length);
			if (dfa.estados[dfa.estadoActual].caminos[simbolo]){
				dfa.estadoActual = dfa.estados[dfa.estadoActual].caminos[simbolo];
				console.log(dfa.estadoActual);
			} else {
				dfa.resultado = 4;
			}
		}
		if(dfa.cadena.length == 0) {
			console.log(dfa.estados[dfa.estadoActual].estadoFinal);
			if (dfa.estados[dfa.estadoActual].estadoFinal === true){
				dfa.resultado = 2;
			} else {
				dfa.resultado = 3;
			}
		}
	}


	dfa.reiniciar = function(){
		location.reload();
	}


});