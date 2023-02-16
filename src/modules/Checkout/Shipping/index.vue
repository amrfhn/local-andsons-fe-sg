<script lang="jsx">
import Option from "../components/Option";
import { getCartDeliveryOptions } from "@/api/carts";
import { formatMetaTags } from "@/utils/prettify.js";

export default {
  metaInfo() {
    return formatMetaTags({
      title: "Shipping",
      urlPath: this.$route.path,
    })
  },
  props: {
    note: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectedOption: 0,
      shipping_note: this.note || "",
      deliveryOptions: [],
    };
  },
  computed: {
    userProfile: function () {
      return this.$store.state.userProfile;
    },
    cart: function () {
      return this.$store.state.cart;
    },
    selectedAddress() {
      return this.$store.state.selectedAddress;
    },
    currentPendingPayment() {
      return this.$store.state.currentPendingPayment;
    }
  },
  watch: {
    cart: function (val, oldVal) {
      if (oldVal.cart !== val.cart && val.cart === null) {
        this.$router.replace("/");
      }
    },
    "deliveryOptions":{
      immediate: true,
      handler(n){
        if(n.length > 0)
          this.selectedOption = n[0].id;
      }
    }
  },
  async mounted () {
    const response = await getCartDeliveryOptions(this.cart.cart.id, this.selectedAddress.id)
    this.deliveryOptions = response.data.response.delivery_options;
  },
  render() {
    const onOptionChange = (option) => () => {
      this.selectedOption = option;
    };
    const onNext = () => {
      // Pass shipping note back to parent
      this.$emit('shipping-note', this.shipping_note)

      // Check to manage if user somehow manage to come back to this screen after creating order
      // and cannot go back Payment
      if(this.currentPendingPayment){
        this.$emit('step-completed');
        return;
      }
      this.$store.commit("updateDeliveryOptionId", this.selectedOption);
      this.$emit('step-completed');
    };
    const onInstructionChange = (e) => {
      this.shipping_note = e.target.value;
    };
    return !!this.cart && !!this.cart.cart && this.selectedAddress ? (
      <div class="shipping-wrapper">
        <div class="label tw-font-semibold tw-text-lg">Review Shipping Details</div>
        <div class="contacts-details tw-py-5 tw-px-5 tw-mt-1 tw-mb-6">
          <div class="name">{this.userProfile.name} ({this.userProfile.email}&nbsp;|&nbsp;
              {[this.userProfile.country_code, this.userProfile.phone]
                .filter((o) => !!o)
                .join(" ")})</div>
          <div class="row tw-pt-1 tw-text-sm md:tw-text-md">
            {this.selectedAddress && (
              <p>
                {this.selectedAddress.address_1}{" "}
                {this.selectedAddress.address_2}, {this.selectedAddress.zip},{" "}
                {this.selectedAddress.city},{" "}
                {this.selectedAddress.country.name}
              </p>
            )}
          </div>
        </div>
        <div class="label tw-font-semibold tw-text-lg">
          Delivery Option
        </div>
        {this.deliveryOptions.map((d) => (
          <div class="tw-mt-2">
            <Option
              selected={this.selectedOption === d.id}
              name={d.title}
              description={d.leadtime_desc}
              price={Number(d.price)}
              on-click={onOptionChange(d.id)}
            />
          </div>
        ))}
        <div class="label tw-font-semibold tw-text-lg">
          Delivery Instructions
        </div>
        <textarea
          style="font-size:1rem"
          placeholder="* Optional"
          class="textarea tw-mt-1 tw-mb-6"
          rows="3"
          value={this.shipping_note}
          onChange={onInstructionChange}
        />
        <div class="actions">
          <button class="submit-button tw-w-full tw-mt-5" onClick={onNext}>
            CONTINUE
          </button>
        </div>
      </div>
    ) : null;
  },
};
</script>
<style lang="scss" scoped>
.shipping-wrapper {
  // max-height: calc(100vh - 220px);
  // overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.contacts-details {
  background: rgba($color: #faf377, $alpha: 0.6);
}

.row {
  display: flex;

  div {
    width: 60%;
    word-break: break-word;
  }
  a {
    cursor: pointer;
    text-decoration: underline;
    color: black;
    font-size: 1.125rem;
    margin-left: auto;
    text-underline-offset: 3px;

    @media screen and (max-width: 768px) {
      font-size: 80%;
    }
  }
}
.textarea {
  font-size: 1.125rem;
  border: 1px solid #b7b7b7;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  resize: none;
}

.icon {
  margin-right: 15px;
  object-fit: contain;
}
</style>
