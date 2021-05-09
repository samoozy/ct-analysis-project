<template>
  <div class="p-8 mt-5 border-t">
    <div class="flex flex-col lg:flex-row justify-between">
      <p class="text-sm order-2 lg:order-1">© CT Analysis. All rights reserved.</p>
      <div class="flex flex-col lg:block order-1">
        <a class="link" href="https://crypto-times.jp/">CRYPTO TIMES</a>
        <router-link class="link" to="/terms">利用規約・プライバシーポリシー</router-link>
        <a class="link" href="https://rokubunnoni.com/">会社概要</a>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.link {
  @apply lg:ml-5 w-max py-1 text-sm text-gray-600;
}
</style>