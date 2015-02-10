$(window).on("load",function () {
	pageing();
	bread("<span>></span>");
	nav();
})
//菜单
function nav () {
	$(".nav>li:last").css("border-width","0px");
	$(".nav").append("<div class='clearFix'></div>");
}
//分页
function pageing () {
	$(".pageing>li:first").css({
		"border-radius":"5px 0px 0px 5px",
	});
	$(".pageing>li:last").css({
		"border-right":"1px solid #e3e3e3",
		"border-radius":"0px 5px 5px 0px",
	});
	$(".pageing").append("<div class='clearFix'></div>");
}
//面包屑
function bread (center) {
	var $oBreadLi=$('.bread>li');
	var breadLiLength=$oBreadLi.length;
	$.each($oBreadLi,function(index,value){
		if(index!=breadLiLength-1){
			$(value).append(center);
		};
		if (index==0) {
			$(value).prepend("<span></span");
		};
	});
	$(".bread").append("<div class='clearFix'></div>");
}
//简单编辑器
function taoedit(who){
	$("form").submit(function(){
		edit(who);
		clearEdit(who);
	});
	clearEdit(who);
}
function edit(who){
	$(who).val($(who).val().replace(/[\r\n]/g,"<br/>"));
	$(who).val($(who).val().replace(/[\ ]/g,"<span style='margin-left:10px;'></span>"));
	console.log($(who).val());
}
function clearEdit(who){
	$(who).val($(who).val().replace(/<br\/>/g,"\r\n"));
	$(who).val($(who).val().replace(/<span style='margin-left:10px;'><\/span>/g," "));
}
function oneUpload(who,_url){
	//console.log("ok");
	$(who).ajaxSubmit({
		url:_url,
		dataType:'json',
		success:function(html){
			$(who+" img").attr("src","upload/"+html.file.savepath+html.file.savename);
		}
	});
	return false;
}