import Axios from "axios";
import serverUrl_ from "../serverUrl";
const ServerUrl = serverUrl_ + "blog/";
export var BLOGS = [];

const updateBLogs = async () => {
  const { data } = await Axios.get(ServerUrl + "allblogs");
  if (data && data.result) {
    BLOGS = data.result;
  }
  return data.result;
};

export const insertBlog = async blog => {
  const resp = await Axios.post(ServerUrl + "insertBlog", blog);
  const { data } = resp;
  if (data.result) {
    return data.result;
  }

  throw new Error("-");
};

export const UpdateBlog = async updatedValue => {
  Axios.post(ServerUrl + "updateBlog", updatedValue);
  alert(JSON.stringify(updatedValue));
  updateBLogs();
};

export const GETBLOGS = (limit = false) =>
  new Promise(res => {
    try {
      updateBLogs().then(data => {
        let blogs = BLOGS.filter((_, index) => {
          if (limit) {
            if (limit > index) {
              return true;
            }
            return false;
          }
          return true;
        });
        res(blogs);
      });
    } catch (error) {
      res([]);
    }
  });
export const getSingleBlog = async (_id = false) => {
  const { data } = await Axios.get(ServerUrl + "singleblog?_id=" + _id);
  if (data.result) {
    return data.result;
  }
  alert(JSON.stringify(data));
};
