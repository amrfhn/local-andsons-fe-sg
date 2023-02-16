<template>
  <div class="main-wrapper mental-health-content">
    <GlobalHeader show-full-logo />

    <div class="flex-row">
      <div class="header-content">
        <div class="circle-wrapper">
          <h1 class="title text-center mb-14">Anonymous Support Groups</h1>
          <h2 class="title text-center mb-12">
            <mark>Let's talk through it. Together.</mark>
          </h2>
          <h2 class="title text-center mb-12">
            <mark>
              <a href="#sessions" :style="{ textDecoration: 'none' }">100% Online</a>
              &bull; Discreet &bull; Anonymous
            </mark>
          </h2>
        </div>
        <div class="header-description">
          <p class="subtitle text-center">
            We're here for you if you need someone to talk to. Our trained counsellors host free anonymous group
            sessions, covering a range of topics.
          </p>
          <p class="subtitle text-center">
            Duration: 45 minutes<br />Price:
            <span class="line-through">SGD 15</span>
            <mark><strong>FREE</strong></mark> (limited time only)
          </p>
        </div>
      </div>

      <div id="whatYouGet" class="wyg-content">
        <h2 class="title text-center">How do these sessions work?</h2>
        <p class="subtitle text-center">
          Joining is easy. All you have to do is browse through the sessions, sign up for it, and show up via Zoom
          anonymously.
        </p>

        <div class="process-container">
          <div v-for="data in this.whatYouGetData" :key="data.title" class="process">
            <img :src="require(`@/assets/images/mental-health/${data.img}`)" :alt="data.title" class="image" />
            <h2 class="title">{{ data.title }}</h2>
            <p class="description">{{ data.description }}</p>
          </div>
        </div>
      </div>

      <div id="sessions" class="sessions-content">
        <div
          v-for="data in this.sessions"
          :key="data.session.title"
          class="sessions-container"
          :style="{
            backgroundColor: data.backgroundColor ? data.backgroundColor : ''
          }"
        >
          <div class="d-flex position-relative session-row">
            <div class="mind-images-mh">
              <img :src="require(`@/assets/images/mental-health/${data.session.img}.jpg`)" />
            </div>
            <div class="mind-content">
              <div class="content-wrapper">
                <p class="subtitle mb-0">{{ data.session.date }}</p>
                <p class="subtitle mb-20">{{ data.session.time }}</p>
                <h3 class="title">
                  <mark>{{ data.session.title }}</mark>
                </h3>
                <p class="subtitle mb-0"><strong>Moderator: </strong>{{ data.session.coordinator }}</p>
                <p class="subtitle mb-20">
                  <strong>Price:</strong>
                  <span class="line-through">SGD 15</span> FREE (limited time only)
                </p>
                <p class="subtitle mb-20"><strong>Summary:</strong> {{ data.session.description }}</p>
                <a :href="data.session.ctaLink" class="buttonStyle" tag="button">Join a session</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="doctors" class="doctors-content">
        <h2 class="title">The experts leading these sessions.</h2>
        <div>
          <p class="subtitle">
            Here are some of the experienced mental health professionals you’ll be hearing from. Empathetic, friendly
            and professional, they’re trained to guide group discussion so that everyone gets the most of the session.
          </p>
        </div>
        <div class="process-container">
          <div v-for="data in this.doctors" :key="data.doctorName" class="process">
            <h3 class="process-title">{{ data.doctorName }}</h3>
            <p class="process-description">
              {{ data.title }}
            </p>
            <p class="process-description">
              {{ data.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- <JoinCommunity
        contactTitle="Join the community"
        subtitle="Subscribe to our newsletter"
        customTitleStyle="true"
        hideSelectedTreatmentPrint="true"
      /> -->
    </div>
  </div>
</template>

<script lang="jsx">
import GlobalHeader from "@/components/GlobalHeader";
// import JoinCommunity from "@/components/JoinCommunity";
import { formatMetaTags } from "@/utils/prettify.js";
import WhatYouGet from "./data/whatYouGet.json";
import Sessions from "./data/sessions.json";
import Doctors from "./data/doctors.json";

export default {
  components: {
    GlobalHeader,
    // JoinCommunity
  },
  metaInfo() {
    return formatMetaTags({
      title: "Online Mental Health Support through Telepsychiatry Services",
      description: 'Talk about mental health with anonymous support group. 100% discreet & online. Sign up for telepsychiatry services here for free today (limited time only)!',
      urlPath: this.$route.path,
    })
  },
  beforeCreate() {
    this.whatYouGetData = WhatYouGet.data
    this.sessions = Sessions.data
    this.doctors = Doctors.data
  }
}
</script>

<style lang="scss" scoped>
.flex-row {
  flex-direction: row;
}
.d-flex {
  display: flex;
}
.position-relative {
  position: relative;
}

.main-wrapper {
  &.mental-health-content {
    background-color: #eaebdf;
  }
}

.mental-health-content {
  .title {
    font-family: PublicSansExtraBold, sans-serif;
  }

  .header-content {
    padding: 3rem;
    align-self: flex-start;
    margin-bottom: 100px;
    max-width: unset !important;

    @include mediaMd {
      padding: 7rem 3rem 0;
    }
    @include mediaSm {
      padding: 7rem 3rem 0;
    }

    .circle-wrapper {
      position: relative;
      margin-bottom: 3rem;
    }

    h1.title {
      font-size: 2.2rem;

      @include mediaMd {
        font-size: 4rem;
      }
    }
    h2.title,
    h3.title {
      font-size: 1.17em;

      @include mediaMd {
        font-size: 2.2rem;
      }

      mark {
        background-color: #faf377;
      }
    }

    .header-description {
      @include mediaMd {
        max-width: 50%;
        margin-left: 25%;
      }
      .subtitle {
        font-family: PublicSans, sans-serif;
        line-height: 1.5;
        margin-bottom: 20px;
      }
    }
  }

  .wyg-content {
    text-align: center;
    scroll-snap-align: start;
    background-color: $springwood-background;
    padding: 50px 20px;
    margin-top: 50px;

    @include mediaMd {
      padding: 100px 40px;
      margin-top: 0;
    }

    .title {
      font-size: 2rem;
      padding: 2rem 0;

      @include mediaMd {
        font-size: 2.5rem;
        padding: 2rem;
      }
    }
    .subtitle {
      font-size: 17px;
      line-height: 1.5;
      font-weight: 100;
      margin-bottom: 20px;

      @include mediaMd {
        font-size: 18px !important;
      }
    }

    .process-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 1rem;
      flex-direction: column;

      @include mediaMd {
        padding-top: 2rem;
        gap: 2vw;
        flex-direction: row;
      }

      .process {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 2rem;
        max-width: 25rem;
        min-width: 15rem;

        .image {
          width: 100px;
        }

        .title {
          color: #ed9075;
          padding-bottom: 1rem;
          font-size: 1.8rem;
        }

        .description {
          font-size: 18px;
          line-height: 1.4;
        }
      }
    }
  }

  .sessions-content {
    .sessions-container {
      padding-top: 70px;
      padding-bottom: 70px;
      background-color: #eaebdf;

      .session-row {
        flex-direction: column;

        @include mediaMd {
          flex-direction: row;
        }

        .mind-images-mh {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 85vw;
          width: 80%;
          margin-left: 10%;
          margin-right: 10%;

          @include mediaMd {
            height: 37rem;
            margin-left: auto;
            margin-right: auto;
            width: 600px;
          }
        }

        .mind-content {
          width: 100%;
          align-self: center;
          padding: 0 2rem 0 3rem;

          @include mediaMd {
            padding-right: 5vw;
            width: 50%;
          }

          .content-wrapper {
            @include mediaMd {
              width: 85%;
            }

            .title {
              position: relative;
              font-size: 2rem;
              padding-bottom: 20px;
              z-index: 3;

              mark {
                background-color: #faf377;
              }
            }
            .subtitle {
              font-size: 18px;
              line-height: 1.5;
            }
            .buttonStyle {
              margin-top: 2rem;
              display: table;
              text-transform: uppercase;
              padding: 1.4rem 4rem;
              font-size: 14px;
              letter-spacing: 2px;
              background-color: #000;
              color: #fff;
              border: 1px solid #000;
              font-family: PublicSansExtraBold, sans-serif;
              text-decoration: none;
              transition: all 0.4s ease-in-out;
            }
          }
        }
      }
    }
  }

  .doctors-content {
    text-align: center;
    scroll-snap-align: start;
    background-color: $springwood-background;
    padding: 100px 40px;

    .title {
      font-size: 2rem;
      padding: 2rem;

      @include mediaMd {
        font-size: 2.5rem;
      }
    }
    .subtitle {
      width: 80%;
      margin-left: 10%;
      margin-bottom: 2rem;
    }

    .process-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 1rem;
      flex-direction: column;

      @include mediaMd {
        gap: 2vw;
        padding-top: 2rem;
        flex-direction: row;
      }

      .process {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 2rem;
        width: 100%;

        @include mediaMd {
          width: 20vw;
          max-width: 20rem;
        }

        .process-title {
          font-size: 1.8rem;
          margin-top: 2rem;
          color: #ed9075;
          margin-bottom: 1rem;
          font-family: PublicSansExtraBold, sans-serif;
          line-height: 37px;
        }

        .process-description {
          line-height: 1.4;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
