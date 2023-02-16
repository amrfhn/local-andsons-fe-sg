import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

if (process.env.VUE_APP_ENVIRONMENT !== 'development') {
  Sentry.init({
    Vue,
    environment: process.env.VUE_APP_ENVIRONMENT,
    release: process.env.VUE_APP_SENTRY_RELEASE,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: process.env.VUE_APP_ENVIRONMENT === 'production' ? 0.2 : 1,
    tracingOptions: {
      trackComponents: true
    },
    // Vue specific
    logErrors: process.env.VUE_APP_ENVIRONMENT !== 'production',
    attachProps: true,
    attachStacktrace: true
  })
}
