<style lang="scss" scoped>
.title {
  font-family: 'Public Sans', sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  margin: 60px 0 30px;
  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }
}

.dob-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  @media screen and (max-width: 768px) {
    gap: 20px;
    font-size: 1rem;
  }

  @media screen and (max-width: 400px) {
    gap: 10px;
    font-size: 1rem;
  }
}

.upload-area {
  border: 1px dashed #c6c9aa;

  .upload-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;

    img {
      height: auto;
      width: 5rem;

      @media screen and (max-width: 410px) {
        width: 3rem;
      }
    }

    .warp-container {
      overflow-wrap: anywhere;
    }

    & > * {
      &:first-child {
        margin-right: 20px;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      margin: 0;
    }

    .upload-button {
      cursor: pointer;
      margin-left: auto;
      display: block;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      background: url('../../../assets/images/upload.svg') no-repeat center;
      background-size: contain;

      @media screen and (max-width: 768px) {
        min-width: 30px;
        min-height: 30px;
        width: 30px;
        height: 30px;
      }
    }

    input {
      display: none;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      font-family: PublicSans, monospace;
      font-size: 0.8125rem;
      flex-wrap: wrap;
    }

    .progress-wrapper {
      width: 100%;
      background: rgba(183, 183, 183, 0.15);
      height: 3px;
      margin: 6px 0 10px;
      position: relative;
      overflow: hidden;

      .progress {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #d85639;
        transform: translateX(-100%);
        transition: all 0.3s;
      }
    }
  }
}

