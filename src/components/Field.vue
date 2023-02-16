<style lang="scss" scoped>
.field {
  position: relative;
  border: 1px solid #000;
  height: 50px;
  line-height: 1;

  &.has-error {
    border-color: #d85639;
  }
  &.valid {
    border-color: #23dc3d;
  }

  label {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #b7b7b7;
    top: 0;
    left: 20px;
    pointer-events: none;
    transition: all 0.3s;
    font-family: 'PublicSans', sans-serif;
    transform-origin: top left;
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  input {
    font-size: inherit;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    // top: 30%;
    position: relative;
    // background-color: transparent;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }

    &.right-space {
      padding-right: 30px;
    }

    &:focus + label,
    &.has-value + label {
      transform: translateY(-10%) scale(0.65);
    }
  }

  .top-spacer {
    padding-top: 10px;
  }

  .password-visible {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 1.25rem;
  }
}

.error-message {
  margin: 16px 0;
  display: flex;
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
  color: #d85639;

  &:before {
    content: '';
    background: url('../assets/images/notice.svg') no-repeat center;
    background-size: contain;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  @media screen and (max-width: 410px) {
    font-size: 0.8rem;
  }
}
</style>

<script lang="jsx">
import classnames from 'classnames'

export default {
  props: [
    'id',
    'label',
    'type',
    'value',
    'autoComplete',
    'hasError',
    'errorMessage',
    'placeholder',
    'readonly',
    'disabled',
    'pattern',
    'inputMode',
    'inputClass',
    'required',
    'validatedMessage',
  ],
  data() {
    return {
      showPassword: false,
    }
  },
  render() {
    const onChange = (e) => {
      this.$emit('change', e.target.value)
      this.$emit('input', e.target.value)
    }
    const onPasswordVisibleClick = () => {
      this.showPassword = !this.showPassword
    }
    return (
      <div class="field-wrapper">
        <div
          class={`field tw-mt-1 tw-mb-6 ${this.hasError ? 'has-error' : ''}`}
        >
          <input
            type={
              this.type === 'password'
                ? this.showPassword
                  ? 'text'
                  : 'password'
                : this.type
            }
            id={this.id}
            name={this.id}
            onInput={onChange}
            class={classnames(
              {
                'has-value': !!this.value || this.value !== '',
                'right-space': this.type === 'password',
                'top-spacer': !!this.label,
              },
              this.inputClass,
            )}
            value={this.value}
            autoComplete={this.autoComplete}
            placeholder={this.placeholder}
            readonly={this.readonly}
            disabled={this.disabled}
            inputmode={this.inputMode}
            pattern={this.pattern}
            required={this.required}
          />
          <label for={this.id}>{this.label}</label>
          {this.type === 'password' && (
            <font-awesome-icon
              class="password-visible"
              icon={['fas', this.showPassword ? 'eye' : 'eye-slash']}
              onClick={onPasswordVisibleClick}
            />
          )}
        </div>
        {/* Error Message */}
        {this.errorMessage && (
          <div class="error-message">{this.errorMessage}</div>
        )}
        {/* Validated Success */}
        {!this.errorMessage && this.validatedMessage && (
          <div class="tw-text-green-600 tw-text-sm md:tw-text-lg  tw-my-4">
            <font-awesome-icon icon={['fa', 'check-circle']} class="tw-mr-1" />
            {this.validatedMessage}
          </div>
        )}
      </div>
    )
  },
}
</script>
