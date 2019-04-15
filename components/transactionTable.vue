<template>
  <table>
    <thead>
      <tr>
        <th>1</th>
        <td>2</td>
        <td>3</td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(t, i) in transactions" >
        <app-transaction-row :item="t" :key="t.postedDate + t.transactionType + i"></app-transaction-row>
      </template>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTransactionRow from './transactionRow'

export default {
  computed: {
    ...mapGetters('transactions', {
      transactions: 'getTransactions'
    })
  },

  components: {
    AppTransactionRow
  }
}
</script>
