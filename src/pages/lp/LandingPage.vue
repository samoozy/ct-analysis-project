<template>
  <div class="xl:pl-28 sm:px-10 px-5">
    <HeroSection />
  </div>


  <div class="xl:px-40 sm:px-10 px-5">

    <div class="wrapper">
      <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center mb-5">What is CT Analysis</h3>
      

      <p>CT Analysisは、ブロックチェーン/暗号通貨の総合Webメディア『CRYPTO TIMES』のリサーチチームが提供する調査・分析を主としたレポート配信コンテンツです。</p>
      <p>昨年、ブロックチェーン/暗号通貨の分野は世界的にも非常に注目され、今後、日本国内においても、ますます注目が集まることが予想されます。</p>
      <p>CT Analysisでは、2年間ブロックチェーン業界に携わりながら、運営してきた知見やデータを活用して一般ユーザーから事業者まで、幅広いデータ・分析需要に応えることを目標としてリサーチ・レポートを提供していきます。</p>

      <div class="flex justify-center my-2">
        <img class="h-64 w-auto" src="@/assets/what-ct.png" alt="">
      </div>
      
    </div>

    <div class="wrapper">
      <FeatureSection />
    </div>

    <div class="wrapper">
      <PartnersSection />
    </div>
  </div>
</template>

<script>
import HeroSection from "@/components/lp/HeroSection"
import FeatureSection from "@/components/lp/FeatureSection"
import PartnersSection from "@/components/lp/PartnersSection"


export default {
  components: {
    HeroSection,
    FeatureSection,
    PartnersSection
  }
}
</script>

<style lang="postcss" scoped>
p {
  @apply py-1 text-gray-500;
}

.wrapper {
  @apply mb-16 sm:mb-24;
}
</style>