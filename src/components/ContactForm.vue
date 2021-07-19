<template>
  <div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
      <h3 class="heading">:: {{ headingText }}</h3>
      <div v-if="mode === 'update'" class="form-group">
        <label for="lb_no">일련번호</label>
        <input
          id="lb_no"
          type="text"
          name="no"
          class="long"
          v-model="contact.no"
          disabled />
      </div>
      <div class="form-group">
        <label for="lb_name">이름</label>
        <input
          id="lb_name"
          ref="name"
          type="text"
          name="name"
          class="long"
          v-model="contact.name"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div class="form-group">
        <label for="lb_tel">전화번호</label>
        <input
          id="lb_tel"
          type="text"
          name="tel"
          class="long"
          v-model="contact.tel"
          placeholder="전화번호를 입력하세요"
        />
      </div>
      <div class="form-group">
        <label for="lb_address">주소</label>
        <input
          id="lb_address"
          type="text"
          name="address"
          class="long"
          v-model="contact.address"
          placeholder="주소를 입력하세요"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click="submitEvent">{{ buttonText }}</button>
        <button class="btn btn-primary" @click="cancelEvent">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus.vue';

export default {
  name: "ContactForm",
  props: {
    mode: {
      type: String,
      default: "add",
    },
    contact: {
      type: Object,
      default(){
        return {
          no: "",
          tel: "",
          address: "",
          photo: "",
        };
      }
    }
  },
  computed: {
    buttonText(){
      return this.mode === "update" ? "수 정" : "추 가";
    },
    headingText(){
      return this.mode === "update" ? "연락처 수정" : "새 연락처 추가";
    }
  },
  methods: {
    cancelEvent(){
      EventBus.$emit("cancel");
    },
    submitEvent(){
      if (this.mode === "update"){
        EventBus.$emit("update-submit", this.contact);
      } else {
        EventBus.$emit("add-submit", this.contact);
      }
    }
  },
  mounted: function(){
    this.$refs.name.focus();
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  background: rgba(#000, .7);
}
.form {
  max-width: 400px;
  background: #fff;
  margin: 100px auto 0;
  padding: 20px;
}
label {
  display: block;
  text-align: left;
}
.long {
  width: 100%;
}
.btn + .btn {
  margin-left: 10px;
}
</style>
