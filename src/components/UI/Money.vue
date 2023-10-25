<template>
  <input
    type="text"
    v-model="valueInput"
    class="ui-money"
  />
</template>

<script>
import { moneyFormat } from '../../utils/filters';

export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
    },
  },

  data(vm) {
    return {
      valueInput: moneyFormat(vm.value),
    };
  },

  watch: {
    value(newValue) {
      this.valueInput = moneyFormat(newValue);
    },
    valueInput(newValue) {
      let result = newValue.replace(',', '.').replace(/[^\d.]/g, '');
      if (result.startsWith('.')) {
        result = result.substring(1);
      }

      const substrings = result.split('.');
      result = substrings.shift() + (substrings.length ? `.${substrings.join('').substring(0, 2)}` : '');

      if (result.endsWith('.')) {
        result = result.slice(0, -1);
        this.valueInput = result ? `${moneyFormat(result)}.` : '';
      } else {
        this.valueInput = moneyFormat(result);
      }

      this.$emit('input', +result || undefined);
    },
  },
};
</script>
