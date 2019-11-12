import superagent from "superagent";
export default {
    saveRecentOrder(data) {
        return superagent.post('/api/recentOrder/save').send({
           'shopify_domain': domain,
           'background': data.backgroundColor,
           'product_name_color': data.productNameColor,
           'customer_name_color': data.customerColor,
           'purchasing_time': data.purchasingColor,
           'text_color': data.textColor,
           'text_font': data.textFont,
           'product_name_style': data.productStyle,
           'customer_name_style': data.customerStyle,
           'text_style': data.textStyle, 
           'position': data.position, 
           'product_name_font': data.productFont,
           'content': data.contentDisplay, 
           'time_to_display': data.timeToDisplay,
           'repeat': data.timeAmong,
           'places_to_display': data.placesDisplay.toString(), 
           'order_to_display': data.orderDisplay,
           'active': data.active,
        });
    },

    saveRecentVistors(data){
        return superagent.post('/api/recentVisitors/save').send({
            'shopify_domain': domain,
            'text_color': data.textColor,
            'quantity_color': data.quantityColor,
            'style': data.fontWeight,
            'font': data.fontStyle,
            'content': data.content,
            'time_to_display': data.timeToDisplay,
            'repeat': data.timeAmong,
            'active': data.active,
        });
    },
    saveStockTracking(data){
        return superagent.post('/api/stockTracking/save').send({
            'shopify_domain': domain,
            'stock_quantity': data.stock,
            'background_color': data.backgroundColor,
            'text_color': data.textColor,
            'quantity_color': data.quantityColor,
            'content': data.content,
            'active': data.active,
        });
    },  
    getOrderSetup(){
        return superagent.post('/api/recentOrder/getSetting').send({
            'shopify_domain': domain,
        });
    },

    getVisitor(){
        return superagent.post('/api/recentVisitors/getSetting').send({
            'shopify_domain': domain,
        });
    },
    
    getStockTracking(){
        return superagent.post('/api/stockTracking/getSetting').send({
            'shopify_domain': domain,
        });
    },

    getEmailShopOwner(){
        return superagent.post('/api/getEmail').send({
            'shopify_domain': domain,  
        });
    },
    sendSupportEmail(data){
        return superagent.post('/api/sendEmail').send({
            'email': data.emailFieldValue,
            'message':data.messageFieldValue,
            'subject':data.subjectFieldValue,
        });
    },  
}