<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: auto;
  > svg {
    cursor: pointer;
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-left: 12px;
    }
  }
  .page {
    border-radius: 5px;
    border: 1px solid #b7b7b7;
    margin: 0 8px;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    font-family: PublicSansBold, sans-serif;
    font-size: 1.125rem;
    color: #b7b7b7;
    transition: all 0.1s;
    &.active {
      color: #ffffff;
      background: #ed9075;
      border: 1px solid #ed9075;
    }
  }
}
</style>
<script lang="jsx">
import classnames from "classnames";

export default {
  props: ["currentPage"],
  render() {
    const onPageChange = (newPage) => () => {
      this.$emit("change", newPage);
    };
    return (
      <div class="pagination">
        <font-awesome-icon icon={["fas", "arrow-left"]} />
        <div
          class={classnames("page", { active: this.currentPage === 1 })}
          onClick={onPageChange(1)}
        >
          1
        </div>
        <div
          class={classnames("page", { active: this.currentPage === 2 })}
          onClick={onPageChange(2)}
        >
          2
        </div>
        <div
          class={classnames("page", { active: this.currentPage === 3 })}
          onClick={onPageChange(3)}
        >
          3
        </div>
        <div
          class={classnames("page", { active: this.currentPage === 4 })}
          onClick={onPageChange(4)}
        >
          4
        </div>
        <div class="page">...</div>
        <font-awesome-icon icon={["fas", "arrow-right"]} />
      </div>
    );
  },
};
</script>
