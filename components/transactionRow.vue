<template>
  <tr :active="item.selected" @click="item.selected = !item.selected">
    <td>
      <v-checkbox
        :input-value="item.selected"
        primary
        hide-details
      ></v-checkbox>
    </td>
    <td>{{ postedDate }}</td>
    <td>{{ item.tagId }}</td>
    <td>{{ item.transactionType }}</td>
    <td>{{ item.amount }}</td>
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
