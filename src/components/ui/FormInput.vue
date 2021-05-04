<template>
  
  <div>
    <label class="block text-xs text-gray-500" :for="type">{{ name }}</label>

    <input 
      class="focus:outline-none block border w-full px-2.5 py-1.5 rounded" 
      :type="type"
      :id="id" 
      @input="updateValue"
    >
  </div>
  
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  }
}
</script>