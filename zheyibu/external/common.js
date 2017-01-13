var GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var loading = $('<div id="loading"><div class="l-layer"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>' +
        '<div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>' +
        '<div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div></div>');
$(function(){
    if(!!$(".gotop").length){
        $('.gotop').on('click', function () {
            $('html,body').animate({ scrollTop: 0 }, 300);
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.gotop').removeClass('dN');
            } else {
                $('.gotop').addClass('dN');
            }
        });
    }
})
