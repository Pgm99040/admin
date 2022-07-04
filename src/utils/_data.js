import axios from 'axios'
import { getFromStorage } from './common';
import utils from '../utils/index';
// const user =  getFromStorage('user') && JSON.parse(getFromStorage('user'));
const config = () => ({
    headers: {
        Authorization: getFromStorage("token"),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export async function loginWithSuperAdmin(data) {
    try {
        const url = utils.hostURL("adminLogin");
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data  }
    } catch (e) {
        return { success: false, msg: "Something went wrong" }
    }
}

//users
export async function getAllActiveUsers() {
    try {
        const url = utils.hostURL("admin/api/v1/getAllActiveUsers");
        const res = await axios.get(url, config());
        return { success: true, data: res.data};
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function adminGrantCredits(data) {
    try {
        const url = utils.hostURL("admin/api/v1/adminGrantCredits");
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data};
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function mentorApprove(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/becomeMentor/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data};
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function getAllActiveMentors() {
    try {
        const url = utils.hostURL("admin/api/v1/getAllMentors");
        const res = await axios.get(url, config());
        return { success: true, data: res.data};
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function predefinedTaskList(id) {
  try {
      const url = utils.hostURL(`admin/api/v1/predefinedtask/records/${id}`);
      const res = await axios.get(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}
export async  function getAllCategoryList() {
  try {
      const url = utils.hostURL(`admin/api/v1/category/list`);
      const res = await axios.get(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}
export async  function getAllCategoryListAdmin() {
    try {
        const url = utils.hostURL(`admin/api/v1/category`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function getAllCodeCastAdmin() {
    try {
        const url = utils.hostURL(`admin/api/v1/codeCast`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function getAllExportGuidanceSubscriber() {
    try {
        const url = utils.hostURL(`admin/api/v1/exportGuidanceSubscriber`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function getAllExportGuidance() {
    try {
        const url = utils.hostURL(`admin/api/v1/exportGuidance`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function getCategoryIdBySubcategory(id) {
  try {
      const url = utils.hostURL(`admin/api/v1/categoryIdBySubcategory/${id}`);
      const res = await axios.get(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}
export async  function getCategoryIdBySubcategoryAdmin(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/categoryIdBySubcategoryAdmin/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function subCategoryList() {
  try {
      const url = utils.hostURL(`admin/api/v1/subcategory/list`);
      const res = await axios.get(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}

export async  function getJobpostpromotion() {
    try {
        const url = utils.hostURL(`admin/api/v1/getJobpostpromotion`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function predefinedAllTaskList() {
  try {
      const url = utils.hostURL(`admin/api/v1/predefinedtaskList`);
      const res = await axios.get(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}

export async  function getPredefinedAllTask(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/predefinedtaskDetail/view/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteApprovedTask(id, listId) {
    try {
        const url = utils.hostURL(`admin/api/v1/predefinedtask/delete/${id}/${listId}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}


export async  function getSelectDeleteMCQtest(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/MCQTests/DeleteTest/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function updatePredefinedAllTask(data) {
  try {
      const url = utils.hostURL(`admin/api/v1/predefinedtask/update`);
      const res = await axios.post(url, data, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}
export async  function deletePredefinedTask(id) {
  try {
      const url = utils.hostURL(`admin/api/v1/predefinedtask/deleteTask/${id}`);
      const res = await axios.delete(url, config());
      return { success: true, data: res.data }
  } catch (e) {
      return { success: false, msg: "Something went wrong"};
  }
}

export  async  function reviewtask(id,data) {
    try {
        const url = utils.hostURL(`admin/api/v1/predefinedtask/review/${id}`);
        const res = await axios.put(url, {review:data}, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activePredefinedTask(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/predefinedtask/activeTask/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function addPredefinedTaskInMentor(id, data) {
    try {
        const url = utils.hostURL(`admin/api/v1/addTaskInMentorList/${id}`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function addPredefinedTaskList(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/predefinedtask/add`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function getUserSearchByEmail(email) {
    try {
        const url = utils.hostURL(`admin/api/v1/getSearchByUser/${email}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function getMentorSearchByEmail(email) {
    try {
        const url = utils.hostURL(`admin/api/v1/getSearchByMentor/${email}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function getAllTaskEngagement() {
    try {
        const url = utils.hostURL(`admin/api/v1/taskEngagementList`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async  function getAllTaskEngagementCompleted(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/getMentorAssignTaskWithStatus/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

//userLoginAccess---->

export async function activeOrNot(id, data) {
    try {
        const url = utils.hostURL(`admin/api/v1/userLoginStatus/${id}`);
        const res = await axios.put(url, {data}, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

//category------------>
export async function addCategory(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/category/add`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function addSubCategory(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/subcategory/add`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}


export async function getSessions() {
    try {
        const url = utils.hostURL(`admin/api/v1/getSessions`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getInstructors() {
    try {
        const url = utils.hostURL(`admin/api/v1/getInstructor`);
        const res = await axios.get(url, config());
        // return { success: true, data: res.data };
        return { success: true, data: res }
    } catch (e) {
        return console.log("e",e)
        return { success: false, msg: "Something went wrong"};
    }
}

export async function addInstructors(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/addInstructor`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res }
    } catch (e) {
        return console.log("e",e);
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getBatches(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/getBatches/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return console.log("e",e)
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllTest() {
    try {
        const url = utils.hostURL(`admin/api/v1/getAllTest`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return console.log("e",e)
        return { success: false, msg: "Something went wrong"};
    }
}
export async function getRendomTest(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/getRendomTest/${data}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return console.log("e",e)
        return { success: false, msg: "Something went wrong"};
    }
}

export async function addTest(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/postTest`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res }
    } catch (e) {
        return console.log("e",e);
        return { success: false, msg: "Something went wrong"};
    }
}

export async function postMcqQuestion(testId,data) {
    try {
        const url = utils.hostURL(`admin/api/v1/postMcqQuestion/${testId}`);
        const res = await axios.put(url, data, config());
        return { success: true, data: res }
    } catch (e) {
        return console.log("e",e);
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeSession(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeSession/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteSession(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveSession/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeSessionMicroCourse(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeMicroCourse/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteSessionMicroCourse(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveMicroCourse/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeCategory(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeCategory/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteCategory(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveCategory/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeSubCategory(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeSubCategory/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteSubCategory(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveSubCategory/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeBlog(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeBlog/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteBlog(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveBlog/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeJobPosts(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeJobPost/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteJobPosts(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveJobPost/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeCodeCastStatus(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeCodeCast/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteCodeCast(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveCodeCast/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function activeFeed(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/activeFeed/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async  function deleteFeed(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/deActiveFeed/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function addBatches(id, data) {
    try {
        const url = utils.hostURL(`admin/api/v1/addBatches/${id}`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateBatches(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateBatches`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function removeBatch(id, batchId) {
    try {
        const url = utils.hostURL(`admin/api/v1/liveSession/${id}/removeBatches/${batchId}`);
        const res = await axios.put(url, {}, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createSessions(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/createLiveSession`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateSessions(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateLiveSession`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

//create iterator-------------------->>>>>

export async function createIterator(data) {
    try {
        const url = utils.hostURL(`admin/api/v1/createIterator`);
        const res = await axios.post(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateIterator(data,id) {
    try {
        const url = utils.hostURL(`admin/api/v1/editIterator/${id}`);
        const res = await axios.put(url, data, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getIteratorByBatch(batchId) {
    try {
        const url = utils.hostURL(`admin/api/v1/getIteratorByBatch/${batchId}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
export async function removeIterator(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/removeIterator/${id}`);
        const res = await axios.delete(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createFeed(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createFeed`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createJobPost(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createJobPost`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createExportGuidance(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createExpertGuidance`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getJobpostpromotionUser(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/getJobpostpromotionUser`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateJobPost(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateJobPost`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateExportGuidance(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateExportGuidance`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateCodeCast(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateCodeCast`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateFeed(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateFeed`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllFeed() {
    try {
        const url = utils.hostURL(`admin/api/v1/getFeed`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllMentorBio() {
    try {
        const url = utils.hostURL(`admin/api/v1/getMentorBio`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateMentor(record, id) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateMentor/${id}`);
        const res = await axios.put(url, record, config());
        return { success: true, data: res.data };
    }catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createMicroCourse(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createMicroCourse`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateMicroCourse(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateMicroCourse`);
        const res = await axios.put(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createCategory(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/category/add`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createSubCategory(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/subcategory/add`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createBlog(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createBlog`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createCodeCast(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createCodeCast`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateBlog(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateBlog`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllBlog() {
    try {
        const url = utils.hostURL(`admin/api/v1/getBlog`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllJobPost() {
    try {
        const url = utils.hostURL(`admin/api/v1/getJobPost`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getAllMicroCourse() {
    try {
        const url = utils.hostURL(`admin/api/v1/getMicroCourse`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data };
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function createLesson(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/createLesson`);
        const res = await axios.post(url, object, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function updateLesson(object) {
    try {
        const url = utils.hostURL(`admin/api/v1/updateLesson`);
        const res = await axios.put(url, object, config());
        return { success: res.data.success , message : res.data.msg}
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}

export async function getLessons(id) {
    try {
        const url = utils.hostURL(`admin/api/v1/getLessons/${id}`);
        const res = await axios.get(url, config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
}
