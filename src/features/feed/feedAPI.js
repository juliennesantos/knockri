import axios from "axios"
// A mock function to mimic making an async request for data
export async function fetchCandidates() {
  return await axios.get("http://localhost:3010/candidates")
}
export async function fetchQuestions() {
  return await axios.get("http://localhost:3010/questions")
}
export async function fetchApplications() {
  return await axios.get("http://localhost:3010/applications")
}
export async function addComment(data) {
  console.log(data);
  return await axios.request({
    url: `http://localhost:3010/applications/${data.id}`,
    method: "PUT",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
