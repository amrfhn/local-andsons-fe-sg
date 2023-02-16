const titleize = (string) => {
  let titleArray = string.split('-')
  titleArray = titleArray.map((title) => title[0].toUpperCase() + title.substring(1))
  return titleArray.join(' ')
}

const formatMetaTags = ({ title, titleTemplate, description, urlPath, image, metaTitleContent }) => {
  const fallbackTitle = 'Reimagining Men’s Health'
  const fallbackDesc =
    'We’re solving age-old problems with 21st century solutions, making it easier for men to actively take care of their health and wellbeing.'
  return {
    title,
    titleTemplate: titleTemplate ?? '%s | andSons SG',
    description,
    link: [
      {
        rel: 'canonical',
        href: `${process.env.VUE_APP_LINK}${urlPath ? urlPath.replace(/^\//, '') : ''}`
      }
    ],
    meta: [
      {
        name: 'title',
        content: metaTitleContent ?? `${title ?? fallbackTitle} | andSons SG`
      },
      { name: 'description', content: description ?? fallbackDesc },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: `${process.env.VUE_APP_LINK}${urlPath ? urlPath.replace(/^\//, '') : ''}`
      },
      {
        property: 'og:title',
        content: metaTitleContent ?? `${title ?? fallbackTitle} | andSons SG`
      },
      {
        property: 'og:description',
        content: description ?? fallbackDesc
      },
      {
        property: 'og:image',
        content: image ?? '/andsons_meta_img.jpg'
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:url',
        content: `${process.env.VUE_APP_LINK}${urlPath.replace(/^\//, '')}`
      },
      {
        property: 'twitter:title',
        content: metaTitleContent ?? `${title ?? fallbackTitle} | andSons SG`
      },
      {
        property: 'twitter:description',
        content: description ?? fallbackDesc
      },
      {
        property: 'twitter:image',
        content: image ?? '/andsons_meta_img.jpg'
      }
    ]
  }
}

export { titleize, formatMetaTags }
