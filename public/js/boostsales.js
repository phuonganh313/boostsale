const domain = window.location.host;
BoostSales = new Object({});
BoostSales.getSettings = function() {
    return $.ajax({
        url:"https://boostsales.happypoints.io/api/getSetting",
        dataType: 'json', 
        type : 'POST',
        data: { 'domain' : domain },
        success:function(json){
            return json;
        },
    });
};
        
var settings = BoostSales.getSettings(); 
$.when(settings).done(function(settings){  
    const settingStock = settings.data.setting.stock_tracking_setup;
    const settingVisitor = settings.data.setting.recent_visitors_setup;
    renderContentStock(settingStock);
    setInterval(function(){
        renderPopupOrder(settings)
    }
    , settings.data.setting.recent_order_setup.repeat * 1000);
    renderContentVisitor(settingVisitor)
    // setInterval(function(){
    //     renderContentVisitor(settingVisitor)
    // }
    // , settings.data.setting.recent_visitors_setup.repeat * 1000);
});

function renderPopupOrder(settings){
    const order = settings.data.order;
    var randOrder = order[Math.floor(Math.random() * order.length)];
    const settingOrder = settings.data.setting.recent_order_setup;
    
    $(".bs-img-product").attr('src', randOrder.product_img);
    $(".bs-content").append(renderContentOrder(settingOrder, randOrder));
    $(".bs-time").append("5 '"+lang.minutes_ago+"'");

    $(".bs-preview-order").css({"background-color": settingOrder.background})
    $(".bs-time").css({"color": settingOrder.purchasing_time})	
    $(".bs-pop-up").removeClass("bs-hide").fadeIn( "slow" );
    setTimeout(function(){
      $(".bs-pop-up").fadeOut(300)
      $(".bs-content").empty();
      $(".bs-time").empty();
    }, settingOrder.time_to_display * 1000);
};

function renderContentOrder(settingOrder, order){
    return settingOrder.content.replace("[[First Name]]", (settingOrder.content.indexOf("[[First Name]]") >= 0) ? "<span style='color: "+settingOrder.customer_name_color+" !important; font-family: "+settingOrder.customer_name_font+" !important; font-weight: "+settingOrder.customer_name_style+" !important;'>"+order.customer_name+"</span>" : "[[First Name]]")
      .replace("[[City]]",(settingOrder.content.indexOf("[[City]]") >= 0) ?  "<span class='content-address'>"+order.customer_address+"</span>" : "[[City]]")
      .replace("[[Product Name]]",(settingOrder.content.indexOf("[[Product Name]]") >= 0) ? "<span class='content-product-name' style='color: "+settingOrder.product_name_color+" !important; font-family: "+settingOrder.product_name_font+" !important; font-weight: "+settingOrder.product_name_style+" !important'>"+order.product_name+"</span>" : "[[Product Name]]");
};

function renderContentStock(settingStock){
    const content = settingStock.content.indexOf("[[Qty]]") >= 0 ? settingStock.content.replace("[[Qty]]", "<span style='color: "+settingStock.quantity_color+" !important;'>"+12+"</span>") : "[[Qty]]";
    $(".bs-stock-tracking").css({
        "background-color":settingStock.background_color
    });
    $("form[action='/cart/add']").before("<div class='bs-content-stock-tracking'>"+content+"</div>");
    // $(".bs-content-stock-tracking").append(content);

}

function renderContentVisitor(settingVisitor){
    $(".bs-visitor-content").css({
        "color":settingVisitor.text_color,
        "font-family":settingVisitor.font,
        "font-weight":settingVisitor.style
    });
    const randomNumber = Math.floor((Math.random() * 10) + 1)
    const content = settingVisitor.content.indexOf("[[Qty]]") >= 0 ? settingVisitor.content.replace("[[Qty]]", "<span style='color: "+settingVisitor.quantity_color+" !important;'>"+randomNumber+"</span>") : "[[Qty]]";
    $(".bs-content-stock-tracking").after("<div class='bs-visitor-content'></div>");
    $(".bs-visitor-content").append(content);
    // setTimeout(function(){
    //     $(".bs-visitor-content").empty();
    // }, settingVisitor.time_to_display * 1000);
}

