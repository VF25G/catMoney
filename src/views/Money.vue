<template>
  <div class="content">
    <Types :value.sync="record.type"/>
    <Amount :current-type="selectedType"/>
    <Tags :current-type="selectedType"
          :data-source="selectedType === '-'?
                        disburseTagsList:
                        receiptTagsList"
          class="tags"/>
    <div>{{record}}</div>
    <Notes :value.sync="record.notes"/>
    <NumberPad :value.sync="record.amount" class="numberPad"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Amount from '@/components/Money/Amount.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import eventBus from '@/components/EventBus';

  type Record = {
    tags: string;
    notes: string;
    type: string;
    amount: number;
    createAt?: Date;
  }

  @Component({
    components: {NumberPad, Notes, Tags, Amount, Types}
  })
  export default class Money extends Vue {

    record: Record = {
      tags: '', notes: '', type: '-', amount: 0
    };


    disburseTagsList = [
      {icon: 'food', name: '餐饮'},
      {icon: 'snacks', name: '烟酒零食'},
      {icon: 'shop', name: '购物'},
      {icon: 'apartment', name: '住房'},
      {icon: 'trafficLight', name: '交通'},
      {icon: 'recreation', name: '娱乐'},
      {icon: 'education', name: '文教'},
      {icon: 'car', name: '汽车'},
      {icon: 'communication', name: '通讯'},
      {icon: 'parenting', name: '育儿'}
    ];
    receiptTagsList = [
      {icon: 'salary', name: '薪资'},
      {icon: 'bonus', name: '奖金'},
      {icon: 'borrow', name: '借入'},
      {icon: 'collectDebt', name: '收债'},
      {icon: 'interest', name: '利息收入'},
      {icon: 'investment', name: '投资回报'},
      {icon: 'incomeFromInvestment', name: '投资收益'},
      {icon: 'reimbursement', name: '报销收入'},
      {icon: 'drawback', name: '退款'},
      {icon: 'windfall', name: '意外所得'}
    ];

    selectedType = '-';
    mounted() {
      eventBus.$on('setType', (val: string) => {
        this.selectedType = val;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  // tags 内容区域自动拉伸
  .tags {
    flex-grow: 3;
  }

</style>