<style lang="scss" scoped>
.post-wrapper {
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  & > div {
    width: 50%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    &:first-child {
      padding: 1rem 9rem 0;
      position: relative;
      @media screen and (max-width: 768px) {
        padding: 20px;
      }
      .post-title {
        font-family: PublicSansExtraBold, sans-serif;
        font-size: 3rem;
        margin: 48px 0 32px 0;
        @media screen and (max-width: 768px) {
          font-size: 2rem;
        }
      }
      .post-summary {
        font-family: PublicSans, monospace;
        font-size: 1.125rem;
        line-height: 1.5rem;
        @media screen and (max-width: 768px) {
          font-size: 0.85rem;
          line-height: 1.25rem;
        }
      }
      .post-link {
        font-family: PublicSans, monospace;
        font-size: 1.125rem;
        display: flex;
        align-items: center;
        text-decoration: underline;
        margin-top: 40px;
        cursor: pointer;
        @media screen and (max-width: 768px) {
          margin-top: 20px;
        }
        svg {
          font-size: 0.625rem;
          margin-left: 16px;
        }
      }
      .trust-slogan {
        position: absolute;
        bottom: 0;
        left: 20px;
        width: 60%;
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
    &:last-child {
      @media screen and (max-width: 768px) {
        padding-top: 40px;
        display: flex;
      }
      img {
        width: 100%;
        transform: translateY(-5%);
        object-fit: contain;
        @media screen and (max-width: 768px) {
          transform: translateY(0);
          width: 90%;
          margin-left: auto;
        }
      }
    }
  }
}
</style>

<script lang="jsx">
import trustSlogan from "../../assets/images/catalogue/trust-slogan.png";

export default {
  props: ['catalogue'],
  render() {
    return (
      <div>
        {this.catalogue.title && (
          <div class="post-wrapper">
            <div>
              <h2 class="post-title">{this.catalogue.title}</h2>
              <div class="post-summary">{this.catalogue.description}</div>
              <a class="post-link" href={this.catalogue.articleLink}>
                Read on <font-awesome-icon icon={["fa", "arrow-right"]} />
              </a>
              <img class="trust-slogan" src={trustSlogan} />
            </div>
            <div>
              <img src={this.catalogue.imageLink} />
            </div>
          </div>
        )}
      </div>
    );
  },
};
</script>
