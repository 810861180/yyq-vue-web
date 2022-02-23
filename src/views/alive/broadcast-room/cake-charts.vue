<template>
  <div id="cake-charts" style="width: 340px; height: 300px"></div>
</template>

<script>
import LiveApi from "@/api/liveApi";
import * as echarts from "echarts";
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
    LiveApi.getLiveHotRoomDetailTotalCountFlowTotal({
      liveId: this.liveId,
    }).then((res) => {
      this.createChart(res.data);
    });
  },
  methods: {
    createChart(data) {
      var chartDom = document.getElementById("cake-charts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `${params.name}:(${params.value * 100})%`;
          },
        },
        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            data: [
              { value: data.viewerFromCity, name: "同城" },
              { value: data.viewerFromFollower, name: "粉丝" },
              { value: data.viewerFromOther, name: "其他" },
              { value: data.viewerFromVideo, name: "视频" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>