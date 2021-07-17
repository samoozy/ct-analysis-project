<template>
  <div>
    <HeroSection />

    <div class="page-container pt-0">

      <div class="wrapper">
        <FeatureSection />
      </div>

      <div class="wrapper">
        <LogoSection />
      </div>

      <!-- <div class="wrapper">
        <PartnersSection />
      </div> -->

      <div class="wrapper">
        <AboutSection />
      </div>

      <div class="wrapper">
        <FaqSection />
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from "@/components/lp/HeroSection"
import FeatureSection from "@/components/lp/FeatureSection"
import LogoSection from "@/components/lp/LogoSection"
// import PartnersSection from "@/components/lp/PartnersSection"
import AboutSection from "@/components/lp/AboutSection"
import FaqSection from "@/components/lp/FaqSection"

export default {
  components: {
    HeroSection,
    AboutSection,
    FeatureSection,
    LogoSection,
    // PartnersSection,
    FaqSection,
  },
};
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply mb-16 sm:mb-36;
}
</style>