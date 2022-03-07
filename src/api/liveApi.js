import request from '@/utils/request'

export default class LiveApi {
    // 获取实时销售额榜
    static getLiveRealMoneys = (params) => request({url: '/live/real/LiveRealMoney', method:'get', params});

    // 获取实时销量榜
    static getLiveRealSaves = (params) => request({url: '/live/real/LiveRealSaves', method:'get', params});

    // 获取实时观看榜
    static getLiveRealView = (params) => request({url: '/live/real/LiveRealView', method:'get', params});

    // 获取实时点赞榜
    static getLiveRealPraise = (params) => request({url: '/live/real/LiveRealPraise', method:'get', params});

    // 获取实时粉丝榜
    static getLiveRealFans = (params) => request({url: '/live/real/LiveRealFans', method:'get', params});

    // 获取大屏数据
    static getLiveRealBigScreen = (params) => request({url: '/live/real/detail/LiveRealBigScreen', method:'get', params});

    // 获取爆款直播间
    static getLiveHotRoom = (params) => request({url: '/live/room/LiveHotRoom', method:'get', params});

    // 获取爆款直播间历史直播数据
    static getLiveHotRoomHistory = (params) => request({url: '/live/room/LiveHotRoomHistory', method:'get', params});

    // 获取带货直播榜
    static getLiveSalesRank = (params) => request({url: '/live/sale/LiveSalesRank', method:'get', params});

    // 获取品牌自播榜
    static getLiveBrandRank = (params) => request({url: '/live/brand/LiveBrandRooms', method:'get', params});

    // 获取热门商品榜
    static getLiveProductSaleRank = (params) => request({url: '/live/product/LiveProductSaleRank', method:'get', params});

    // 获取直播带货详情左侧信息
    static getLiveSalesDetailLeftInfo = (params) => request({url: '/live/sale/detail/LiveSalesDetailLeftInfo', method:'get', params});

    // 获取直播带货详情统计图表
    static getLiveSalesDetailTotalCount = (params) => request({url: '/live/sale/detail/LiveSalesDetailTotalCount', method:'get', params});

    // 获取爆款直播间左侧信息
    static getLiveHotRoomDetailLeftInfo = (params) => request({url: '/live/room/detail/LiveHotRoomDetailLeftInfo', method:'get', params});

    // 获取爆款直播间统计图表
    static getLiveHotRoomDetailTotalCount = (params) => request({url: '/live/room/detail/LiveHotRoomDetailTotalCount', method:'get', params});

    // 获取品牌自播左侧信息
    static getLiveBrandDetailLeftInfo = (params) => request({url: '/live/brand/detail/LiveBrandDetailLeftInfo', method:'get', params});

    // 获取品牌新增信息
    static LiveBrandDetailNewData = (params) => request({url: '/live/brand/detail/LiveBrandDetailNewData', method:'get', params});

    // 获取飙升视频榜
    static getLiveVideoHot = (params) => request({url: '/live/video/LiveVideoHot', method:'get', params});

    // 获取爆款直播详情图表统计流量来源总数据
    static getLiveHotRoomDetailTotalCountFlowTotal = (params) => request({url: '/live/room/detail/LiveHotRoomDetailTotalCountFlowTotal', method:'get', params});

    // 获取爆款直播详情图表统计流量来源总数据
    static getLiveHotRoomDetailTotalCountFlow = (params) => request({url: '/live/room/detail/LiveHotRoomDetailTotalCountFlow', method:'get', params});

    // 获取热门商品详情
    static getLiveProductDetailLeftInfo = (params) => request({url: '/live/product/detail/getLiveProductDetailLeftInfo', method:'get', params});

    // 获取热门商品统计
    static getLiveProductDetailTopTotalCount = (params) => request({url: '/live/product/detail/LiveProductDetailTopTotalCount', method:'get', params});

    // 获取品牌详情带货信息
    static getLiveBrandDetailLeftSaleInfo = (params) => request({url: '/live/brand/detail/LiveBrandDetailLeftSaleInfo', method:'get', params});

    // 获取品牌详情新增信息
    static getLiveBrandDetailNewData = (params) => request({url: '/live/brand/detail/LiveBrandDetailNewData', method:'get', params});

    // 获取品牌详情商品占比
    static getLiveBrandDetailProductPercent = (params) => request({url: '/live/brand/detail/LiveBrandDetailProductPercent', method:'get', params});

    // 获取品牌详情统计图表
    static getLiveBrandDetailTotalCount = (params) => request({url: '/live/brand/detail/LiveBrandDetailTotalCount', method:'get', params});

    // 获取热门商品统计图表上
    static getLiveProductDetailTopTotalCount = (params) => request({url: '/live/product/detail/LiveProductDetailTopTotalCount', method:'get', params});

    // 获取热门商品统计图表下
    static getLiveProductDetailDownTotalCount = (params) => request({url: '/live/product/detail/LiveProductDetailDownTotalCount', method:'get', params});

    // 获取飙升视频详细信息
    static getLiveVideoDetailLeftInfo = (params) => request({url: '/live/video/detail/LiveVideoDetailLeftInfo', method:'get', params});

    // 获取飙升视频统计图表
    static getLiveVideoDetailTotalCount = (params) => request({url: '/live/video/detail/LiveVideoDetailTotalCount', method:'get', params});
    // 获取热门商品新增信息
    static getLiveProductDetailNewData = (params) => request({url: '/live/product/detail/LiveProductDetailNewData', method:'get', params});

}
