<script lang="jsx">

import { forgotPassword } from "@/api/users";
import { trackForgotPasswordView } from '@/utils/analytics'
import Field from "../../../components/Field";
import Card from "../components/Card";

export default {
  data(){
    return{
      email: '',
      errors: '',
      successMessage: '',
    }
  },
  mounted() {
    trackForgotPasswordView()
  },
  render(){
    const onChange = (field) => (value) => {
      this[field] = value;
    };

    const onSubmit = (e) => {
      this.errors = '';
      this.successMessage = '';
      e.preventDefault();
      if(!this.email.trim()){
        this.errors = 'Field is required';
        return;
      }

      forgotPassword(this.email.trim()).then((response) => {
        this.successMessage  = response.data.userMessage;
      })
      .catch((error) => {
        this.errors = error.response.data.userMessage;
      })
    };

    return(
    <div class="container">
      <Card title="Trouble logging in?" on-submit={onSubmit}>
        <p class="subtitle tw-text-base tw-mb-5">Enter your email and we’ll send you a link to reset your password.</p>
        <Field
          id="text"
          type="text"
          label="Email"
          value={this.email}
          on-change={onChange("email")}
          hasError={!!this.errors}
          errorMessage={this.errors}
        />
        <p class="success-msg">{this.successMessage}</p>
        <button type="submit" class="submit-button tw-mt-0">Reset Password</button>
        <router-link to="/user/login" class="tw-text-center tw-mt-5 hover:tw-underline tw-font-medium">&larr;&nbsp;Back to login</router-link>
      </Card>
    </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 !important;
  padding-top: 8rem;
}
.btn-submit {
  cursor: pointer;
  display: table;
  text-transform: uppercase;
  padding: 1rem 1.8rem;
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
  color: #04c224;
  margin-top: 1.5rem;
}
</style>
