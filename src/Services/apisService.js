import axios from "axios";
const appUrl=process.env.REACT_APP_URL;

export function getapis() {
  return axios.get(appUrl+"apis");
}

export async function getFile(filename) {
  try {
 
    const response = await axios.get(`${appUrl}apis/getfile?filename=${filename}`, { responseType: "blob" });
    if (response.data.error) {
      console.error(response.data.error);
    }

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    // const fileName = response.headers['content-disposition'].substring(22, 52);
    fileLink.setAttribute("download", filename);
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  } catch (error) {
    throw error;
  }
}