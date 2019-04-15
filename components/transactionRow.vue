<template>
  <tr>
    <td>{{ postedDate }}</td>
    <td>{{ item.tagId }}</td>
    <td>{{ item.transactionType }}</td>
  </tr>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'transactionRow',

  props: ['item'],

  computed: {
    postedDate () {
      const formatTemplate = 'MM/DD/YYYY hh:mm A'
      return format(this.item.postedDate, formatTemplate)
    }
  }
}
</script>
