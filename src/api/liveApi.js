import request from '@/utils/request'

export default class LiveApi {
    // 获取实时销售额榜
    static getLiveRealMoneys = (params) => request({url: '/live/list/LiveRealMoney', method:'get', params});

    // 获取实时销量榜
    static getLiveRealSaves = (params) => request({url: '/live/list/LiveRealSaves', method:'get', params});

    // 获取实时观看榜
    static getLiveRealView = (params) => request({url: '/live/list/LiveRealView', method:'get', params});

    // 获取实时点赞榜
    static getLiveRealPraise = (params) => request({url: '/live/list/LiveRealPraise', method:'get', params});

    // 获取实时粉丝榜
    static getLiveRealFans = (params) => request({url: '/live/list/LiveRealFans', method:'get', params});

    // 获取大屏数据
    static getLiveRealBigScreen = (params) => request({url: '/live/list/LiveRealBigScreen', method:'get', params});

    // 获取爆款直播间
    static getLiveHotRoom = (params) => request({url: '/live/list/LiveHotRoom', method:'get', params});

    // 获取爆款直播间历史直播数据
    static getLiveHotRoomHistory = (params) => request({url: '/live/list/LiveHotRoomHistory', method:'get', params});

    // 获取带货直播榜
    static getLiveSalesRank = (params) => request({url: '/live/list/LiveSalesRank', method:'get', params});

    // 获取品牌自播榜
    static getLiveBrandRank = (params) => request({url: '/live/list/LiveBrandRooms', method:'get', params});

    // 获取热门商品榜
    static getLiveProductSaleRank = (params) => request({url: '/live/list/LiveProductSaleRank', method:'get', params});

    // 获取直播带货详情左侧信息
    static getLiveSalesDetailLeftInfo = (params) => request({url: '/live/list/LiveSalesDetailLeftInfo', method:'get', params});

    // 获取直播带货详情统计图表
    static getLiveSalesDetailTotalCount = (params) => request({url: '/live/list/LiveSalesDetailTotalCount', method:'get', params});

    // 获取爆款直播间左侧信息
    static getLiveHotRoomDetailLeftInfo = (params) => request({url: '/live/list/LiveHotRoomDetailLeftInfo', method:'get', params});

    // 获取爆款直播间统计图表
    static getLiveHotRoomDetailTotalCount = (params) => request({url: '/live/list/LiveHotRoomDetailTotalCount', method:'get', params});

    // 获取品牌自播左侧信息
    static getLiveBrandDetailLeftInfo = (params) => request({url: '/live/list/LiveBrandDetailLeftInfo', method:'get', params});

    // 获取品牌新增信息
    static LiveBrandDetailNewData = (params) => request({url: '/live/list/LiveBrandDetailNewData', method:'get', params});

    // 获取飙升视频榜
    static getLiveVideoHot = (params) => request({url: '/live/list/LiveVideoHot', method:'get', params});

    // 获取爆款直播详情图表统计流量来源总数据
    static getLiveHotRoomDetailTotalCountFlowTotal = (params) => request({url: '/live/list/LiveHotRoomDetailTotalCountFlowTotal', method:'get', params});

    // 获取爆款直播详情图表统计流量来源总数据
    static getLiveHotRoomDetailTotalCountFlow = (params) => request({url: '/live/list/LiveHotRoomDetailTotalCountFlow', method:'get', params});

    // 获取热门商品详情
    static getLiveProductDetailLeftInfo = (params) => request({url: '/live/list/getLiveProductDetailLeftInfo', method:'get', params});

    // 获取热门商品统计
    static getLiveProductDetailTopTotalCount = (params) => request({url: '/live/list/LiveProductDetailTopTotalCount', method:'get', params});

    // 获取品牌详情带货信息
    static getLiveBrandDetailLeftSaleInfo = (params) => request({url: '/live/list/LiveBrandDetailLeftSaleInfo', method:'get', params});

    // 获取品牌详情新增信息
    static getLiveBrandDetailNewData = (params) => request({url: '/live/list/LiveBrandDetailNewData', method:'get', params});

    // 获取品牌详情商品占比
    static getLiveBrandDetailProductPercent = (params) => request({url: '/live/list/LiveBrandDetailProductPercent', method:'get', params});

    // 获取品牌详情统计图表
    static getLiveBrandDetailTotalCount = (params) => request({url: '/live/list/LiveBrandDetailTotalCount', method:'get', params});



    // 获取爆款直播间统计图表
    // static getLiveHotRoomDetailTotalCount = (params) => request({url: '/live/list/LiveHotRoomDetailTotalCount', method:'get', params});
}
