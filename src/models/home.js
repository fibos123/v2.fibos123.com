import axios from "axios";
import _ from "lodash";
import config from "../config";

const getSites = async () => {
  const response = await axios.post(config.rpc_get_table_rows, JSON.stringify({
    json: "true",
    code: "fibos123comc",
    scope: "fibos123comc",
    table: "jsons",
    limit: 1,
    lower_bound: "sites",
  }))
  const string = _.get(response, "data.rows[0].text", "[]")
  const data = JSON.parse(string);
  return data
}

export { getSites };