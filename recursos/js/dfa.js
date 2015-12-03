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
		dfa.estados.inicio = {
			estadoFinal: false,
			caminos: {}
		}
		$.each(dfa.inputEstados.split(","), function( index, value ) {
			dfa.estados[value] = {
				estadoFinal: false,
				caminos: {}
			};
		});
		dfa.actualizarGrafo();
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
				dfa.actualizarGrafo();
			} else {
				dfa.resultado = 4;
			}
		}
		if(dfa.cadena.length == 0) {
			if (dfa.estados[dfa.estadoActual].estadoFinal === true){
				dfa.resultado = 2;
			} else {
				dfa.resultado = 3;
			}
		}
	}


	dfa.actualizarGrafo = function(){
		var nodesData = [];
		$.each(dfa.estados, function(key, value) {
			nodesData.push({id: key, label: key, borderWidth: value.estadoFinal ? 4 : 1});
			if (dfa.estadoActual && key == dfa.estadoActual){
				nodesData[nodesData.length - 1].color = {background: '#ffa500'};
			}
		});
	    var nodes = new vis.DataSet(nodesData);

	    var edgesData = [{from: 'inicio', to: dfa.estadoInicial}];
	    $.each(dfa.estados, function(key, value) {
		    $.each(value.caminos, function(key2, value2) {
				edgesData.push({from: key, to: value2, label: key2});
			});
		});
	    var edges = new vis.DataSet(edgesData);

	    var container = document.getElementById('grafo');

	    var data = {
	        nodes: nodes,
	        edges: edges
	    };

	    var options = {
	    	autoResize: true,
			height: '100%',
			width: '100%',
			edges:{
    			arrows: {
			      to:     {enabled: true, scaleFactor:1},
			      middle: {enabled: false, scaleFactor:1},
			      from:   {enabled: false, scaleFactor:1}
			    }
			}
	    };

	    var network = new vis.Network(container, data, options);
	}


	dfa.reiniciar = function(){
		location.reload();
	}


});