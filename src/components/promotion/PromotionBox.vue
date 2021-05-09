<template>
  <div class="w-72 sm:w-96 shadow rounded">
    <div class="h-7 w-full bg-indigo-600 rounded-t"></div>
    
    <div class="py-5 px-8 flex flex-col items-center">
      <div class="text-3xl font-bold mb-2">1,100円
        <small class="text-base">(税込)/月</small>
      </div>
      <p>有料会員レポートの閲覧</p>
      <p>過去のレポートの閲覧が可能</p>

      <div class="mt-6 mb-4">
        <InitSubscription />
      </div>
      
    </div>
     
  </div>
</template>

<script>
import InitSubscription from '@/components/stripe/InitSubscription'

export default {
  components: {
    InitSubscription,
  },
}
</script>

<style lang="postcss" scoped>
p {
  @apply py-0.5;
}
</style>