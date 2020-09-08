import axios from "axios";
import _ from "lodash";
import config from "../config";

const getBpStatus = async () => {
  const response = await axios.get(config.api_bp_status)
  const data = _.get(response, "data", [])
  return data
}

export { getBpStatus };