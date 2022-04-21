var nombre; var HP; var posbC; var porcC;
var porcEmp; var porcEmpDec; var difPorc; var porcDef;
var cantPtos; var selectPtos; var porcFinal;
var selectTipoRed; var selectEC; var selectTipoInstal;var residencial; var troncal; var edificio; var casa; var poste; var tanq; var mixto;
var selectSplit1; var selectSplit2; var n1; var n2; 
var cantidadPtos; var s1; var s2; var s1Dec; var s2Dec; var s1Final; var s2Final; var s2FinalDef;
var selectTipoSubte; var selectCurv; var ducto; var enterrado; var mixtoSubt; var muchaCurva; var pocaCurva;
var tipoFibra; var tipoCable;
var tipoEmpalme; var fusion; var mec; var fusionMec; var empFusion; var empMec;
var potTxOLT; var potTxONT;  var sensOLT;  var sensONT; var margen;   var presupuestoPotenciaDes; var presupuestoPotenciaDesDef; var presupuestoPotenciaAs; var presupuestoPotenciaAsDef; var presupuestoPerdidaDes; var presupuestoPerdidaAs; var presupuestoPotenciaAsDef; var presupuestoPerdidaDesDef; var presupuestoPerdidaAsDef;
var distancia; var conectores; var cantEmpF; var cantEmpM; var perdS1;var perdS2; 



function porcentajeClientes() {
    HP= document.getElementById("inputHP1").value;
    HP=parseInt(HP,10);
    posbC= document.getElementById("inputPosibC").value;
    posbC = parseInt(posbC,10);
    if (HP>=posbC) {
        porcC = posbC/HP;
        console.log(porcC);
    }    
    if(HP<posbC){
        alert("El numero de posibles clientes no puede ser mayor al total de viviendas en la residencia. Por favor introducir un numero realista de acuerdo a la encuesta realizada en el levantamiento")
    }    
}
/*En la siguiente funcion corroboro que el porcentaje empresarial sea entero, mayor a cero y menor o igual a 100, y lo convierto a decimal.
Luego establezco los condicionales comparando entre la diferencia entre el porcentaje de la residencia, y el porcentaje 
empresarial, con el porcentaje empresarial para calcular el porcentaje definitivo aun sin reserva. */
function cantClientes() {
    porcEmp=document.getElementById("inputPorcCob").value;
    porcEmp=parseFloat(porcEmp);
    if (porcEmp%1==0 & porcEmp<=100 & porcEmp!=0) {
        porcEmpDec= (porcEmp/100);
        console.log(porcEmpDec);
    }
    if (porcEmp==0 | porcEmp>100) {
        alert("Por favor introduzca un porcentaje diferente de 0 y no mayor a 100");
    }
    /*Ahora que ya tengo el porcentaje de cobertura de la empresa en numeros decimales, debo comparar el porcentaje de
    posibles clientes interesados, con el de la empresa, y hacer un promedio*/
    if (porcC>porcEmpDec) {
        difPorc= porcC-porcEmpDec;
        if ((difPorc > porcEmpDec) | ((difPorc < porcEmpDec) & (difPorc<0.3))){
            porcDef= (porcC+porcEmpDec)/2;
        }
        if ((difPorc < porcEmpDec) & (difPorc>=0.3)) {
            porcDef= porcEmpDec + 0.1;
        }
        if (difPorc==(porcC/2)) {
            porcDef= porcEmpDec + 0.15;
        }
    }
    if ((porcC<porcEmpDec) | (porcC==porcEmpDec)) {
        porcDef=porcC;
    }
    console.log(porcDef);     
}
/* A continuacion en base al select del porcentaje de reserva de puertos, calculo el porcentaje total y lo transformo a numeros 
enteros, redondeando a solo dos decimales.*/
    selectPtos= document.getElementById("selectResPtos");
    selectPtos.addEventListener("change",(porcentaje)=>{
        console.log(porcentaje.target.value)
        if ((porcentaje.target.value)==1) {
            cantPtos= (porcDef + (porcDef*0.2))*100;
            console.log(cantPtos);
            porcFinal= Number.parseFloat(cantPtos).toFixed(2);
            document.getElementById("resultadoPorcC").textContent= "En base a sus elecciones, se recomienda diseñar con un porcentaje de cobertura de: "+ porcFinal +"% . Incluyendo las reservas, dicho porcentaje garantiza margenes de referencia adecuados que disminuyen el uso innecesario de recursos, re-diseño de la red, y además, contempla la futura expansión de la misma."
        }
        if ((porcentaje.target.value)==2) {
            cantPtos= (porcDef + (porcDef*0.25))*100;
            console.log(cantPtos);
            porcFinal= Number.parseFloat(cantPtos).toFixed(2);
            document.getElementById("resultadoPorcC").textContent= "En base a sus elecciones, se recomienda diseñar con un porcentaje de cobertura de: "+ porcFinal +"% . Incluyendo las reservas, dicho porcentaje garantiza margenes de referencia adecuados que disminuyen el uso innecesario de recursos, re-diseño de la red, y además, contempla la futura expansión de la misma."
        }
        if ((porcentaje.target.value)==3) {
            cantPtos= (porcDef + (porcDef*0.3))*100;
            console.log(cantPtos);
            porcFinal= Number.parseFloat(cantPtos).toFixed(2);
            document.getElementById("resultadoPorcC").textContent= "En base a sus elecciones, se recomienda diseñar con un porcentaje de cobertura de: "+ porcFinal +"% . Incluyendo las reservas, dicho porcentaje garantiza margenes de referencia adecuados que disminuyen el uso innecesario de recursos, re-diseño de la red, y además, contempla la futura expansión de la misma."
        }
      });
     /* A continuacion decido si debo mostrar los select de edificio/casa y tipo de instalacion, segun si el proyecto es residencial
     o troncal */
      document.getElementById("selectEdifCasa").style.visibility= "hidden";
      document.getElementById("selectTipoInst").style.visibility= "hidden";      
