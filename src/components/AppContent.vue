<template>
  <main class="app-content container mt-md-5">

    <!-- Loading spinner -->
    <div v-if="isLoading" class="app-content__spinner-block" @click.stop>
      <ui-spinner />
    </div>

    <ui-alert v-if="isCached" type="success" header="Data was cached!">
      <template #default>
        <p>You can clear cache and load data again.</p>
      </template>
      <template #footer>
        <ui-button type="primary" @click="clearCache">
          Clear cache
        </ui-button>
      </template>
    </ui-alert>

    <data-table
      :rows="data"
      :columns="columns"
      :page-count="pageCount"
      @update="load({...$event})"
    >
      <template #col(date)="{ row }">
        {{ dateFormat(row.date) }}
      </template>
      <template #col(money)="{ row }">
        {{ moneyFormat(row.money) }}
      </template>
    </data-table>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { dateFormat, moneyFormat } from '../utils/filters';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Money',
        prop: 'money',
        width: '35%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
      'pageCount',
    ]),
  },

  methods: {
    ...mapActions([
      'load',
      'clearCache',
    ]),
    dateFormat,
    moneyFormat,
  },
};
</script>
