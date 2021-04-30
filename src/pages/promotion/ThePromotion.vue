<template>
  <TheTitle title="有料会員登録" />

  <div class="flex justify-center"> 
    <PromotionBox />
  </div>

  <!-- feature section -->
  <div class="my-12">
    <FeatureSection />
  </div>

  <!-- partners section -->
  <PartnersSection />

</template>

<script>
import TheTitle from '@/components/layout/TheTitle'
import PromotionBox from '@/components/promotion/PromotionBox'
import FeatureSection from '@/components/lp/FeatureSection'
import PartnersSection from '@/components/lp/PartnersSection'

export default {
  components: {
    TheTitle,
    PromotionBox,
    FeatureSection,
    PartnersSection,
  },
}
</script>