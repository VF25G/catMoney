<template>
  <div class="numberPad">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>
      <Icon name="delete"/>
    </button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>
      <Icon name="add"/>
    </button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button class="ok">确定</button>
    <button>清空</button>
    <button>0</button>
    <button>·</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NumberPad'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 56px;
      float: left;
      background: #FFE7E4;
      border: none;
      border-bottom: 2px solid #FED8D4;
      border-right: 2px solid #FED8D4;
      font-size: 32px;
      color: #A45240;

      &.ok {
        height: 56*2px;
        float: right;
      }

      &:nth-child(12) {
        font-size: 26px;
        border: none;
        background: #57CDE1;
        color: #FFFFFF;
      }

      &:nth-child(13) {
        font-size: 20px;
      }

      &:nth-child(8) {
        border: none;
      }

      &:nth-child(4), &:nth-child(8), &:nth-child(11), &:nth-child(15) {
        border-right: none;
      }

      &:nth-child(13), &:nth-child(14), &:nth-child(15) {
        border-bottom: none;
      }
    }
  }
</style>