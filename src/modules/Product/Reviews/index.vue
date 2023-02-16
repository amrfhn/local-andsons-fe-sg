<style lang="scss" scoped>
.reviews-wrapper {
  margin: 60px calc(30px + 5vw);
  @media screen and (max-width: 768px) {
    margin: 60px 5vw;
  }
  .reviews-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 3.75rem;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
}
</style>
<script lang="jsx">
import Rating from "@/modules/Product/Reviews/Rating";
import Comment from "@/modules/Product/Reviews/Comment";
import Pagination from "@/modules/Product/Reviews/Pagination";

export default {
  components: { Pagination, Comment, Rating },
  data() {
    return {
      currentPage: 1,
    };
  },
  render() {
    const fakeComments = Array(5).fill({
      rate: 3.5,
      time: "9 hours ago",
      name: "Bryan",
      age: 28,
      title: "Easy process and effective results",
      comment:
        "Good product very good service very good people instructions could be a little bit better your supply could be a little bit bigger but other than that no complaints",
    });
    const onPageChange = (newPage) => {
      this.currentPage = newPage;
    };
    return (
      <div class="reviews-wrapper">
        <div class="reviews-title">Hear from our customers</div>
        <Rating />
        {fakeComments.map((comment) => (
          <Comment commentInfo={comment} />
        ))}
        <Pagination on-change={onPageChange} currentPage={this.currentPage} />
      </div>
    );
  },
};
</script>
