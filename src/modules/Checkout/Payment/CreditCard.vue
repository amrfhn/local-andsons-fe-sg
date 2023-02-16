<style lang="scss" scoped>
form {
  .field {
    border: none;
  }
}
.cardinfo-row {
  display: grid;
  grid-template-columns: minmax(auto, 1.5fr) minmax(auto, 1fr);
  gap: 15px;
}
</style>

<script lang="jsx">
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import Checkbox from "../../../components/Checkbox";

export default {
  data() {
    return {
      cardnumber: "",
      ccname: "",
      expiryDate: undefined,
      cvc: "",
      sameAddress: false,
      rememberDetails: false,
    };
  },
  render() {
    const onChange = (field) => (value) => {
      this[field] = value;
      this.$emit(
        "creditCardChange",
        Object.assign(
          {},
          {
            cardnumber: this.cardnumber,
            ccname: this.ccname,
            expiryDate: this.expiryDate,
            cvc: this.cvc,
            sameAddress: this.sameAddress,
            rememberDetails: this.rememberDetails,
          },
          { [field]: value }
        )
      );
    };
    return (
      <form id="card-element">
        <Field
          label="Card number"
          id="cardnumber"
          value={this.cardnumber}
          on-change={onChange("cardnumber")}
          autoComplete="cc-number"
        />
        <Field
          label="Name on card"
          id="ccname"
          value={this.ccname}
          autoComplete="cc-name"
          on-change={onChange("ccname")}
        />
        <div class="cardinfo-row">
          <Select
            placeholder="Expiration date"
            id="expiryDate"
            value={this.expiryDate}
            on-change={onChange("expiryDate")}
          >
            <option value="23/23">23/23</option>
          </Select>
          <Field
            label="CVV"
            id="cvc"
            value={this.cvc}
            autoComplete="cc-csc"
            on-change={onChange("cvc")}
          />
        </div>
        <Checkbox
          label="My Billing address is the same as my delivery address"
          id="sameAddress"
          on-checked={onChange("sameAddress")}
        />
        <Checkbox
          label="Remember details for next purchase"
          id="rememberDetails"
          on-checked={onChange("rememberDetails")}
        />
      </form>
    );
  },
};
</script>
