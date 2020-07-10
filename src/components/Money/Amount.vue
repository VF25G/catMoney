<template>
  <div class="amountWrapper">
    <ul class="amount">
      <li>账单金额</li>
      <li class="output">0.00</li>
    </ul>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Amount'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .amountWrapper {
    margin-left: 12px;
    margin-right: 20px;

    .amount {
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 14px;
      margin-top: 12px;
      margin-bottom: 12px;

      > li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #2E3544;
      }

      > li.output {
        font-size: 32px;
        color: #FF736D;
      }
    }
  }

</style>