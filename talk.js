'use strict';
var tpl = require('./template/talkDetails.html');
var template = require('../../scripts/template.js');
var talkId = window.GetQueryString('talkId');
window.loading.appendTo($('body'));
$.ajax({
    url: 'http://192.168.3.229:8081/api/CampusTalk/' + talkId,
    type: 'GET',
    success: function(data){
        $('#loading').hide();
        var render = template.compile(tpl), html = render(data);
        document.getElementById('talk').innerHTML = html;
    },
    error: function (r) {
        $('#loading').hide();
        console.log(r);
    }
});
