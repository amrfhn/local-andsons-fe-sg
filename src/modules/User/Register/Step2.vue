<style lang="scss" scoped>
ul {
  margin-left: 0;
}
.password-remark {
  margin: 16px 0;
  .password-remark-title {
    display: flex;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    &:before {
      content: '';
      background: url('../../../assets/images/notice.svg') no-repeat center;
      background-size: contain;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    @media screen and (max-width: 410px) {
      font-size: 1rem;
    }
  }
  .password-rules {
    padding-left: 24px;
    li {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
      padding: 0;
      list-style-type: none;
      color: #d85639;
      display: flex;
      align-items: center;
      margin: 8px 0;

      @media screen and (max-width: 410px) {
        font-size: 0.8rem;
      }
      .password-validate {
        width: 16px;
        height: 16px;
        line-height: 16px;
        @media screen and (max-width: 615px) {
          margin-right: 1em;
        }
      }
      svg {
        font-size: 0.75rem;
      }
      &.valid {
        color: #000;
        svg {
          font-size: 0.625rem;
        }
      }
    }
  }
}
</style>

<script lang="jsx">
import classnames from "classnames";
import Field from "../../../components/Field";
import Checkbox from "../../../components/Checkbox";

export default {
  props: [
    "password",
    "confirmPassword",
    "passwordValidations",
    "passwordValidated",
  ],
  render() {
    const onChange = (field) => (value) => {
      this.$emit("change", field, value);
    };
    return (
      <div>
        <Field
          label="Password"
          id="password"
          type="password"
          value={this.password}
          on-change={onChange("password")}
          hasError={this.password == '' ? false : !this.passwordValidated}
          autoComplete="new-password"
        />
          {
            this.password !== '' && (
              <div class="password-remark">
                <div class="password-remark-title">Password requirements:</div>
                <ul class="password-rules">
                  {
                    (this.password !== '' && this.passwordValidations.map(({ title, valid }, i) => (
                      <li key={i} class={classnames({ valid: valid })}>
                      <div class="password-validate">
                        {valid ? (
                          <font-awesome-icon icon={["fas", "check"]} />
                        ) : (
                          <font-awesome-icon icon={["fas", "times"]} />
                        )}
                      </div>
                      {title}
                    </li>
                    )))
                  }
                </ul>
              </div>
            )
          }
        {
          // <Field
          //   label="Confirm Password"
          //   id="confirmPassword"
          //   type="password"
          //   value={this.confirmPassword}
          //   on-change={onChange("confirmPassword")}
          //   hasError={this.password !== this.confirmPassword}
          //   errorMessage={
          //     this.password !== this.confirmPassword
          //       ? "Passwords do not match"
          //       : undefined
          //   }
          //   autoComplete="new-password"
          // />
        }
        <Checkbox
          id="keepMeSignedIn"
          label="Keep me signed in"
          on-checked={onChange("keepMeSignedIn")}
        />
        <Checkbox
          id="subscribe"
          label="Send me exclusive newsletters and offers"
          on-checked={onChange("subscribe")}
        />
      </div>
    );
  },
};
</script>
