(function(a) {
    function resumo(str, size){
            if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
                return str;
            }
            var shortText = str;
            if(str.length >= size+3){
                shortText = str.substring(0, size).concat('...');
            }
            return shortText;
        } 
        
    function b(a) {
        return a.replace(/[&<>"'`=\/]/g, function(a) {
            return e[a]
        })
    }
    var c = {
            host: "https://www.instagram.com/",
            username: "",
            tag: "",
            container: "",
            display_profile: !0,
            display_biography: !0,
            display_gallery: !0,
            display_igtv: !1,
            callback: null,
            styling: !0,
            items: 8,
            items_per_row: 4,
            margin: .5,
            image_size: 640,
            lazy_load: !1
        },
        d = {
            150: 0,
            240: 1,
            320: 2,
            480: 3,
            640: 4
        },
        e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
    a.instagramFeed = function(e) {
        var f = a.fn.extend({}, c, e);
        if ("" == f.username && "" == f.tag) return console.error("Instagram Feed: Error, no username or tag found."), !1;
        if ("undefined" != typeof f.get_raw_json && console.warn("Instagram Feed: get_raw_json is deprecated. Leave options.container undefined instead of setting options.get_raw_json to true"), "undefined" != typeof f.get_data && console.warn("Instagram Feed: options.get_data is deprecated. Leave options.container undefined instead of setting options.get_data to true"), null == f.callback && "" == f.container) return console.error("Instagram Feed: Error, neither container found nor callback defined."), !1;
        var g = "" == f.username,
            h = g ? f.host + "explore/tags/" + f.tag + "/" : f.host + f.username + "/";
        return a.get(h, function(c) {
            try {
                c = c.split("window._sharedData = ")[1].split("</script>")[0]
            } catch (a) {
                return void console.error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26")
            }
            if (c = JSON.parse(c.substr(0, c.length - 1)), c = c.entry_data.ProfilePage || c.entry_data.TagPage, "undefined" == typeof c) return void console.error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25");
            if (c = c[0].graphql.user || c[0].graphql.hashtag, "" != f.container) {
                var e = {
                    profile_container: "",
                    profile_image: "",
                    profile_name: "",
                    profile_biography: "",
                    gallery_image: ""
                };
                if (f.styling) {
                    e.profile_container = " style='text-align:center;'", e.profile_image = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'", e.profile_name = " style='font-size:1.2em;'", e.profile_biography = " style='font-size:1em;'";
                    var h = (100 - 2 * f.margin * f.items_per_row) / f.items_per_row;
                    e.gallery_image = " style='margin:" + f.margin + "% " + f.margin + "%;width:" + h + "%;float:left;'"
                }
                var j = "";
                f.display_profile && (j += "<div class='instagram_profile'" + e.profile_container + ">", j += "<img class='instagram_profile_image' src='" + c.profile_pic_url + "' alt='" + (g ? c.name + " tag pic" : c.username + " profile pic") + "'" + e.profile_image + (f.lazy_load ? " loading='lazy'" : "") + " />", j += g ? "<p class='instagram_tag'" + e.profile_name + "><a href='https://www.instagram.com/explore/tags/" + f.tag + "' rel='noopener' target='_blank'>#" + f.tag + "</a></p>" : "<p class='instagram_username'" + e.profile_name + ">@" + c.full_name + " (<a href='https://www.instagram.com/" + f.username + "' rel='noopener' target='_blank'>@" + f.username + "</a>)</p>", !g && f.display_biography && (j += "<p class='instagram_biography'" + e.profile_biography + ">" + c.biography + "</p>"), j += "</div>");
                
                var k = "undefined" == typeof d[f.image_size] ? d[640] : d[f.image_size];
                
                if (f.display_gallery)
                    if ("undefined" != typeof c.is_private && !0 === c.is_private) j += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                    else {
                        var l = (c.edge_owner_to_timeline_media || c.edge_hashtag_to_media).edges;
                        s = l.length > f.items ? f.items : l.length, j += "<div class='instagram_gallery'>";
                        for (var m = 0; m < s; m++) {
                            var n, o, p, q = "https://www.instagram.com/p/" + l[m].node.shortcode;
                            switch (l[m].node.__typename) {
                                case "GraphSidecar":
                                    o = "sidecar", n = l[m].node.thumbnail_resources[k].src;
                                    break;
                                case "GraphVideo":
                                    o = "video", n = l[m].node.thumbnail_src;
                                    break;
                                default:
                                    o = "image", n = l[m].node.thumbnail_resources[k].src;
                            }
                            p = "undefined" != typeof l[m].node.edge_media_to_caption.edges[0] 
                            && "undefined" != typeof l[m].node.edge_media_to_caption.edges[0].node 
                            && "undefined" != typeof l[m].node.edge_media_to_caption.edges[0].node.text 
                            && null !== l[m].node.edge_media_to_caption.edges[0].node.text 
                            ? l[m].node.edge_media_to_caption.edges[0].node.text : "undefined" 
                            != typeof l[m].node.accessibility_caption && null !== l[m].node.accessibility_caption 
                            ? l[m].node.accessibility_caption : (g ? c.name : c.username) + " image " 
                            + m, j += "<div id='int' class='col-sm-6 col-lg-3 col-md-3'><a href='" + q + "' target='_blank'>"
                            , j += "<img" + (f.lazy_load ? " loading='lazy'" : "") + " src='" + n 
                            + "' alt='" + b(p) + "' />", j += "</a><p>" + resumo(b(p),180) +"</p></div>"
                        }
                        j += "</div>"
                    } if (f.display_igtv && "undefined" != typeof c.edge_felix_video_timeline) {
                    var r = c.edge_felix_video_timeline.edges,
                        s = r.length > f.items ? f.items : r.length;
                    if (0 < r.length) {
                        j += "<div class='instagram_igtv'>";
                        for (var m = 0; m < s; m++) j += "<a href='https://www.instagram.com/p/" + r[m].node.shortcode + "' rel='noopener' target='_blank'>", j += "<img" + (f.lazy_load ? " loading='lazy'" : "") + " src='" + r[m].node.thumbnail_src + "' alt='" + f.username + " instagram image " + m + "'" + e.gallery_image + " />", j += "</a>";
                        j += "</div>"
                    }
                }
                a(f.container).html(j)
            }
            null != f.callback && f.callback(c)
        }).fail(function(a) {
            console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ", a.status)
        }), !0
    }
})(jQuery);
