<template>
  <div class="notesWrapper">
    <label class="notes">
      <Icon name="date"/>
      <span class="date">今天</span>
      <input type="text"
             v-model="value"
             placeholder="请输入备注信息">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Watch('value')
    onValueChanged(newValue: string) {
      this.$emit('update:value', newValue);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .notesWrapper {
    background: #FFFFFF;

    .notes {
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 12px;

      .date {
        padding-left: 6px;
        padding-right: 6px;
        color: #2E3544;
      }

      .icon {
        color: #919191;
        height: 20px;
        width: 20px;
      }

      input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
      }
    }
  }
</style>