<template>
  <section class="faq-section tw-w-full">
    <VsaList :tags="tags">
      <div v-for="item in this.faqs" :key="item.id">
        <VsaItem>
          <VsaHeading>
            <h3 class="tw-text-left tw-text-base tw-font-medium">
              {{ item.question }}
            </h3>
          </VsaHeading>

          <VsaContent>
            <div class="faq-description tw-mb-6" v-html="item.answer"></div>
          </VsaContent>
        </VsaItem>
      </div>
    </VsaList>
  </section>
</template>

<script>
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent
  // VsaIcon
} from 'vue-simple-accordion'

export default {
  name: 'CheckoutFaqs',
  components: {
    VsaList,
    // VsaIcon,
    VsaItem,
    VsaHeading,
    VsaContent
  },
  data() {
    return {
      tags: {
        heading__content: 'div',
        heading__icon: 'div'
      },
      faqs: [
        {
          id: 1,
          question: 'Why is there a $20 consultation fee? Can I remove it from the cart?',
          answer:
            'This fee covers the time spent for our doctor to review your information, assess your suitability for treatment and to go over your personalised treatment plans with you.<br/><br/>Our doctors are reimbursed by the number of patients they help and 100% of the consultation fees go to our medical team for their expertise and time.<br/><br/>Because all our prescription treatments are tailored for you, a teleconsultation by our doctor is required before the treatment plan can be prescribed to ensure it is suitable for your needs.'
        },
        {
          id: 2,
          question: 'Will I be refunded if the consultation finds I am unsuitable for treatment?',
          answer:
            'Yes, you will be refunded the cost of the products if the prescription is not approved by the doctor. The $20 teleconsult fee will still be charged for your time spent with the doctor.'
        },
        {
          id: 3,
          question: 'Will I be charged automatically for my treatment after the teleconsultation?',
          answer:
            'If the doctor approves your prescription you will be charged immediately after the consultation. If a prescription is not approved, you will not be charged for the medication.'
        },
        {
          id: 4,
          question: 'What forms of ID do you take?',
          answer:
            'You can use your NRIC, passport or driving license.<br/><br/>To send us a copy of your ID, simply take a photo of your ID using your camera phone and upload the file.'
        },
        {
          id: 5,
          question: 'Why do you need a copy of my ID?',
          answer:
            'Government ID is needed when purchasing any prescription medicine so we can ensure the treatment is prescribed in the correct & legal name and are sold to customers of the appropriate age. Your personal data, medical history or ID will not be shared outside our secure system.<br/><br/>ID is not required when buying non-prescription items.'
        },
        {
          id: 6,
          question: 'How will my data be used and how will it be securely stored?',
          answer:
            'Your data security and confidentiality is something we take very seriously and we have taken significant steps to keep your data secure. All data is secured with TLS/SSL encryption.<br/><br/>Your clinical data and questionnaire responses are stored in our secure EMR (Electronic Medical Records) and can only be accessed by our medical team as part of your evaluation. <br/><br/>Video consultations are carried out on HIPAA compliant software, all consultations are taken in complete confidentiality between our medical team and you.<br/><br/>Your name and address will only be used for delivery purposes only and your treatment will be delivered discreetly direct to you.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .vsa-list {
  --vsa-max-width: 100%;
  --vsa-min-width: 300px;
  --vsa-text-color: rgba(0, 0, 0, 1);
  --vsa-highlight-color: rgb(0, 0, 0, 0);
  --vsa-border-width: 0;
  --vsa-heading-padding: 0.5em 0;
  --vsa-content-padding: 1rem 0;
}

/deep/ .vsa-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.25s ease-in-out;
}

/deep/ .vsa-item__trigger {
  display: flex;
  align-items: center;
  width: 100%;
}

/deep/ .vsa-item__trigger__icon--is-default {
  padding: 0;
  margin-top: -10px;
  text-align: right;
}
/deep/ .vsa-item__trigger__icon--is-default:after {
  left: 0;
}

/deep/ .vsa-item__trigger__content {
  width: calc(100% - 40px);
}

/deep/ .vsa-item__trigger__icon {
  display: inline-block;
  width: 40px;
  &::before {
    display: none;
  }
  &::after {
    height: 0;
    font-size: 1.75em;
    content: '+';
    transform: none;
  }

  &.vsa-item__trigger__icon--is-active::after {
    content: '-';
    transform: none;
  }
}

/deep/ .vsa-item__content {
  transition: all 0.25s ease-in-out;
}
</style>
