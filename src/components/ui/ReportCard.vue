<template>
  <li>
    <router-link
      :to="`/reports/${post.id}`"
    >
      <img 
        class="rounded"
        :src="post.imgUrl" 
        alt=""
      >
      <h3 class="font-bold mt-2">{{ post.title }}</h3>
    </router-link>
    <p class="my-2">{{ post.date }}</p>
    <div
      :class="`${post.type === '無料' ? `bg-gray-200` : `bg-yellow-300`} 
      w-max px-2 py-1 rounded-sm text-sm`"
    >{{ post.type }}</div>
  </li>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>