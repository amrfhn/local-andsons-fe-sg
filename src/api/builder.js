import axios from 'axios'

const builderUrl = 'https://cdn.builder.io/api/v2/content'
const builderAPIKey = '7c17d97c4de84c58b612f7dff4e421d6'
const builderConfig = {
  'userAttributes.brand': 'andsons',
  'userAttributes.locale': 'sg',
  'userAttributes.env': process.env.NODE_ENV || 'development'
}
export const getCategoryProducts = async (category) => {
  const params = {
    ...builderConfig,
    ...{
      'query.data.category': category
    }
  }
  const results = await axios.get(`${builderUrl}/category-page-products?apiKey=${builderAPIKey}`, {
    params,
    paramsSerializer: function paramsSerializer(params) {
      // "Hide" the `answer` param
      return Object.entries(Object.assign({}, params))
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    }
  })

  return results.data.results
}