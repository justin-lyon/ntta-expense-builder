<template>
  <div>
    <app-transaction-table></app-transaction-table>
  </div>
</template>

<script>
import AppTransactionTable from '../components/transactionTable'

export default {
  name: 'transactions',

  components: {
    AppTransactionTable
  }
}
</script>
