
c = require("choreographer");
timer = require("timer");

var grade =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,


	descricao : new Array(),
	local : new Array(),

	start : function () { 

		this.element = this._coreDoc.createElement('div');
		this.element.setAttribute("class","gradeContainer");
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		var ddate = new Date();

		dday = ddate.getDate();
		var currentDay = this.evento[dday];
		var head="<tr><td colspan='1'><h2> " + this.descricao[dday] + "</h2></td>";
		head+="<td><h3> " + this.local[dday] + "</h3></td></tr>";
		var innerAll = "";
		for (key in currentDay) { 
			var eventItem = currentDay[key]; 
			var hours = parseInt(eventItem.fim.split(":")[0])*60 +  parseInt(eventItem.fim.split(":")[1]);
			var innerTd = "<tr id='rule_"+hours+"' ><td align='right'>"+eventItem.inicio+" - "+ eventItem.fim+" </td><td>"+ eventItem.descricao + "<div><span class='gradeApresentador'> "+eventItem.apresentador+"</span> <span class='gradeLocal'> @ "+eventItem.local+"</span></div></tr>";
			innerAll += innerTd;
		}
		this.element.innerHTML+="<table class='gradeTable'   border='0' cellpadding='10'>"+head+innerAll+"</table>";
		this.tick();

	} ,

	tick : function () {
		this.data = new Date();
		this.month = this.data.getMonth() + 1;
		this.day = this.data.getDate();
		
		this.hours = this.data.getHours();
		this.minutes = this.data.getMinutes();
                var ddate = new Date();
                var currentDay = this.evento[ddate.getDate()];
                var innerAll = "";

		var font=200;
		var actual = this.hours * 60 + this.minutes; 

                for (key in currentDay) {

                        var eventItem = currentDay[key];

			var hours =0;

			try { 
				hours =   parseInt(eventItem.fim.split(":")[0])*60 + parseInt(eventItem.fim.split(":")[1]);
			} catch(i) { hours = 3600 } 


			if( hours<actual ) { 
 				this._coreDoc.getElementById("rule_"+hours).style.display="none";	
			} else { 
 				this._coreDoc.getElementById("rule_"+hours).style.fontSize=font+"%";	
				font*=.9;
			}  
			

                }

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 5000);
	},


  	style: <><![CDATA[

  		.gradeTable { 
			width:100%;
			color:black;
		} 
		.gradeTable td { 
			border:0px;
			border-bottom:1px solid yellow; 
		} 

		.gradeContainer { 
			color:black;font-size:20px;font-weight:bold;text-shadow: #555 2px 2px 5px;
	 	} 

		.gradeContainer h3 { 
			font-size:20px;
			text-shadow:none;
		} 

		.gradeLocal, .gradeApresentador { 
			text-shadow: none;
			font-size:80%;
		} 

 	]]></>, 


	init : function () { 

	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

this.descricao["23"] = "VII Sematron";
this.local["23"] = "Segunda-feira, 23 de Maio, 2011 @ USP";

this.descricao["24"] = "VII Sematron";
this.local["24"] = "Terça-feira, 24 de Maio, 2011 @ USP";

this.descricao["25"] = "VII Sematron";
this.local["25"] = "Quarta-feira, 25 de Maio, 2011 @ USP";

this.descricao["26"] = "VII Sematron";
this.local["26"] = "Quinta-feira, 26 de Maio, 2011 @ USP";

this.descricao["27"] = "VII Sematron";
this.local["27"] = "Sexta-feira, 27 de Maio, 2011 @ USP";

	} ,

evento : { 
                                             
"23": [ { inicio: "08:00", fim: "09:00", descricao: '"Credenciamento"', sigla: "- ",local: "Anfiteatro Jorge Caron",apresentador: ""},{ inicio: "09:00 ",fim: "10:00",descricao: 'Cerimônia de abertura oficial do evento',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:""},{ inicio: "10:00 ",fim: "12:00",descricao: 'MESA REDONDA: "Desenvolvimento de Produtos nas Empresas"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:""},{ inicio: "14:00 ",fim: "16:00",descricao: '"Brasil, País do Presente - O Poder Econômico do "Gigante Verde"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Alexander Busch"},{ inicio: "16:00 ",fim: "18:00",descricao: 'Liderança Comportamental - A Liderança de Resultados',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Dr. Jô Furlan"},{ inicio: "19:00 ",fim: "20:00",descricao: 'Evento Stand-up Comedy: "Sem Pé Nem Cabeça"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Bernardo Veloso e José Luiz Martins"}], 

"24": [ { inicio: "08:00", fim: "10:00", descricao: '"Carreira Profissional e Família - O Céu é o Limite"', sigla: "- ",local: "Anfiteatro Jorge Caron",apresentador: "Eng. Ghassan Maalouf"},{ inicio: "10:00 ",fim: "12:00",descricao: '"Networking e Relacionamento Negocial"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Aldo Novak"},{ inicio: "14:00 ",fim: "16:00",descricao: '"Desenvolvimento de Produtos de Forma Ambientalmente Sustentável"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Dr. Paulo T. M. Lourenção - Embraer"},{ inicio: "16:00 ",fim: "18:00",descricao: '"Jardim de Plantas Robóticas"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Alexandre Simões, Ph.D. e Prof. Dr. Marcelo Franchin - UNESP"},{ inicio: "19:00 ",fim: "20:00",descricao: '"Bio-inspired Swarms of Flying Robots"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Sabine Hauert, Ph.D. - EPFL (Suíça)"}], 

"25": [ { inicio: "08:00", fim: "18:00", descricao: '"SMART CHALLENGE"', sigla: "- ",local: "Salão Primavera",apresentador: ""}], 

"26": [ { inicio: "08:00", fim: "10:00", descricao: "Instrumentação Virtual com LabVIEW", sigla: "- ",local: "Anfiteatro Jorge Caron",apresentador: "Eng. André Bassoli - National Instruments"},{ inicio: "10:00 ",fim: "12:00",descricao: '"RoadMap das Tecnologias do Futuro"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Eng. Paulo Evando - FPT"},{ inicio: "13:00 ",fim: "14:00",descricao: 'Oportunidades de IC e TCC na USP',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Professores dos departamentos"},{ inicio: "14:00 ",fim: "16:00",descricao: '"Gerenciamento do Supply Chain"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Eng. Renato Saleme - Vale Fertilizantes"},{ inicio: "16:00 ",fim: "18:00",descricao: '"O Desenvolvimento de um Novo Carro - O Case do Novo Uno"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Acir Fortunato - Fiat"}], 

"27": [ { inicio: "08:00", fim: "12:00", descricao: 'Minicursos', sigla: "- ",local: "",apresentador: ""},{ inicio: "13:00 ",fim: "14:00",descricao: 'Divulgação do Programa de Trainees',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Fiat"},{ inicio: "14:00 ",fim: "16:00",descricao: '"Oportunidades e Desafios - Mercado de Trabalho"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Mariana Portes - Cia. de Talentos"},{ inicio: "16:00 ",fim: "18:00",descricao: '"Reabilitação Robótica: Sucessos e Fracassos"',sigla: "  ",local: "Anfiteatro Jorge Caron",apresentador:"Hermano Krebs, Ph.D. - MIT"},{ inicio: "19:00 ",fim: "- ",descricao: 'Churrasco de Encerramento',sigla: "  ",local: "Salão de Eventos",apresentador:""}]

}

} // end of grade 


c.register(grade);
