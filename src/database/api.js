import { createClient } from '@supabase/supabase-js';
import { url, key } from './key.js';

const _supabase = createClient(url, key);

const get = async (table) => {
  return await _supabase.from(table).select();
};

const getBaseUrl = async (table) => {
  return await _supabase.storage.from(table);
};

const getImage = async (table, filename) => {
  return await _supabase.storage.from(table).getPublicUrl(filename);
};

export const getChatData = () => {
  const result = new Promise((resolve, reject) => {
    get('chat')
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => reject(e));
  });
  return result;
};

export const getImageBaseUrl = (table) => {
  const result = new Promise((resolve, reject) => {
    getBaseUrl(table)
      .then((response) => {
        resolve(response.url);
      })
      .catch((e) => reject(e));
  });
  return result;
};

export const getImageUrl = (table, filename) => {
  const result = new Promise((resolve, reject) => {
    getImage(table, filename)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => reject(e));
  });
  return result;
};
