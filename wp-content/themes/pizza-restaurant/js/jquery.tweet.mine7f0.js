/**
 * @package 	WordPress
 * @subpackage 	Pizza Restaurant
 * @version 	1.0.0
 */


// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2012 Todd Matthews & Steve Purcell
// Modified by Stan Scates for https://github.com/StanScates/Tweet.js-Mod


(function(e){"use strict";if(typeof define==="function"&&define.amd)define(["jquery"],e);else e(jQuery)})(function(e){"use strict";e.fn.tweet=function(t){function i(e,t){if(typeof e==="string"){var n=e;for(var r in t){var i=t[r];n=n.replace(new RegExp("{"+r+"}","g"),i===null?"":i)}return n}else return e(t)}function s(t,n){return function(){var r=[];this.each(function(){r.push(this.replace(t,n))});return e(r)}}function o(e){return e.replace(/</g,"<").replace(/>/g,"^>")}function u(e,t){return e.replace(r,function(e){var n=/^[a-z]+:/i.test(e)?e:"http://"+e;var r=e;for(var i=0;i<t.length;++i){var s=t[i];if(s.url==n&&s.expanded_url){n=s.expanded_url;r=s.display_url;break}}return'<a href="'+o(n)+'">'+o(r)+"</a>"})}function a(e){return Date.parse(e.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3"))}function f(e){var t=arguments.length>1?arguments[1]:new Date;var n=parseInt((t.getTime()-e)/1e3,10);var r="";if(n<1){r="just now"}else if(n<60){r=n+" seconds ago"}else if(n<120){r="about a minute ago"}else if(n<45*60){r="about "+parseInt(n/60,10).toString()+" minutes ago"}else if(n<2*60*60){r="about an hour ago"}else if(n<24*60*60){r="about "+parseInt(n/3600,10).toString()+" hours ago"}else if(n<48*60*60){r="about a day ago"}else{r="about "+parseInt(n/86400,10).toString()+" days ago"}return r}function l(e){if(e.match(/^(@([A-Za-z0-9-_]+)) .*/i)){return n.auto_join_text_reply}else if(e.match(r)){return n.auto_join_text_url}else if(e.match(/^((\w+ed)|just) .*/im)){return n.auto_join_text_ed}else if(e.match(/^(\w*ing) .*/i)){return n.auto_join_text_ing}else{return n.auto_join_text_default}}function c(){var t=n.modpath,r=n.fetch===null?n.count:n.fetch,i={include_entities:1};if(n.list){return{host:n.twitter_api_url,url:"/1.1/lists/statuses.json",parameters:e.extend({},i,{list_id:n.list_id,slug:n.list,owner_screen_name:n.username,page:n.page,count:r,include_rts:n.retweets?1:0})}}else if(n.favorites){return{host:n.twitter_api_url,url:"/1.1/favorites/list.json",parameters:e.extend({},i,{list_id:n.list_id,screen_name:n.username,page:n.page,count:r})}}else if(n.query===null&&n.username.length===1){return{host:n.twitter_api_url,url:"/1.1/statuses/user_timeline.json",parameters:e.extend({},i,{screen_name:n.username,page:n.page,count:r,include_rts:n.retweets?1:0})}}else{var s=n.query||"from:"+n.username.join(" OR from:");return{host:n.twitter_search_url,url:"/1.1/search/tweets.json",parameters:e.extend({},i,{q:s,rpp:r})}}}function h(e,t){if(t){return"user"in e?e.user.profile_image_url_https:h(e,false).replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//,"https://s3.amazonaws.com/twitter_production/")}else{return e.profile_image_url||e.user.profile_image_url}}function p(t){var r={};r.item=t;if(e.isArray(r.item)&&r.item[0].code===88){r.avatar=r.join=r.time="";r.text='<em>'+r.item[0].message+'</em>';return r}r.source=t.source;r.name=t.from_user_name||t.user.name;r.screen_name=t.from_user||t.user.screen_name;r.avatar_size=n.avatar_size;r.avatar_url=h(t,document.location.protocol==="https:");r.retweet=typeof t.retweeted_status!="undefined";r.tweet_time=a(t.created_at);r.join_text=n.join_text=="auto"?l(t.text):n.join_text;r.tweet_id=t.id_str;r.twitter_base="http://"+n.twitter_url+"/";r.user_url=r.twitter_base+r.screen_name;r.tweet_url=r.user_url+"/status/"+r.tweet_id;r.reply_url=r.twitter_base+"intent/tweet?in_reply_to="+r.tweet_id;r.retweet_url=r.twitter_base+"intent/retweet?tweet_id="+r.tweet_id;r.favorite_url=r.twitter_base+"intent/favorite?tweet_id="+r.tweet_id;r.retweeted_screen_name=r.retweet&&t.retweeted_status.user.screen_name;r.tweet_relative_time=f(r.tweet_time);r.entities=t.entities?(t.entities.urls||[]).concat(t.entities.media||[]):[];r.tweet_raw_text=r.retweet?"RT @"+r.retweeted_screen_name+" "+t.retweeted_status.text:t.text;r.tweet_text=e([u(r.tweet_raw_text,r.entities)]).linkUser().linkHash()[0];r.tweet_text_fancy=e([r.tweet_text]).makeHeart()[0];r.user=i('<a class="tweet_user" href="{user_url}">{screen_name}</a>',r);r.join=n.join_text?i(' <span class="tweet_join">{join_text}</span> ',r):" ";r.avatar=r.avatar_size?i('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>',r):"";r.time=i('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>',r);r.text=i('<span class="tweet_text">{tweet_text_fancy}</span>',r);r.reply_action=i('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>',r);r.retweet_action=i('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>',r);r.favorite_action=i('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>',r);return r}var n=e.extend({modpath:"/twitter/",username:null,list_id:null,list:null,favorites:false,query:null,avatar_size:null,count:3,fetch:null,page:1,retweets:true,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"api.twitter.com",template:"{avatar}{time}{join}{text}",comparator:function(e,t){return t["tweet_time"]-e["tweet_time"]},filter:function(e){return true}},t);var r=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;e.extend({tweet:{t:i}});e.fn.extend({linkUser:s(/(^|[\W])@(\w+)/gi,'$1<span class="at">@</span><a href="http://'+n.twitter_url+'/$2">$2</a>'),linkHash:s(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,' <a href="http://'+n.twitter_search_url+"/search?q=&tag=$1&lang=all"+(n.username&&n.username.length==1&&!n.list?"&from="+n.username.join("%2BOR%2B"):"")+'" class="tweet_hashtag">#$1</a>'),makeHeart:s(/(<)+[3]/gi,"<tt class='heart'>&#x2665;</tt>")});return this.each(function(t,r){var s=e('<ul class="tweet_list">');var o='<p class="tweet_intro">'+n.intro_text+"</p>";var u='<p class="tweet_outro">'+n.outro_text+"</p>";var a=e('<p class="loading">'+n.loading_text+"</p>");if(n.username&&typeof n.username=="string"){n.username=[n.username]}e(r).unbind("tweet:load").bind("tweet:load",function(){if(n.loading_text)e(r).empty().append(a);e.ajax({dataType:"json",type:"post",async:false,url:n.modpath||"/twitter/",data:{request:c()},success:function(t,a){if(t.message){console.log(t.message)}var f=t.response;e(r).empty().append(s);if(n.intro_text)s.before(o);s.empty();if(f.statuses!==undefined){resp=f.statuses}else if(f.results!==undefined){resp=f.results}else{resp=f}var l=e.map(resp,p);l=e.grep(l,n.filter).sort(n.comparator).slice(0,n.count);s.append(e.map(l,function(e){return"<li>"+i(n.template,e)+"</li>"}).join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd");if(n.outro_text)s.after(u);e(r).trigger("loaded").trigger(l?"empty":"full");if(n.refresh_interval){window.setTimeout(function(){e(r).trigger("tweet:load")},1e3*n.refresh_interval)}}})}).trigger("tweet:load")})}});

