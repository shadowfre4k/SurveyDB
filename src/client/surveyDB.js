import axios from "axios";

export async function saveSurvey(surveyEntry) {
  var result = await axios
    .post(
      "https://jp77brp0fe.execute-api.us-west-1.amazonaws.com/dev/food-survey",
      {
        foodType: surveyEntry.foodType,
        recommend: surveyEntry.recommend,
        rating: surveyEntry.rating,
      }
    )
    .then((response) => {
      return response.data;
    });
  return result;
}

export async function loadSurvey() {
  var result = await axios
    .get(`https://jp77brp0fe.execute-api.us-west-1.amazonaws.com/dev/test2`)
    .then((response) => {
      return response.data;
    });
  return result;
}
