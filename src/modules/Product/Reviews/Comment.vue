<style lang="scss" scoped>
.comment-wrapper {
  margin-bottom: 60px;
  padding: 0 10vw;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
  .comment-rating {
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    @media screen and (max-width: 768px) {
      font-size: 0.75rem;
    }
    svg {
      margin-right: 6px;
    }
    .comment-time {
      font-family: PublicSans, monospace;
      margin-left: 6px;
    }
  }
  .comment-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    margin-top: 16px;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .comment-text {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    margin-top: 12px;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .comment-author-info {
    display: flex;
    align-items: center;
    margin-top: 14px;

    .comment-author {
      font-family: HighSummit, sans-serif;
      font-size: 2.5rem;
      @media screen and (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .comment-age {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
      margin-left: 14px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
}
</style>
<script lang="jsx">
export default {
  props: ["commentInfo"],
  render() {
    const fullStar = Math.trunc(this.commentInfo.rate);
    const restStar = 5 - fullStar;
    return (
      <div class="comment-wrapper">
        <div class="comment-rating">
          {Array(fullStar).fill(<font-awesome-icon icon={["fas", "star"]} />)}
          {[...Array(restStar).keys()].map((i) =>
            i === 0 && !Number.isInteger(this.commentInfo.rate) ? (
              <font-awesome-icon icon={["fas", "star-half-alt"]} />
            ) : (
              <font-awesome-icon icon={["far", "star"]} />
            )
          )}
          <div class="comment-time">{this.commentInfo.time}</div>
        </div>
        <div class="comment-title">{this.commentInfo.title}</div>
        <div class="comment-text">{this.commentInfo.comment}</div>
        <div class="comment-author-info">
          <div class="comment-author">{this.commentInfo.name}, </div>
          <div class="comment-age">{this.commentInfo.age}</div>
        </div>
      </div>
    );
  },
};
</script>
