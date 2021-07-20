import Vue from "vue";
import Vuex from "vuex";
import { PAGESIZE, ACTIONS } from "@/config";
import API from "@/api/ContactsAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    [ACTIONS.ADD_CONTACT_FORM]: (state) => {
      state.contact = {
        no: null,
        name: "",
        tel: "",
        address: "",
        photo: "",
      };
      state.currentView = "AddContact";
    },
    [ACTIONS.CANCEL_FORM]: (state) => {
      state.currentView = null;
    },
    [ACTIONS.EDIT_CONTACT_FORM]: (state, payload) => {
      state.currentView = "UpdateContact";
      state.contact = payload.contact;
    },
    [ACTIONS.FETCH_CONTACTS]: (state, payload) => {
      state.contactlist = payload.contactlist;
    },
    [ACTIONS.INIT_CONTACTS]: (state) => {
      state.contactlist.contacts = [];
    },
    [ACTIONS.EDIT_PHOTO]: (state, payload) => {
      state.currentView = "UpdatePhoto";
      state.contact = payload.contact;
    },
  },
  actions: {
    async [ACTIONS.ADD_CONTACT]({ dispatch, commit }, payload) {
      try {
        await API.addContact(payload.contact);
        dispatch(ACTIONS.FETCH_CONTACTS);
        commit(ACTIONS.CANCEL_FORM);
      } catch (e) {
        console.log(`addContact failed: ${e}`);
      }
    },
    async [ACTIONS.FETCH_CONTACTS](
      { commit },
      payload = {
        pageno: 1,
        pagesize: PAGESIZE,
      }
    ) {
      try {
        const response = await API.fetchContacts(
          payload.pageno,
          payload.pagesize
        );
        commit(ACTIONS.FETCH_CONTACTS, { contactlist: response.data });
      } catch (e) {
        console.log(`fetchContacts failed: ${e}`);
        commit(ACTIONS.INIT_CONTACTS);
      }
    },
    async [ACTIONS.EDIT_CONTACT_FORM]({ commit }, payload) {
      try {
        const response = await API.fetchContactOne(payload.no);
        commit(ACTIONS.EDIT_CONTACT_FORM, { contact: response.data });
      } catch (e) {
        console.log(`fetchContactOne failed: ${e}`);
      }
    },
    async [ACTIONS.EDIT_PHOTO]({ commit }, payload) {
      try {
        const response = await API.fetchContactOne(payload.no);
        commit(ACTIONS.EDIT_PHOTO, { contact: response.data });
      } catch (e) {
        console.log(`fetchContactOne failed: ${e}`);
      }
    },
    async [ACTIONS.UPDATE_CONTACT]({ dispatch, commit }, payload) {
      try {
        await API.updateContact(payload.contact);
        dispatch(ACTIONS.FETCH_CONTACTS);
        commit(ACTIONS.CANCEL_FORM);
      } catch (e) {
        console.log(`updateContact failed: ${e}`);
      }
    },
    async [ACTIONS.DELETE_CONTACT]({ dispatch }, payload) {
      try {
        await API.deleteContact(payload.no);
        dispatch(ACTIONS.FETCH_CONTACTS);
      } catch (e) {
        console.log(`deleteContact failed: ${e}`);
      }
    },
    async [ACTIONS.UPDATE_PHOTO]({ dispatch, commit }, payload) {
      try {
        await API.updatePhoto(payload.no, payload.file);
        dispatch(ACTIONS.FETCH_CONTACTS);
        commit(ACTIONS.CANCEL_FORM);
      } catch (e) {
        console.log(`updatePhoto failed: ${e}`);
      }
    },
  },
  modules: {},
});
