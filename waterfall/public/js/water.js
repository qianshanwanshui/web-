$(window).on('load',function(){
    waterfall();
    $(window).on("scroll",function(){
        var dataInt={"data":[{"src":"1.jpg"},{"src":"12.jpg"},{"src":"3.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"6.jpg"}]};
        if (checkScrollSlide()) {
            //console.log("yes");
            $.each(dataInt.data,function(key,value){
                var oBox=$('<div>').addClass('box').appendTo($('.main'));
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src','public/img/'+$(value).attr('src')).appendTo($(oPic));
            });
            waterfall();
        };
    })
})
function waterfall(){
    var $oBoxs=$(".main>.box");
    var oBoxsW=$oBoxs.outerWidth();
    var oBoxsH=$oBoxs.outerHeight();
    var parentWidth=$('.container').width();
    var cols=Math.floor(parentWidth/oBoxsW);
    $(".main").width(cols*oBoxsW).css("margin","0 auto");
    var arrH = new Array();
    $($oBoxs).each(function(index,value){
        var currentH=$oBoxs.eq(index).outerHeight();
        if (index<cols) {
            arrH[index]=currentH;
        }else{
            var minH=Math.min.apply(null,arrH);
            var index=$.inArray(minH,arrH);
            $(value).css({
                "position":"absolute",
                "left":index*oBoxsW,
                "top":minH,
            });
            arrH[index]+=currentH;
        }
    });

}

function checkScrollSlide(){
    var $lastBox=$(".main>.box").last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.height()/2);
    var scrollTop=$(window).scrollTop();
    var winH=$(window).height();
    return lastBoxDis<scrollTop+winH?true:false;
}
