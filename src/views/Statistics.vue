<template>
  <Layout>
    <header class="headerInfo">
      <div class="monthlyTotal">
        <span>本月支出</span>
        <span>¥100000</span>
        <span>本月收入：¥10000</span>
      </div>
      <div class="appName"><div>猫咪</div><div>记账</div></div>
    </header>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <!--    <div class="chart-wrapper" ref="chartWrapper">-->
    <!--      <Chart class="chart" :options="chartOptions"/>-->
    <!--    </div>-->
    <ol v-if="groupedList.length>0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h4 class="title">{{beautify(group.title)}} <span>¥{{group.total}}</span></h4>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span class="tags">{{item.tags}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>¥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      <h4>目前没有相关记录</h4>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import Chart from '@/components/Chart.vue';
  import dayjs from 'dayjs';
  import day from 'dayjs';
  import clone from '@/lib/clone';
  import _ from 'lodash';

  @Component({
    components: {Tabs, Types, Chart}
  })
  export default class Statistics extends Vue {
    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (dayjs(string).isSame(now, 'day')) {
        return '今天';
      } else if (dayjs(string).isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (dayjs(string).isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get keyValueList() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      console.log(array);
      console.log(this.recordList.map(r => _.pick(r, ['createdAt', 'amount'])));
      return array;
    }

    get chartOptions() {

      const keys = this.keyValueList.map(item => item.key);
      const values = this.keyValueList.map(item => item.value);
      return {
        grid: {
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string) {
              return value.substr(5);
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbolSize: 12,
          symbol: 'circle',
          itemStyle: {borderWidth: 1, color: '#666'},
          data: values,
          type: 'line'
        }],
        tooltip: {
          show: true,
          triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }
      };
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;

      const sortList = clone(recordList)
        .filter(record => record.type === this.type)
        .sort((leftRecord, rightRecord) => dayjs(rightRecord.createdAt).valueOf() - dayjs(leftRecord.createdAt).valueOf());
      if (sortList.length === 0) { return []; }
      type Result = { title: string; total?: number; items: RecordItem[] }[];
      const result: Result = [{title: dayjs(sortList[0].createdAt).format('YYYY-MM-DD'), items: [sortList[0]]}];
      for (let i = 1; i < sortList.length; i++) {
        const current = sortList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
  .headerInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #FFD7D3;
    .monthlyTotal {
      display: flex;
      flex-direction: column;
      padding: 20px 0 0 20px;


      span:first-child {
        font-size: 16px;
        color: #C69086;
      }

      span:nth-child(2) {
        font-size: 36px;
        font-weight: bold;
        color: #8A2E1A;
      }

      span:nth-child(3) {
        font-size: 14px;
        color: #C69086;
      }
    }
    .appName {
      //border: 1px solid red;
      padding-top: 12px;
      padding-right: 14px;
      color: #C69086;
      font-size: 36px;
      z-index: 1;
    }
  }

  h4 {
    font-weight: bold;

    span {
      color: #FF736D;
    }
  }

  ol {
    position: relative;
    background: white;

    li::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50px;
      width: 80%;
      height: 1px;
      background: #DFDFDF;
    }

    li > span:nth-child(3) {
      color: #FF736D;
    }
  }

  .noResult {
    padding: 16px;
    text-align: center;
  }

  ::v-deep {
    .type-tabs-item {
      background: #FFD7D3;

      &.selected {
        background: #FFD7D3;
        color: #8A2E1A;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {;
    background: white;
    @extend %item;
  }

  .tags {
    white-space: nowrap;
  }

  .notes {
    margin-right: auto;
    margin-left: 8px;
    color: #999999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .chart {
    width: 430%;

    &-wrapper {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>