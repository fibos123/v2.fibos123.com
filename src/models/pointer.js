import axios from "axios";
import _ from "lodash";
import Bp from "./bp";

class Pointer {

  bp = ""

  point = "/v1/chain/get_info"

  info = {
    server_version: "14a65aca",
    chain_id: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    head_block_num: 126784987,
    last_irreversible_block_num: 126784661,
    last_irreversible_block_id: "078e94956b254d5714d078c9dae6cf6484e0fc93d0a2c30fd4fe3b3e51138b75",
    head_block_id: "078e95db24c28d6ada179c52ba9817347321b6bc84dbee8cd6553b742819dcc0",
    head_block_time: "2020-09-08T09:35:48.500",
    head_block_producer: "fibtothemoon",
    virtual_block_cpu_limit: 200000000,
    virtual_block_net_limit: 1048576000,
    block_cpu_limit: 199900,
    block_net_limit: 1048576,
    server_version_string: "v1.7.1.11"
  }

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
        const response = await axios.get(item.ssl_endpoint + this.point)
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