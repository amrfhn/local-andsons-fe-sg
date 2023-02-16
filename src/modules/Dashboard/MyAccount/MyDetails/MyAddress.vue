<style lang="scss" scoped>
.address-row {
  display: grid;
  align-items: center;
  justify-content: space-between;
  font-family: PublicSans, monospace;
  font-size: 17px;
  margin-bottom: 30px;
  grid-template-columns: minmax(20%, 200px) 1fr;

  @media screen and (max-width: 768px) {
    font-size: 15px;
    grid-template-columns: minmax(20%, 100px) 1fr;
  }

  @media screen and (max-width: 450px) {
    font-size: 14px;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
  }

  &:last-child {
    margin-bottom: 0;
  }
  .address {
    margin: 0 auto;
  }
  a {
    cursor: pointer;
    text-decoration: underline;
    margin-left: auto;
    &:last-child {
      margin-left: 32px;
    }
  }

  .address-details-actions {
    flex-grow: 1;
  }

  .address-user,
  .address-details-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .address {
      // background-color: yellow;
      max-width: 50%;

      @media screen and (max-width: 768px) {
        max-width: unset;
      }
    }
    .address-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 768px) {
        margin-right: auto;
      }
      .action-anchor {
        display: inline-block;
        text-align: center;
        margin: 1rem;
      }
      .btn {
        box-sizing: border-box;
        text-decoration: none;
        text-align: center;
        border: 2px solid black;
        margin: auto;
        padding: 0.5rem 1rem;
        // max-width: 20px;
        // transition: all 0.5s ease-out;
        cursor: pointer;
      }
      .no-btn {
        // background-color: red;
        // min-width: 100px;
        visibility: hidden;
        // display: inline-block;
      }
      // .btn:active {
      //   transform: translateY(1px);
      // }
    }
  }
  .address-user-box {
    flex-grow: 0;
  }
  .address {
    // background-color: yellow;
    text-align: left;
    width: 40%;

    @media screen and (max-width: 768px) {
      width: unset;
    }
    // padding: ;
  }

  @media screen and (max-width: 768px) {
    .address-user {
      align-items: flex-start;
    }
    .tag {
      margin-left: 0;
    }

    .action-anchor {
      margin-left: 0 !important;
      a {
        margin-left: 0;
      }
    }

    .address-user,
    .address-details-actions {
      width: 100%;
    }

    .address {
      margin: 0;
      padding: 0;
    }
    .cc-number {
      margin-left: 0;
    }

    .address-details-actions {
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 450px) {
    .address-user {
      flex-direction: row !important;
      align-items: center !important;
    }

    .tag {
      margin-left: 20px !important;
    }
  }
}

.add-address {
  text-align: center;
  text-decoration: underline;
  margin: auto;
  cursor: pointer;
}
</style>
<script lang="jsx">
// import { deleteAddress, getAddresses, updateAddress } from "@/api/addresses";
import { getAddresses } from "@/api/addresses";
import AddressModal from "./AddressModal"

export default {
  name: "MyAddress",
  components: {
    AddressModal
  },
  data() {
    return { addresses: [] };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  async mounted() {
    await this.obtainAddress()
  },
  methods: {
    async refreshAddress(){
      await this.obtainAddress()
    },
    obtainAddress(){
      getAddresses().then((response) => {
      this.addresses = response.data.response.addresses;
    });
    }
  },
  render() {
    /*
    const onDelete = (id) => () => {
      deleteAddress(id);

      this.addresses = this.addresses.filter(add => add.id !== id);
    };
    const setDefault = (id) => async() => {
      await updateAddress(id, {is_default: 1});
      this.obtainAddress()
    };
    */
    return (
      <div>
        <div class="details-title">My Address</div>
        <div class="details-section">
          {
            !this.addresses?.length?
              (
                <div style={{textAlign: 'center', marginTop: '20px'}} class="order-summary-button">
                  <p>You have not added any address yet.</p>
                </div>
              )
            :
              (
              this.addresses.map((a) => (
                <div class="address-row">
                  <div class="address-user address-user-box">
                    {a.is_default === 1 && <div class="tag">Default</div>}
                  </div>
                  <div class="address-details-actions">
                    <div class="address">
                      {[a.address_1, a.address_2, a.city, a.zip, a.state.name].join(
                        ", "
                      )}
                    </div>
                    {/*
                    <div class="address-actions">
                      <AddressModal class="action-anchor" action="edit" address={a} onRefresh={this.refreshAddress}>
                        <a>Edit</a>
                      </AddressModal>
                      <a onClick={onDelete(a.id)} class="action-anchor">Delete</a>
                      {a.is_default===0 ? <span> <div onClick={setDefault(a.id)} class="btn">Set As Default</div></span> : <span> <div class="btn no-btn">Set As Default</div></span>}
                    </div>
                    */}
                  </div>
                </div>
              ))
            )
          }
          {/*
          <div class="add-address">
           <AddressModal class="action-anchor" action="create" onRefresh={this.refreshAddress}>
              <a>+ Add a new address</a>
            </AddressModal>
          </div>
          */}
        </div>
      </div>
    );
  },
};
</script>
