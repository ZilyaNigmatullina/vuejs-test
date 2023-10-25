<template>
  <div class="ui-table">
    <div class="ui-table__header">
      <div class="ui-table__row" :style="rowStyle">
        <div v-for="column in columns" :key="column.prop" class="ui-table__cell ui-table__cell_small">
          {{ column.label }}
        </div>
      </div>
    </div>
    <div v-if="rows.length" class="ui-table__body">
      <div v-for="(row, index) in rows" :key="index" class="ui-table__row" :style="rowStyle">
        <div v-for="column in columns" :key="`${index}-${column.prop}`" class="ui-table__cell">
          <div class="ui-table__cell-header">
            {{ column.label }}
          </div>
          <slot :name="[`col(${column.prop})`]" :row="row">
            {{ row[column.prop] }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Table',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: (vm) => ({
    rowStyle: {
      gridTemplateColumns: vm.columns.reduce(((result, column) => `${result} minmax(150px, ${column.width || 'auto'})`), ''),
    },
  }),
};
</script>
