<style lang="scss" scoped>
.dashboard-sidebar {
  background: #f0f2e9;
  padding: 32px;
  .title {
    font-size: 22px;
    display: flex;
    align-items: center;
    .total-number {
      color: #fff;
      background: #d85639;
      border-radius: 5px;
      margin-left: 16px;
      font-size: 12px;
      font-family: 'Public Sans', sans-serif;
      font-weight: 700;
      width: 22px;
      height: 22px;
      text-align: center;
      line-height: 22px;
    }
  }
  .visit-row {
    padding: 32px 0;
    border-bottom: 1px solid #f0d4cc;
    &:last-child {
      border-bottom: 0;
    }
    .visit-date,
    .visit-time {
      font-family: PublicSans, monospace;
      font-size: 20px;
      margin-top: 24px;
    }
    .visit-info {
      color: #ed9075;
      font-size: 18px;
      margin-top: 24px;
    }
    .visit-time {
      font-size: 18px;
      color: #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        cursor: pointer;
      }
    }
  }
}
</style>
<script lang="jsx">
import calendarIcon from "../../../assets/images/calendar-icon.svg";

export default {
  render() {
    return (
      <div class="dashboard-sidebar">
        <div class="title">
          Upcoming visits
          <div class="total-number">2</div>
        </div>
        {[...Array(2).keys()].map(() => (
          <div class="visit-row">
            <img src={calendarIcon} alt="calendar icon"/>
            <div class="visit-date">Monday, 24 Sep</div>
            <div class="visit-info">
              Hair loss consultation with Dr. Lee Chong Ling
            </div>
            <div class="visit-time">
              11.15am - 12.15pm
              <font-awesome-icon icon={["fas", "arrow-right"]} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>
