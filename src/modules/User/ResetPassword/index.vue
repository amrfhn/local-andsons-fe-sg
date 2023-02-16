<script lang="jsx">

import { resetPassword } from "@/api/users";
import { trackResetPasswordView } from '@/utils/analytics';
import Field from "../../../components/Field";
import Card from "../components/Card";

export default {
  data() {
    return {
      email: this.$route.query.email,
      token: this.$route.query.token,
      password: '',
      passwordConfirm: '',
      errors: '',
      successMessage: '',
    }
  },
  mounted() {
    trackResetPasswordView()
  },
  render() {
    const onChange = (field) => (value) => {
      this[field] = value;
    };

    const onSubmit = (e) => {
      this.errors = '';
      this.successMessage = '';
      e.preventDefault();
      if (!this.password || !this.passwordConfirm) {
        this.errors = 'Field is required';
        return;
      }

      const params = {
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.passwordConfirm
      }

      resetPassword(params).then((response) => {
        this.successMessage = response.data.userMessage;

        // Go back to index page
        setTimeout(() => this.$router.push({ name: 'Landing' }), 1500);
      })
        .catch((error) => {
          this.errors = error.response.data.userMessage;
        })
    };

    return (
      <Card title="Reset password" on-submit={onSubmit}>
        <p class="subtitle">Enter your new password.</p>
        <Field
          id="text"
          type="password"
          label="Password"
          value={this.password}
          on-change={onChange("password")}
          hasError={!!this.errors}
          errorMessage={this.errors}
        />
        <Field
          id="text"
          type="password"
          label="Confirm password"
          value={this.passwordConfirm}
          on-change={onChange("passwordConfirm")}
          hasError={!!this.errors}
          errorMessage={this.errors}
        />
        <p class="success-msg">{this.successMessage}</p>
        <button type="submit" class="btn-submit">SUBMIT</button>
        <div class="back-to-login">Back to <router-link to="/user/login">login</router-link></div>
      </Card>


    )
  }
}
</script>

<style lang="scss" scoped>
.btn-submit {
  cursor: pointer;
  margin-top: 5rem;
  display: table;
  text-transform: uppercase;
  padding: 1rem 1.8rem;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: black;
  color: white;
  border: 1px solid black;
  font-family: 'PublicSansExtraBold', sans-serif;
  text-decoration: none;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: transparent;
    color: black;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
    padding: 1rem 2rem;
  }
}

.success-msg {
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
  color: #04c224;
  margin-top: 1.5rem;
}

.back-to-login {
  text-align: center;
  padding: 1rem 0;
  font-size: 1.125rem;
}
</style>
