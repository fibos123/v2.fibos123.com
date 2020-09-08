import axios from "axios";
import _ from "lodash";
import Bp from "./bp";

class Pointer {

  bp = ""

  point = "/v1/chain/get_info"

  list = [
    // {
    //   owner: '',
    //   api_endpoint: '',
    //   ssl_endpoint: '',
    //   p2p_endpoint: '',
    //   number: 0,
    //   version: 0,
    //   status: '' // waiting success fail notset
    // }
  ]

  constructor() {
    this.bp = new Bp();
  }

  getProducerJson = async () => {
    this.list = await this.bp.getProducerJson();
    this.list.map(item => {
      item.api_endpoint = ""
      item.ssl_endpoint = ""
      item.p2p_endpoint = ""
      item.number = ""
      item.version = ""
      item.status = "waiting"
      try {
        item.json = JSON.parse(item.json)
      } catch (err) { console.info(err) }

      const full = _.get(item.json, "nodes", []).find(item2 => item2.ssl_endpoint)
      if (full && full.ssl_endpoint.substring(0, 8) === "https://") {
        item.api_endpoint = full.api_endpoint ? full.api_endpoint : ""
        item.ssl_endpoint = full.ssl_endpoint
      } else {
        item.status = "notset"
      }

      const seed = _.get(item.json, "nodes", []).find(item2 => item2.p2p_endpoint)
      if (seed) {
        item.p2p_endpoint = seed.p2p_endpoint
      }

      return item
    })
    this.checkStatus()
  }

  checkStatus = async () => {
    this.list.filter(item => item.status === "waiting").map(async item => {
      try {
        const response = await axios.get(item.ssl_endpoint + this.point, { timeout: 2000 })
        item.number = _.get(response, "data.head_block_num", "")
        item.number = parseInt(item.number).toLocaleString()
        item.version = _.get(response, "data.server_version_string", "")
        if (item.number) {
          item.status = "success"
        } else {
          item.status = "fail"
        }
        this.list = _.orderBy(this.list, ["number", "version", "status", "owner"], ["desc", "desc", "asc", "asc"])
      } catch (err) {
        console.info(err)
        item.status = "fail"
        this.list = _.orderBy(this.list, ["number", "version", "status", "owner"], ["desc", "desc", "asc", "asc"])
      }
    })
  }

}

export default Pointer;