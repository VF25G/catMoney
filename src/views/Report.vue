<template>
  <Layout>
    <div class="wrapper">
      <header><span>报表</span></header>
      <template v-if="sortedTotal.length > 0">
        <div class="chart">
          <Types :value.sync="type"/>
          <div id="figure"></div>
        </div>
        <ol class="subItems">
          <li v-for="(item, index) in sortedTotal"
              :key="index">
            <TagsItems :icon-name="item.iconName" :class="moneyType(type)"/>
            <span>{{item.name}}</span><span :class="moneyType(type)">¥{{item.value}}</span>
          </li>
        </ol>
      </template>
      <div v-else class="noResult">
        <h4>没有相关记录</h4>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import echarts from 'echarts';
  import Types from '@/components/Money/Types.vue';
  import TagsItems from '@/components/Money/TagsItems.vue';
  import clone from '@/lib/clone';
  import {disburseTagsList, receiptTagsList} from '@/constants/defaultTags';


  @Component({
    components: {TagsItems, Types}
  })
  export default class Report extends Vue {
    type = '-';

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      this.draw();
    }

    moneyType(type: string) {
      return type === '-' ? 'payMoney' : 'incomeMoney'
    }

    searchIconName(key: string, array: IconTag[]) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === key) {
          return array[i].icon;
        }
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get sortedTotal() {
      const tags: string[] = [];
      const {recordList} = this;
      const tagTotalArray: IconTagsArray[] = [];

      const sortList = clone(recordList)
        .filter(record => record.type === this.type);

      for (let index = 0; index < sortList.length; index++) {
        const current = sortList[index];
        const currentName = current.tags.toString()
        let iconName = '';
        const tagIndex = tags.indexOf(currentName)

        if (this.type === '-') {
          iconName = this.searchIconName(currentName, disburseTagsList)!;
        } else {
          iconName = this.searchIconName(currentName, receiptTagsList)!;
        }

        if (tagIndex < 0) {
          tags.push(currentName)
          tagTotalArray.push({name:currentName, value:current.amount, iconName:iconName})
        } else {
          tagTotalArray[tagIndex].value += current.amount;
        }
      }
      return tagTotalArray;
    }

    draw() {
      const tagTotalArray = this.sortedTotal
      const seriesData: {name: string; value: number}[] = [];
      tagTotalArray.map(item => {
        seriesData.push({name: item.name, value:item.value})
      })
      console.log(seriesData);

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
                return data.name + data.percent.toFixed(1) + '%';
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
            data: seriesData
          }
        ]
      });
    }
    @Watch('type')
    onTypeChange() {
      this.draw();
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

        span.payMoney {
          color: #FF736D;
        }
        span.incomeMoney {
          color: #00AB7C;
        }
      }
    }

    .noResult {
      padding: 16px;
      text-align: center;
      h4 {
        font-weight: bold;
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
      &.incomeMoney {
        .circleIcon {
          background: #00D795;
        }
      }
    }
  }
</style>