var g_list;
function GorokuCard(){

}
GorokuCard.prototype = {
 
  
}
function GorokuList(canvas){
  this.goroku_list = [];
  this.top_id = 0;
  this.bottom_id = 0;
  this.canvas = canvas;
}
GorokuList.prototype = {
  getGoroku: function(word){
               $.ajax({
                 type: 'GET',
                 url:  window.location.host,
                 dataType: 'json',
                 list_element: this,
                 success:  function(json){this.list_element.registGoroku(json)}
               });
             },
  registGoroku: function(json){
                  this.goroku_list = $.parseJSON(json);
                },
  infScroll:    function(delta){
                  console.log(delta);
                },
}
function init_func(){
  canvas = document.getElementById('goroku_canvas');
  g_list = new GorokuList(canvas);
  $('#goroku_canvas').mousewheel(function(eo,delta,deltax,deltay){
    g_list.infScroll(deltax);
  });
}
$(function(){init_func();})
