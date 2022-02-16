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
}