<template>
  <div class="fromWrapper">
    <label class="notes">
      <!--      <Icon name="date"/>-->
      <span class="name">{{fieldName}}</span>
      <template v-if="type === 'date'">
        <input :type="type || 'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;

    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop() type?: string;
    //@Prop({required: true}) needDateIcon!: boolean;

    onValueChanged(newValue: string) {
      this.$emit('update:value', newValue);
    }
    x(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD')
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .fromWrapper {
    .notes {
      display: flex;
      align-items: center;
      /*padding-left: 20px;*/
      font-size: 12px;

      .name {
        padding-left: 6px;
        padding-right: 6px;
        color: #2E3544;
        white-space: nowrap;
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