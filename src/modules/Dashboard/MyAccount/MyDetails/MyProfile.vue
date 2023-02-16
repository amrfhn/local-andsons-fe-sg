<style lang="scss" scoped>
.my-profile-wrapper {
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .my-profile-image-wrapper {
    margin-right: 100px;

    @media screen and (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 50px;
    }
  }

  .my-profile-image {
    border-radius: 50%;
    background: no-repeat center;
    background-size: cover;
    width: 155px;
    height: 155px;

    @media screen and (max-width: 768px) {
      margin: 0 auto;
    }
  }

  .my-profile-image-label {
    cursor: pointer;
    display: block;
    text-align: center;
    margin-top: 14px;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    text-decoration: underline;
  }

  .my-profile-image-remark {
    font-family: PublicSans, monospace;
    font-size: 0.8125rem;
    color: #b7b7b7;
    text-align: center;
    margin-top: 14px;
  }

  .my-profile-display-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 60px;
    font-family: PublicSans, monospace;
    font-size: 17px;

    padding-bottom: 1.5rem;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }

    .my-profile-display-label {
      color: #b7b7b7;
    }
  }

  .my-profile-edit-row {
    display: flex;
    justify-content: space-between;

    & > div {
      &:first-child {
        margin-right: 8px;
      }

      &:last-child {
        margin-left: 8px;
      }
    }
  }

  .gender-label {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    margin-top: 32px;
  }

  .gender-selector {
    display: flex;
    align-items: center;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;

    .submit-button {
      margin: 0;
      width: auto;

      @media screen and (max-width: 410px) {
        font-size: 60%;
        padding: 0.8rem 2.5rem;
      }

      // padding: 0 48px;
    }

    & > * {
      &:first-child {
        margin-right: 32px;
      }
    }
  }

  .profile-edit-section {
    @media screen and (max-width: 410px) {
      * {
        font-size: 15px;
      }
    }
  }

  .mobile-wrapper {
    display: grid;
    grid-template-columns: 100px 3fr;
    gap: 16px;

    @media screen and (max-width: 410px) {
      grid-template-columns: 90px 3fr;
    }
  }
}

.error {
  font-family: PublicSans, monospace;
  font-size: 1rem;
  color: #d34837;
  margin-top: 0.5rem;
}

.error-msg {
  text-align: center;
  color: red;
}

.submit-button:disabled {
  opacity: 0.5;
}

.my-profile-id-container {
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;

  label {
    &.id-photo-title {
      font-size: 2rem;
      font-weight: bold;
      color: #000;
    }

    &.id-photo-subtext {
      font-size: 1rem;
    }
  }

  .id-container {
    padding-top: 2rem;

    label {
      &.id-photo-label {
        font-size: 1.3rem;
      }
    }
  }
}
</style>

<script lang="jsx">
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";
import {uploadAttachments} from "@/api/attachments";
import {updateProfile} from "@/api/users";
import {getMyProfile} from "@/api/users";
// import { submitProfile } from "@/api/profiles";
import {normalizedUserForInsider, trackUpdateProfile} from "@/utils/analytics";

import IdUploaderVue from './components/IdUploader.vue'
import { updateProfileInfo } from '../../../../api/profiles'