selectTipoRed = document.getElementById("selectResTron");
selectTipoRed.addEventListener("change",(tipored)=>{
   console.log(tipored.target.value)
   if ((tipored.target.value)==1) {
    document.getElementById("selectEdifCasa").style.visibility= "visible";
    document.getElementById("selectTipoInst").style.visibility= "visible";
    residencial= true;
}
if ((tipored.target.value)==2) {
    document.getElementById("selectEdifCasa").style.visibility= "hidden";
    document.getElementById("selectTipoInst").style.visibility= "visible";
    troncal=true;
}
if ((tipored.target.value)=="Determine el tipo de red") {
    document.getElementById("selectEdifCasa").style.visibility= "hidden";
    document.getElementById("selectTipoInst").style.visibility= "hidden";
}
});
/*  A continuacion escucho el select de si es edificio o casa */
selectEC=document.getElementById("selectEdifCasa");
selectEC.addEventListener("change",(edificiocasa)=>{
if ((edificiocasa.target.value)==1) {
    edificio= true;
    console.log(edificio);
}
if ((edificiocasa.target.value)==2) {
    casa= true;
    console.log(casa);
}
});
/* A continuacion, de acuerdo al tipo de instalacion, si es tanquilla o mixta, se muestran los select del tipo de 
instalacion subterraneay curvatura , si es posteadura no se desbloquea ninguna */
document.getElementById("selectTipoSubt").style.visibility= "hidden";
document.getElementById("selectCurvatura").style.visibility= "hidden";
selectTipoInstal = document.getElementById("selectTipoInst");
selectTipoInstal.addEventListener("change",(tipoinstal)=>{
    console.log(tipoinstal.target.value);
    if ((tipoinstal.target.value)==1) {
        poste= true;
        document.getElementById("selectTipoSubt").style.visibility= "hidden";
        document.getElementById("selectCurvatura").style.visibility= "hidden";
    }
    if ((tipoinstal.target.value)==2) {
        tanq= true;
        document.getElementById("selectTipoSubt").style.visibility= "visible";
        document.getElementById("selectCurvatura").style.visibility= "visible";
    }
    if ((tipoinstal.target.value)==3) {
        mixto= true;
        document.getElementById("selectTipoSubt").style.visibility= "visible";
        document.getElementById("selectCurvatura").style.visibility= "visible";
    }
    if ((tipoinstal.target.value)=="Tipo de instalación") {
        document.getElementById("selectTipoSubt").style.visibility= "hidden";
        document.getElementById("selectCurvatura").style.visibility= "hidden";
    }
});
/* Se escucha el tipo de instalacion subterranea, ducto, directamente enterrado o mixto. */
selectTipoSubte = document.getElementById("selectTipoSubt");
selectTipoSubte.addEventListener("change",(subterraneo)=>{
    if ((subterraneo.target.value)==1) {
        ducto=true;
    }
    if ((subterraneo.target.value)==2) {
        enterrado=true;
    }
    if ((subterraneo.target.value)==3) {
        mixtoSubt=true;
    }
});
/* Se escucha si se presentan muchas curvaturas o no */
selectCurv = document.getElementById("selectCurvatura");
selectCurv.addEventListener("change",(curvatura)=>{
    if ((curvatura.target.value)==1) {
        muchaCurva=true;
    }
    if ((curvatura.target.value)==2) {
        pocaCurva=true;
    }
});
/* Se escucha el valor de los splitters N1 y N2 */
selectSplit1 = document.getElementById("selectSplitN1");
selectSplit1.addEventListener("change",(splitter1)=>{
    if ((splitter1.target.value)==1) {
        n1=2;
    }
    if ((splitter1.target.value)==2) {
        n1=4;
    }
    if ((splitter1.target.value)==3) {
        n1=8;
    }
});
selectSplit2 = document.getElementById("selectSplitN2");
selectSplit2.addEventListener("change", (splitter2)=>{
    if ((splitter2.target.value)==1) {
        n2=4;
    }
    if ((splitter2.target.value)==2) {
        n2=8;
    }
    if ((splitter2.target.value)==3) {
        n2=16;
    }
});
/* la siguiente funcion calcula la cantidad total de usuarios a en base a los que se va a diseñar, establece los condicionales
para los que se permite la combinacion de splitters y se calcula la cantidad de splitters de nivel uno y dos. */
function cantPuertos() {
    cantidadPtos= (porcFinal/100)*HP;
    console.log(cantidadPtos);
    if ((n1==2)&(n2==16)) {
        s2= cantidadPtos/n2;
        s2Dec= Number.parseFloat(s2).toFixed(1);
        s2Final= Math.round(s2Dec);
        s1= s2Final/n1; 
        s1Dec=Number.parseFloat(s1).toFixed(1);
        s1Final= Math.round(s1Dec);
        if (s2Final>(s1Final*n1)) {
            s2FinalDef=s1Final*n1;
        }
        if (s2Final<=(s1Final*n1)) {
            s2FinalDef=s2Final;
        }
        document.getElementById("resultadoCantSplitter").textContent= "De acuerdo a la division de splitter selecionada, y cubriendo el "+porcFinal+"% de los " + HP + " clientes, se necesitarán: " + s1Final + " splitters de primer nivel 1:2 y "+s2FinalDef+" splitters 1:16 de usuario."
    }
    if ((n1==4)&((n2==8)|(n2==16))) {
        s2= cantidadPtos/n2;
        s2Dec= Number.parseFloat(s2).toFixed(1);
        s2Final= Math.round(s2Dec);
        s1= s2Final/n1; 
        s1Dec=Number.parseFloat(s1).toFixed(1);
        s1Final= Math.round(s1Dec);
        if (s2Final>(s1Final*n1)) {
            s2FinalDef=s1Final*n1;
        }
        if (s2Final<=(s1Final*n1)) {
            s2FinalDef=s2Final;
        }
        if (n2==8) {
            document.getElementById("resultadoCantSplitter").textContent= "De acuerdo a la division de splitter selecionada, y cubriendo el "+porcFinal+"% de los " + HP + " clientes, se necesitarán: " + s1Final + " splitters de primer nivel 1:4 y "+s2FinalDef+" splitters 1:8 de usuario."
        }
        if (n2==16) {
            document.getElementById("resultadoCantSplitter").textContent= "De acuerdo a la division de splitter selecionada, y cubriendo el "+porcFinal+"% de los " + HP + " clientes, se necesitarán: " + s1Final + " splitters de primer nivel 1:4 y "+s2FinalDef+" splitters 1:16 de usuario."
        }
    }
    if ((n1==8)&((n2==8)|(n2==16))) {
        s2= cantidadPtos/n2;
        s2Dec= Number.parseFloat(s2).toFixed(1);
        s2Final= Math.round(s2Dec);
        s1= s2Final/n1; 
        s1Dec=Number.parseFloat(s1).toFixed(1);
        s1Final= Math.round(s1Dec);
        if (s2Final>(s1Final*n1)) {
            s2FinalDef=s1Final*n1;
        }
        if (s2Final<=(s1Final*n1)) {
            s2FinalDef=s2Final;
        }
        if (n2==8) {
            document.getElementById("resultadoCantSplitter").textContent= "De acuerdo a la division de splitter selecionada, y cubriendo el "+porcFinal+"% de los " + HP + " clientes, se necesitarán: " + s1Final + " splitters de primer nivel 1:8 y "+s2FinalDef+" splitters 1:8 de usuario."
        }
        if (n2==16) {
            document.getElementById("resultadoCantSplitter").textContent= "De acuerdo a la division de splitter selecionada, y cubriendo el "+porcFinal+"% de los " + HP + " clientes, se necesitarán: " + s1Final + " splitters de primer nivel 1:8 y "+s2FinalDef+" splitters 1:16 de usuario."
        }
    }
    if((n1==2)&((n2==4)|(n2==8))){
        alert("Por favor, adapte las relaciones de splitter al estándar, mínimo 32 máximo 128")
    }
    if ((n1==4)& (n2==4)){
        alert("Por favor, adapte las relaciones de splitter al estándar, mínimo 32 máximo 128")
    }
    if ((n1==8)& (n2==4)){
        alert("Por favor, adapte las relaciones de splitter al estándar, se recomienda que el mayor nivel de división esté del lado del usuario.")
    }
}
function tipoFibraCable() {
    /*Primero la eleccion del tipo de fibra */
    if ((troncal==true)) {
        tipoFibra="G.657A2";
    }
    if (edificio==true) {
        tipoFibra="G.657A2"; 
    }
    if (((casa==true)&(muchaCurva==true))|((casa==true)&(poste==true))){
        tipoFibra="G.657A2";
    }
    if ((casa==true)&(pocaCurva==true)){
        tipoFibra="G.652D";
    }
    if (poste==true) {
            tipoCable= "ADSS o GYXTW en su defecto.";
    }
    if (((tanq==true)|(mixto==true))) {
        if ((ducto==true)) {
            tipoCable= "GYFTS";
            }
            if (((enterrado==true)|(mixtoSubt==true))) {
            tipoCable= "GYXTW o ADSS en su defecto.";
            } 
        }
    document.getElementById("resultadoTipoFibra").textContent= "Asi mismo, en consecuencia del tipo de instalación seleccionado, se recomienda el uso de la fibra "+tipoFibra+" con un cable del tipo " +tipoCable
}
document.getElementById("inputEmpFusion").style.visibility="hidden";
document.getElementById("inputEmpMecanico").style.visibility="hidden";
tipoEmpalme = document.getElementById("selectEmpalme");
tipoEmpalme.addEventListener("change",(empalme)=>{
    console.log(empalme.target.value)
    if ((empalme.target.value)==1) {
        document.getElementById("inputEmpFusion").style.visibility="visible";
        document.getElementById("inputEmpMecanico").style.visibility="hidden";
        fusion=true;
        mec=false;
        fusionMec=false;
    }
    if ((empalme.target.value)==2) {
        mec=true;
        fusion=false;
        fusionMec=false;
        document.getElementById("inputEmpFusion").style.visibility="hidden";
        document.getElementById("inputEmpMecanico").style.visibility="visible";
    }
    if ((empalme.target.value)==3) {
        fusionMec=true;
        fusion=false;
        mec= false;
        document.getElementById("inputEmpFusion").style.visibility="visible";
        document.getElementById("inputEmpMecanico").style.visibility="visible";
    }
    if ((empalme.target.value)=="Tipo de Empalme") {
        document.getElementById("inputEmpFusion").style.visibility="hidden";
        document.getElementById("inputEmpMecanico").style.visibility="hidden";
    }
});
function presupuestoOptico() {
    potTxOLT = document.getElementById("inputPotMaxTxDes").value;
    potTxOLT= parseFloat(potTxOLT);
    potTxONT = document.getElementById("inputPotMaxTxAs").value;
    potTxONT= parseFloat(potTxONT);
    sensONT = document.getElementById("inputPotMinRxDes").value;
    sensONT= parseFloat(sensONT);
    sensOLT = document.getElementById("inputPotMinRxAs").value;
    sensOLT= parseFloat(sensOLT);
    margen = document.getElementById("inputMargen").value;
    margen= parseFloat(margen);
    if (margen>=0) {
        /* Sentido descendente */
        if ((potTxOLT<0)&(sensONT<0)) {
            presupuestoPotenciaDes= ((sensONT+potTxOLT)+margen);
        }
        if ((potTxOLT<0)&(sensONT>=0)) {
            presupuestoPotenciaDes= ((-sensONT+potTxOLT)+margen);
        }
        if ((potTxOLT>=0)&(sensONT<0)) {
            presupuestoPotenciaDes= ((sensONT-potTxOLT)+margen);
        }
        if ((potTxOLT>=0)&(sensONT>=0)) {
            presupuestoPotenciaDes= ((-sensONT-potTxOLT)+margen);
        }
        /* Sentido ascendente */
        if ((potTxONT<0)&(sensOLT<0)) {
            presupuestoPotenciaAs= ((sensOLT+potTxONT)+margen);
        }
        if ((potTxONT<0)&(sensOLT>=0)) {
            presupuestoPotenciaAs= ((-sensOLT+potTxONT)+margen);
        }
        if ((potTxONT>=0)&(sensOLT<0)) {
            presupuestoPotenciaAs= ((sensOLT-potTxONT)+margen);
        }
        if ((potTxONT>=0)&(sensOLT>=0)) {
            presupuestoPotenciaAs= ((-sensOLT-potTxONT)+margen);
        }
    }
    if (margen<0) {
        /* Sentido descendente */
        if ((potTxOLT<0)&(sensONT<0)) {
            presupuestoPotenciaDes= ((sensONT+potTxOLT)-margen);
        }
        if ((potTxOLT<0)&(sensONT>=0)) {
            presupuestoPotenciaDes= ((-sensONT+potTxOLT)-margen);
        }
        if ((potTxOLT>=0)&(sensONT<0)) {
            presupuestoPotenciaDes= ((sensONT-potTxOLT)-margen);
        }
        if ((potTxOLT>=0)&(sensONT>=0)) {
            presupuestoPotenciaDes= ((-sensONT-potTxOLT)-margen);
        }
        /* Sentido ascendente */
        if ((potTxONT<0)&(sensOLT<0)) {
            presupuestoPotenciaAs= ((sensOLT+potTxONT)-margen);
        }
        if ((potTxONT<0)&(sensOLT>=0)) {
            presupuestoPotenciaAs= ((-sensOLT+potTxONT)-margen);
        }
        if ((potTxONT>=0)&(sensOLT<0)) {
            presupuestoPotenciaAs= ((sensOLT-potTxONT)-margen);
        }
        if ((potTxONT>=0)&(sensOLT>=0)) {
            presupuestoPotenciaAs= ((-sensOLT-potTxONT)-margen);
        }
    }
presupuestoPotenciaDesDef= Number.parseFloat(presupuestoPotenciaDes).toFixed(2); 
presupuestoPotenciaAsDef= Number.parseFloat(presupuestoPotenciaAs).toFixed(2);
console.log(presupuestoPotenciaDesDef);
console.log(presupuestoPotenciaAsDef);
/*Calculo del presupuesto de perdida de potencia */
distancia= document.getElementById("inputDist").value;
distancia= parseFloat(distancia);
console.log(distancia);
conectores= document.getElementById("inputConectores").value;
conectores = parseInt(conectores,10);
    /* Perdida splitter 1 */
    if (n1==2) {
        perdS1=3.8;
    }
    if (n1==4) {
        perdS1=7.5;
        console.log(perdS1);
    }
    if (n1==8) {
        perdS1= 10.6;
    }
    /* Perdida splitter 2 */
    if (n2==4) {
        perdS2=7.5;
    }
    if (n2==8) {
        perdS2= 10.6;
        console.log(perdS2);
    }
    if (n2==16) {
        perdS2= 13.8;
    }
    if (distancia>20.00) {
        alert("El alcance físico de un enlace GPON según el estándar ITU-T G.984.1 no debería ser mayor a 20Km.")
    }
    if (distancia<=20) {
        if (fusion==true) {
            cantEmpF= document.getElementById("inputEmpFusion").value;
            cantEmpF=parseInt(cantEmpF,10);
            presupuestoPerdidaDes= (distancia*0.22+conectores*0.25+perdS1+perdS2+cantEmpF*0.1)*(-1);
            presupuestoPerdidaAs= (distancia*0.35+conectores*0.25+perdS1+perdS2+cantEmpF*0.1)*(-1);
        }
        if (mec==true) {
            cantEmpM = document.getElementById("inputEmpMecanico").value;
            cantEmpM= parseInt(cantEmpM,10);
            presupuestoPerdidaDes= (distancia*0.22+conectores*0.25+perdS1+perdS2+cantEmpM*0.3)*(-1);
            presupuestoPerdidaAs= (distancia*0.35+conectores*0.25+perdS1+perdS2+cantEmpM*0.3)*(-1);
        }
        if (fusionMec==true) {
            cantEmpF= document.getElementById("inputEmpFusion").value;
            cantEmpF=parseInt(cantEmpF,10);
            cantEmpM = document.getElementById("inputEmpMecanico").value;
            cantEmpM= parseInt(cantEmpM,10);
            presupuestoPerdidaDes= (distancia*0.22+conectores*0.25+perdS1+perdS2+cantEmpF*0.1+cantEmpM*0.3)*(-1);
            presupuestoPerdidaAs= (distancia*0.35+conectores*0.25+perdS1+perdS2+cantEmpF*0.1+cantEmpM*0.3)*(-1);
        }
    }
    presupuestoPerdidaDesDef = Number.parseFloat(presupuestoPerdidaDes).toFixed(2);
    presupuestoPerdidaAsDef = Number.parseFloat(presupuestoPerdidaAs).toFixed(2);
    console.log(presupuestoPerdidaDesDef);
    console.log(presupuestoPerdidaAsDef);

    document.getElementById("planDeAccion").style.visibility="hidden";

    if ((presupuestoPotenciaDesDef>presupuestoPerdidaDesDef)&(presupuestoPotenciaAsDef>presupuestoPerdidaAsDef)) {
        document.getElementById("resultadoPPO").textContent = "El enlace está dentro de los niveles ópticos requeridos, en el sentido descendente el presupuesto de potencia es de: "+presupuestoPotenciaDesDef+ "dBm, y el enlace tiene una atenuación teórica de: "+presupuestoPerdidaDesDef+ "dBm. De igual manera, en el enlace ascendente el presupuesto de potencia es de: "+presupuestoPotenciaAsDef+"dBm, presentando pérdida de: "+presupuestoPerdidaAsDef+ "dBm."
        document.getElementById("planDeAccion").style.visibility="visible";
    }
    else{
        document.getElementById("resultadoPPO").textContent = "Debe verificar que la pérdida de potencia, no supere el umbral establecido por el presupuesto de potencia óptica. En el enlace descendente no debe pasar de "+presupuestoPotenciaDesDef+ "dBm, y tiene: "+presupuestoPerdidaDesDef+"dBm. En el ascendente,el umbral es: "+presupuestoPotenciaAsDef+"dBm y la pérdida arrojada es de: "+presupuestoPerdidaAsDef+ "dBm. Por favor ajuste los valores al umbral permitido por sus dispositivos terminales."
        document.getElementById("planDeAccion").style.visibility="hidden";
    }
    nombre = document.getElementById("inputNomProyecto").value;
    console.log(nombre);
    document.getElementById("plan").textContent=" Plan de Acción "
    document.getElementById("nombreProyecto").textContent=  "- Nombre de proyecto: "+nombre;
    document.getElementById("planCobertura").textContent= "- Se recomienda cubrir un total de: "+cantidadPtos+" clientes, correspondientes al "+porcFinal+ "% de los "+HP+" usuarios presentes en el proyecto. Basados en la cantidad de personas interesadas y el porcentaje de cubrimiento con el que trabaja la empresa."
    document.getElementById("planFibra").textContent= "- El tipo de fibra recomendado es bajo el estándar: "+tipoFibra+" con un cable del tipo " +tipoCable+". Recordando que las recomendaciones tanto para la cantidad de hilos de la fibra, como para la longitud con su respectiva reserva, están descritos con anterioridad, y resulta imperativo hacer su seguimiento."
    document.getElementById("planSplitter1").textContent= "- La cantidad de splitters 1:"+n1+" de primer nivel es de: "+s1Final;
    document.getElementById("planSplitter2").textContent= "- En el segundo nivel, la cantidad de splitters 1:"+n2+" es de: "+s2FinalDef;
    document.getElementById("planDescendente").textContent="Enlace Descendente"
    document.getElementById("planPPotenciaD").textContent= "- El umbral de potencia mínimo que se puede tener es de: "+presupuestoPotenciaDesDef+" dBm."
    document.getElementById("planPPerdidaD").textContent= "- Y el cálculo teórico de la atenuación es de: " + presupuestoPerdidaDesDef + " dBm."
    document.getElementById("planAscendente").textContent="Enlace Ascendente"
    document.getElementById("planPPotenciaA").textContent= "- El umbral de potencia es de: "+presupuestoPotenciaAsDef+" dBm."
    document.getElementById("planPPerdidaA").textContent= "- Y la atenuación es de apróximadamente: " + presupuestoPerdidaAsDef + " dBm."
    document.getElementById("planDiagFicha").textContent= " Una vez se haya culminado el diseño de la red, se recomienda realizar el diagrama unifilar, y la ficha técnica de construcción, con todos los parámetros detallados. A continuación se anexan unos modelos que respetan todos los lineamientos mencionados en la sección de diseño.  "
    document.getElementById("planDiag").textContent= "Diagrama Unifilar"
    document.getElementById("planFicha").textContent= "Ficha Técnica"
    document.getElementById("planInstalTitulo").textContent= "Instalación del proyecto "+nombre
    document.getElementById("planInstalacion").textContent= " Todas las recomendaciones para los procedimientos están descritas en la sección Instalación, puede consultarla en el menú principal."

}
