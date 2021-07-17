<template>

  <div class="page-container">
    <TheTitle title="有料会員登録" />

    <div class="flex justify-center"> 
      <PromotionBox />
    </div>

    <!-- feature section -->
    <div class="my-12">
      <FeatureSection />
    </div>

  </div>

</template>

<script>
import TheTitle from '@/components/layout/TheTitle'
import PromotionBox from '@/components/promotion/PromotionBox'
import FeatureSection from '@/components/lp/FeatureSection'

export default {
  components: {
    TheTitle,
    PromotionBox,
    FeatureSection,
  },
}
</script>