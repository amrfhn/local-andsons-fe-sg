<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
  font-size: 1.125rem;
  margin-top: 10px;
  position: relative;

  @media screen and (max-width: 410px) {
    font-size: 15px;
  }

  input {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #000;
    outline: none;
    opacity: 0;

    @media screen and (max-width: 450px) {
      width: 25px;
      height: 25px;
    }
    &:checked {
      + .checkbox-icon {
        > svg {
          opacity: 1;
          animation: scaleIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      }
    }
  }
  .checkbox-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    pointer-events: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border: 1px solid black;

    @media screen and (max-width: 450px) {
      width: 25px;
      height: 25px;
    }

    > svg {
      opacity: 0;
    }
    @keyframes scaleIn {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
    }
  }
  label {
    padding-left: 15px;
    cursor: pointer;
    line-height: 30px;

    @media screen and (max-width: 450px) {
      line-height: 25px;
    }
  }
}

.error-message {
  margin-top: 1rem;
  color: red;
}
</style>
<script lang="jsx">
export default {
  props: ["id", "label", "value", "checked", 'errorMessage', 'error', 'link'],
    methods: {
    checkbox(e){
        this.$emit('input',e.target.name)
    }
  },
  render() {
    const onChecked = (e) => {
      this.$emit("checked", e.target.checked);
    };
    return (
      <div>
        <div class="checkbox-wrapper">
          <input
            type="checkbox"
            id={this.id}
            name={this.id}
            onChange={onChecked}
            value={this.value}
            checked={this.checked}
            onInput={this.checkbox}
          />
          <span class="checkbox-icon">
            <font-awesome-icon icon={["fas", "check"]} />
          </span>
          {this.link ?
          (<label for={this.id}><router-link tag="a" to={this.link} target="_blank">{this.label}</router-link></label>
)
          :
          (<label for={this.id}>{this.label}</label>)
          }
        </div>
        {this.errorMessage && this.error ? (
          <div class="error-message">
           {this.errorMessage}
          </div>
        ) : ""}

      </div>

    );
  },
};
</script>
