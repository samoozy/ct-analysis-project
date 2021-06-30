<template>
  <div class="flex flex-col items-center mb-8 lg:mb-0">
    <div class="h-24">
      <slot name="img"></slot>
    </div>
    <div class="text-center py-5">
      <h3 class="font-bold mb-2">
        <slot name="title"></slot>
      </h3>
      <p>
        <slot name="text-primary"></slot>
      </p>
      <p>
        <slot name="text-secondary"></slot>
      </p>
    </div>
  </div>
</template>


<style lang="postcss" scoped>
p {
  @apply py-1 text-gray-500;
}
</style>