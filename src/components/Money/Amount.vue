<template>
  <div class="amountWrapper">
    <ul class="amount">
      <li>金额</li>
      <li class="output" :class="currentType === '+' ? 'income' : ''">{{content}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import eventBus from '@/components/EventBus';

  @Component
  export default class Amount extends Vue {
    @Prop() readonly currentType!: string;
    content = '0';

    mounted() {
      eventBus.$on('amountChange', (val: string) => {
        this.content = val;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .amountWrapper {
    padding: 12px 20px 12px 12px;
    background: #FFFFFF;

    .amount {
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 14px;

      > li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #2E3544;
      }

      > li.output {
        font-size: 28px;
        color: #FF736D;
      }
      > li.output.income {
        font-size: 28px;
        color: #00AB7C;
      }
    }
  }

</style>