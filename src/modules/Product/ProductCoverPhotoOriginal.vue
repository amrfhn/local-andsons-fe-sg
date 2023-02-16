<style lang="scss">
.product-cover-photo {
  position: relative;
  height: 60vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 768px) {
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    display: block;
    max-height: none;
    margin: auto;
    @media screen and (max-width: 768px) {
      height: 80%;
    }
  }
}
</style>

<script lang="jsx">
export default {
  name: "ProductCoverPhoto",
  props: ["productData"],
  data(){
    return {
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false,
    }
  },
  render() {
    return (
      <div class="product-cover-photo">
        {this.productData.image_arr.map((src) => (
          <img src={src} />
        ))}


       {/* <div id="slider">
  <transition-group tag="div" :name="transitionName" class="slides-group">
    <div v-if="show" :key="current" class="slide" :class="slides[current].className">
      <p>I'm {{slides[current].className}}!</p>
    </div>
  </transition-group>
  <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
    &#10094;
  </div>
  <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
    &#10095
  </div>
</div> */}
      </div>
    );
  },
};
</script>