.error-msg {
  color: #d34837;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
<script lang="jsx">
import Select from '@/components/Select'
import { getIdTypes } from '@/api/idTypes'
import Field from '@/components/Field'
import frontIdImg from '@/assets/images/front-id.png'
// import backIdImg from "@/assets/images/back-id.png";
import { uploadAttachments } from '@/api/attachments'
import { submitProfile } from '@/api/profiles'
import { formatMetaTags } from '@/utils/prettify.js'
import { trackUpdateProfile } from '@/utils/analytics'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default {
  components: { Field, Select },
  props: ['questionSets'],
  metaInfo() {
    return formatMetaTags({
      title: 'Profile',
      urlPath: this.$route.path,
    })
  },
  data() {
    return {
      idTypes: [],
      day: undefined,
      month: undefined,
      year: undefined,
      // placeOfBirth: undefined,
      gender: 'M',
      idType: 1,
      idNumber: undefined,
      frontAttachment: undefined,
      // backAttachment: undefined,
      errors: {},
      progress: {},
      currentYear: undefined,
      responseError: '',
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries
    },
    optionStyle() {
      return {
        color: 'black',
      }
    },
    userProfile() {
      return this.$store.state.userProfile
    },
    states() {
      return this.$store.state.states
    },
    fromProfilePage() {
      return this.$route.params.fromProfilePage
    },
    cart: function () {
      return this.$store.state.cart
    },
    currentPendingPayment() {
      return this.$store.state.currentPendingPayment
    },
  },
  watch: {
    country: function (val) {
      this.$store.dispatch('retrieveStates', val)
    },
  },
  async mounted() {
    await this.$store.dispatch('retrieveCountries')
    await this.$store.dispatch('retrieveStates', this.country_id || 1)
    //Get current data
    const date = new Date()
    this.currentYear = date.getFullYear()

    getIdTypes().then((response) => {
      this.idTypes = response.data.response.idTypes
    })
  },

  render() {
    const onChange = (field) => (value) => {
      this[field] = value
      this.errors[field] = false
    }
    const onUpload = (field) => async (e) => {
      const file = e.target.files.item(0)
      const data = new FormData()
      data.append('attachment', file)
      this.progress = {
        ...this.progress,
        [field]: {
          name: file.name,
          value: 0,
        },
      }
      const interval = setInterval(() => {
        this.progress = {
          ...this.progress,
          [field]: {
            name: file.name,
            value:
              this.progress[field].value < 90
                ? this.progress[field].value + 3
                : 90,
          },
        }
      }, 200)
      const response = await uploadAttachments(data)
      clearInterval(interval)
      this.progress = {
        ...this.progress,
        [field]: {
          name: file.name,
          value: 100,
        },
      }
      this[field] = response.data.response.filename
      this.errors[field] = false
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      this.responseError = ''
      if (!this.day) {
        this.errors = {
          ...this.errors,
          day: true,
        }
      }
      if (!this.month) {
        this.errors = {
          ...this.errors,
          month: true,
        }
      }
      if (!this.year) {
        this.errors = {
          ...this.errors,
          year: true,
        }
      }
      if (!this.gender) {
        this.errors = {
          ...this.errors,
          gender: true,
        }
      }
      if (!this.idType) {
        this.errors = {
          ...this.errors,
          idType: true,
        }
      }
      if (!this.idNumber) {
        this.errors = {
          ...this.errors,
          idNumber: true,
        }
      }
      if (!this.frontAttachment) {
        this.errors = {
          ...this.errors,
          frontAttachment: true,
        }
      }
      // if (!this.backAttachment) {
      //   this.errors = {
      //     ...this.errors,
      //     backAttachment: true,
      //   };
      // }

      if (!Object.values(this.errors).some((value) => value === true)) {
        try {
          const profileResponse = await submitProfile({
            dob: [this.year, this.month, this.day].join('-'),
            // place_of_birth_id: this.placeOfBirth,
            gender: this.gender,
            id_type_id: this.idType,
            id_no: this.idNumber,
            id_front_img: this.frontAttachment,
            // id_back_img: this.backAttachment,
          })
          const userProfile = {
            ...this.$store.state.userProfile,
            profile: profileResponse.data.response.profile,
          }
          this.$store.commit('updateUserProfile', userProfile)
          trackUpdateProfile(window, userProfile)
          this.$emit('profile-updated')
          this.$emit('step-completed')
        } catch (error) {
          this.responseError = error.response.data.userMessage
        }
      }
    }

    return (
      <form class="profile-verification-wrapper" onSubmit={onSubmit}>
        <div class="profile-verification-title tw-mb-5">
          <p class="tw-mb-2">
            Our doctors are required by the Ministry of Health (MOH) to verify
            your details using a government issued ID. Your privacy is important
            to us. Profile information is only used by our medical team for
            diagnosis.
          </p>
          <p>
            Your data is secured in our database using the industry standard
            AES-256 encryption algorithm. All traffic to and from our platform
            is TLS/SSL secured.
          </p>
        </div>
        <div class="label tw-font-semibold tw-text-lg">Date of birth</div>
        <div class="dob-row">
          <Select
            id="day"
            placeholder="Day"
            on-change={onChange('day')}
            value={this.day}
            hasError={this.errors.day}
          >
            {[...Array(31).keys()].map((i) => {
              const day = i + 1
              return (
                <option
                  value={day}
                  selected={this.day === day}
                  style={this.optionStyle}
                >
                  {day}
                </option>
              )
            })}
          </Select>
          <Select
            id="month"
            placeholder="Month"
            on-change={onChange('month')}
            value={this.month}
            hasError={this.errors.month}
          >
            {[...Array(12).keys()].map((i) => {
              const month = i + 1
              return (
                <option
                  value={month}
                  selected={this.month === month}
                  style={this.optionStyle}
                >
                  {months[i]}
                </option>
              )
            })}
          </Select>
          <Select
            id="year"
            placeholder="Year"
            on-change={onChange('year')}
            value={this.year}
            hasError={this.errors.year}
          >
            {[...Array(67).keys()].map((i) => {
              const startYear = this.currentYear - 82

              const year = i + startYear
              return (
                <option
                  value={year}
                  selected={this.year === year}
                  style={this.optionStyle}
                >
                  {year}
                </option>
              )
            })}
          </Select>
        </div>
        {(this.errors.day || this.errors.month || this.errors.year) && (
          <p class="error-msg tw-mb-5">Please fill in your date of birth.</p>
        )}

        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-x-10">
          <div class="tw-flex tw-flex-col">
            <div class="label tw-font-semibold tw-text-lg tw-mt-5 md:tw-mt-0">
              Gender
            </div>
            <Select
              placeholder="Gender"
              on-change={onChange('gender')}
              value={this.gender}
              hasError={this.errors.gender}
            >
              <option
                value={'M'}
                selected={this.gender === 'M'}
                style={this.optionStyle}
              >
                Male
              </option>
              <option
                value={'F'}
                selected={this.gender === 'F'}
                style={this.optionStyle}
              >
                Female
              </option>
            </Select>
          </div>
          <div class="tw-flex tw-flex-col tw-col-span-1 md:tw-col-span-2">
            <div class="label tw-font-semibold tw-text-lg tw-mt-5 md:tw-mt-0">
              ID Number
            </div>
            <div class="id-row tw-grid tw-grid-flow-col tw-auto-cols-auto tw-gap-x-2">
              <div>
                {this.idTypes.length > 0 && (
                  <Select
                    id="idType"
                    on-change={onChange('idType')}
                    value={this.idType}
                    hasError={this.errors.idType}
                  >
                    <option selected="true" disabled={true} value="">
                      ID Type
                    </option>
                    {this.idTypes.map(({ id, display_name }) => {
                      return (
                        <option
                          value={id}
                          selected={this.idType === id.toString()}
                          style={this.optionStyle}
                        >
                          {display_name}
                        </option>
                      )
                    })}
                  </Select>
                )}
              </div>

              <div>
                <Field
                  type="text"
                  placeholder="ID Number"
                  on-change={onChange('idNumber')}
                  value={this.idNumber}
                  hasError={this.errors.idNumber}
                  style={{ marginTop: 0 }}
                />
                {/*<sub style={{marginTop: '2px'}}>Eg: 900101135000</sub>*/}
              </div>
            </div>
            {this.responseError !== '' && (
              <p class="error-msg">{this.responseError}</p>
            )}
          </div>
        </div>

        <div class="label tw-font-semibold tw-text-lg">
          Upload a picture of your NRIC, driver's license or passport (only
          JPEG, JPG, PNG and PDF are accepted).
        </div>
        <div class="tw-mb-5"></div>
        <div class="upload-area tw-mt-1 tw-px-5 tw-py-10 tw-rounded-xl">
          <div class="upload-row">
            <img src={frontIdImg} alt="ID front" />
            <div class="warp-container">
              <input
                type="file"
                id="front-attachment"
                name="front-attachment"
                accept="image/jpeg,image/png,image/jpg,application/pdf"
                onChange={onUpload('frontAttachment')}
              />
              <div class="label tw-font-semibold tw-text-lg">Front</div>
              {this.progress.frontAttachment && (
                <div>
                  <div class="progress-info">
                    <div>{this.progress.frontAttachment.name}</div>
                    <div>{this.progress.frontAttachment.value}%</div>
                  </div>
                  <div class="progress-wrapper">
                    <div
                      class="progress"
                      style={`transform: translateX(${
                        this.progress.frontAttachment.value - 100
                      }%)`}
                    />
                  </div>
                </div>
              )}
            </div>
            <label class="upload-button" for="front-attachment" />
          </div>
          {/*
          <div class="upload-row">
            <img src={backIdImg} alt="ID back"/>
            <div class="warp-container">
              <input
                type="file"
                id="back-attachment"
                name="back-attachment"
                accept="image/jpeg,image/png"
                onChange={onUpload("backAttachment")}
              />
              <div class="label tw-font-semibold tw-text-lg">Back</div>
              {this.progress.backAttachment && (
                <div>
                  <div class="progress-info">
                    <div>{this.progress.backAttachment.name}</div>
                    <div>{this.progress.backAttachment.value}%</div>
                  </div>
                  <div class="progress-wrapper">
                    <div
                      class="progress"
                      style={`transform: translateX(${
                        this.progress.backAttachment.value - 100
                      }%)`}
                    />
                  </div>
                </div>
              )}
            </div>
            <label class="upload-button" for="back-attachment" />
          </div>
          */}
        </div>
        {this.errors.frontAttachment && (
          <p class="error-msg tw-mb-5">
            You are required to upload a picture of your NRIC, driver's license
            or passport.
          </p>
        )}
        <button class="submit-button tw-w-full" type="submit">
          CONTINUE
        </button>
      </form>
    )
  },
}
</script>
