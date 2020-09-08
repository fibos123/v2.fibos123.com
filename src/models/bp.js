import axios from "axios";
import _ from "lodash";
import config from "../config";
import chainUtil from "../utils/chainUtil";

class Bp {

  bpList = [
    {
      logo: "",
      candidate_name: "",
      owner: "",
      status: "",
      weight_percent: "",
      staked: "",
      claim_rewards_total: "",
      claim_rewards_unreceived: "",
      urlFull: "",
      urlSimple: "",
      json: {}
    }
  ]

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

  global = {
    max_block_net_usage: 1048576,
    target_block_net_usage_pct: 1000,
    max_transaction_net_usage: 524288,
    base_per_transaction_net_usage: 12,
    net_usage_leeway: 500,
    context_free_discount_net_usage_num: 20,
    context_free_discount_net_usage_den: 100,
    max_block_cpu_usage: 200000,
    target_block_cpu_usage_pct: 1000,
    max_transaction_cpu_usage: 150000,
    min_transaction_cpu_usage: 100,
    max_transaction_lifetime: 3600,
    deferred_trx_expiration_window: 600,
    max_transaction_delay: 3888000,
    max_inline_action_size: 4096,
    max_inline_action_depth: 4,
    max_authority_depth: 6,
    max_ram_size: "199763255296",
    total_ram_bytes_reserved: "7091135259",
    total_ram_stake: "37320507138",
    last_producer_schedule_update: "2020-09-08T09:21:33.000",
    last_pervote_bucket_fill: "1599554495000000",
    pervote_bucket: 214167335,
    perblock_bucket: 426453692,
    total_unpaid_blocks: 1025092,
    total_activated_stake: "4209537719639",
    thresh_activated_stake_time: "1535423967000000",
    last_producer_schedule_size: 21,
    total_producer_vote_weight: "56041023454303567872.00000000000000000",
    last_name_close: "2000-01-01T00:00:00.000"
  }

  producers = [
    {
      owner: "fibos123comm",
      total_votes: "1276764008683507200.00000000000000000",
      producer_key: "FO6MzV92DgYjwDa7K3rtc28dPhGt2Gy8oUoHjESUq4gBx63v8num",
      is_active: 1,
      url: "https://www.fibos123.com",
      unpaid_blocks: 0,
      last_claim_time: "1599481811500000",
      location: 1
    }
  ]

  producerJson = [
    {
      owner: "fibos123comm",
      json: "{\"producer_account_name\":\"fibos123comm\",\"org\":{\"candidate_name\":\"FIBOS123\",\"website\":\"https://www.fibos123.com\",\"email\":\"bp@fibos123.com\",\"branding\":{\"logo_256\":\"https://www.fibos123.com/public/images/logo_256.png\"},\"location\":{\"name\":\"Tokyo\",\"country\":\"JP\",\"latitude\":35.7015201,\"longitude\":139.6741876}},\"nodes\":[{\"location\":{\"name\":\"HongKong\",\"country\":\"CN\",\"latitude\":22.336271,\"longitude\":114.1736643},\"node_type\":\"producer\",\"p2p_endpoint\":\"\",\"api_endpoint\":\"\",\"ssl_endpoint\":\"\"},{\"location\":{\"name\":\"HongKong\",\"country\":\"CN\",\"latitude\":22.336271,\"longitude\":114.1736643},\"node_type\":\"full\",\"api_endpoint\":\"http://rpc-mainnet.fibos123.com\",\"ssl_endpoint\":\"https://rpc-mainnet.fibos123.com\"},{\"location\":{\"name\":\"HongKong\",\"country\":\"CN\",\"latitude\":22.336271,\"longitude\":114.1736643},\"node_type\":\"seed\",\"p2p_endpoint\":\"p2p-mainnet.fibos123.com:9977\",\"bnet_endpoint\":\"\"}]}"
    }
  ]

