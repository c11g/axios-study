import axios from "axios";
import { API_URLS } from "@/config";

export default {
  fetchContacts(pageno, pagesize) {
    return axios.get(API_URLS.FETCH, {
      params: {
        pageno,
        pagesize,
      },
    });
  },
  addContact(contact) {
    return axios.post(API_URLS.ADD, contact);
  },
  updateContact(contact) {
    return axios.put(API_URLS.UPDATE(contact.no), contact);
  },
  fetchContactOne(no) {
    return axios.get(API_URLS.FETCH_ONE(no), {
      params: { no },
    });
  },
  deleteContact(no) {
    return axios.delete(API_URLS.DELETE(no));
  },
  updatePhoto(no, file) {
    const data = new FormData();
    data.append("photo", file);
    return axios.post(API_URLS.UPDATE_PHOTO(no), data);
  },
};
