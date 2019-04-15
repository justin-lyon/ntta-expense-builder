<template>
  <tr>
    <td>{{ postedDate }}</td>
    <td>{{ item.tagId }}</td>
    <td>{{ item.transactionType }}</td>
  </tr>
</template>

<script>
export default {
  name: 'transactionRow',

  props: ['item'],

  computed: {
    postedDate () {
      const format = 'MM/DD/YYYY hh:mm A'
      return this.$moment.unix(this.item.postedDate).format(format)
    }
  }
}
</script>
