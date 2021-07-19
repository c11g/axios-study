<template>
  <div class="about">
    <div class="container">
      <div class="page-header text-center">
        <h1>연락처 관리 애플리케이션</h1>
        <div>(Dynamic Component + EventBus + Axios)</div>
      </div>
      <component :is="currentView" :contact="contact" />
      <contact-list :contacts="contactlist.contacts" />
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
import Paginate from "vuejs-paginate";
import { API_URLS, PAGESIZE } from "@/config";
import ContactList from "@/components/ContactList";
import AddContact from "@/components/AddContact";
import UpdateContact from "@/components/UpdateContact";
import UpdatePhoto from "@/components/UpdatePhoto";
import EventBus from "@/components/EventBus";

export default {
  name: "about",
  components: {
    ContactList,
    AddContact,
    UpdateContact,
    UpdatePhoto,
    Paginate,
  },
  data() {
    return {
      currentView: null,
      contact: {
        no: 0,
        name: "",
        tel: "",
        address: "",
        photo: "",
      },
      contactlist: {
        pageno: 1,
        pagesize: PAGESIZE,
        totalcount: 0,
        contacts: [],
      },
    };
  },
  methods: {
    pageChanged(page) {
      this.contactlist.pageno = page;
      this.fetchContacts();
    },
    fetchContacts() {
      this.$axios
        .get(API_URLS.FETCH, {
          params: {
            pageno: this.contactlist.pageno,
            pagesize: this.contactlist.pagesize,
          },
        })
        .then((response) => {
          this.contactlist = response.data;
        })
        .catch((ex) => {
          console.log(`fetchContacts failed: ${ex}`);
          this.contactlist.contacts = [];
        });
    },
    addContact(contact) {
      this.$axios
        .post(API_URLS.ADD, contact)
        .then(() => {
          this.contactlist.pageno = 1;
          this.fetchContacts();
        })
        .catch((ex) => {
          console.log(`addContact failed: ${ex}`);
        });
    },
    updateContact(contact) {
      this.$axios
        .put(API_URLS.UPDATE(contact.no), contact)
        .then(() => {
          this.fetchContacts();
        })
        .catch((ex) => {
          console.log(`updateContact failed: ${ex}`);
        });
    },
    fetchContactOne(no) {
      this.$axios
        .get(API_URLS.FETCH_ONE(no), {
          params: { no },
        })
        .then((response) => {
          this.contact = response.data;
        })
        .catch((ex) => {
          console.log(`fetchContactOne failed: ${ex}`);
        });
    },
    deleteContact(no) {
      this.$axios
        .delete(API_URLS.DELETE(no))
        .then(() => {
          this.fetchContacts();
        })
        .catch((ex) => {
          console.log(`deleteContact failed: ${ex}`);
        });
    },
    updatePhoto(no, file) {
      const data = new FormData();
      data.append("photo", file);
      this.$axios
        .post(API_URLS.UPDATE_PHOTO(no), data)
        .then(() => {
          this.fetchContacts();
        })
        .catch((ex) => {
          console.log(`updatePhoto failed: ${ex}`);
        });
    },
  },
  computed: {
    totalpage() {
      return (
        Math.floor(
          this.contactlist.totalcount - 1 / this.contactlist.pagesize
        ) + 1
      );
    },
  },
  mounted: function () {
    this.fetchContacts();
    EventBus.$on("cancel", () => {
      this.currentView = null;
    });
    EventBus.$on("add-submit", (contact) => {
      this.currentView = null;
      this.addContact(contact);
    });
    EventBus.$on("update-submit", (contact) => {
      this.currentView = null;
      this.updateContact(contact);
    });
    EventBus.$on("add-contact-form", () => {
      this.currentView = "AddContact";
    });
    EventBus.$on("edit-contact-form", (no) => {
      this.fetchContactOne(no);
      this.currentView = "UpdateContact";
    });
    EventBus.$on("delete-contact", (no) => {
      this.deleteContact(no);
    });
    EventBus.$on("edit-photo", (no) => {
      this.fetchContactOne(no);
      this.currentView = "UpdatePhoto";
    });
    EventBus.$on("update-photo", (no, file) => {
      if (typeof file !== "undefined") {
        this.updatePhoto(no, file);
      }
      this.currentView = null;
    });
  },
  watch: {
    "contactlist.pageno": function () {
      this.$refs.paging.selected = this.contactlist.pageno;
    },
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
