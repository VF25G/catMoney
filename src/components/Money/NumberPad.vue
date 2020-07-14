<template>
  <div class="numberPad">
    <button @click="inputContent">1</button>
    <button @click="inputContent">2</button>
    <button @click="inputContent">3</button>
    <button @click="remove">
      <Icon name="delete"/>
    </button>
    <button @click="inputContent">4</button>
    <button @click="inputContent">5</button>
    <button @click="inputContent">6</button>
    <button @click="add">
      <Icon name="add"/>
    </button>
    <button @click="inputContent">7</button>
    <button @click="inputContent">8</button>
    <button @click="inputContent">9</button>
    <button class="ok">确定</button>
    <button @click="clear">清空</button>
    <button @click="inputContent">0</button>
    <button @click="inputContent">.</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import eventBus from '@/components/EventBus';
  import {Component, Watch} from 'vue-property-decorator';

  @Component

  export default class NumberPad extends Vue {
    output = '0';
    isLeftNumberFloat = true;

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      const context: string = this.output + input;

      const isPlusSignBeforeFloatPoint: boolean = (this.output.indexOf('+') === (this.output.length - 1));
      const hasPoint: number = this.output.replace(/[^.]/g, '').length;

      if (this.output.length === 16) { return; }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (context.indexOf('+')) { // Fixed number+0000
        const pointIndex: number = context.indexOf('+');
        const rightNumberString = context.slice(pointIndex + 1, context.length);
        const zeroArray: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
        if (zeroArray.indexOf(rightNumberString) >= 0) {
          return;
        }
      }
      if (!this.isLeftNumberFloat && (this.output.indexOf('+') >= 0) && input === '.') {
        const plusSignIndex = this.output.indexOf('+');
        const afterPlusSignChar = this.output.slice(plusSignIndex + 1, this.output.length);

        if (afterPlusSignChar === '0') {
          this.output += input;
          return;
        }

        if (this.output.indexOf('.') >= 0) { return; }

        this.output += '0';
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        if (this.output.indexOf('+') >= 0) {
          const isOverTwoPoint: boolean = (hasPoint >= 2);
          if (isOverTwoPoint) { return; }

          if (this.isLeftNumberFloat && isPlusSignBeforeFloatPoint) {
            this.output += '0';
          }

          this.output += input;
        }
        return;
      }
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    add() {
      if (this.output.indexOf('+') >= 0) {
        this.stringToNumber();
        return;
      }
      // 判断浮点数的小数点后面，是否有小数部分。
      if (this.output.indexOf('.') >= 0 && this.output.indexOf('.') + 1 === this.output.length) {
        this.output += '0';
      }
      this.output += '+';
    }

    @Watch('output')
    onOutputChange(newValue: string) {
      eventBus.$emit('amountChange', newValue);
    }

    @Watch('output')
    leftNumberType(newValue: string) {
      if (newValue.indexOf('+') === (newValue.length - 1)) {
        this.isLeftNumberFloat = (newValue.indexOf('.') >= 0);
      }
    }

    accAdd(arg1: number, arg2: number) {
      let r1, r2;
      try {r1 = arg1.toString().split('.')[1].length;} catch (e) {r1 = 0;}
      try {r2 = arg2.toString().split('.')[1].length;} catch (e) {r2 = 0;}
      const m = Math.pow(10, Math.max(r1, r2));
      return (arg1 * m + arg2 * m) / m;
    }

    stringToNumber() {
      const pointIndex: number = this.output.indexOf('+');
      const leftNumber: number = parseFloat(this.output.slice(0, pointIndex));
      const rightNumber: number = parseFloat(this.output.slice(pointIndex, this.output.length));

      if (!rightNumber && rightNumber !== 0) {
        return;
      }

      let result: string = this.accAdd(leftNumber, rightNumber).toString();
      result += '+';
      this.output = result;
    }
  }
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