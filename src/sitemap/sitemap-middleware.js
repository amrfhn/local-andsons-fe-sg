const axios = require('axios')
const fs = require('fs')
// const dotenv = require("dotenv");
// dotenv.config({ path: __dirname + "/./../../.env.production" });
const baseURL = 'https://resource.andsons.com.sg'

const routes = require('./static-routes')
const medicalTeam = require('../data/medicalTeam.json')
const categoriesUtils = require('../utils/categories')

async function generateSitemap() {
  const links = []
  const categoryLinks = []
  const productLinks = []
  const categories = await getCategoriesSlugs().then((response) => {
    return response.data.response.categories.filter((category) => !category.name.toLowerCase().includes('coming'))
  })

  const genericLinks = getVueRoutes()

  const medicalTeamLinks = medicalTeam.members.map((e) => `${routes.paths.MEDICALTEAM}/${e.path}`)

  for (const category of categories) {
    const productSlugs = await getProductSlugs({
      type: 'ALL',
      category_id: category.id
    })
    productLinks.push(
      ...productSlugs.data.response.data.map((data) => {
        return '/product/' + data.slug
      })
    )
    if (categoriesUtils.hrefMap[category.id]) {
      categoryLinks.push(categoriesUtils.hrefMap[category.id].split('#')[0])
    }
  }

  links.push(...genericLinks)
  links.push(...medicalTeamLinks)
  links.push(...productLinks)
  links.push(...categoryLinks)

  var seen = {} // Filter out repetition.
  writeSlugsToSitemap(
    links.filter((item) => (Object.prototype.hasOwnProperty.call(seen, item) ? false : (seen[item] = true)))
  )
}

function getVueRoutes() {
  const vueRoutes = Object.values(routes.paths)
  return vueRoutes
}

function getProductSlugs(params) {
  return axios.get(baseURL + '/api/v1/products', { params })
}

function getCategoriesSlugs(params) {
  return axios.get(baseURL + '/api/v1/categories', { params })
}

function writeSlugsToSitemap(routes) {
  try {
    fs.writeFileSync(
      './public/sitemap.json',
      JSON.stringify({
        routes: routes
      }),
      'utf-8'
    )
  } catch (err) {} //eslint-disable-line no-empty
}

generateSitemap()
