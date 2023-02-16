<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;

  .mobile-wrapper {
    display: grid;
    grid-template-columns: 100px 3fr;
    gap: 16px;

    @media screen and (max-width: 410px) {
      grid-template-columns: 90px 3fr;
    }
  }

  .error {
    color: #d34837;
  }

  .success {
    color: #0dec32;
  }
}

.submit-button:disabled {
  opacity: 0.5;
}

.row-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.add-address {
  text-decoration: underline;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;

  &.align-right {
    text-align: right;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.checkbox-wrapper {
  .field {
    border: none;
  }
}
</style>

<script lang="jsx">
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import {addAddress, getAddresses} from "@/api/addresses";
import {formatMetaTags} from "@/utils/prettify.js";
import {updateProfile} from "@/api/users";

export default {
  components: {Field, Select},
  metaInfo() {
    return formatMetaTags({
      title: "Address",
      urlPath: this.$route.path,
    })
  },
  data() {
    return {
      address1: "",
      address2: "",
      city: "",
      country: undefined,
      state: undefined,
      zipCode: "",
      addresses: [],
      addressType: "home",
      contactNumber: "",
      mobileCountryCode: "+65",
      errors: {},
      isSubmitting: false,
      selectedAddress: undefined,
      selectedAddressId: undefined,
      isAddingAddress: false,
      loading: false,
    };
  },
  computed: {
    optionStyle() {
      return {
        color: "black"
      }
    },
    countries() {
      return this.$store.state.countries;
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
    states() {
      return this.$store.state.states;
    },
    fromProfilePage() {
      return this.$route.params.fromProfilePage;
    }
  },
  watch: {
    country: function (val) {
      this.$store.dispatch("retrieveStates", val);
    },
  },
  async mounted() {
    this.loading = true;

    const addressResponse = await getAddresses();
    this.addresses = addressResponse.data.response.addresses;
    this.setDefaultAddress(this.addresses);

    this.$store.dispatch("retrieveCountries");
    this.contactNumber = this.userProfile.phone ? this.userProfile.phone : "";

    this.loading = false;
  },
  methods: {
    setDefaultAddress(addresses = []) {
      const defaultAddress = this.getDefaultOrFirstAddress(addresses);
      if (defaultAddress) {
        this.selectedAddress = defaultAddress;
        this.selectedAddressId = defaultAddress.id;

        this.address1 = defaultAddress.address_1;
        this.address2 = defaultAddress.address_2;
        this.city = defaultAddress.city;
        this.country = defaultAddress.country_id;
        this.state = defaultAddress.state_id;
        this.zipCode = defaultAddress.zip;
      }
    },
    getDefaultOrFirstAddress(addresses = []) {
      //  If there are no addresses, return undefined
      if (addresses.length === 0) return undefined;

      //  otherwise, find the default address
      const defaultAddress = addresses.find(
          ({is_default}) => is_default === 1
      );

      // return either the default address if it exists or the first address
      return defaultAddress ?? addresses[0];
    }
  },
  render() {
    const onChange = (field) => (value) => {
      if (field === 'address2' && value.length > 0 && value.charAt(0) !== "#") {
        value = `#${value}`;
      }
      this[field] = value;
    };

    const onSubmitAddress = async () => {
      const data = {
        address_1: this.address1,
        address_2: this.address2,
        zip: this.zipCode,
        city: this.city,
        state_id: this.state,
        country_id: this.country,
        is_default: 1,
      };

      const addressResponse = await addAddress(data);
      const newAddress = addressResponse.data.response.address
      this.addresses.push(newAddress)

      this.$store.commit("updateSelectedAddress", newAddress);
      this.$emit('step-completed');
    };
    const onSubmit = async (e) => {
      this.isSubmitting = true;
      e.preventDefault();
      this.errors = {};
      const phoneNumberRegex = /^(6|8|9)\d{7}$/;

      if (this.address1 == '' || this.city == '' || this.country == undefined || this.state == undefined || this.zipCode == '') {
        this.errors = {address: true};
        this.isSubmitting = false;
        return;
      }

      if (this.contactNumber.trim() !== "" && this.contactNumber.trim().match(phoneNumberRegex)) {

        if (this.contactNumber === this.userProfile.phone) {
          return onSubmitAddress();
        }

        await updateProfile({
          userId: this.userProfile.id,
          params: {phone: this.contactNumber, country_code: this.mobileCountryCode}
        }).then(() => {
          this.$store.commit("updateUserProfile", {
            ...this.userProfile,
            phone: this.contactNumber,
            country_code: this.mobileCountryCode,
          });

          onSubmitAddress();

        }).catch(() => {
          this.errors = {contactNumber: true};
        });
      } else {
        this.errors = {contactNumber: true};
      }

      this.isSubmitting = false;
    };

    const onSubmitSelectedAddress = async () => {
      this.selectedAddress = this.addresses.find(address => address.id === +this.selectedAddressId)
      this.$store.commit("updateSelectedAddress", this.selectedAddress);
      this.$emit('step-completed');
    };

    const getFullAddress = (address) => {
      const { address_1, address_2, zip, city, country } = address;
      let fullAddress = `${address_1}, `;
      fullAddress += `${address_2}, `;
      fullAddress += `${country.name}, `;
      fullAddress += `${city} `;
      fullAddress += `${zip}`;

      return fullAddress;
    }

    const toggleAddingAddress = () => {
      this.isAddingAddress = !this.isAddingAddress;
    }

    return (
        <div>
          {
            !this.loading && (
              this.addresses.length > 0 && !this.isAddingAddress ? (
                <div class="select-address">
                  <div class="label tw-font-semibold tw-text-lg">Select Existing Address</div>
                  <Select
                    id="address"
                    placeholder="Select Existing Address"
                    on-change={onChange("selectedAddressId")}
                    value={this.selectedAddress.id}
                  >
                    {this.addresses.map((address) => {
                      return (
                        <option value={address.id} selected={+this.selectedAddressId === address.id} style={this.optionStyle}>
                          {getFullAddress(address)}
                        </option>
                      );
                    })}
                  </Select>

                  <div class="add-address" on-click={toggleAddingAddress}>
                    Add A New Address
                  </div>
                  <button class="submit-button tw-w-full" disabled={this.isSubmitting} on-click={onSubmitSelectedAddress}>
                    {!this.isSubmitting ? "CONTINUE" : "SUBMITTING..."}
                  </button>
                </div>
              ): (
                <form onSubmit={onSubmit}>
                  <Field
                      style={{borderColor: "#b7b7b7"}}
                      label="Block & Street Name"
                      id="address1"
                      type="text"
                      value={this.address1}
                      on-change={onChange("address1")}
                  />
                  <Field
                      style={{borderColor: "#b7b7b7"}}
                      label="Unit Number"
                      id="address2"
                      type="text"
                      value={this.address2}
                      on-change={onChange("address2")}
                  />

                  <div class="row-2">
                    <div>
                      <Field
                        style={{borderColor: "#b7b7b7"}}
                        label="City"
                        id="city"
                        type="text"
                        value={this.city}
                        on-change={onChange("city")}
                      />
                    </div>
                    <div>
                      <Field
                        style={{borderColor: "#b7b7b7"}}
                        label="Postal code"
                        id="zipCode"
                        type="text"
                        value={this.zipCode}
                        on-change={onChange("zipCode")}
                      />

                    </div>
                  </div>

                  {/* !!this.countries && (
                  <Select
                    id="country"
                    ref="countryRef"
                    value={this.country}
                    placeholder={this.$refs?.countryRef?.value ? null :"Country"}
                    on-change={onChange("country")}
                  >
                    <option style={this.optionStyle} selected="true" disabled="disabled" value="">Choose Country</option>
                    {this.countries.map(({ id, name }) => (
                      <option value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                ) */}
                  {!!this.countries && (
                      <Select
                          id="country"
                          ref="countryRef"
                          value={this.country}
                          on-change={onChange("country")}
                          style={this.selectStyle}
                      >
                        <option style={this.optionStyle} selected="true" disabled={true} value="">Country</option>
                        {this.countries.map(({id, name}) => (
                            <option value={id} style={this.optionStyle}>
                              {name}
                            </option>
                        ))}
                      </Select>
                  )}
                  {this.states && this.states[this.country] && (
                      <Select
                          id="state"
                          placeholder="State"
                          value={this.state}
                          on-change={onChange("state")}
                      >
                        {this.states[this.country].map(({id, name}) => (
                            <option value={id} selected={this.state === id} style={this.optionStyle}>
                              {name}
                            </option>
                        ))}
                      </Select>
                  )}

                  {(this.errors.address) && (
                      <p class="error">We’ll need a Singapore address to ship your order to.</p>
                  )}
                  {(this.addresses.length > 0) && (
                    <div class="add-address align-right" on-click={toggleAddingAddress}>
                      Choose Existing Address
                    </div>
                  )}
                  {
                    (!this.userProfile.phone) && (
                      <div class="mobile-wrapper">
                        <Select value={this.mobileCountryCode}>
                          <option value="+65" selected={this.mobileCountryCode === "+65"} style={this.optionStyle}>
                            +65
                          </option>
                        </Select>
                        <Field
                            style={{borderColor: "#b7b7b7"}}
                            label="Contact number"
                            value={this.contactNumber}
                            type="number"
                            on-change={onChange("contactNumber")}
                            inputClass="input-without-arrow"
                        />
                      </div>
                    )
                  }
                  {(this.errors.contactNumber) && (
                      <p class="error">Please key in a valid contact number.</p>
                  )}
                  <div class="actions" style={!this.fromProfilePage ? {float: 'right'} : null}>
                    <button class="submit-button tw-w-full" disabled={this.isSubmitting}>
                      {!this.isSubmitting ? 'NEXT' : 'SUBMITTING...'}
                    </button>
                  </div>
                </form>
              )
            )
          }
        </div>
    );
  },
};
</script>
