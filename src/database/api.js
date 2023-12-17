import { createClient } from "@supabase/supabase-js";
import { url, key } from "./key.js";

const _supabase = createClient(url, key);

const get = async (table) => {
  return await _supabase.from(table).select();
};

export const getChatData = () => {
  const result = new Promise((resolve, reject) => {
    get("chat")
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => reject(e));
  });
  return result;
};