export default {
  components: {Checkbox, Field, IdUploaderVue},
  data() {
    return {
      mode: "readonly",
      form: {
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        phone: undefined,
        country_code: undefined,
        gender: undefined,
        avatar: undefined,
        dob: undefined,
        password: undefined,
        current_password: undefined,
      },
      error: '',
      errorSize: false,
      profileImage: undefined,
      passwordEditMode: false,
      errorMessage: '',
      mobileCountryCode: "+65",
      errors: {},
      idImgState: {}
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    dob() {
      return this.userProfile?.profile?.dob;
    },
    profileData() {
      return this.$store.state.userProfile.profile;
    },
    idFrontImg() {
      return this.profileData.id_front_img_arr[0] || null
    },
    idBackImg() {
      return this.profileData.id_back_img_arr[0] || null
    }
  },
  created() {
    getMyProfile().then((response) => {
      this.$store.commit("updateUserProfile", response.data.response.user);
    });
  },
  render() {

    const toggleMode = () => {
      this.mode = this.mode === "readonly" ? "edit" : "readonly";
      if (this.mode === "edit") {
        this.form = {
          first_name: this.userProfile.first_name,
          last_name: this.userProfile.last_name,
          email: this.userProfile.email,
          phone: this.userProfile.phone,
          country_code: this.mobileCountryCode,
          gender: this.profileData ? this.profileData.gender : null,
          dob: this.dob,
        };
      } else {
        this.passwordEditMode = false;
      }
    };

    const onChange = (field) => (value) => {
      this.form[field] = value;
    };
    // const onChecked = (gender) => (checked) => {
    //   if (checked) {
    //     this.form.gender = gender;
    //   } else {
    //     this.form.gender = undefined;
    //   }
    // };

    const fileSelectedHandler = async event => {

      //Erorr State
      this.error = '';
      this.erroSize = false;

      //Get File details
      const file = event.target.files;
      let filename = file[0].name;
      let filesize = file[0].size;


      //Check file validity
      if (filename.lastIndexOf(".") <= 0) {
        return this.error = 'Invalid Attachment';
      }
      if (filesize > 1048576) {
        return this.errorSize = true;
      }

      //Set picture to img src
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.profileImage = fileReader.result
      });

      fileReader.readAsDataURL(file[0]);


      const data = new FormData();
      data.append("attachment", file[0]);

      //Upload Attachment
      const response = await uploadAttachments(data);
      // await uploadAttachments(data);

      //Update Profile
      const res = await updateProfile({
        userId: this.userProfile.profile.user_id,
        params: `avatar=${response.data.response.filename}`
      });

      this.$store.commit('updateSpecificProfileData', res.data.response.user);
    };

    const onSubmit = async (e) => {
      this.isSubmitting = true;
      e.preventDefault();
      this.errors = {};
      // let urlParams = ''
      const phoneNumberRegex = /^(6|8|9)\d{7}$/;
      let params = {}

      if (!this.form.first_name) {
        this.errors = {first_name: true};
      }

      if (!this.form.last_name) {
        this.errors = {last_name: true};
      }

      if (!(this.form.phone && this.form.phone.match(phoneNumberRegex))) {
        this.errors = {phone: true};
      }


      if (Object.keys(this.errors).length !== 0) {
        this.isSubmitting = false;
        return;
      }

      Object.entries(removeEmpty(this.form)).forEach(([key, value]) => {
        // if(Object.keys(removeEmpty(this.form)).length - 1 == index){
        //   urlParams += `${key}=${value}`;
        // }else{
        //   urlParams += `${key}=${value}&`;
        // }

        // Email can't be modified
        if (key != 'email') {
          params[key] = value;
        }
      });

      params['']

      // if(this.password && this.current_password){
      //   urlParams.concat(`password=${this.password}&current_password=${this.current_password}`)
      // }
      //
      // let profile = this.profileData;
      //
      // //Update DOB
      // profile.dob = this.form.dob;
      //
      // //Update Gender
      // profile.gender = this.form.gender;
      //
      // await submitProfile(profile);

      const res = await updateProfile({
        userId: this.userProfile.profile.user_id,
        params
      });

      if (res.error) {
        this.errorMessage = res.userMessage;
        this.isSubmitting = false;
        return;
      }

      this.$store.commit('updateSpecificProfileData', res.data.response.user);

      const insiderUserObject = await normalizedUserForInsider(res.data.response.user, true);
      localStorage.setItem(
          "andsons_insiderUserObject",
          JSON.stringify(insiderUserObject)
      );

      this.mode = 'readonly';
      trackUpdateProfile(window, res.data.response.user);
      this.isSubmitting = false;
    };

    const removeEmpty = data => {
      Object.keys(data).forEach(
          k => !data[k] && data[k] !== undefined && delete data[k]
      );
      return data;
    };

    const updateIdImageInProfile = async (filename, field, reference) => {
      try {
        const profileResponse = await updateProfileInfo(this.userProfile.profile.id, {
          [field]: filename
        })
        const userProfile = {
          ...this.$store.state.userProfile,
          profile: profileResponse.data.response.profile,
        }
        this.$store.commit('updateUserProfile', userProfile)
        this.$refs[reference].changeImgState('success')
      } catch {
        this.$refs[reference].changeImgState('error')
      }
    }

    return this.userProfile?.profile && (
        <div>
          <div class="details-title">
            My profile
            {this.mode === "readonly" && (
                <a class="action" onClick={toggleMode}>
                  Edit
                </a>
            )}
          </div>
          <div class="details-section">
            <div class="my-profile-wrapper">
              <div class="my-profile-image-wrapper">
                <div
                    class="my-profile-image"
                    style={this.profileImage == undefined ? {
                      backgroundImage: `url("${this.userProfile.avatar_arr[0]}")`,
                    } : {backgroundImage: `url("${this.profileImage}")`}}
                />
                <label for="profile-image" class="my-profile-image-label">
                  Select image
                </label>
                <input
                    id="profile-image"
                    name="profile-image"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{display: "none"}}
                    onChange={fileSelectedHandler}
                />
                <div class="my-profile-image-remark"
                     style={this.errorSize == false ? {color: "initial"} : {color: "red"}}>Max file size 1MB
                </div>
                <p class="error-msg">{this.error}</p>
              </div>
              {this.mode === "readonly" ? (
                  <div>
                    <div class="my-profile-display-row">
                      <div class="my-profile-display-label">Name</div>
                      <div>{this.userProfile.name}</div>

                      <div class="my-profile-display-label">Email</div>
                      <div style="word-break: break-all">{this.userProfile.email}</div>

                      <div class="my-profile-display-label">Contact Number</div>
                      <div>{this.userProfile.country_code + this.userProfile.phone || "--"}</div>

                      <div class="my-profile-display-label">Date of birth</div>
                      <div>{this.dob ? this.dob : '--'}</div>

                      <div class="my-profile-display-label">Gender</div>
                      <div>{this.profileData ? (this.profileData?.gender === 'M' ? 'Male' : 'Female') : '--'}</div>

                      <div class="my-profile-display-label">Password</div>
                      <div>************</div>
                    </div>
                    <hr />
                    <div class="my-profile-id-container">
                      <label class="id-photo-title">ID Photo</label>
                      <label class="id-photo-subtext">Only upload JPEG or PNG format. The image should be less than 5MB</label>
                      <div>
                        <div class="id-container">
                          <label class="id-photo-label">Front</label>
                          <IdUploaderVue
                            ref="frontIcUploader"
                            imageUrl={this.idFrontImg}
                            handlePhotoChange={filename => updateIdImageInProfile(filename, 'id_front_img', 'frontIcUploader')}
                          />
                        </div>
                        <div class="id-container">
                          <label class="id-photo-label">Back</label>
                          <IdUploaderVue
                            ref="backIcUploader"
                            imageUrl={this.idBackImg}
                            handlePhotoChange={filename => updateIdImageInProfile(filename, 'id_back_img', 'backIcUploader')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                  <form class="profile-edit-section" onSubmit={onSubmit}>
                    <div class="my-profile-edit-row">
                      <div>
                        <Field
                            type="text"
                            label="First name"
                            value={this.form.first_name}
                            onChange={onChange("first_name")}
                            required
                        />

                        {(this.errors.first_name) && (
                            <p class="error">First name is required</p>
                        )}
                      </div>
                      <div>
                        <Field
                            type="text"
                            label="Last name"
                            value={this.form.last_name}
                            onChange={onChange("last_name")}
                            required
                        />

                        {(this.errors.last_name) && (
                            <p class="error">Last name is required</p>
                        )}
                      </div>
                    </div>
                    <Field
                        type="email"
                        label="Email"
                        value={this.form.email}
                        // onChange={onChange("email")}
                        disabled={true}
                    />

                    <div class="mobile-wrapper">
                      <Select value={this.mobileCountryCode}>
                        <option value="+65" selected={this.form.mobileCountryCode === "+65"}>
                          +65
                        </option>
                      </Select>
                      <Field
                          style={{borderColor: "#b7b7b7"}}
                          label="Contact number"
                          value={this.form.phone}
                          type="number"
                          on-change={onChange("phone")}
                          inputClass="input-without-arrow"
                          required
                      />
                    </div>


                    {(this.errors.phone) && (
                        <p class="error">Please key in a valid contact number</p>
                    )}

                    {/* <Field
                  type="text"
                  label="Date of birth"
                  placeholder="YYYY-MM-DD"
                  value={this.form.dob}
                  onChange={onChange("dob")}
                />
                <div class="gender-label">Gender</div>
                <div class="gender-selector">
                  <Checkbox
                    label="Male"
                    on-checked={onChecked("M")}
                    value="M"
                    checked={this.form.gender === "M"}
                  />
                  <Checkbox
                    label="Female"
                    on-checked={onChecked("F")}
                    value="F"
                    checked={this.form.gender === "F"}
                  />
                </div> */}
                    <div class="gender-label">Password</div>
                    <div style={{marginTop: "16px"}}>
                      {!this.passwordEditMode ? <div>*******</div> : null}
                      {
                        this.passwordEditMode ?
                            <div>
                              <div>
                                <Field
                                    type="password"
                                    label="Current Password"
                                    value={this.current_password}
                                    onChange={onChange("current_password")}
                                    required
                                />

                                {(this.errors.current_password) && (
                                    <p class="error">Current Password is required</p>
                                )}
                              </div>
                              <div class="mt-32">
                                <Field
                                    type="password"
                                    label="Password"
                                    value={this.password}
                                    onChange={onChange("password")}
                                    required
                                />

                                {(this.errors.password) && (
                                    <p class="error">Password is required</p>
                                )}
                              </div>
                            </div>
                            : <a class="action" onClick={() => this.passwordEditMode = !this.passwordEditMode}>Change
                              password</a>
                      }
                    </div>
                    <sub style={{color: 'red'}}>{this.errorMessage}</sub>
                    <div class="gender-selector" style={{marginTop: "32px"}}>
                      <button class="submit-button uppercase" type="submit" disabled={this.isSubmitting}>
                        SAVE{this.isSubmitting && '...'}
                      </button>
                      <a class="action" onClick={toggleMode}>
                        Cancel changes
                      </a>
                    </div>
                  </form>
              )}
            </div>
          </div>
        </div>
    );
  },
};
</script>
