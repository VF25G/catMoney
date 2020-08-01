<template>
  <Layout>
    <header class="headerInfo">
      <div class="monthlyTotal">
        <span>总支出</span>
        <span>¥{{payTotal}}</span>
        <span>总收入：¥{{incomeTotal}}</span>
      </div>
      <div class="appName">
        <div>猫咪</div>
        <div>记账</div>
      </div>
    </header>
    <Types :value.sync="type"/>
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
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Types}
  })
  export default class Statistics extends Vue {
    type = '-';
    payTotal = 0;
    incomeTotal = 0;

    mounted() {
      this.monthlyTotal;
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

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get monthlyTotal() {
      const {recordList} = this;

      const paySortList = clone(recordList)
        .filter(record => record.type === '-');
      const incomeSortList = clone(recordList)
        .filter(record => record.type === '+');
      if (paySortList.length !== 0) {
        paySortList.map(current => {
          this.payTotal += current.amount;
        });
      }
      if (incomeSortList.length !== 0) {
        incomeSortList.map(record => {
          this.incomeTotal += record.amount;
        });
      }
      return {'payTotal': this.payTotal, 'incomeTotal': this.incomeTotal};
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
  }
</script>

<style scoped lang="scss">
  .headerInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #FFE7E4;

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

  ::v-deep {
    .typesWrapper {
      .types {
        li {
          margin-top: 0;
          margin-bottom: 2px;
        }
      }
    }
  }
</style>