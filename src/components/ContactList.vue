<template>
  <div>
    <div class="addnew">
      <button class="btn btn-primary" @click="addContact">
        새로운 연락처 추가하기
      </button>
    </div>
    <div id="example">
      <table id="list" class="table table-striped table-bordered table-hover">
        <colgroup>
          <col style="width: 200px" />
          <col style="width: 150px" />
          <col style="width: 250px" />
          <col style="width: 60px" />
          <col style="width: 150px" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>사진</th>
            <th>편집/삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ no, name, tel, address, photo } in contacts" :key="tel">
            <td>{{ name }}</td>
            <td>{{ tel }}</td>
            <td>{{ address }}</td>
            <td>
              <a role="button" @click="editPhoto(no)">
                <img width="40" height="40" :src="photo" :alt="name" />
              </a>
            </td>
            <td>
              <button class="btn btn-primary" @click="editContact(no)">
                편집
              </button>
              <button class="btn btn-primary" @click="deleteContact(no)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ACTIONS } from "@/config";

export default {
  name: "ContactList",
  computed: {
    ...mapState({
      contacts: (state) => state.contactlist.contacts,
    }),
  },
  methods: {
    addContact() {
      this.$store.commit(ACTIONS.ADD_CONTACT_FORM);
    },
    editContact(no) {
      this.$store.dispatch(ACTIONS.EDIT_CONTACT_FORM, { no });
    },
    deleteContact(no) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$store.dispatch(ACTIONS.DELETE_CONTACT, { no });
      }
    },
    editPhoto(no) {
      this.$store.dispatch(ACTIONS.EDIT_PHOTO, { no });
    },
  },
};
</script>

<style lang="scss" scoped>
.addnew {
  margin: 10px 0;
}
#list th,
#list td {
  text-align: center;
  vertical-align: middle;
}
.btn + .btn {
  margin-left: 10px;
}
</style>
