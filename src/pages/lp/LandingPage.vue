<template>
  <div>
    <!-- <div class="xl:pl-28 sm:px-10 px-5 pt-16">
      <HeroSection />
    </div> -->


    <div class="page-container pt-0">

      <HeroSection />



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