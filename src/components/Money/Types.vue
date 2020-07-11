<template>
  <div class="typesWrapper">
    <ul class="types">
      <li class="left" :class="type === '-' && 'selected'"
      @click="selectType('-')">流出</li>
      <li class="right" :class="type === '+' && 'selected'"
      @click="selectType('+')">流入</li>
      <li class="cancel">
        <Icon name="cancel"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Types',
    data(){
      return {
        type: '-' // '-'支出，'+'收入
      }
    },
    methods: {
      selectType(type) { // type : '-' or '+'
        if(type !== '-' && type !== '+') {
          throw new Error('type is unknown')
        }
        this.type = type
      }
    }
  };
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
        right: 10px;
        border: none;

        > .icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>