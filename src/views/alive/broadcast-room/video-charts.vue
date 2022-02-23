<template>
  <div id="video-charts" style="height: 300px"></div>
</template>

<script>
import LiveApi from "@/api/liveApi";
import * as echarts from "echarts";
import { toDate } from "./config";
export default {
  props: {
    liveId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted() {
    LiveApi.getLiveHotRoomDetailTotalCountFlow({
      liveId: this.liveId,
    }).then((res) => {
      const data = {
        date: [],
        viewerFromCity: [], // 	同城
        viewerFromFollower: [], // 	粉丝
        viewerFromOther: [], // 其他
        viewerFromVideo: [] // 视频
      }
      for (const key in res.data) {
        data.date.push(toDate(key, true));
        data.viewerFromCity.push(res.data[key].viewerFromCity * 100);
        data.viewerFromFollower.push(res.data[key].viewerFromFollower * 100);
        data.viewerFromOther.push(res.data[key].viewerFromOther * 100);
        data.viewerFromVideo.push(res.data[key].viewerFromVideo * 100);
      }
      this.createChart(data);
    });
  },
  methods: {
    createChart(data) {
      var chartDom = document.getElementById("video-charts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["同城", "粉丝", "视频推荐", "其他"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.date,
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: "同城",
            type: "line",
            smooth: true,
            data: data.viewerFromCity,
          },
          {
            name: "粉丝",
            type: "line",
            smooth: true,
            data: data.viewerFromFollower,
          },
          {
            name: "视频推荐",
            type: "line",
            smooth: true,
            data: data.viewerFromVideo,
          },
          {
            name: "其他",
            type: "line",
            smooth: true,
            data: data.viewerFromOther,
          }
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>