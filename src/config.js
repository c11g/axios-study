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
