<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}</h3>
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
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs, Types}
  })
  export default class Statistics extends Vue {
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

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) { return []; }

      const sortList = clone(recordList).sort((leftRecord, rightRecord) => dayjs(rightRecord.createdAt).valueOf() - dayjs(leftRecord.createdAt).valueOf());
      const result = [{title: dayjs(sortList[0].createdAt).format('YYYY-MM-DD'), items: [sortList[0]]}];
      for (let i = 1; i < sortList.length; i++) {
        const current = sortList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
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
  ::v-deep {
    .type-tabs-item {
      background: #C4C4C4;

      &.selected {
        background: #FFFFFF;

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
</style>