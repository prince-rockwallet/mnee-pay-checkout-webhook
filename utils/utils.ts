export const getMneePayCheckoutBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-dev-mnee-checkout.rockwallet.net'
}