<template>

  <div class="lg:flex mt-14 sm:mt-20 h-full justify-end pb-24 lg:pt-2">
    
    <div class="px-5 lg:pr-0 lg:pl-20 flex flex-col items-center lg:items-start justify-center h-108 sm:h-144">
      <img class="h-16 w-auto animate-bounce flex-none mb-2" src="@/assets/icon-logo-sm.png" alt="">

      <h1 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold font-nunito-sans text-gray-700">Analysis for the future</h1>

      <p class="text-gray-500 my-5 max-w-2xl">あなたをクリプトオタクまで成長させる暗号資産特化レポート</p>

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


    <div class="h-108 sm:h-144 lg:w-1/2 flex-none relative overflow-hidden">
      <img class="lp-xrp" src="@/assets/xrp-logo.png" alt="">
      <img class="lp-eth" src="@/assets/eth-logo.png" alt="">
      <img class="lp-bth" src="@/assets/bth-logo.png" alt="">
      <img class="lp-box" src="@/assets/box.png" alt="">
      <img class="lp-desktop shadow-xl" src="@/assets/lp-desktop.png" alt="">
      <img class="lp-phone shadow-xl" src="@/assets/lp-phone.png" alt="">

    </div>


  </div>

</template>

<script>
import LinkButton from "@/components/ui/LinkButton"

export default {
  components: {
    LinkButton,
  }
}
</script>

<style lang="postcss" scoped>
  img.lp-desktop {
    transform: scale(1) perspective(500px) rotateX(1deg) rotateY(-2deg) rotate(0deg) translateZ(-45px);
    @apply absolute w-180 left-10 rounded top-20 sm:m-auto sm:left-0 sm:right-0 lg:left-20;
  }

  img.lp-phone {
    transform: perspective(1040px) rotate(-2deg) rotateX(-2deg) rotateY(11deg) translateZ(20px) scale(1);
    @apply absolute bottom-20 left-5 w-24 sm:w-32 lg:bottom-24 lg:left-16 border rounded-lg;
  }

  img.lp-xrp {
    transform: skew(-8deg, 0deg);
    @apply absolute top-12 left-5 h-6 sm:h-10 sm:left-10 lg:top-24;
  }

  img.lp-eth {
    transform: skew(0deg, 10deg);
    @apply absolute top-12 h-10 left-16 sm:h-14 sm:left-28;
  }

  img.lp-bth {
    transform: rotateY(-30deg) rotate(-30deg);
    @apply absolute top-8 h-14 left-32 sm:h-20 sm:left-52;
  }

  img.lp-box {
    transform: rotateY(-15deg) rotate(20deg);
    @apply absolute top-0 h-32 left-52 sm:left-80;
  }
</style>