<style lang="scss" scoped>
.rating {
  background: #fff;
  padding: 32px 100px;
  margin: 32px 0;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
  .rating-summary {
    width: 30%;
    @media screen and (max-width: 768px) {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    .rating-score {
      color: #ed9075;
      font-family: PublicSansBold, sans-serif;
      font-size: 2.5rem;
      @media screen and (max-width: 768px) {
        text-align: center;
      }
    }

    .rating-stars {
      display: flex;
      margin-top: 8px;
      @media screen and (max-width: 768px) {
        justify-content: center;
      }
      svg {
        font-size: 1.125rem;
        margin-right: 6px;
      }
    }

    .rating-total {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
      margin-top: 14px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  .rating-details {
    width: 70%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
    .rating-star-row {
      display: flex;
      align-items: center;
      margin-bottom: 14px;

      svg {
        font-size: 1.125rem;
        margin-right: 6px;
        @media screen and (max-width: 768px) {
          font-size: 0.75rem;
        }
      }

      .rating-star-row-total {
        font-family: PublicSans, monospace;
        font-size: 1.125rem;
        margin-left: 6px;
        width: 70px;
        text-align: left;
        @media screen and (max-width: 768px) {
          font-size: 0.75rem;
        }
      }

      .rating-star-progress {
        height: 5px;
        background: rgba(183, 183, 183, 0.15);
        position: relative;
        width: 70%;
        @media screen and (max-width: 768px) {
          width: 50%;
        }
        .rating-star-progress-result {
          position: absolute;
          left: 0;
          top: 0;
          background: #d85639;
          height: 5px;
        }
      }
    }
  }
}
</style>
<script lang="jsx">
const fakeReviews = [2, 1, 5, 18, 25];
const totalReview = fakeReviews.reduce((r, n) => r + n, 0);
export default {
  render() {
    return (
      <div class="rating">
        <div class="rating-summary">
          <div class="rating-score">4.8</div>
          <div class="rating-stars">
            <font-awesome-icon icon={["fas", "star"]} />
            <font-awesome-icon icon={["fas", "star"]} />
            <font-awesome-icon icon={["fas", "star"]} />
            <font-awesome-icon icon={["fas", "star-half-alt"]} />
            <font-awesome-icon icon={["far", "star"]} />
          </div>
          <div class="rating-total">{totalReview} customer reviews</div>
        </div>
        <div class="rating-details">
          {fakeReviews
            .map((total, index) => (
              <div class="rating-star-row">
                {Array(index + 1)
                  .fill(<font-awesome-icon icon={["fas", "star"]} />)
                  .concat(
                    Array(4 - index).fill(
                      <font-awesome-icon icon={["far", "star"]} />
                    )
                  )}
                <div class="rating-star-row-total">({total})</div>
                <div class="rating-star-progress">
                  <div
                    class="rating-star-progress-result"
                    style={{ width: `${(total / totalReview) * 100}%` }}
                  />
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    );
  },
};
</script>
