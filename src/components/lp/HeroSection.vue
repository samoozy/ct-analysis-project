<template>
  <div class="flex flex-col items-center py-24 lg:py-52">
    <img class="h-20 w-auto animate-bounce my-4" src="@/assets/icon-logo-sm.png" alt="">

    <h1 class="text-3xl lg:text-5xl font-extrabold font-nunito-sans text-gray-700">Analysis for the future</h1>

    <p class="text-gray-500 my-5 max-w-2xl text-center">CT Analysisは、ブロックチェーン/暗号通貨の総合Webメディア『CRYPTO TIMES』のリサーチチームが提供する調査・分析を主としたレポート配信コンテンツです。</p>

    <div class="flex">
      <link-button 
        class="w-max"
        mode="filled-lg"
        dest="/reports"
      >
        レポート一覧
      </link-button>

      <link-button 
        class="w-max ml-3"
        mode="ghost-lg"
        dest="/promotion"
      >
        有料プラン詳細
      </link-button>
    </div>
  </div>

  <!-- <div class="flex flex-col lg:flex-row items-center justify-around w-full my-24 lg:my-36">

    <div class="flex flex-col mb-10 items-center">
      <img class="h-20 w-auto animate-bounce" src="@/assets/icon-logo-sm.png" alt="">

      <h1 class="text-5xl font-extrabold font-nunito-sans text-gray-700 lg:self-start mt-5">Analysis for the future</h1>

      <p class="text-gray-500 my-5 max-w-2xl">CT Analysisは、ブロックチェーン/暗号通貨の総合Webメディア『CRYPTO TIMES』のリサーチチームが提供する調査・分析を主としたレポート配信コンテンツです。</p>

      <link-button 
        class="w-max lg:self-start"
        mode="filled-lg"
        dest="/reports"
      >
        レポート一覧
      </link-button>

    </div>

    <div class="flex flex-col items-center flex-none mt-24 lg:mt-0 lg:ml-7">
      <img class="h-auto w-full lg:w-auto lg:max-h-72 xl:max-h-96 2xl:max-h-108" src="@/assets/lp-hero.png" alt="">
    </div>
    
  </div> -->

</template>

<script>
import LinkButton from "@/components/ui/LinkButton"

export default {
  components: {
    LinkButton,
  }
}
</script>