<template>
  <div class="typesWrapper">
    <ul class="types">
      <li class="left" :class="type === '-' && 'selected'"
          @click="selectType('-')">流出
      </li>
      <li class="right" :class="type === '+' && 'selected'"
          @click="selectType('+')">流入
      </li>
      <li v-show="showCancel" class="cancel">
        <router-link class="routerLink" to="/statistics">
          <Icon name="cancel"/>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import eventBus from '@/components/EventBus';

  @Component

  export default class Types extends Vue {
    type = '-'; //'-'支出，'+'收入
    @Prop(Boolean) showCancel?: boolean;
    selectType(type: string) { // type : '-' or '+'
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;
      this.$emit('update:value', type)
    }

    @Watch('type')
    typeChanged(newValue: string) {
      eventBus.$emit('setType', newValue);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .typesWrapper {
    background: #FFE7E4;

    .types {
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 12px;
      position: relative;

      > li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 26px;
        margin-top: 12px;
        margin-bottom: 12px;
        color: #A45240;
        border: 1px solid #A45240;
      }

      > li.left {
        width: 38%;
        border-radius: 4px 0 0 4px;
      }

      > li.right {
        width: 38%;
        border-radius: 0 4px 4px 0;
      }

      > li.selected {
        background: #A45240;
        color: #FFFFFF;
      }

      > li.cancel {
        position: absolute;
        border: none;
        right: 10px;

        .routerLink {
          width: 20px;
          height: 20px;
          .icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
</style>