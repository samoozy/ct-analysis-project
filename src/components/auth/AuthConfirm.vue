<template>
  <div class="flex flex-col items-center">
      <h3 class="text-xl my-3 font-bold">メールアドレスの認証</h3>
      <p class="text-sm">ご登録いただいたメールアドレス宛に確認メールを送付しました。</p>
      <p class="text-sm">メールに記載のURLより、メールアドレスの認証を行ってください。</p>
  </div>

</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    }
  }
}
</script>
