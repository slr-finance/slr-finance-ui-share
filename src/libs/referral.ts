import Cookies from 'js-cookie'

export const REFERRER_QUERY_PARAM = 'r'
export const REFERRER_STORAGE_NAME = 'slr-finance-referrer'
export const AddressZero = '0x0000000000000000000000000000000000000000'

const isAddress = (address: string) => {
  return address.match(/^(0x)?[0-9a-fA-F]{40}$/) !== null
}

export const initReferral = () => {
  let referrer: string | undefined | null = Cookies.get(REFERRER_STORAGE_NAME)
  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)

  if (!referrer || !isAddress(referrer)) {
    referrer = searchParams.get(REFERRER_QUERY_PARAM)

    if (referrer && isAddress(referrer)) {
      Cookies.set(REFERRER_STORAGE_NAME, referrer, { sameSite: 'Strict', secure: true, domain: '.slr.finance', expires: 90 })
    } else {
      referrer = null
    }
  }

  searchParams.delete(REFERRER_QUERY_PARAM)
  url.search = searchParams.toString()

  window.history.replaceState({}, '', `${url.pathname.toString()}${url.search}`)
}

export const getReferrerFromCookies = (): string => {
  let referrer: string | undefined = Cookies.get(REFERRER_STORAGE_NAME)
  referrer = referrer && isAddress(referrer) ? referrer : AddressZero

  return referrer
}
