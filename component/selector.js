
(function ($) {
    //单项选择器
    $.fn.SingleSelector = function (options) {
        var opts = {
            dataType: '',             //数据源类型 defined为自定义类型
            data:[],                  //dataType=defined类型下的数据源data
            titleName: '选择器标题',   //选择器标题
            selectShow: 0,             //页面上显示选中文字长度，-1不显示，0显示全部，>0截取文字长度
            display: false,            //是否默认展示选择器，默认展示true  默认不展示false
            callback: null
        };
        var _this = $(this);
        opts = $.extend(true, {}, opts, options);
        //引用数据源
        var data = "";
        if (opts.dataType == "eduLevel") {
            data = eduLevel;
        } else if (opts.dataType == "salary") {
            data = salary;
        } else if (opts.dataType == "funcs") {
            data = funcs;
        } else if (opts.dataType == "cnature") {
            data = cnature;
        } else if (opts.dataType == "jnature") {
            data = jnature;
        } else if (opts.dataType == "time") {
            data = time;
        } else if (opts.dataType == "idealSalary") {
            data = idealSalary;
        } else if (opts.dataType == "majorGuanLi") {
            data = majorGuanLi;
        } else if (opts.dataType == "majorGongXue") {
            data = majorGongXue;
        } else if (opts.dataType == "majorJingJi") {
            data = majorJingJi;
        } else if (opts.dataType == "majorLiXue") {
            data = majorLiXue;
        } else if (opts.dataType == "majorWenXue") {
            data = majorWenXue;
        } else if (opts.dataType == "majorLiShi") {
            data = majorLiShi;
        } else if (opts.dataType == "majorYiXue") {
            data = majorYiXue;
        } else if (opts.dataType == "majorNongXue") {
            data = majorNongXue;
        } else if (opts.dataType == "majorJiaoYu") {
            data = majorJiaoYu;
        } else if (opts.dataType == "majorYiShu") {
            data = majorYiShu;
        } else if (opts.dataType == "majorFaXue") {
            data = majorFaXue;
        } else if (opts.dataType == "majorZheXue") {
            data = majorZheXue;
        } else if (opts.dataType == "skillLevel") {
            data = skillLevel;
        } else if (opts.dataType == "languageType") {
            data = languageType;
        } else if (opts.dataType == "defined") {
            data = opts.data;
        }

        var selectCont = "";
        for (var n = 0; n < data.length; n++) {
            var cont = data[n];
            selectCont += '<li data="' + cont.id + '">' + cont.name + '</li>';
        }

        var overLay = $('<div id="overlay"></div>');
        opts.titleName = "&nbsp;";
        var obj = $('<div class="single-selector"><header class="popup-header"><button class="blue fr">确定</button><button class="fl">取消</button>' +
            '<div class="con">' + opts.titleName + '</div></header><div class="single-body single_selector_body"><div class="reticle"></div>' +
            '<ul class="level-1">' + selectCont + '</ul></div></div>');

        if ($('#overlay').length > 0) {
            overLay = $('#overlay');
            $('body').append(obj);
        } else {
            $('body').append(overLay).append(obj);
        }

        obj.find(".fl").on('click', function () {
            selectHide();
        });
        obj.find(".fr").on('click', function () {
            $('input[name="' + _this.attr("id") + '"]').val(obj.find(".active").attr("data"));
            var selCont = obj.find(".level-1").find(".active").html();
            if (opts.selectShow == 0) {
                _this.empty().append(selCont);
            } else if (opts.selectShow > 0) {
                _this.empty().append(selCont.substring(0, opts.selectShow));
            }
            if (!opts.display) {
                selectHide();
            }
            typeof (opts.callback) == 'function' ? opts.callback(obj.find(".active").attr("data"), selCont) : null;
        });
        overLay.on('click', function () {
            selectHide();
        });

        if (opts.display) {
            selectShow();
        } else {
            _this.on('click', function () {
                var dataId = $('input[name="' + _this.attr("id") + '"]').val();
                var selectId = objList.find(".active").attr("data");
                if (dataId.length > 0 && dataId != selectId) {
                    m();
                }
                selectShow();
            });
        }

        function selectShow() {
            overLay.css("display", "block");
            setTimeout(function () {
                overLay.css('opacity', '1');
            }, 50);
            obj.slideDown(200);
        }

        function selectHide() {
            overLay.css('opacity', '0');
            setTimeout(function () {
                overLay.css("display", "none");
            }, 200);
            obj.slideUp(200);
        }

        var objBody = obj.find(".single_selector_body"), objList = obj.find(".level-1").data("offset", 0), q = null;

        function scrollOption(objList, b, c) {
            var d = -(objList.height() - 40);
            return !c && d > b && (b = (b + d) / 2), !c && b > 0 && (b /= 2), objList.data("offset", b).css("-webkit-transform", "translateY(" + b + "px)")
        }

        function getOffset(a) {
            return a.data("offset")
        }

        function setTransition(a) {
            a.css("-webkit-transition", "all ease 0.2s")
        }

        function removeTransition(a) {
            a.css("-webkit-transition", "none")
        }

        function i(a) {
            var b = a.now - a.start;
            objList.find("li").removeClass("active"), scrollOption(objList, objList.data("startOffset") + b)
        }

        function j() {
            objList.stop(), objList.data("start", !0), objList.data("startOffset", getOffset(objList))
        }

        function k(objList, c, d) {
            c = Math.round(c / 40);
            !d && setTransition(objList);
            scrollOption(objList, 40 * c);
            !d && setTimeout(function () {
                removeTransition(objList);
                objList.find("li").removeClass("active").eq(-c).addClass("active")
            }, 200);
            d && objList.find("li").removeClass("active").eq(-c).addClass("active")
        }

        function l(a) {
            objList.data("start", !1);
            var d = +new Date - a.startTime;
            if(d != 0){
                var b = -(objList.height() - 40), c = a.now - a.start, e = (d + 100) / d, f = objList.data("startOffset") + c * e;
                f > 0 ? k(objList, 0) : b > f ? k(objList, b) : k(objList, f)
            }
        }

        function m() {
            var dataId = $('input[name="' + _this.attr("id") + '"]').val();
            var d = objList.find("li[data=" + dataId + "]");
            var targetNum = d.index();
            if (targetNum < 0) {
                targetNum = 0;
                d = objList.children().first();
            }
            "number" == typeof targetNum && (objList.find(".active").removeClass("active"), d.addClass("active"), scrollOption(objList, 40 * -targetNum, !0))
        }

        obj.on("touchmove", function (a) {
            a.preventDefault()
        });

        objBody.on("touchstart mousedown", function (e) {
            var b = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            q = { start: b.clientY, startTime: +new Date, now: b.clientY }, j(q)
        }).on("touchend mouseup", function () {
            l(q), q = null
        }).on("touchmove mousemove", function (e) {
            var b = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            q && (q.now = b.clientY, i(q))
        })

        m();
    }



    //双项选择器
    $.fn.DoubleSelector = function (options) {
        var opts = {
            dataType: 'city',             //数据源类型
            selUnlimited: true,            //当dataType==city时，true表示包含不限，false表示不包含不限
            titleName: '选择器标题',      //选择器标题
            selectShow: 0,                 //页面上显示选中文字长度，-1不显示，0显示全部，>0截取文字长度
            moreSelect: false,            //是否多选 false选一项  true选多项
            startYear: 1980,                 //如果dataType为date类型则以下三个参数可填
            endYear: new Date().getFullYear(),
            defaultDate: 198801,
            callback: null,
            // 处理弹层出现页面滚动的问题
            layerCallback: null
        };
        var _this = $(this);
        opts = $.extend(true, {}, opts, options);
        //引用数据源
        var data = "",
            city = [{ "id": 0, "name": "全国", "items": [{ "id": 0, "name": "全国" }] },
            { "id": 1001, "name": "北京", "items": [{ "id": 1001, "name": "北京" }] },
            { "id": 1002, "name": "天津", "items": [{ "id": 1002, "name": "天津" }] },
            { "id": 1003, "name": "上海", "items": [{ "id": 1003, "name": "上海" }] },
            { "id": 1004, "name": "重庆", "items": [{ "id": 1004, "name": "重庆" }] },
            { "id": 2001, "name": "河北", "items": [{ "id": 2001001, "name": "石家庄" }, { "id": 2001002, "name": "唐山" }, { "id": 2001003, "name": "秦皇岛" }, { "id": 2001004, "name": "邯郸" }, { "id": 2001005, "name": "邢台" }, { "id": 2001006, "name": "保定" }, { "id": 2001007, "name": "张家口" }, { "id": 2001008, "name": "承德" }, { "id": 2001009, "name": "沧州" }, { "id": 2001010, "name": "廊坊" }, { "id": 2001011, "name": "衡水" }] }, { "id": 2002, "name": "山西", "items": [{ "id": 2002001, "name": "太原" }, { "id": 2002002, "name": "大同" }, { "id": 2002003, "name": "阳泉" }, { "id": 2002004, "name": "长治" }, { "id": 2002005, "name": "晋城" }, { "id": 2002006, "name": "朔州" }, { "id": 2002007, "name": "晋中" }, { "id": 2002008, "name": "运城" }, { "id": 2002009, "name": "忻州" }, { "id": 2002010, "name": "临汾" }, { "id": 2002011, "name": "吕梁" }, { "id": 2002012, "name": "永济市" }] }, { "id": 2003, "name": "内蒙古", "items": [{ "id": 2003001, "name": "呼和浩特" }, { "id": 2003002, "name": "包头" }, { "id": 2003003, "name": "乌海" }, { "id": 2003004, "name": "赤峰" }, { "id": 2003005, "name": "通辽" }, { "id": 2003006, "name": "鄂尔多斯" }, { "id": 2003007, "name": "呼伦贝尔" }, { "id": 2003008, "name": "兴安盟" }, { "id": 2003009, "name": "锡林郭勒盟" }, { "id": 2003010, "name": "乌兰察布" }, { "id": 2003011, "name": "巴彦淖尔" }, { "id": 2003012, "name": "阿拉善盟" }] }, { "id": 2004, "name": "辽宁", "items": [{ "id": 2004001, "name": "沈阳" }, { "id": 2004002, "name": "大连" }, { "id": 2004003, "name": "鞍山" }, { "id": 2004004, "name": "抚顺" }, { "id": 2004005, "name": "本溪" }, { "id": 2004006, "name": "丹东" }, { "id": 2004007, "name": "锦州" }, { "id": 2004008, "name": "营口" }, { "id": 2004009, "name": "阜新" }, { "id": 2004010, "name": "辽阳" }, { "id": 2004011, "name": "盘锦" }, { "id": 2004012, "name": "铁岭" }, { "id": 2004013, "name": "朝阳" }, { "id": 2004014, "name": "葫芦岛" }] }, { "id": 2005, "name": "吉林", "items": [{ "id": 2005001, "name": "长春" }, { "id": 2005002, "name": "吉林" }, { "id": 2005003, "name": "四平" }, { "id": 2005004, "name": "辽源" }, { "id": 2005005, "name": "通化" }, { "id": 2005006, "name": "白山" }, { "id": 2005007, "name": "松原" }, { "id": 2005008, "name": "白城" }, { "id": 2005009, "name": "延吉" }, { "id": 2005010, "name": "延边朝鲜族自治区" }] }, { "id": 2006, "name": "黑龙江", "items": [{ "id": 2006001, "name": "哈尔滨" }, { "id": 2006002, "name": "齐齐哈尔" }, { "id": 2006003, "name": "鸡西" }, { "id": 2006004, "name": "鹤岗" }, { "id": 2006005, "name": "双鸭山" }, { "id": 2006006, "name": "大庆" }, { "id": 2006007, "name": "伊春" }, { "id": 2006008, "name": "佳木斯" }, { "id": 2006009, "name": "七台河" }, { "id": 2006010, "name": "牡丹江" }, { "id": 2006011, "name": "黑河" }, { "id": 2006012, "name": "绥化" }, { "id": 2006013, "name": "大兴安岭地区" }] }, { "id": 2007, "name": "江苏", "items": [{ "id": 2007001, "name": "南京" }, { "id": 2007002, "name": "无锡" }, { "id": 2007003, "name": "徐州" }, { "id": 2007004, "name": "常州" }, { "id": 2007005, "name": "苏州" }, { "id": 2007006, "name": "昆山" }, { "id": 2007007, "name": "南通" }, { "id": 2007008, "name": "连云港" }, { "id": 2007009, "name": "淮安" }, { "id": 2007010, "name": "盐城" }, { "id": 2007011, "name": "扬州" }, { "id": 2007012, "name": "镇江" }, { "id": 2007013, "name": "泰州" }, { "id": 2007014, "name": "宿迁" }, { "id": 2007015, "name": "靖江" }, { "id": 2007016, "name": "常熟" }, { "id": 2007017, "name": "江阴" }, { "id": 2007018, "name": "张家港" }, { "id": 2007019, "name": "太仓市" }, { "id": 2007020, "name": "吴江" }, { "id": 2007021, "name": "丹阳" }, { "id": 2007022, "name": "溧阳" }, { "id": 2007023, "name": "泰兴" }, { "id": 2007024, "name": "宜兴" }] }, { "id": 2008, "name": "浙江", "items": [{ "id": 2008001, "name": "杭州" }, { "id": 2008002, "name": "宁波" }, { "id": 2008003, "name": "温州" }, { "id": 2008004, "name": "嘉兴" }, { "id": 2008005, "name": "湖州" }, { "id": 2008006, "name": "绍兴" }, { "id": 2008007, "name": "金华" }, { "id": 2008008, "name": "衢州" }, { "id": 2008009, "name": "舟山" }, { "id": 2008010, "name": "台州" }, { "id": 2008011, "name": "丽水" }, { "id": 2008012, "name": "玉环县" }, { "id": 2008013, "name": "方家山" }, { "id": 2008014, "name": "萧山" }, { "id": 2008015, "name": "义乌" }, { "id": 2008016, "name": "慈溪" }, { "id": 2008017, "name": "海宁" }] }, { "id": 2009, "name": "安徽", "items": [{ "id": 2009001, "name": "合肥" }, { "id": 2009002, "name": "芜湖" }, { "id": 2009003, "name": "蚌埠" }, { "id": 2009004, "name": "淮南" }, { "id": 2009005, "name": "马鞍山" }, { "id": 2009006, "name": "淮北" }, { "id": 2009007, "name": "铜陵" }, { "id": 2009008, "name": "安庆" }, { "id": 2009009, "name": "黄山" }, { "id": 2009010, "name": "滁州" }, { "id": 2009011, "name": "阜阳" }, { "id": 2009012, "name": "宿州" }, { "id": 2009013, "name": "巢湖" }, { "id": 2009014, "name": "六安" }, { "id": 2009015, "name": "亳州" }, { "id": 2009016, "name": "池州" }, { "id": 2009017, "name": "宣城" }] }, { "id": 2010, "name": "福建", "items": [{ "id": 2010001, "name": "福州" }, { "id": 2010002, "name": "厦门" }, { "id": 2010003, "name": "莆田" }, { "id": 2010004, "name": "三明" }, { "id": 2010005, "name": "泉州" }, { "id": 2010006, "name": "泉港区" }, { "id": 2010007, "name": "漳州" }, { "id": 2010008, "name": "南平" }, { "id": 2010009, "name": "龙岩" }, { "id": 2010010, "name": "宁德" }] }, { "id": 2011, "name": "江西", "items": [{ "id": 2011001, "name": "南昌" }, { "id": 2011002, "name": "景德镇" }, { "id": 2011003, "name": "萍乡" }, { "id": 2011004, "name": "九江" }, { "id": 2011005, "name": "新余" }, { "id": 2011006, "name": "鹰潭" }, { "id": 2011007, "name": "赣州" }, { "id": 2011008, "name": "吉安" }, { "id": 2011009, "name": "宜春" }, { "id": 2011010, "name": "抚州" }, { "id": 2011011, "name": "上饶" }] }, { "id": 2012, "name": "山东", "items": [{ "id": 2012001, "name": "济南" }, { "id": 2012002, "name": "青岛" }, { "id": 2012003, "name": "淄博" }, { "id": 2012004, "name": "枣庄" }, { "id": 2012005, "name": "东营" }, { "id": 2012006, "name": "烟台" }, { "id": 2012007, "name": "潍坊" }, { "id": 2012008, "name": "济宁" }, { "id": 2012009, "name": "泰安" }, { "id": 2012010, "name": "威海" }, { "id": 2012011, "name": "日照" }, { "id": 2012012, "name": "莱芜" }, { "id": 2012013, "name": "临沂" }, { "id": 2012014, "name": "德州" }, { "id": 2012015, "name": "聊城" }, { "id": 2012016, "name": "滨州" }, { "id": 2012017, "name": "菏泽" }, { "id": 2012018, "name": "章丘市" }, { "id": 2012019, "name": "荣成" }] }, { "id": 2013, "name": "河南", "items": [{ "id": 2013001, "name": "郑州" }, { "id": 2013002, "name": "开封" }, { "id": 2013003, "name": "洛阳" }, { "id": 2013004, "name": "平顶山" }, { "id": 2013005, "name": "安阳" }, { "id": 2013006, "name": "鹤壁" }, { "id": 2013007, "name": "新乡" }, { "id": 2013008, "name": "焦作" }, { "id": 2013009, "name": "濮阳" }, { "id": 2013010, "name": "许昌" }, { "id": 2013011, "name": "漯河" }, { "id": 2013012, "name": "三门峡" }, { "id": 2013013, "name": "南阳" }, { "id": 2013014, "name": "商丘" }, { "id": 2013015, "name": "信阳" }, { "id": 2013016, "name": "周口" }, { "id": 2013017, "name": "驻马店" }, { "id": 2013018, "name": "济源" }] }, { "id": 2014, "name": "湖北", "items": [{ "id": 2014001, "name": "武汉" }, { "id": 2014002, "name": "黄石" }, { "id": 2014003, "name": "十堰" }, { "id": 2014004, "name": "宜昌" }, { "id": 2014005, "name": "襄阳" }, { "id": 2014006, "name": "鄂州" }, { "id": 2014007, "name": "荆门" }, { "id": 2014008, "name": "孝感" }, { "id": 2014009, "name": "荆州" }, { "id": 2014010, "name": "黄冈" }, { "id": 2014011, "name": "咸宁" }, { "id": 2014012, "name": "随州" }, { "id": 2014013, "name": "仙桃" }, { "id": 2014014, "name": "潜江" }, { "id": 2014015, "name": "天门" }, { "id": 2014016, "name": "神农架" }, { "id": 2014017, "name": "恩施土家族苗族自治州" }] }, { "id": 2015, "name": "湖南", "items": [{ "id": 2015001, "name": "长沙" }, { "id": 2015002, "name": "株洲" }, { "id": 2015003, "name": "湘潭" }, { "id": 2015004, "name": "衡阳" }, { "id": 2015005, "name": "邵阳" }, { "id": 2015006, "name": "岳阳" }, { "id": 2015007, "name": "常德" }, { "id": 2015008, "name": "张家界" }, { "id": 2015009, "name": "益阳" }, { "id": 2015010, "name": "郴州" }, { "id": 2015011, "name": "永州" }, { "id": 2015012, "name": "怀化" }, { "id": 2015013, "name": "娄底" }, { "id": 2015014, "name": "湘西土家族苗族自治州" }] }, { "id": 2016, "name": "广东", "items": [{ "id": 2016001, "name": "广州" }, { "id": 2016002, "name": "韶关" }, { "id": 2016003, "name": "深圳" }, { "id": 2016004, "name": "珠海" }, { "id": 2016005, "name": "汕头" }, { "id": 2016006, "name": "佛山" }, { "id": 2016007, "name": "江门" }, { "id": 2016008, "name": "湛江" }, { "id": 2016009, "name": "茂名" }, { "id": 2016010, "name": "肇庆" }, { "id": 2016011, "name": "惠州" }, { "id": 2016012, "name": "梅州" }, { "id": 2016013, "name": "汕尾" }, { "id": 2016014, "name": "河源" }, { "id": 2016015, "name": "阳江" }, { "id": 2016016, "name": "清远" }, { "id": 2016017, "name": "东莞" }, { "id": 2016018, "name": "中山" }, { "id": 2016019, "name": "潮州" }, { "id": 2016020, "name": "揭阳" }, { "id": 2016021, "name": "云浮" }, { "id": 2016022, "name": "顺德" }, { "id": 2016023, "name": "开平" }] }, { "id": 2017, "name": "广西", "items": [{ "id": 2017001, "name": "南宁" }, { "id": 2017002, "name": "柳州" }, { "id": 2017003, "name": "桂林" }, { "id": 2017004, "name": "梧州" }, { "id": 2017005, "name": "北海" }, { "id": 2017006, "name": "防城港" }, { "id": 2017007, "name": "钦州" }, { "id": 2017008, "name": "贵港" }, { "id": 2017009, "name": "玉林" }, { "id": 2017010, "name": "百色" }, { "id": 2017011, "name": "贺州" }, { "id": 2017012, "name": "河池" }, { "id": 2017013, "name": "来宾" }, { "id": 2017014, "name": "崇左" }] }, { "id": 2018, "name": "海南", "items": [{ "id": 2018001, "name": "海口" }, { "id": 2018002, "name": "三亚" }, { "id": 2018003, "name": "文昌" }, { "id": 2018004, "name": "琼海" }, { "id": 2018005, "name": "万宁" }, { "id": 2018006, "name": "儋州" }, { "id": 2018007, "name": "东方" }, { "id": 2018008, "name": "五指山" }, { "id": 2018009, "name": "洋浦市/洋浦经济开发区" }] }, { "id": 2019, "name": "四川", "items": [{ "id": 2019001, "name": "成都" }, { "id": 2019002, "name": "自贡" }, { "id": 2019003, "name": "攀枝花" }, { "id": 2019004, "name": "泸州" }, { "id": 2019005, "name": "德阳" }, { "id": 2019006, "name": "绵阳" }, { "id": 2019007, "name": "广元" }, { "id": 2019008, "name": "遂宁" }, { "id": 2019009, "name": "内江" }, { "id": 2019010, "name": "乐山" }, { "id": 2019011, "name": "南充" }, { "id": 2019012, "name": "眉山" }, { "id": 2019013, "name": "宜宾" }, { "id": 2019014, "name": "广安" }, { "id": 2019015, "name": "达州" }, { "id": 2019016, "name": "雅安" }, { "id": 2019017, "name": "巴中" }, { "id": 2019018, "name": "资阳" }, { "id": 2019019, "name": "西昌" }, { "id": 2019020, "name": "阿坝藏族羌族自治州" }, { "id": 2019021, "name": "甘孜藏族自治州" }, { "id": 2019022, "name": "凉山彝族自治州" }] }, { "id": 2020, "name": "贵州", "items": [{ "id": 2020001, "name": "贵阳" }, { "id": 2020002, "name": "六盘水" }, { "id": 2020003, "name": "遵义" }, { "id": 2020004, "name": "安顺" }, { "id": 2020005, "name": "铜仁地区" }, { "id": 2020006, "name": "黔西南布依族苗族自治州" }, { "id": 2020007, "name": "毕节地区" }, { "id": 2020008, "name": "黔东南苗族侗族自治州" }, { "id": 2020009, "name": "黔南布依族苗族自治州" }] }, { "id": 2021, "name": "云南", "items": [{ "id": 2021001, "name": "昆明" }, { "id": 2021002, "name": "曲靖" }, { "id": 2021003, "name": "玉溪" }, { "id": 2021004, "name": "保山" }, { "id": 2021005, "name": "昭通" }, { "id": 2021006, "name": "临沧" }, { "id": 2021007, "name": "丽江" }, { "id": 2021008, "name": "普洱" }, { "id": 2021009, "name": "文山" }, { "id": 2021010, "name": "西双版纳" }, { "id": 2021011, "name": "楚雄彝族自治州" }, { "id": 2021012, "name": "红河哈尼族彝族自治州" }, { "id": 2021013, "name": "大理白族自治州" }, { "id": 2021014, "name": "德宏傣族景颇族自治州" }, { "id": 2021015, "name": "怒江傈僳族自治州" }, { "id": 2021016, "name": "迪庆藏族自治州" }] }, { "id": 2022, "name": "西藏", "items": [{ "id": 2022001, "name": "拉萨" }, { "id": 2022002, "name": "昌都地区" }, { "id": 2022003, "name": "山南地区" }, { "id": 2022004, "name": "日喀则地区" }, { "id": 2022005, "name": "那曲地区" }, { "id": 2022006, "name": "阿里地区" }, { "id": 2022007, "name": "林芝地区" }] }, { "id": 2023, "name": "陕西", "items": [{ "id": 2023001, "name": "西安" }, { "id": 2023002, "name": "铜川" }, { "id": 2023003, "name": "宝鸡" }, { "id": 2023004, "name": "咸阳" }, { "id": 2023005, "name": "渭南" }, { "id": 2023006, "name": "延安" }, { "id": 2023007, "name": "汉中" }, { "id": 2023008, "name": "榆林" }, { "id": 2023009, "name": "安康" }, { "id": 2023010, "name": "商洛" }, { "id": 2023011, "name": "杨凌" }] }, { "id": 2024, "name": "甘肃", "items": [{ "id": 2024001, "name": "兰州" }, { "id": 2024002, "name": "嘉峪关" }, { "id": 2024003, "name": "金昌" }, { "id": 2024004, "name": "白银" }, { "id": 2024005, "name": "天水" }, { "id": 2024006, "name": "武威" }, { "id": 2024007, "name": "张掖" }, { "id": 2024008, "name": "平凉" }, { "id": 2024009, "name": "酒泉" }, { "id": 2024010, "name": "庆阳" }, { "id": 2024011, "name": "定西" }, { "id": 2024012, "name": "陇南" }, { "id": 2024013, "name": "临夏回族自治州" }, { "id": 2024014, "name": "甘南藏族自治州" }] }, { "id": 2025, "name": "青海", "items": [{ "id": 2025001, "name": "西宁" }, { "id": 2025002, "name": "海东地区" }, { "id": 2025003, "name": "海北藏族自治州" }, { "id": 2025004, "name": "黄南藏族自治州" }, { "id": 2025005, "name": "海南藏族自治州" }, { "id": 2025006, "name": "果洛藏族自治州" }, { "id": 2025007, "name": "玉树藏族自治州" }, { "id": 2025008, "name": "海西蒙古族藏族自治州" }] }, { "id": 2026, "name": "宁夏", "items": [{ "id": 2026001, "name": "银川" }, { "id": 2026002, "name": "石嘴山" }, { "id": 2026003, "name": "吴忠" }, { "id": 2026004, "name": "固原" }, { "id": 2026005, "name": "中卫" }] }, { "id": 2027, "name": "新疆", "items": [{ "id": 2027001, "name": "乌鲁木齐" }, { "id": 2027002, "name": "克拉玛依" }, { "id": 2027003, "name": "吐鲁番地区" }, { "id": 2027004, "name": "哈密地区" }, { "id": 2027005, "name": "喀什地区" }, { "id": 2027006, "name": "和田地区" }, { "id": 2027007, "name": "石河子" }, { "id": 2027008, "name": "阿拉尔" }, { "id": 2027009, "name": "五家渠" }, { "id": 2027010, "name": "图木舒克" }, { "id": 2027011, "name": "博尔塔拉蒙古自治州" }, { "id": 2027012, "name": "巴音郭楞蒙古自治州" }, { "id": 2027013, "name": "阿克苏地区" }, { "id": 2027014, "name": "克孜勒苏柯尔克孜自治州" }, { "id": 2027015, "name": "昌吉回族自治州" }, { "id": 2027016, "name": "塔城地区" }, { "id": 2027017, "name": "伊犁哈萨克自治州" }, { "id": 2027018, "name": "阿勒泰地区" }] }, { "id": 2028, "name": "香港", "items": [{ "id": 2028, "name": "香港" }] }, { "id": 2029, "name": "澳门", "items": [{ "id": 2029, "name": "澳门" }] }, { "id": 2030, "name": "台湾", "items": [{ "id": 2030, "name": "台湾" }] }, { "id": 2099, "name": "海外", "items": [{ "id": 2099, "name": "海外" }] }];
        if (opts.dataType == "city") {
            if (!opts.selUnlimited) {
                data = city.splice(0, 1);
            }
            data = city;
        } else if (opts.dataType == "major") {
            data = major;
        } else if (opts.dataType == "industry") {
            data = industry;
        } else if (opts.dataType == "ITskills") {
            data = ITskills;
        } else if (opts.dataType == "certificate") {
            data = certificate;
        } else if (opts.dataType == "date") {
            var dateList = new Array();
            for (var end = opts.endYear; end > opts.startYear - 1; end--) {
                var yearJson = {};
                var items = new Array();
                for (var mon = 1; mon < 13; mon++) {
                    var monStr = mon < 10 ? "0" + mon : ""+mon;
                    var monJson = {};
                    monJson.id = end + monStr;
                    monJson.name = monStr;
                    items.push(monJson);
                }
                yearJson.id = end;
                yearJson.name = end;
                yearJson.items = items;
                dateList.push(yearJson);
            }
            data = dateList;
        }

        var levelCont1 = "", levelCont2 = "";
        for (var num = 0; num < data.length; num++){
            var cont = data[num];
            levelCont1 += '<li data="' + cont.id + '">'+cont.name+'</li>';
        }
        var level2Data = data[0].items;
        for (var num = 0; num < level2Data.length; num++) {
            var cont = level2Data[num];
            levelCont2 += '<li data="' + cont.id + '">' + cont.name + '</li>';
        }


        var overLay = $('<div id="overlay"></div>');
        opts.titleName = "&nbsp;";
        var obj = $('<div class="double-selector"><header class="popup-header"><button class="blue fr">确定</button><button class="fl">取消</button>' +
            '<div class="con">' + opts.titleName + '</div></header><div class="double-body double_selector_body"><div class="reticle"></div>' +
            '<ul class="level-1">' + levelCont1 + '</ul><ul class="level-2">' + levelCont2 + '</ul></div></div>');

        if ($('#overlay').length > 0) {
            overLay = $('#overlay');
            $('body').append(obj);
        } else {
            $('body').append(overLay).append(obj);
        }

        var q = obj.find(".double_selector_body");
        var l1 = obj.find(".level-1").data("offset", 0);
        var l2 = obj.find(".level-2").data("offset", 0);
        var t = null;


        obj.find(".fl").on('click', function () {
            selectHide();
            typeof (opts.layerCallback) == 'function' ? opts.layerCallback() : null;
        });
        obj.find(".fr").on('click', function () {
            if (opts.moreSelect) {
                var obj_this = $('input[name="' + _this.attr("id") + '"]');
                var str = obj.find(".level-2").find(".active").html();
                var selCont = $('<em data="' + obj.find(".level-2").find(".active").attr("data") + '">' + str + '<i class="icon-m-sel"></i></em>');
                if (obj_this.val().length == 0 || obj_this.val() == "") {
                    obj_this.val(obj.find(".level-2").find(".active").attr("data"));
                    _this.empty().append(selCont);
                } else {
                    if (_this.html().indexOf(str) == -1) {
                        obj_this.val(obj_this.val() + ',' + obj.find(".level-2").find(".active").attr("data"));
                        _this.append(selCont);
                    }
                }
                selCont.on('click', function (e) {
                    var obj = $(this).parent();
                    var e = e || window.e;
                    $(this).remove();
                    e.stopPropagation();
                    $('input[name="' + obj.attr("id") + '"]').val("");
                    if (obj.html().length == 0 || obj == "") {
                        obj.append("请选择");
                    } else {
                        var idStr = "";
                        obj.children().each(function () {
                            idStr += $(this).attr("data") + ",";
                        });
                        $('input[name="' + obj.attr("id") + '"]').val(idStr.substring(0,idStr.length-1));
                    }
                });
            } else {
                $('input[name="' + _this.attr("id") + '"]').val(obj.find(".level-2").find(".active").attr("data"));
                $('input[name="' + _this.attr("id") + '"]').attr("data-sel", obj.find(".level-1").find(".active").attr("data") + '-' + obj.find(".level-2").find(".active").attr("data"));
                var selCont = obj.find(".level-2").find(".active").html();
                if (opts.selectShow == 0) {
                    if (opts.dataType == "date") {
                        _this.empty().append(obj.find(".level-1").find(".active").html() + '-' + selCont);
                    } else {
                        _this.empty().append(selCont);
                    }
                } else if (opts.selectShow > 0) {
                    _this.empty().append(selCont.substring(0, opts.selectShow));
                }
            }
            selectHide();
            typeof (opts.callback) == 'function' ? opts.callback(obj.find(".level-2").find(".active").attr("data")) : null;
        });
        overLay.on('click', function () {
            selectHide();
            typeof (opts.layerCallback) == 'function' ? opts.layerCallback() : null;
        });
        _this.on('click', function () {
            var dataId = $('input[name="' + _this.attr("id") + '"]').val();
            var selectId = obj.find(".level-2").find(".active").attr("data");
            if (dataId.length > 0 && dataId != selectId) {
                var dataSel = $('input[name="' + _this.attr("id") + '"]').attr("data-sel");
                if (!opts.moreSelect && dataSel.length > 0) {
                    var selectVal = [dataSel.split('-')[0], dataSel.split('-')[1]];
                    init(selectVal);
                }
            }
            if (opts.dataType == "date" && dataId.length == 0) {
                var dDate = opts.defaultDate + "";
                var selectVal = [dDate.substring(0, 4), dDate];
                init(selectVal);
            }
            selectShow();
        });

        function selectShow() {
            overLay.css("display", "block");
            setTimeout(function () {
                overLay.css('opacity', '1');
            }, 50);
            obj.slideDown(200);
        }

        function selectHide() {
            overLay.css('opacity', '0');
            setTimeout(function () {
                overLay.css("display", "none");
            }, 200);
            obj.slideUp(200);
        }



        function jumpTo(a, b, c) {
            //跳转滚轴到活动项
            var d = -(a.height() - 40);
            return !c && d > b && (b = (b + d) / 2), !c && b > 0 && (b /= 2), a.data("offset", b).css("-webkit-transform", "translateY(" + b + "px)")
        }

        function getOffset(a) {
            return a.data("offset")
        }

        function setTransition(a) {
            a.css("-webkit-transition", "all ease 0.2s")
        }

        function removeTransition(a) {
            a.css("-webkit-transition", "none")
        }

        function moveTo(a) {
            var b = a.now - a.start, c = 1 == a.side ? l1 : l2;
            c.find("li").removeClass("active"), jumpTo(c, c.data("startOffset") + b)
        }

        function unlockMove(a) {
            var b = 1 == a.side ? l1 : l2;
            b.stop();
            b.data("start", true);
            b.data("startOffset", getOffset(b))
        }

        function changeAct(a, c, d) {
            //更换活动项
            c = Math.round(c / 40);
            !d && setTransition(a);
            jumpTo(a, 40 * c);
            !d && setTimeout(function () {
                removeTransition(a);
                var b = a.find("li").removeClass("active").eq(-c).addClass("active").attr("data");
                a.hasClass("level-1") && resetL2(-c, b)
            }, 200);
            d && a.find("li").removeClass("active").eq(-c).addClass("active")
        }

        function resetL2(a, b) {
            //重置二级项
            initDate(a, b);
            changeAct(l2, 0, true);
        }

        function initDate(a, b) {
            //初始化数据
            var d = data && data[a] ? data[a].items : null;
            if(d != null){
                var cont = "";
                for (var num = 0; num < d.length; num++){
                    cont += '<li data="' + d[num].id + '">' + d[num].name + '</li>';
                }
                obj.find('.level-2').empty().append(cont);
            }
        }

        function lockMove(a) {
            var b = 1 == a.side ? l1 : l2;
            b.data("start", false);
            var c = -(b.height() - 40);
            var e = +new Date - a.startTime;
            if(e != 0){
                var d = a.now - a.start;
                var f = (e + 100) / e
                var g = b.data("startOffset") + d * f;
                g > 0 ? changeAct(b, 0) : c > g ? changeAct(b, c) : changeAct(b, g)
            }
        }

        function init(selectVal) {
            //初始化组件
            var a = selectVal ? selectVal : [data[0].id, data[0].items[0].id];
            var d = a;
            var actObj = l1.find("li[data=" + d[0] + "]");
            actObj.length || (actObj = l1.find("li").eq(0), d = a);
            var index = actObj.index();
            if ("number" == typeof index && index >= 0) {
                l1.find(".active").removeClass("active");
                var h = actObj.addClass("active").data("id");
                jumpTo(l1, 40 * -index, !0), resetL2(index, h);
                jumpTo(l2, 0, !0);
                setTimeout(function () {
                    var a = l2.find("li[data=" + d[1] + "]"), b = a.index();
                    "number" == typeof b && b >= 0 && (l2.find(".active").removeClass("active"),
                    a.addClass("active"),
                    jumpTo(l2, 40 * -b, !0));
                }, 100)
            }
        }

        obj.on("touchmove", function (e) {
            e.preventDefault()
        });
        q.on("touchstart mousedown", function (e) {
            var b;
            var c = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            b = c.clientX < obj.width() / 2 ? 1 : 2;
            t = {
                start: c.clientY,
                startTime: +new Date,
                side: b,
                now: c.clientY
            };
            unlockMove(t);
        }).on("touchend mouseup", function () {
            lockMove(t);
            t = null
        }).on("touchmove mousemove", function (e) {
            var b = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            t && (t.now = b.clientY, moveTo(t))
        })

        init();

    }
})(jQuery)
