<style lang="scss" scoped>
.submit-button {
  text-transform: capitalize;
}
</style>
<script lang="jsx">
import { userLogin } from '@/api/users'
import Field from '@/components/Field'
import { tryStoreIdentities } from '@/services/identity'
import store from '@/store'
import { normalizedUserForInsider, trackLogin, trackLoginView } from '@/utils/analytics'
import { formatMetaTags } from '@/utils/prettify.js'
import Card from '../components/Card'
import Remark from '../components/Remark'

export default {
  metaInfo() {
    return formatMetaTags({
      title: 'Login',
      urlPath: this.$route.path,
    })
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: undefined,
        password: undefined,
      },
    };
  },
  mounted() {
    trackLoginView()
  },
  render() {
    const onChange = (field) => (value) => {
      this[field] = value;
    }

    const onSubmit = async (e) => {
      e.preventDefault();

      if (!this.email.trim()) {
        this.errors.email = 'Email is required';
        return;
      }

      if (!this.password.trim()) {
        this.errors.password = 'Password is required';
        return;
      }

      try {
        const response = await userLogin({ email: this.email, password: this.password })
        const accessToken = `Bearer ${response.data.response.token}`
        const { user } = response.data.response

        localStorage.setItem('andsons_token', accessToken)
        localStorage.removeItem('andsons_tmp_token')

        store.commit('updateUserProfile', user)
        store.commit('updateAuthenticated', true)

        // commit new updates to our identities map.
        await tryStoreIdentities()

        const insiderUserObject = await normalizedUserForInsider(response.data.response.user, true)
        localStorage.setItem('andsons_insiderUserObject', JSON.stringify(insiderUserObject))

        trackLogin(window, user, insiderUserObject)

        const path = determinePostLoginRoute(this.$route.query)
        this.$router.push(path)
      } catch (error) {
        // send custom GTM event
        window?.dataLayer?.push({
          event: 'user-login-fail',
          method: 'email',
          'validation-error': error.response.data.userMessage
        });

        this.errors.password = error.response.data.userMessage;
      }
    }

    function determinePostLoginRoute(query) {
      if (query?.redirect !== undefined) {
        return decodeURIComponent(query.redirect)
      }

      if (query?.fromCheckout !== undefined) {
        return '/checkout'
      }

      if (query?.fromEvaluation !== undefined) {
        return `/product/${query.fromEvaluation}/select`
      }

      return '/'
    }

    let cardTitle = 'Login to continue'

    if (this.$route.query['fromEvaluation'] !== undefined) {
      cardTitle = 'Login to view treatment plans'
    }

    return (
      <Card title={cardTitle} on-submit={onSubmit} isLoginRegister>
        <Field
          style='margin-top:0px !important'
          id='email'
          type='email'
          label='Email'
          value={this.email}
          on-change={onChange('email')}
          hasError={!!this.errors.email}
          errorMessage={this.errors.email}
        />
        <Field
          id='password'
          type='password'
          label='Password'
          value={this.password}
          on-change={onChange('password')}
          hasError={!!this.errors.password}
          errorMessage={this.errors.password}
          autoComplete='new-password'
        />
        <router-link to='/user/forgot-password' class='forgot-password hover:tw-underline'>Forgot password?</router-link>
        <button class='submit-button tw-mt-5' type='submit'>
          Login
        </button>
        <Remark text='By logging in, you agree to' />
      </Card>
    );
  },
};
</script>
