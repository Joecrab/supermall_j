import {request} from './request.js';

export function getDetailData(iid){
    return request({
        url:'/detail',
        params: {
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url: '/recommend'
    })
}

export class GoodInfo {
    constructor(itemInfo, columns, services, skuInfo){
        this.itemInfo = itemInfo;
        this.columns = columns;
        this.services = services;
        this.desc = itemInfo.desc;
        this.highNowPrice = itemInfo.highNowPrice;
        this.highPrice = itemInfo.highPrice;
        this.discountDesc = itemInfo.discountDesc;
        this.discountBgColor = itemInfo.discountBgColor;
        this.skuInfo = skuInfo;
        this.title = skuInfo.title;
    }
}

export class ShopInfo {
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.score = shopInfo.score;
        this.sells = shopInfo.cSells;
        this.goodcount = shopInfo.cGoods;
    }
}

export class GoodsParams {
    constructor(info, rule){
        this.set = info.set;
        this.tables = rule.tables;
    }
}