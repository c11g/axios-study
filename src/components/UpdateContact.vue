<template>
  <ContactForm mode="update" :contact="contact" />
</template>

<script>
import ContactForm from "@/components/ContactForm";

export default {
  name: "UpdateContact",
  components: { ContactForm },
  props: {
    contact: Object,
  },
};
</script>

<style lang="scss" scoped>

</style>
