import { useEffect } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"
import { useToast } from "./useToast"

const intervalMS = 60 * 60 * 1000
export function usePWA() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  }
  = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (r) {
        setInterval(async () => {
          if (r.installing || !navigator) return

          if ("connection" in navigator && !navigator.onLine) return

          const resp = await fetch(swUrl, {
            cache: "no-store",
            headers: {
              "cache": "no-store",
              "cache-control": "no-cache",
            },
          })

          if (resp?.status === 200) await r.update()
        }, intervalMS)
      }
    },
  })
  const toaster = useToast()

  useEffect(() => {
    if (needRefresh) {
      toaster("网站有更新，点击更新", {
        action: {
          label: "更新",
          onClick: () => updateServiceWorker(true),
        },
        onDismiss: () => updateServiceWorker(true),
      })
    }
  }, [needRefresh, updateServiceWorker, setNeedRefresh, toaster])
}
