<template>
  <div class="content">
    <Types :value.sync="record.type" show-cancel="true"/>
    <Amount :current-type="selectedType"/>
    <Tags :value.sync="record.tags"
          :current-type="selectedType"
          :data-source="selectedType === '-'?
                        disburseTagsList:
                        receiptTagsList"/>
    <div class="formContainer">
      <FormItem type="date" field-name="" placeholder="请输入日期" :value.sync="record.createdAt"/>
      <FormItem field-name="备注" placeholder="请输入备注信息" :value.sync="record.notes"/>
    </div>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Amount from '@/components/Money/Amount.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import eventBus from '@/components/EventBus';
  import {disburseTagsList, receiptTagsList} from '@/constants/defaultTags';

  @Component({
    components: {NumberPad, FormItem, Tags, Amount, Types}
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      // 能力有限，Tags.vue默认选择餐饮，暂时没想到更好的方案。
      // tags需初始化为'餐饮'
      tags: '餐饮', notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };

    disburseTagsList = disburseTagsList;
    receiptTagsList = receiptTagsList;

    selectedType = '-';

    mounted() {
      eventBus.$on('setType', (val: string) => {
        this.selectedType = val;
      });
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
      this.record.notes = '';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .content {
    display: flex;
    flex-direction: column;
  }

  .formContainer {
    display: flex;
    padding-bottom: 8px;
    background: #FFFFFF;

    position: fixed;
    bottom: 210px;
    left: 0;
    width: 100vw;
  }

  .fromWrapper {
    background: #FFFFFF;
    max-width: 50vw;
  }

  .tags {
    /*flex-grow: 3;*/
    // tags 内容区域自动拉伸
    padding-bottom: 54*5px;
  }

  .numberPad {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }

</style>