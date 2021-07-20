<template>
  <div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
      <form moethod="post" enctype="multipart/form-data">
        <h3 class="heading">:: 사진 변경</h3>
        <input
          type="hidden"
          name="no"
          class="long"
          disabled
          v-model="contact.no"
        />
        <div class="form-group">
          <label for="lb_photo">현재 사진</label>
          <img width="160" :src="contact.photo" alt="" />
        </div>
        <div class="form-group">
          <label for="lb_select_photo">사진 파일 선택</label>
          <input
            type="file"
            name="photo"
            class="long btn btn-default"
            ref="photofile"
            id="lb_select_photo"
            @change="photoChange"
          />
          <div v-if="shoPreview">
            <img width="160" height="160" :src="preview" alt="" />
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click.prevent="photoSubmit">
            변경
          </button>
          <button class="btn btn-primary" @click.prevent="cancelEvent">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ACTIONS } from "@/config";

export default {
  name: "UpdatePhoto",
  props: {
    contact: Object,
  },
  data() {
    return {
      shoPreview: false,
      preview: this.contact.photo,
    };
  },
  methods: {
    cancelEvent() {
      this.$store.commit(ACTIONS.CANCEL_FORM);
    },
    photoSubmit() {
      const file = this.$refs.photofile.files[0];
      if (typeof file !== "undefined") {
        this.$store.dispatch(ACTIONS.UPDATE_PHOTO, {
          no: this.contact.no,
          file: file,
        });
      } else {
        this.$store.commit(ACTIONS.CANCEL_FORM);
      }
    },
    photoChange() {
      this.shoPreview = !this.shoPreview;
      const file = this.$refs.photofile.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  background: rgba(#000, 0.7);
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
