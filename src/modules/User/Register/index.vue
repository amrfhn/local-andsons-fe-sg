<script lang="jsx">
import * as UserService from '@/api/users'
import Checkbox from '@/components/Checkbox'
import Field from '@/components/Field'
import { tryStoreIdentities } from '@/services/identity'
import store from '@/store'
import { normalizedUserForInsider, trackSignUp, trackSignUpView } from '@/utils/analytics.js'
import { formatMetaTags } from '@/utils/prettify.js'
import _ from 'lodash'
import Card from '../components/Card'
import Remark from '../components/Remark'
import { requirements } from './helper'

export default {
  metaInfo() {
    return formatMetaTags({
      title: 'Register',
      urlPath: this.$route.path,
    })
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      subscribe: false,
      form: {
        email: {
          validatedMessage: '',
        },
      },
      errors: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        other: undefined,
      },
    }
  },
  created() {
    // Debounce validate email function
    this.debounceValidateEmail = _.debounce(async (email) => {
      await UserService.checkUserEmail(email)
        .then(() => {
          this.errors['email'] = undefined
          this.form.email.validatedMessage = 'Email available'
        })
        .catch((error) => {
          this.errors['email'] = error.message || 'Error in validating email'
        })
    }, 1000)
  },
  mounted() {
    trackSignUpView()
  },
  render() {
    const onChange = (field) => (value) => {
      this[field] = value
      this.errors[field] = undefined

      // Check email
      if (field == 'email') {
        this.debounceValidateEmail(value)
      }
    }
    const onSubmit = async (e) => {
      e.preventDefault()

      if (!this.firstName.trim()) {
        this.errors.firstName = 'First name (as per national ID) is required'
        return
      }

      if (!this.lastName.trim()) {
        this.errors.lastName = 'Last name (as per national ID) is required'
        return
      }

      if (!this.email.trim()) {
        this.errors.email = 'Email is required'
        return
      }

      try {
        // Old flow: Check Email Again Before Submit
        await UserService.checkUserEmail(this.email)

        // Sign User Up
        const response = await UserService.userSignup({
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
          first_name: this.firstName,
          last_name: this.lastName,
          send_offers: this.subscribe ? 1 : 0,
          remember_me: 0,
        })

        const accessToken = `Bearer ${response.data.response.token}`
        const userProfile = response.data.response.user
        const insiderUserObject = await normalizedUserForInsider(userProfile)

        localStorage.setItem('andsons_token', accessToken)
        localStorage.setItem('andsons_insiderUserObject', JSON.stringify(insiderUserObject))

        localStorage.removeItem('andsons_tmp_token')

        store.commit('updateAuthenticated', true)
        store.commit('updateUserProfile', userProfile)

        // commit new updates to our identities map.
        await tryStoreIdentities()

        trackSignUp(window, userProfile, insiderUserObject)

        const path = determinePostSignUpRoute(this.$route.query)
        this.$router.push(path)
      } catch (error) {
        const errorMessage = error?.response?.data?.userMessage || error.message
        if (!errorMessage) {
          return
        }

        // Send custom GTM event
        window?.dataLayer?.push({
          event: 'user-signup-fail',
          method: 'email',
          'validation-error': errorMessage,
        })

        // Check if error message relate to email
        if (errorMessage.toLowerCase().includes('email')) {
          this.errors['email'] = errorMessage
        }
        else {
          // General form error message
          this.errors.other = errorMessage
        }
      }
    }

    function determinePostSignUpRoute(query) {
      if (query?.redirect !== undefined) {
        return decodeURIComponent(query.redirect)
      }

      if (query?.fromCheckout !== undefined) {
        return { name: 'Checkout' }
      }

      if (query?.fromEvaluation !== undefined) {
        return `/product/${query.fromEvaluation}/select`
      }

      return '/'
    }

    const passwordValidations = requirements.map((requirement) => {
      return {
        title: requirement.title,
        valid: requirement.regex.test(this.password),
      }
    })
    const passwordValidated = passwordValidations.every(
      ({ valid }) => valid === true,
    )

    let cardTitle = 'Create an account'
    if (this.$route.query['fromEvaluation'] !== undefined) {
      cardTitle = 'Create an account to view your treatment options'
    }

    return (
      <Card title={cardTitle} on-submit={onSubmit} isLoginRegister>
        {/* Form Error message block */}
        {this.errors.other && (
          <div
            class="tw-p-4 tw-mb-2 tw-text-sm tw-text-red-700 tw-bg-red-100 tw-rounded-lg tw-dark:bg-red-200 tw-dark:text-red-800"
            role="alert"
          >
            <span class="tw-font-medium">Submission Error</span>&nbsp;
            {this.errors.other}
          </div>
        )}

        <div class="full-name-wrapper">
          <Field
            label="First Name (as per national ID)"
            id="firstName"
            type="text"
            value={this.firstName}
            on-change={onChange('firstName')}
            hasError={!!this.errors.firstName}
            errorMessage={this.errors.firstName}
          />
          <Field
            label="Last Name (as per national ID)"
            id="lastName"
            type="text"
            value={this.lastName}
            on-change={onChange('lastName')}
            hasError={!!this.errors.lastName}
            errorMessage={this.errors.lastName}
          />
        </div>
        <Field
          label="Email"
          id="email"
          type="email"
          value={this.email}
          on-change={onChange('email')}
          hasError={!!this.errors.email}
          errorMessage={this.errors.email}
          validatedMessage={this.form.email.validatedMessage}
        />
        <Field
          label="Password"
          id="password"
          type="password"
          value={this.password}
          on-change={onChange('password')}
          hasError={this.password == '' ? false : !passwordValidated}
          autoComplete="new-password"
        />
        {this.password !== '' && (
          <div class="password-remark tw-pb-5">
            <ul class="password-rules tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-1">
              {this.password !== '' &&
                passwordValidations.map(({ title, valid }, i) => (
                  <li key={i}>
                    <div
                      class={`password-validate tw-transition-all tw-duration-500 tw-flex tw-items-center ${valid ? 'tw-text-green-600' : 'tw-text-gray-400'
                        }`}
                    >
                      <font-awesome-icon icon="circle" />
                    </div>
                    <div
                      class={`tw-flex tw-transition-all tw-duration-500 tw-items-center ${valid ? '' : 'tw-text-gray-400'
                        }`}
                    >
                      {title}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <Checkbox
          id="subscribe"
          value={this.subscribe}
          checked={this.subscribe}
          label="Send me exclusive newsletters and offers"
          on-checked={onChange('subscribe')}
        />
        <button
          type="submit"
          class="submit-button tw-mt-5"
          disabled={
            !passwordValidated ||
            Object.values(this.errors).some((e) => e !== undefined)
          }
        >
          Register
        </button>
        <Remark text="By creating an account, you agree to" />
      </Card>
    )
  },
}
</script>
<style lang="scss" scoped>
.password-remark {
  margin: 0 0;

  .password-remark-title {
    display: flex;

    &:before {
      content: '';
      background: url('../../../assets/images/notice.svg') no-repeat center;
      background-size: contain;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  .password-rules {
    margin-left: 0px;

    li {
      padding: 0;
      list-style-type: none;
      display: flex;
      align-items: center;

      .password-validate {
        width: 16px;
        height: 16px;
        line-height: 16px;
      }

      svg {
        font-size: 0.65rem;
      }

      &.valid {
        color: #000;

        svg {
          font-size: 0.65rem;
        }
      }
    }
  }
}

.full-name-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .field-wrapper {
    width: 48%;
    margin-top: 0;
  }
}

.submit-button {
  text-transform: capitalize;

  &:disabled {
    opacity: 0.5;
  }
}
</style>
