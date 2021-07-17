<template>

  <!-- <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center mb-5">What is CT Analysis</h3> -->
  <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center mb-8">What is CT Analysis</h3>
  <div class="flex justify-center">
    <img class="h-32 w-auto" src="@/assets/logo.png" alt="">
  </div>
  <div class="flex flex-col">
    <p>CT Analysisは、ブロックチェーン/暗号通貨の総合Webメディア『CRYPTO TIMES』のリサーチチームが提供する調査・分析を主としたレポート配信コンテンツです。</p>
    <p>昨年、ブロックチェーン/暗号通貨の分野は世界的にも非常に注目され、今後、日本国内においても、ますます注目が集まることが予想されます。</p>
    <p>CT Analysisでは、2年間ブロックチェーン業界に携わりながら、運営してきた知見やデータを活用して一般ユーザーから事業者まで、幅広いデータ・分析需要に応えることを目標としてリサーチ・レポートを提供していきます。</p>
  </div>

  <!-- <div class="flex justify-center mt-12">
    <a class="block" href="https://crypto-times.jp/"><img class="h-10 w-auto" src="@/assets/ct-logo.png" alt=""></a>
  </div> -->

  <div class="flex justify-center mt-6">
    <LinkButton class="inline-block" mode="filled-lg" dest="#">
      お問い合わせ
    </LinkButton>
  </div>

</template>

<script>
import LinkButton from '@/components/ui/LinkButton'

export default {
  components: {
    LinkButton
  }
}
</script>

<style lang="postcss" scoped>
p {
  @apply py-2 text-gray-500;
}
</style>