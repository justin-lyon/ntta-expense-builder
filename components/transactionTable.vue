<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="transactions"
      class="elevation-1">

      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <app-transaction-row
          :item="props.item"
          :key="props.item.exitDateTime + props.item.transactionType">
        </app-transaction-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTransactionRow from './transactionRow'

export default {
  name: 'transactionTable',

  data () {
    return {
      selected: [],
      pagination: {
        sortBy: 'postedDate'
      },
      headers: [
        { text: 'Posted Date', sortable: true, value: 'postedDate' },
        { text: 'Tag ID', value: 'tagId', sortable: true },
        { text: 'Type', value: 'transactionType', sortable: true },
        { text: 'Amount', value: 'amount' }
      ]
    }
  },

  computed: {
    ...mapGetters('transactions', {
      transactions: 'getTransactions'
    })
  },

  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.transactions.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },

  components: {
    AppTransactionRow
  }
}
</script>
