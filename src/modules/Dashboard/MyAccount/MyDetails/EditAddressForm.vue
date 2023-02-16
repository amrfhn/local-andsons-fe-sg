<template>
  <div>
    <transition name="slide" appear>
      <div v-if="action === 'edit'" class="modal">
        <div class="modal-header">
          <span class="modal-header-title">Edit Address</span>
          <span class="close-button" @click="closeModal">
            <img src="@/assets/images/close.svg" alt="X" />
          </span>
        </div>
        <div class="item">
          <Field v-model="address_1" auto-complete="off" type="type" label="Address Line 1" />
          <Field v-model="address_2" auto-complete="off" type="type" label="Address Line 2" />
          <Field v-model="city" auto-complete="off" type="type" label="City" />
          <Select id="state" v-model="country_id" placeholder="Country">
            <template v-if="countries">
              <option v-for="item in countries" :key="item.id" :value="item.id" :selected="item.id === country_id">
                {{ item.name }}
              </option>
            </template>
          </Select>
          <Select id="state" v-model="state" placeholder="State">
            <template v-if="this.states">
              <option v-for="item in this.states[1]" :key="item.id" :value="item.id" :selected="item.id === state">
                {{ item.name }}
              </option>
            </template>
          </Select>
          <Field v-model="zip" auto-complete="off" type="type" label="Zip" />
          <Checkbox
            id="home-address"
            v-model="addressType"
            label="Home address"
            :checked="addressType === 'home-address'"
          />
          <Checkbox
            id="office-address"
            v-model="addressType"
            label="Office address"
            :checked="addressType === 'office-address'"
          />
        </div>
        <div v-if="action === 'edit'" class="view-product-button" @click="submitAddress">
          Save
        </div>
      </div>
      <div v-else class="modal">
        <div class="modal-header">
          <span class="modal-header-title">Add New Address</span>
          <span class="close-button" @click="closeModal">
            <img src="@/assets/images/close.svg" alt="X" />
          </span>
        </div>
        <div class="item">
          <Field v-model="address_1" auto-complete="off" type="type" label="Address Line 1" />
          <Field v-model="address_2" auto-complete="off" type="type" label="Address Line 2" />
          <Field v-model="city" auto-complete="off" type="type" label="City" />
          <Select id="state" v-model="country_id" placeholder="Country">
            <template v-if="countries">
              <option v-for="item in countries" :key="item.id" :value="item.id" :selected="item.id === country_id">
                {{ item.name }}
              </option>
            </template>
          </Select>
          <Select v-if="country_id" id="state" v-model="state" placeholder="State">
            <template v-if="states">
              <option v-for="item in states[1]" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </template>
          </Select>
          <Field v-model="zip" auto-complete="off" type="type" label="Zip" />
          <Checkbox
            id="home-address"
            v-model="addressType"
            label="Home address"
            :checked="addressType === 'home-address'"
          />
          <Checkbox
            id="office-address"
            v-model="addressType"
            label="Office address"
            :checked="addressType === 'office-address'"
          />
        </div>
        <div v-if="action === 'create'" class="view-product-button" @click="submitAddress">
          Add
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Field from '@/components/Field'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import { addAddress, updateAddress } from '@/api/addresses'

export default {
  name: 'EditAdressForm',
  components: {
    Field,
    Select,
    Checkbox
  },
  props: ['action', 'address'],
  data() {
    if (this.action === 'edit') {
      const { address_1, address_2, city, zip, country, country_id, state } = this.address
      return {
        address_1,
        address_2,
        city,
        zip,
        country,
        country_id,
        state: state.id,
        addressType: 'home-address'
      }
    } else {
      return {
        address_1: '',
        address_2: '',
        city: '',
        zip: '',
        country: '',
        country_id: '',
        state: '',
        addressType: 'home-address'
      }
    }
  },
  computed: {
    selectStyle() {
      return {
        fontSize: 'inherit',
        padding: '10px 20px 0px',
        marginTop: '20px',
        width: '100%',
        height: '100%',
        border: '1px solid black'
      }
    },
    states() {
      return this.$store.state.states
    },
    countries() {
      return this.$store.state.countries
    }
  },
  watch: {
    country_id() {
      this.$store.dispatch('retrieveStates', this.country_id)
    }
  },
  async mounted() {
    await this.$store.dispatch('retrieveCountries')
    await this.$store.dispatch('retrieveStates', this.country_id || 1)
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    async submitAddress() {
      const data = {
        address_1: this.address_1,
        address_2: this.address_2,
        zip: this.zip,
        city: this.city,
        state_id: this.state,
        country_id: this.country_id,
        is_default: this.action === 'edit' ? 0 : 1
      }
      if (this.action === 'edit') {
        await updateAddress(this.address.id, data)
        this.closeModal()
      } else {
        await addAddress(data)
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 25px;
  width: 100%;
  max-width: 850px;
  max-height: 100%;
  background-color: #fff;
  border-radius: 2px;
  overflow-y: auto;
  //   transition: ;
}

.modal-header {
  text-align: left;
  font-size: 22px;
  margin-bottom: 5px;
  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
}
img {
  height: 15px;
  width: 15px;
  cursor: pointer;
}
.modal-header-title {
  color: #ed9075;
}
.close-button {
  position: absolute;
  cursor: pointer;
  top: 3%;
  right: 2%;
  @media screen and (max-width: 400px) {
    right: 5%;
  }
}
.item {
  text-align: left;
  margin: 1.5rem 0;
}
.item-description {
  text-align: left;
  margin-bottom: 1rem;
}
.product-plan-option {
  display: flex;
  // flex-wrap: wrap;
  cursor: pointer;
  justify-content: space-between;
  padding: 25px;
  font-size: 1.125rem;
  background: fff(221, 221, 221);
  margin: 8px 0;
  border: 3px solid #e0e0e0;
  transition: all 0.1s;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  .product-plan-option-extra {
    display: none;
    font-size: 1.125rem;
    font-family: PublicSans, monospace;
    margin-top: 16px;
    .product-plan-option-extra-info {
      margin-top: 16px;
      display: flex;
      align-items: center;
      .field {
        height: 40px;
        line-height: 40px;
        border: none;
        margin: 0 14px 0 0;
        select {
          background: $springwood-background;
        }
      }
      .discount-tag {
        margin-left: auto;
        background: #d85639;
        color: #fff;
        padding: 4px 8px;
      }
    }
  }
  &.active {
    border: 3px solid #ed9075;
    .product-plan-option-extra {
      display: block;
    }
  }
}
.view-product-button {
  cursor: pointer;
  margin: 1rem auto 0;
  background: #000;
  color: #fff;
  text-align: center;
  font-family: PublicSansExtraBold, sans-serif;
  font-size: 1rem;
  letter-spacing: 1.2px;
  opacity: 1;
  display: flex;
  justify-content: center;
  padding: 1.4rem 4rem;
  width: max-content;
  border: none;

  &.add-to-cart {
    margin: 30px 0;
    width: 100%;
  }

  &.disabled {
    background: rgba(56, 56, 56, 0.863);
    cursor: default;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 450px) {
    width: 100%;
    padding: 1rem;
  }
}
</style>
