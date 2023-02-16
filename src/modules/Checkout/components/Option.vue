<style lang="scss" scoped>
.option {
  margin-bottom: 18px;
  cursor: pointer;
  background: #fff;
  display: flex;
  border: 1px solid #b7b7b7;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 12px;
  }

  &.selected {
    border: 2px solid #ed9075;
    .option-checked {
      svg {
        color: #ed9075;
      }
    }
  }
  &.disabled {
    background-color: #cfcfcf;
    cursor: initial;
  }
  .option-checked {
    background: $springwood-background;
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    text-align: center;
    line-height: 24px;
    svg {
      color: $springwood-background;
    }
  }
  .logo-dimension {
    height: auto;
    width: 40px;
    margin-right: 15px;

    @media screen and (max-width: 410px) {
      width: 30px;
    }
  }
}
</style>
<script lang="jsx">
import currency from "currency.js";

export default {
  props: [
    "selected",
    "name",
    "description",
    "price",
    "hasLogo",
    "logo",
    "disabled",
  ],
  render() {
    const onClick = () => {
      if (this.disabled) return;
      this.$emit("click");
    };
    return (
      <div
        class={`option tw-py-3 tw-px-5 ${this.selected ? "selected" : ""} ${
          this.disabled ? "disabled" : ""
        }`}
        onClick={onClick}
      >
        <div class="option-checked">
          <font-awesome-icon icon={["fas", "check"]} />
        </div>
        {this.hasLogo == "true" ? (
          <img src={this.logo} class="logo-dimension" alt="andsons logo" />
        ) : (
          <span />
        )}
        <div>
          <div class="option-name tw-text-lg tw-font-medium">{this.name}</div>
          {!!this.description && (
            <div
              class="option-description tw-text-sm"
              domPropsInnerHTML={this.description}
            ></div>
          )}
        </div>
        {this.price !== undefined && (
          <div class="option-price tw-font-medium tw-text-lg tw-ml-auto">
            {this.price === 0 ? "0.00" : currency(this.price).format()}
          </div>
        )}
      </div>
    );
  },
};
</script>
