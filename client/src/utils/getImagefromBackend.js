import newRequest from "../utils/newRequest";

async function getImageFromBackend(filename) {
  try {
    // console.log(filename);
    const response = await newRequest.get(`${filename}`);
    const imageDataUrl = response.data;
    // console.log("output getImagefromBackend",imageDataUrl);
    return imageDataUrl;
  } catch (error) {
    // console.error("Error fetching image:", error);
    return null;
  }
}

export default getImageFromBackend;