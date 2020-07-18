<template>
  <div class="fromWrapper">
    <label class="notes">
      <!--      <Icon name="date"/>-->
      <span class="date">{{fieldName}}</span>
      <input type="text"
             v-model="value"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) value!: string;

    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    //@Prop({required: true}) needDateIcon!: boolean;

    @Watch('value')
    onValueChanged(newValue: string) {
      this.$emit('update:value', newValue);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .fromWrapper {
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
        height: 40px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
      }
    }
  }
</style>