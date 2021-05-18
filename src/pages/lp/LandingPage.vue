<template>
  <div>

    <HeroSection />

    <div class="page-container pt-0">
  
      <div class="wrapper">
        <FeatureSection />
      </div>

      <div class="wrapper">
        <PartnersSection />
      </div>

      <div class="wrapper">
        <AboutSection />
      </div>     
    
    </div>
  </div>
</template>

<script>
import HeroSection from "@/components/lp/HeroSection"
import FeatureSection from "@/components/lp/FeatureSection"
import PartnersSection from "@/components/lp/PartnersSection"
import AboutSection from "@/components/lp/AboutSection"

export default {
  components: {
    HeroSection,
    AboutSection,
    FeatureSection,
    PartnersSection
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply mb-16 sm:mb-24;
}
</style>