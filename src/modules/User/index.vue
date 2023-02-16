<style lang="scss">
.user-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
  padding: 0 calc(30px + 5vw) calc(30px + 5vw);

  .signup-login-remark {
    color: #000;
    font-size: 1.125rem;
    text-align: center;
    margin-top: 20px;
    a {
      text-decoration: underline;
      cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      font-size: 0.8125rem;
    }
  }

  @media screen and (max-width: 768px) {
    // padding: 180px calc(30px + 1vw) calc(30px + 1vw);
    padding: 0 calc(30px + 1vw) calc(30px + 1vw);
  }

  @media screen and (max-width: 410px) {
    // padding: 180px calc(20px + 1vw) calc(20px + 1vw);
    padding: 0 calc(20px + 1vw) calc(20px + 1vw);
  }
}
</style>

<script lang="jsx">
import Header from "../../components/Header";
export default {
  render() {
    const userStyle = {
      marginTop: "2em"
    }
    return (
      <div class="user-wrapper">
        <Header />
        <router-view style={userStyle} />
      </div>
    );
  },
};
</script>
