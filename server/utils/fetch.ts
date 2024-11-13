import { $fetch } from "ofetch"
import { ProxyAgent } from "undici"

// export const myFetch = $fetch.create({
//   headers: {
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
//   },
//   timeout: 10000,
//   retry: 3,
// })

// 从环境变量中读取代理地址
const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY

// 根据是否有代理地址来创建配置
const myFetchOptions = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  },
  timeout: 5000,
  retry: 3
}

// 如果有代理地址，添加 dispatcher
if (proxyUrl) {
  myFetchOptions.dispatcher = new ProxyAgent(proxyUrl)
}

// 创建 $fetch 实例
export const myFetch = $fetch.create(myFetchOptions)
