<template>

  <!-- お支払い設定 -->
  <content-block>
    <template v-slot:title>
      お支払い設定
    </template>
    <template v-slot:text>
      <!-- <p>Stripe決済のリンクを開きます。</p> -->
    </template>
    <template v-slot:btn>
      <CustomerPortal />
    </template>
  </content-block>

</template>

<script>
import ContentBlock from "@/components/account/ContentBlock"
import CustomerPortal from "@/components/account/CustomerPortal.vue"

export default {
  components: {
    ContentBlock,
    CustomerPortal
  },
}
</script>