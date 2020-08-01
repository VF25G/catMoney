<template>
  <Layout>
    <div class="wrapper">
      <header><span>报表</span></header>
      <div class="chart">
        <Types/>
        <div id="figure"></div>
      </div>
      <ol class="subItems">
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
        <li>
          <TagsItems icon-name="food"/>
          <span>餐饮 80%</span><span>¥500</span></li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import echarts from 'echarts';
  import Types from '@/components/Money/Types.vue';
  import TagsItems from '@/components/Money/TagsItems.vue';

  @Component({
    components: {TagsItems, Types}
  })
  export default class Report extends Vue {
    mounted() {
      this.draw();
    }

    draw() {
      const figure = echarts.init(document.getElementById('figure') as HTMLDivElement);
      figure.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: ¥{c}'
        },
        series: [
          {
            name: '详细',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              formatter: function (data: any) {
                return data.name + data.percent.toFixed(0) + '%';
              },
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              padding: [2, 4],
              rich: {
                b: {
                  fontSize: 10,
                  lineHeight: 12
                },
                per: {
                  fontSize: 10
                }
              }
            },
            data: [
              {value: 335, name: '餐饮'},
              {value: 310, name: '烟酒'},
              {value: 234, name: '住房'},
              {value: 335, name: '餐饮'},
              {value: 310, name: '烟酒'},
            ]
          }
        ]
      });
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 54px);

    header {
      text-align: center;
      font-size: 20px;
      color: #8A2E1A;
      background: #FFE7E4;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .chart {
      box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);

      #figure {
        width: 100%;
        height: 180px;
      }
    }

    .subItems {
      overflow: auto;

      > li {
        display: flex;
        align-items: center;
        padding-right: 16px;
        font-weight: bold;

        span:nth-child(2) {
          margin-right: auto;
        }
        span:nth-child(3) {
          color: #FF736D;
        }
      }
    }
  }

  ::v-deep {
    .typesWrapper {
      .types {
        li {
          margin-top: 0;
        }
      }
    }

    .tagsItems {
      .circleIcon {
        background: #FF736D;

        .icon {
          color: #FFFFFF;
        }
      }
    }
  }
</style>