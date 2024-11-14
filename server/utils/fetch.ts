import {$fetch} from "ofetch"
import {ProxyAgent} from "undici"

// export const myFetch = $fetch.create({
//   headers: {
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
//   },
//   timeout: 10000,
//   retry: 3,
// })

// 代理地址
const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY
export const myFetch = $fetch.create({
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    },
    retry: 3,
    timeout: 5000,
    dispatcher: proxyUrl ? new ProxyAgent(proxyUrl) : undefined
})