  account = { account_name: "fibos123comm", head_block_num: 126811622, head_block_time: "2020-09-08T13:18:43.500", privileged: false, last_code_update: "1970-01-01T00:00:00.000", created: "2018-08-31T05:58:13.500", ram_quota: 46230, net_weight: 101000, cpu_weight: 101000, net_limit: { used: 16678, available: 20638416, max: 20655094 }, cpu_limit: { used: 51841, available: 1640750, max: 1692591 }, ram_usage: 5685, permissions: [{ perm_name: "active", parent: "owner", required_auth: { threshold: 1, keys: [{ key: "FO6MzV92DgYjwDa7K3rtc28dPhGt2Gy8oUoHjESUq4gBx63v8num", weight: 1 }], accounts: [], waits: [] } }, { perm_name: "owner", parent: "", required_auth: { threshold: 1, keys: [{ key: "FO6MzV92DgYjwDa7K3rtc28dPhGt2Gy8oUoHjESUq4gBx63v8num", weight: 1 }], accounts: [], waits: [] } }], total_resources: { owner: "fibos123comm", net_weight: "10.1000 FO", cpu_weight: "10.1000 FO", ram_bytes: 44830 }, self_delegated_bandwidth: { from: "fibos123comm", to: "fibos123comm", net_weight: "10.0000 FO", cpu_weight: "10.0000 FO" }, refund_request: null, voter_info: { owner: "fibos123comm", proxy: "", producers: [], staked: 200000, last_vote_weight: "104857600000.00000000000000000", proxied_vote_weight: "0.00000000000000000", is_proxy: 0 } }

  timer = ""

  getInfo = async () => {
    const response = await axios.get(config.rpc_get_info)
    const data = _.get(response, "data", {})
    this.info = data;
    return data
  }

  getGlobal = async () => {
    const response = await axios.post(config.rpc_get_table_rows, JSON.stringify({
      code: "eosio",
      json: true,
      limit: 1,
      scope: "eosio",
      table: "global"
    }))
    const data = _.get(response, "data.rows[0]", {})
    this.global = data;
    return data
  }

  getProducers = async () => {
    const response = await axios.post(config.rpc_get_table_rows, JSON.stringify({
      scope: "eosio",
      code: "eosio",
      table: "producers",
      json: true,
      limit: 100,
      key_type: "float64",
      index_position: 2,
    }))
    const data = _.get(response, "data.rows", [])
    this.producers = data;
    return data
  }

  getProducerJson = async () => {
    const response = await axios.post(config.rpc_get_table_rows, JSON.stringify({
      json: true,
      code: "producerjson",
      scope: "producerjson",
      table: "producerjson",
      limit: 1000
    }))
    const data = _.get(response, "data.rows", [])
    this.producerJson = data;
    return data
  }

  getAccount = async (id) => {
    const response = await axios.post(config.rpc_get_account, JSON.stringify({ account_name: id }))
    const data = _.get(response, "data", {})
    return data
  }


  init = async () => {
    await Promise.all([this.getGlobal(), this.getProducers(), this.getProducerJson()]).then();
    this.generateBpList()
    this.start();
  }

  start() {
    this.timer = setInterval(this.getInfo, 1000);
  }

  unmount() {
    clearInterval(this.timer);
  }

  generateBpList() {
    this.bpList = this.producers
    this.bpList.map((item, index) => {
      item.staked = parseInt(chainUtil.votesToStaked(item.total_votes)).toLocaleString()
      const claimRewards = chainUtil.getClaimRewards(item, this.global, index + 1)
      item.claim_rewards_total = parseInt(claimRewards.total).toLocaleString()
      item.claim_rewards_unreceived = parseInt(claimRewards.unreceived).toLocaleString()
      item.weight_percent = ((item.total_votes / this.global.total_producer_vote_weight) * 100).toFixed(3)
      item.urlFull = ""
      item.urlSimple = ""
      try {
        const url = new URL(item.url).origin;
        if (url) {
          item.urlFull = item.url
          item.urlSimple = url
        }
      } catch (err) { console.info(err) }

      item.json = null
      const jsonFile = this.producerJson.find(item2 => item2.owner === item.owner)
      if (jsonFile) {
        try {
          const json = JSON.parse(jsonFile.json)
          item.candidate_name = _.get(json, "org.candidate_name", "")
          const logo = _.get(json, "org.branding.logo_256")
          if (logo && logo.substring(0, 8) === "https://") {
            item.logo = logo
          }
          item.json = json
        } catch (err) { console.info(err) }
      }
      return item
    })
  }

}

export default Bp;