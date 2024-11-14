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
/**
 *
 * @param url 请求地址
 * @param options 请求选项
 * @param useProxy 使用代理，默认：false不使用
 */
export const myFetch = (url: any, options = {}, useProxy = false) => {
    // 判断参数个数和类型来决定是否启用代理
    if (typeof options === 'boolean') {
        // 如果 options 是 boolean，说明是调用 myFetch(url, useProxy)
        useProxy = options;
        options = {};
    }
    return $fetch(url,
        {
            ...options,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            },
            retry: 3,
            timeout: 5000,
            dispatcher: useProxy && proxyUrl ? new ProxyAgent(proxyUrl) : undefined,
        }
    )
}
