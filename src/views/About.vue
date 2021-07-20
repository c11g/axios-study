<template>
  <div class="about">
    <div class="container">
      <div class="page-header text-center">
        <h1>연락처 관리 애플리케이션</h1>
        <div>(Dynamic Component + Vuex + Axios)</div>
      </div>
      <component :is="currentView" />
      <contact-list />
      <paginate
        ref="paging"
        :page-count="totalpage"
        :page-range="7"
        :margin-pages="3"
        :click-handler="pageChanged"
        :prev-text="'이전'"
        :next-text="'다음'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Paginate from "vuejs-paginate";
import { ACTIONS } from "@/config";
import ContactList from "@/components/ContactList";
import AddContact from "@/components/AddContact";
import UpdateContact from "@/components/UpdateContact";
import UpdatePhoto from "@/components/UpdatePhoto";

export default {
  name: "about",
  components: {
    ContactList,
    AddContact,
    UpdateContact,
    UpdatePhoto,
    Paginate,
  },
  computed: {
    totalpage() {
      const totalcount = this.contactlist.totalcount;
      const pagesize = this.contactlist.pagesize;
      return Math.floor(totalcount / pagesize) + 1;
    },
    ...mapState(["currentView", "contactlist"]),
  },
  methods: {
    pageChanged(pageno) {
      this.$store.dispatch(ACTIONS.FETCH_CONTACTS, { pageno });
    },
  },
  mounted: function () {
    this.$store.dispatch(ACTIONS.FETCH_CONTACTS);
  },
};
</script>

<style lang="scss" scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");

.container {
  border: 1px solid gray;
  margin-bottom: 10px;
  padding: 10px;
}

.pagination {
  margin: 0 auto;
}
</style>
