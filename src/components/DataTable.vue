<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" @input="onInput" />
    </div>

    <div v-if="!isLoading" class="data-table__table">
      <ui-table v-if="rows.length" :rows="rows" :columns="columns">
        <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </ui-table>
      <div v-else class="data-table__empty-message">
        Ничего не найдено
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    ...mapState([
      'isLoading',
    ]),
  },

  watch: {
    page: {
      handler() {
        this.emitUpdate();
      },
      immediate: true,
    },
  },

  methods: {
    emitUpdate() {
      const params = { page: this.page, pageSize: this.pageSize, money: this.moneyFilter };
      this.$emit('update', params);
    },
    // eslint-disable-next-line func-names
    onInput: _.debounce(function () {
      this.page = 1;
      this.emitUpdate();
    }, 700),
  },
};
</script>
