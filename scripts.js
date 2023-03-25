
let addres = window.location.href;
console.log(addres);
let position = addres.search("dim=");
let positionBlankX = addres.search("posx=");
let positionBlankY = addres.search("posy=");
let positionSame = addres.search("same=");
let dim;
//position of empty place
if(positionBlankX==-1){
    a = 2;
}
else {
    a = parseFloat(addres[(positionBlankX+5)]);
}
if(positionBlankY==-1){
    b = 2;
}
else {
    b = parseFloat(addres[(positionBlankY+5)]);
}
if(position==-1){
    dim = 5;
}
else {
    dim = addres[(position+4)];
}
if(positionSame==-1){
    //random numbers order
for (var nahod=[],i=0;i<(dim*dim-1);++i) nahod[i]=i+1;
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }
  nahod = shuffle(nahod);
}
else{
    let oldNahod ='';
   for (let i=positionSame+5;i<addres.length;i++){
        oldNahod = oldNahod + addres[i];
    }
    var nahod = oldNahod.split("-").map(Number);

    }
$("#dimension").val(dim);
$("#dimensionX").val(dim);
$("#emptX").val(a+1);
$("#emptY").val(b+1);
$(".pole").css({"width": dim*100 + "px", "height": dim*100 + "px" });




let c =0;//helping number
/*listing of divs*/
for(let i=0; i<dim; i++){
    for(let j=0;j<dim;j++){
        if(i==a&&j==b){
            console.log("ok");
            $(".pole").append("<div class='polickoDole' style='top:" + i*100 + "px;left:" + j*100 + "px;background:rgb(113, 130, 117)'></div>")
            c = -1;
        }
        else{
            $(".pole").append("<div class='policko' style='top: " + i*100 + "px;left: " + j*100 + "px;'>" + /*(j+1+(i*dim)+c)*/nahod[(j+(i*dim)+c)] + "</div>");
            $(".pole").append("<div class='polickoDole' style='top:" + i*100 + "px;left:" + j*100 + "px;'>" + ((/*dim*dim-*/j+1+(i*dim)+c)) + "</div>")
        }
    }
}
let posTop;
let posLeft;
let d;
let e;


$(".policko").click(function(){
posun() && checkGoal();
checkResult()
});
//moving boxes
 function posun(){   
  posTop = ($(event.target).css('top').slice(0,-2));
  posLeft =  ($(event.target).css('left').slice(0,-2));
   // console.log(posTop,posLeft);
    if((posTop-100)==(a*100)&&posLeft==(b*100)){
        $(event.target).css("top", (posTop-100) + "px");
        a = posTop/100;
        b = posLeft/100;
        d = parseFloat(posTop)-100;
        e = parseFloat(posLeft);
        return true;
    }
    else if( parseFloat(posTop)+100 == a*100&&parseFloat(posLeft)==(b*100)){
        $(event.target).css("top", parseFloat(posTop)+100 + "px");
        a = posTop/100;
        b = posLeft/100;
        d = parseFloat(posTop)+100;
        e = parseFloat(posLeft);
        return true;
    }
    else if(parseFloat(posTop)==(a*100)&&parseFloat(posLeft)+100==(b*100)){
        $(event.target).css("left", (parseFloat(posLeft)+100) + "px");
        a = posTop/100;
        b = posLeft/100;
        d = parseFloat(posTop);
        e = parseFloat(posLeft)+100;
        return true;
    }
    else if(parseFloat(posTop)==(a*100)&&parseFloat(posLeft)-100==(b*100)){
        $(event.target).css("left", (parseFloat(posLeft)-100) + "px");
        a = posTop/100;
        b = posLeft/100;
        d = parseFloat(posTop);
        e = parseFloat(posLeft)-100;
        return true;
    }
}
//checking numers right place
let numberChecked = 0;
function checkGoal(){
    let checkColor = $(event.target).css('color');  
    if(checkColor == "rgb(255, 255, 0)"){
        $(event.target).css("color","black");     
        numberChecked--;   
     }
     let text = $(event.target).text();
    let combine = "[style*='top:" + d + "px;left:" + e + "px']";
     let pos1 = $( "[class='polickoDole']" + combine + " " ).text();

     if(text == pos1){
        $(event.target).css("color","yellow");
        numberChecked++;
        
     }
}
function checkResult(){
if(numberChecked == (dim*dim-1)){
    alert("hotovo");
}
}

//shows menu
let menu =0;
$(".menuIcon").click(() =>{
    if(menu==0){
    $(".menu").css("visibility", "visible");
    menu =1;
    }
    else{
        $(".menu").css("visibility", "hidden"); 
        menu=0;
    }
});
$(".new").click(() => {
    window.location.assign("index.html");
});
$(".restart").click(() => {
    if(position==-1){
        window.location.assign("index.html?same=" + nahod.join('-') ); 
    }
    else {
        window.location.assign("index.html?dim=" + dim + "&posx=" + a + "&posy=" + b + "&same=" + nahod.join('-') ); 
    }
     
});
$("#dimension").keyup(() =>{
let dimX = ($("#dimension").val());  
$("#dimensionX").val(dimX);
});
$(".settingConfirm").click(() => {
    let dimension = $("#dimension").val();
    let positionX = ($("#emptX").val())-1;
    let positionY = ($("#emptY").val())-1;
    console.log(positionX);
    if((dimension>3&&dimension<10)&&(positionX>=0&&positionX<=dimension-1)&&(positionY>=0&&positionY<=dimension-1)){
    window.location.assign("index.html?dim=" + dimension + "&posx=" + positionX + "&posy=" + positionY);
    }
    else {
        alert("wrong input");
    }
    
});


