const BASE_URL = "http://sample.bmaster.kro.kr/contacts";

export const API_URLS = {
  FETCH: BASE_URL,
  ADD: BASE_URL,
  UPDATE: (no) => `${BASE_URL}/${no}`,
  FETCH_ONE: (no) => `${BASE_URL}/${no}`,
  DELETE: (no) => `${BASE_URL}/${no}`,
  UPDATE_PHOTO: (no) => `${BASE_URL}/${no}/photo`,
};

export const PAGESIZE = 5;

export const ACTIONS = {
  ADD_CONTACT: "addContact",
  FETCH_CONTACTS: "fetchContacts",
  UPDATE_CONTACT: "updateContact",
  DELETE_CONTACT: "deleteContact",
  ADD_CONTACT_FORM: "addContactForm",
  EDIT_CONTACT_FORM: "editContactForm",
  UPDATE_PHOTO: "updatePhoto",
  EDIT_PHOTO: "editPhoto",
  CANCEL_FORM: "cancelForm",
  INIT_CONTACTS: "initContacts",
};
