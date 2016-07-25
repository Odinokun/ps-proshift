(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},e=[].slice;!function(t,e){return"function"==typeof define&&define.amd?define("waypoints",["jquery"],function(n){return e(n,t)}):e(t.jQuery,t)}(window,function(n,i){var o,r,s,l,a,c,u,f,d,h,p,m,v,y,w,g;return o=n(i),f=t.call(i,"ontouchstart")>=0,l={horizontal:{},vertical:{}},a=1,u={},c="waypoints-context-id",p="resize.waypoints",m="scroll.waypoints",v=1,y="waypoints-waypoint-ids",w="waypoint",g="waypoints",r=function(){function t(t){var e=this;this.$element=t,this.element=t[0],this.didResize=!1,this.didScroll=!1,this.id="context"+a++,this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()},this.waypoints={horizontal:{},vertical:{}},this.element[c]=this.id,u[this.id]=this,t.bind(m,function(){var t;if(!e.didScroll&&!f)return e.didScroll=!0,t=function(){return e.doScroll(),e.didScroll=!1},i.setTimeout(t,n[g].settings.scrollThrottle)}),t.bind(p,function(){var t;if(!e.didResize)return e.didResize=!0,t=function(){return n[g]("refresh"),e.didResize=!1},i.setTimeout(t,n[g].settings.resizeThrottle)})}return t.prototype.doScroll=function(){var t,e=this;return t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},!f||t.vertical.oldScroll&&t.vertical.newScroll||n[g]("refresh"),n.each(t,function(t,i){var o,r,s;return s=[],r=i.newScroll>i.oldScroll,o=r?i.forward:i.backward,n.each(e.waypoints[t],function(t,e){var n,o;return i.oldScroll<(n=e.offset)&&n<=i.newScroll?s.push(e):i.newScroll<(o=e.offset)&&o<=i.oldScroll?s.push(e):void 0}),s.sort(function(t,e){return t.offset-e.offset}),r||s.reverse(),n.each(s,function(t,e){if(e.options.continuous||t===s.length-1)return e.trigger([o])})}),this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.refresh=function(){var t,e,i,o=this;return i=n.isWindow(this.element),e=this.$element.offset(),this.doScroll(),t={horizontal:{contextOffset:i?0:e.left,contextScroll:i?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:i?0:e.top,contextScroll:i?0:this.oldScroll.y,contextDimension:i?n[g]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},n.each(t,function(t,e){return n.each(o.waypoints[t],function(t,i){var o,r,s,l,a;if(o=i.options.offset,s=i.offset,r=n.isWindow(i.element)?0:i.$element.offset()[e.offsetProp],n.isFunction(o)?o=o.apply(i.element):"string"==typeof o&&(o=parseFloat(o),i.options.offset.indexOf("%")>-1&&(o=Math.ceil(e.contextDimension*o/100))),i.offset=r-e.contextOffset+e.contextScroll-o,(!i.options.onlyOnScroll||null==s)&&i.enabled)return null!==s&&s<(l=e.oldScroll)&&l<=i.offset?i.trigger([e.backward]):null!==s&&s>(a=e.oldScroll)&&a>=i.offset?i.trigger([e.forward]):null===s&&e.oldScroll>=i.offset?i.trigger([e.forward]):void 0})})},t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical))return this.$element.unbind([p,m].join(" ")),delete u[this.id]},t}(),s=function(){function t(t,e,i){var o,r;"bottom-in-view"===i.offset&&(i.offset=function(){var t;return t=n[g]("viewportHeight"),n.isWindow(e.element)||(t=e.$element.height()),t-n(this).outerHeight()}),this.$element=t,this.element=t[0],this.axis=i.horizontal?"horizontal":"vertical",this.callback=i.handler,this.context=e,this.enabled=i.enabled,this.id="waypoints"+v++,this.offset=null,this.options=i,e.waypoints[this.axis][this.id]=this,l[this.axis][this.id]=this,o=null!=(r=this.element[y])?r:[],o.push(this.id),this.element[y]=o}return t.prototype.trigger=function(t){if(this.enabled)return null!=this.callback&&this.callback.apply(this.element,t),this.options.triggerOnce?this.destroy():void 0},t.prototype.disable=function(){return this.enabled=!1},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},t.prototype.destroy=function(){return delete l[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},t.getWaypointsByElement=function(t){var e,i;return(i=t[y])?(e=n.extend({},l.horizontal,l.vertical),n.map(i,function(t){return e[t]})):[]},t}(),h={init:function(t,e){var i;return e=n.extend({},n.fn[w].defaults,e),null==(i=e.handler)&&(e.handler=t),this.each(function(){var t,i,o,l;return t=n(this),o=null!=(l=e.context)?l:n.fn[w].defaults.context,n.isWindow(o)||(o=t.closest(o)),o=n(o),i=u[o[0][c]],i||(i=new r(o)),new s(t,i,e)}),n[g]("refresh"),this},disable:function(){return h._invoke.call(this,"disable")},enable:function(){return h._invoke.call(this,"enable")},destroy:function(){return h._invoke.call(this,"destroy")},prev:function(t,e){return h._traverse.call(this,t,e,function(t,e,n){if(e>0)return t.push(n[e-1])})},next:function(t,e){return h._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1)return t.push(n[e+1])})},_traverse:function(t,e,o){var r,s;return null==t&&(t="vertical"),null==e&&(e=i),s=d.aggregate(e),r=[],this.each(function(){var e;return e=n.inArray(this,s[t]),o(r,e,s[t])}),this.pushStack(r)},_invoke:function(t){return this.each(function(){var e;return e=s.getWaypointsByElement(this),n.each(e,function(e,n){return n[t](),!0})}),this}},n.fn[w]=function(){var t,i;return i=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],h[i]?h[i].apply(this,t):n.isFunction(i)?h.init.apply(this,arguments):n.isPlainObject(i)?h.init.apply(this,[null,i]):i?n.error("The "+i+" method does not exist in jQuery Waypoints."):n.error("jQuery Waypoints needs a callback function or handler option.")},n.fn[w].defaults={context:i,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},d={refresh:function(){return n.each(u,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return null!=(t=i.innerHeight)?t:o.height()},aggregate:function(t){var e,i,o;return e=l,t&&(e=null!=(o=u[n(t)[0][c]])?o.waypoints:void 0),e?(i={horizontal:[],vertical:[]},n.each(i,function(t,o){return n.each(e[t],function(t,e){return o.push(e)}),o.sort(function(t,e){return t.offset-e.offset}),i[t]=n.map(o,function(t){return t.element}),i[t]=n.unique(i[t])}),i):[]},above:function(t){return null==t&&(t=i),d._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){return null==t&&(t=i),d._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){return null==t&&(t=i),d._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){return null==t&&(t=i),d._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return d._invoke("enable")},disable:function(){return d._invoke("disable")},destroy:function(){return d._invoke("destroy")},extendFn:function(t,e){return h[t]=e},_invoke:function(t){var e;return e=n.extend({},l.vertical,l.horizontal),n.each(e,function(e,n){return n[t](),!0})},_filter:function(t,e,i){var o,r;return(o=u[n(t)[0][c]])?(r=[],n.each(o.waypoints[e],function(t,e){if(i(o,e))return r.push(e)}),r.sort(function(t,e){return t.offset-e.offset}),n.map(r,function(t){return t.element})):[]}},n[g]=function(){var t,n;return n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],d[n]?d[n].apply(null,t):d.aggregate.call(null,n)},n[g].settings={resizeThrottle:100,scrollThrottle:30},o.on("load.waypoints",function(){return n[g]("refresh")})})}).call(this),function(t){t.fn.animated=function(e,n){t(this).css("opacity","0").addClass("animated").waypoint(function(i){"down"===i?t(this).removeClass(n).addClass(e).css("opacity","1"):t(this).removeClass(e).addClass(n).css("opacity","1")},{offset:"90%"}).waypoint(function(i){"down"===i?t(this).removeClass(e).addClass(n).css("opacity","1"):t(this).removeClass(n).addClass(e).css("opacity","1")},{offset:-t(window).height()})}}(jQuery),function(t){t.fn.menumaker=function(e){var n=t(this),i=t.extend({title:"Menu",format:"dropdown",sticky:!1},e);return this.each(function(){return n.prepend('<div id="menu-button">'+i.title+"</div>"),t(this).find("#menu-button").on("click",function(){t(this).toggleClass("menu-opened");var e=t(this).next("ul");e.hasClass("open")?e.hide().removeClass("open"):(e.show().addClass("open"),"dropdown"===i.format&&e.find("ul").show())}),n.find("li ul").parent().addClass("parent"),multiTg=function(){n.find(".parent").prepend('<span class="submenu-button"></span>'),n.find(".submenu-button").on("click",function(){t(this).toggleClass("submenu-opened"),t(this).siblings("ul").hasClass("open")?t(this).siblings("ul").removeClass("open").hide():t(this).siblings("ul").addClass("open").show()})},"multitoggle"===i.format?multiTg():n.addClass("dropdown"),i.sticky===!0&&n.css("position","fixed"),resizeFix=function(){var e=document.documentElement.clientWidth;t(e)>768&&n.find("ul").show(),t(e)<=768&&n.find("ul").hide().removeClass("open")},resizeFix(),t(document.documentElement.clientWidth).on("resize",resizeFix)})}}(jQuery),function(t){t(document).ready(function(){t(document).ready(function(){t("#hmenu").menumaker({title:"Menu",format:"multitoggle"}),t("#hmenu").prepend("<div id='menu-line'></div>");var e,n,i,o,r=!1,s=0,l=t("#hmenu #menu-line");t("#hmenu > ul > li").each(function(){t(this).hasClass("active")&&(e=t(this),r=!0)}),r===!1&&(e=t("#hmenu > ul > li").first()),o=n=e.width(),i=s=e.position().left,l.css("width",n),l.css("left",s),t("#hmenu > ul > li").hover(function(){e=t(this),n=e.width(),s=e.position().left,l.css("width",n),l.css("left",s)},function(){l.css("left",i),l.css("width",o)})})})}(jQuery),$(function(){$(".tab__control-link").on("click",function(t){t.preventDefault();var e=$(this).closest(".tab__controls-item"),n=$(".tab__item"),i=e.data("class");n.filter(".tab__item_"+i).add(e).addClass("active").siblings().removeClass("active")})}),$(function(){$(".tab__control-link").on("click",function(t){t.preventDefault();var e=$(this).closest(".tab__controls-item"),n=$(".tab__item"),i=e.data("class");n.filter(".tab__item_"+i).add(e).addClass("active").siblings().removeClass("active")})}),$(document).ready(function(){$("#top__slider-01").bxSlider({mode:"fade",buildPager:function(t){switch(t){case 0:return"сайт-визитка";case 1:return"одностраничный сайт";case 2:return"корпоративный сайт";case 3:return"сайт-каталог";case 4:return"интернет-магазин"}}})}),$(document).ready(function(){$("#top__slider-02").bxSlider({mode:"fade",buildPager:function(t){switch(t){case 0:return"SEO";case 1:return"одностраничный сайт";case 2:return"корпоративный сайт";case 3:return"сайт-каталог";case 4:return"интернет-магазин"}}})}),$(document).ready(function(){$("#top__slider-03").bxSlider({mode:"fade",buildPager:function(t){switch(t){case 0:return"дизайн";case 1:return"одностраничный сайт";case 2:return"корпоративный сайт";case 3:return"сайт-каталог";case 4:return"интернет-магазин"}}})}),$(document).ready(function(){$("#top__slider-04").bxSlider({mode:"fade",buildPager:function(t){switch(t){case 0:return"поддержка";case 1:return"администрирование";case 2:return"корпоративный сайт";case 3:return"сайт-каталог";case 4:return"интернет-магазин"}}})}),$(function(){$(".rocket-planet").on("mouseover",function(t){t.preventDefault();var e=$(this).closest(".rocket-planet"),n=$(".rocket__item"),i=e.data("class");n.filter(".rocket__item_"+i).add(e).addClass("active").siblings().removeClass("active")})}),$(document).ready(function(){$("#aboutus__slider").bxSlider({mode:"fade",pager:!1,auto:!0})}),$(".pagination__item").click(function(t){t.preventDefault(),$(".pagination__item").removeClass("active"),$(this).addClass("active")}),$(".lastworks__item").animated("zoomIn","fadeOut"),$(".blog__item").animated("flipInX","fadeOut");