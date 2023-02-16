export default [
  {
    id: 1,
    set_name: 'Hair Loss',
    category_id: 1,
    questions: [
      {
        id: 42,
        question_set_id: 1,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Which of the following best describes your hair?</p>',
        question_options: [
          {
            id: 146,
            question_id: 42,
            option_name:
              '<p>Full head of hair</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/andSons&ndash;balding patters-fullhead.png" alt="full head of hair" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 147,
            question_id: 42,
            option_name:
              '<p>Receding hairline</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/andSons&ndash; balding-patters-receding.png" alt="receding hairline" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 148,
            question_id: 42,
            option_name:
              '<p>Severe receding hairline</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/balding-severereceding.png" alt="severe receding hairline" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 149,
            question_id: 42,
            option_name:
              '<p>Receding hairline with slight thinning of the crown</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/balding-thincrown.png" alt="thin crown" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 150,
            question_id: 42,
            option_name:
              '<p>Receding hairline with moderate thinning of the crown</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/balding-severethincrown.png" alt="thin" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 151,
            question_id: 42,
            option_name:
              '<p>Moderate balding at the top of the head</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/balding-moderatebald.png" alt="moderate" width="100" height="100" /></p>',
            is_exclusive: 0
          },
          {
            id: 152,
            question_id: 42,
            option_name:
              '<p>Balding at the top of the head</p>\r\n<p>&nbsp;</p>\r\n<p><img src="https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.sg/question-options/March2021/balding-crown.png" alt="balding" width="100" height="100" /></p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 43,
        question_set_id: 1,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>When did you first notice your hair loss?</p>',
        question_options: [
          {
            id: 153,
            question_id: 43,
            option_name: '<p>&lt; 6 months</p>',
            is_exclusive: 0
          },
          {
            id: 154,
            question_id: 43,
            option_name: '<p>6 months - 1 year</p>',
            is_exclusive: 0
          },
          {
            id: 155,
            question_id: 43,
            option_name: '<p>&gt;1 year</p>',
            is_exclusive: 0
          },
          {
            id: 156,
            question_id: 43,
            option_name: '<p>There are no noticeable thinning of my hair, I just want to know my options</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 44,
        question_set_id: 1,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>How did your hair loss start?</p>',
        question_options: [
          {
            id: 157,
            question_id: 44,
            option_name: '<p>Hairline</p>',
            is_exclusive: 0
          },
          {
            id: 158,
            question_id: 44,
            option_name: '<p>Crown of my head</p>',
            is_exclusive: 0
          },
          {
            id: 160,
            question_id: 44,
            option_name: '<p>Patchy hair loss all over my scalp</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 45,
        question_set_id: 1,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: '<p>We need to rule out uncommon causes of hairloss</p>',
        title: '<p>Have you noticed any of these other symptoms? (Select all that apply)</p>',
        question_options: [
          {
            id: 161,
            question_id: 45,
            option_name: '<p>Dandruff</p>',
            is_exclusive: 0
          },
          {
            id: 162,
            question_id: 45,
            option_name: '<p>Sudden onset of hair loss</p>',
            is_exclusive: 0
          },
          {
            id: 163,
            question_id: 45,
            option_name: '<p>Hair loss in other parts of my body</p>',
            is_exclusive: 0
          },
          {
            id: 164,
            question_id: 45,
            option_name: '<p>Pain, itching burning on my head</p>',
            is_exclusive: 0
          },
          {
            id: 165,
            question_id: 45,
            option_name: '<p>Red rings or other rashes on the scalp</p>',
            is_exclusive: 0
          },
          {
            id: 166,
            question_id: 45,
            option_name: '<p>Other rashes on the rest of my body</p>',
            is_exclusive: 0
          },
          {
            id: 167,
            question_id: 45,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 46,
        question_set_id: 1,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Some medical conditions can cause hair loss</p>',
        title: '<p>Have you experienced any of the following? (Select all that apply)</p>',
        question_options: [
          {
            id: 168,
            question_id: 46,
            option_name: '<p><strong>Skin problems</strong> (e.g., Acne, psoriasis, Eczema)</p>',
            is_exclusive: 0
          },
          {
            id: 169,
            question_id: 46,
            option_name:
              '<p>Thyroid disease (e.g., hypo or hyper thyroidism, weight gain, lethargy, excessive sweating, hand tremor, loss of weight)</p>',
            is_exclusive: 0
          },
          {
            id: 170,
            question_id: 46,
            option_name: '<p><strong>Autoimmune disorders</strong> (e.g., SLE, skin rash, small joint pain)</p>',
            is_exclusive: 0
          },
          {
            id: 171,
            question_id: 46,
            option_name: '<p>Male breast cancer</p>',
            is_exclusive: 0
          },
          {
            id: 172,
            question_id: 46,
            option_name: '<p>Liver disease</p>',
            is_exclusive: 0
          },
          {
            id: 173,
            question_id: 46,
            option_name: '<p>Suicide ideation</p>',
            is_exclusive: 0
          },
          {
            id: 174,
            question_id: 46,
            option_name: '<p>Prostate cancer</p>',
            is_exclusive: 0
          },
          {
            id: 175,
            question_id: 46,
            option_name: '<p><strong>Erectile Dysfunction</strong> or treatment for erectile dysfunction</p>',
            is_exclusive: 0
          },
          {
            id: 176,
            question_id: 46,
            option_name: '<p>Heart problems</p>',
            is_exclusive: 0
          },
          {
            id: 177,
            question_id: 46,
            option_name: '<p>Chest pain</p>',
            is_exclusive: 0
          },
          {
            id: 178,
            question_id: 46,
            option_name: '<p>Kidney disease</p>',
            is_exclusive: 0
          },
          {
            id: 179,
            question_id: 46,
            option_name: '<p>Liver disease</p>',
            is_exclusive: 0
          },
          {
            id: 199,
            question_id: 46,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 47,
        question_set_id: 1,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Please put NA if not applicable</p>',
        title: '<p>Do you take any medications, vitamins or supplements regularly? Please list them here.</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 48,
        question_set_id: 1,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc:
          '<p>Please list the things you are allergic to, and describe your allergic reactions. Please put NA if not applicable</p>',
        title: '<p>Do you have any allergies?</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 49,
        question_set_id: 1,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Please put NA if not applicable</p>',
        title: '<p>Have you ever been treated with medication or procedures for hair loss? Please list them here.</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 51,
        question_set_id: 1,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Please put NA if not applicable</p>',
        title: '<p>Have you had any operations or hospitalizations?</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 53,
        question_set_id: 1,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Do you have any of these symptoms of mental health problems?</p>',
        question_options: [
          {
            id: 182,
            question_id: 53,
            option_name: '<p>A decrease in strength or endurance</p>',
            is_exclusive: 0
          },
          {
            id: 183,
            question_id: 53,
            option_name: '<p>A lack of energy</p>',
            is_exclusive: 0
          },
          {
            id: 200,
            question_id: 53,
            option_name: '<p>Feeling sad or grumpy most of the time</p>',
            is_exclusive: 1
          },
          {
            id: 201,
            question_id: 53,
            option_name: '<p>None of the above</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 55,
        question_set_id: 1,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Which of the following apply to you?</p>',
        question_options: [
          {
            id: 186,
            question_id: 55,
            option_name: '<p>I get less than 2 hours of exercise per week</p>',
            is_exclusive: 0
          },
          {
            id: 187,
            question_id: 55,
            option_name: '<p>I smoke or use tobacco (e.g. chewing tobacco, snuff)</p>',
            is_exclusive: 0
          },
          {
            id: 188,
            question_id: 55,
            option_name: '<p>I use other nicotine containing products (e.g. vaping)</p>',
            is_exclusive: 0
          },
          {
            id: 189,
            question_id: 55,
            option_name: '<p>I drink more than 2 alcoholic drinks per day</p>',
            is_exclusive: 0
          },
          {
            id: 190,
            question_id: 55,
            option_name: '<p>I get less than&nbsp; 7 hours of sleep per night on average.</p>',
            is_exclusive: 0
          },
          {
            id: 191,
            question_id: 55,
            option_name: "<p>I'm 10+kg overweight</p>",
            is_exclusive: 0
          },
          {
            id: 192,
            question_id: 55,
            option_name: "<p>I'm frequently under a lot of stress</p>",
            is_exclusive: 0
          },
          {
            id: 193,
            question_id: 55,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 56,
        question_set_id: 1,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>What is important to you when treating your hair loss?</p>',
        question_options: [
          {
            id: 195,
            question_id: 56,
            option_name: '<p>I want the simplest medical option possible</p>',
            is_exclusive: 0
          },
          {
            id: 196,
            question_id: 56,
            option_name: '<p>I want the most effective medical option</p>',
            is_exclusive: 0
          },
          {
            id: 197,
            question_id: 56,
            option_name: '<p>I want to use all options available</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      }
    ]
  },
  {
    id: 2,
    set_name: 'Sexual Health',
    category_id: 2,
    questions: [
      {
        id: 16,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>What seems to be the problem?</p>',
        question_options: [
          {
            id: 64,
            question_id: 16,
            option_name: '<p>Difficulty achieving erections</p>',
            is_exclusive: 0
          },
          {
            id: 65,
            question_id: 16,
            option_name: '<p>Difficulty maintaining erections</p>',
            is_exclusive: 0
          },
          {
            id: 66,
            question_id: 16,
            option_name: '<p>Both</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 17,
        question_set_id: 2,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>How often do you suffer from ED?</p>',
        question_options: [
          {
            id: 205,
            question_id: 17,
            option_name: '<p>&lt;30% of the time</p>',
            is_exclusive: 1
          },
          {
            id: 206,
            question_id: 17,
            option_name: '<p>30-60% of the time</p>',
            is_exclusive: 1
          },
          {
            id: 207,
            question_id: 17,
            option_name: '<p>&gt;60% of the time</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 18,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>How did your ED start?</p>',
        question_options: [
          {
            id: 67,
            question_id: 18,
            option_name: '<p>Suddenly</p>',
            is_exclusive: 0
          },
          {
            id: 68,
            question_id: 18,
            option_name: '<p>Gradually</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 19,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title:
          '<p>Rate the typical hardness of your erection during <span style="text-decoration: underline;">masturbation</span></p>',
        question_options: [
          {
            id: 69,
            question_id: 19,
            option_name: '<p>Penis does not enlarge</p>',
            is_exclusive: 0
          },
          {
            id: 70,
            question_id: 19,
            option_name: '<p>Penis is larger but not hard</p>',
            is_exclusive: 0
          },
          {
            id: 71,
            question_id: 19,
            option_name: '<p>Penis is hard enough for penetration, but not completely hard</p>',
            is_exclusive: 0
          },
          {
            id: 72,
            question_id: 19,
            option_name: '<p>Penis is completely hard and fully rigid</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 20,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title:
          '<p>Rate the typical hardness of your spontaneous erections in the <span style="text-decoration: underline;">middle of the night or in the morning</span></p>',
        question_options: [
          {
            id: 73,
            question_id: 20,
            option_name: '<p>Penis does not enlarge</p>',
            is_exclusive: 0
          },
          {
            id: 74,
            question_id: 20,
            option_name: '<p>Penis is larger but not hard</p>',
            is_exclusive: 0
          },
          {
            id: 75,
            question_id: 20,
            option_name: '<p>Penis is hard enough for penetration, but not completely hard</p>',
            is_exclusive: 0
          },
          {
            id: 76,
            question_id: 20,
            option_name: '<p>Penis is completely hard and fully rigid</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 21,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title:
          '<p>Rate the typical hardness of your erection with a <span style="text-decoration: underline;">sexual partner</span></p>',
        question_options: [
          {
            id: 77,
            question_id: 21,
            option_name: '<p>Penis does not enlarge</p>',
            is_exclusive: 0
          },
          {
            id: 78,
            question_id: 21,
            option_name: '<p>Penis is larger but not hard</p>',
            is_exclusive: 0
          },
          {
            id: 79,
            question_id: 21,
            option_name: '<p>Penis is hard enough for penetration, but not completely hard</p>',
            is_exclusive: 0
          },
          {
            id: 80,
            question_id: 21,
            option_name: '<p>Penis is completely hard and fully rigid</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 22,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Sometimes erectile dysfunction can be caused by mental health issues</p>',
        title: '<p>Do any of the following apply to you?</p>',
        question_options: [
          {
            id: 81,
            question_id: 22,
            option_name:
              '<p><span style="color: #202124; font-family: Roboto, Arial, sans-serif; font-variant-ligatures: none; letter-spacing: 0.2px; white-space: pre-wrap;">Feeling a lack of energy most of the time</span></p>',
            is_exclusive: 0
          },
          {
            id: 202,
            question_id: 22,
            option_name:
              '<p><span style="color: #202124; font-family: Roboto, Arial, sans-serif; font-variant-ligatures: none; letter-spacing: 0.2px; white-space: pre-wrap;">Feeling of decrease in strength and/or endurance</span></p>',
            is_exclusive: 0
          },
          {
            id: 203,
            question_id: 22,
            option_name:
              '<p><span style="color: #202124; font-family: Roboto, Arial, sans-serif; font-variant-ligatures: none; letter-spacing: 0.2px; white-space: pre-wrap;">Feeling sad and/or grumpy most of the time</span></p>',
            is_exclusive: 0
          },
          {
            id: 204,
            question_id: 22,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 25,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Have you been diagnosed with the following:&nbsp;</p>',
        question_options: [
          {
            id: 87,
            question_id: 25,
            option_name: '<p>Depression</p>',
            is_exclusive: 0
          },
          {
            id: 88,
            question_id: 25,
            option_name: '<p>Anxiety</p>',
            is_exclusive: 0
          },
          {
            id: 89,
            question_id: 25,
            option_name: '<p>Bipolar disorder</p>',
            is_exclusive: 0
          },
          {
            id: 90,
            question_id: 25,
            option_name: '<p>Schizophrenia</p>',
            is_exclusive: 0
          },
          {
            id: 91,
            question_id: 25,
            option_name: '<p>Borderline personality disorder</p>',
            is_exclusive: 0
          },
          {
            id: 92,
            question_id: 25,
            option_name: '<p>History of suicidal thoughts or plans to hurt yourself</p>',
            is_exclusive: 0
          },
          {
            id: 93,
            question_id: 25,
            option_name: '<p>Other (please elaborate at the end of the questionnaire)</p>',
            is_exclusive: 0
          },
          {
            id: 94,
            question_id: 25,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 27,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Sometimes hairloss occurs because of lifestyle factors</p>',
        title: '<p>Which of the following apply to you?</p>',
        question_options: [
          {
            id: 95,
            question_id: 27,
            option_name: '<p>I get less than 2 hours of exercise per week</p>',
            is_exclusive: 0
          },
          {
            id: 96,
            question_id: 27,
            option_name: '<p>I smoke or use tobacco (e.g. chewing tobacco, snuff)</p>',
            is_exclusive: 0
          },
          {
            id: 97,
            question_id: 27,
            option_name: '<p>I use other nicotine containing products (e.g. vaping)</p>',
            is_exclusive: 0
          },
          {
            id: 98,
            question_id: 27,
            option_name: '<p>I drink more than 2 alcoholic drinks per day</p>',
            is_exclusive: 0
          },
          {
            id: 99,
            question_id: 27,
            option_name: '<p>I get less than 7 hours of sleep per night on average</p>',
            is_exclusive: 0
          },
          {
            id: 100,
            question_id: 27,
            option_name: "<p>I'm 10+kg overweight</p>",
            is_exclusive: 0
          },
          {
            id: 101,
            question_id: 27,
            option_name: "<p>I'm frequently under a lot of stress</p>",
            is_exclusive: 0
          },
          {
            id: 102,
            question_id: 27,
            option_name: '<p>None apply to me</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 28,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Do you have any of the following?</p>',
        question_options: [
          {
            id: 103,
            question_id: 28,
            option_name: '<p>Covid 19</p>',
            is_exclusive: 0
          },
          {
            id: 104,
            question_id: 28,
            option_name: '<p>Diabetes</p>',
            is_exclusive: 0
          },
          {
            id: 105,
            question_id: 28,
            option_name: '<p>High cholesterol</p>',
            is_exclusive: 0
          },
          {
            id: 106,
            question_id: 28,
            option_name: '<p>High blood pressure</p>',
            is_exclusive: 0
          },
          {
            id: 107,
            question_id: 28,
            option_name: '<p>Sexually transmitted diseases</p>',
            is_exclusive: 0
          },
          {
            id: 108,
            question_id: 28,
            option_name: '<p>Nerve spinal cord or brain disorders</p>',
            is_exclusive: 0
          },
          {
            id: 109,
            question_id: 28,
            option_name: '<p>Eye conditions or disease</p>',
            is_exclusive: 0
          },
          {
            id: 110,
            question_id: 28,
            option_name: '<p>Stroke/blockage of arteries</p>',
            is_exclusive: 0
          },
          {
            id: 111,
            question_id: 28,
            option_name: '<p>Heart disease</p>',
            is_exclusive: 0
          },
          {
            id: 112,
            question_id: 28,
            option_name: '<p>Blood conditions or disease</p>',
            is_exclusive: 0
          },
          {
            id: 113,
            question_id: 28,
            option_name: '<p>Kidney problems</p>',
            is_exclusive: 0
          },
          {
            id: 114,
            question_id: 28,
            option_name: '<p>Liver, stomach or other gastrointestional conditions</p>',
            is_exclusive: 0
          },
          {
            id: 115,
            question_id: 28,
            option_name: '<p>Prostate problems</p>',
            is_exclusive: 0
          },
          {
            id: 116,
            question_id: 28,
            option_name:
              '<p>Penis conditions other than ED (e.g., pain when getting an erection or during ejaculation, a curved penis or tight foreskin)</p>',
            is_exclusive: 0
          },
          {
            id: 117,
            question_id: 28,
            option_name: '<p>Vascular conditions or diseases</p>',
            is_exclusive: 0
          },
          {
            id: 118,
            question_id: 28,
            option_name: '<p>Cancer</p>',
            is_exclusive: 0
          },
          {
            id: 119,
            question_id: 28,
            option_name: '<p>Other (please elaborate at the end of the questionnaire)</p>',
            is_exclusive: 0
          },
          {
            id: 120,
            question_id: 28,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 31,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Lets see if you have any cardiovascular risk factors (select all that apply)</p>',
        question_options: [
          {
            id: 121,
            question_id: 31,
            option_name: '<p>My father had a heart attack or heart disease at 55 years or younger</p>',
            is_exclusive: 0
          },
          {
            id: 122,
            question_id: 31,
            option_name: '<p>My mother had a heart attack or heart disease at 65 years or younger</p>',
            is_exclusive: 0
          },
          {
            id: 124,
            question_id: 31,
            option_name:
              '<p>Chest pain or shortness of breath when climbing 2 flights of stairs or walking 4 blocks</p>',
            is_exclusive: 0
          },
          {
            id: 125,
            question_id: 31,
            option_name: '<p>Chest pain or shortness of breath with sexual activity</p>',
            is_exclusive: 0
          },
          {
            id: 126,
            question_id: 31,
            option_name: '<p>Unexplained fainting or dizziness</p>',
            is_exclusive: 0
          },
          {
            id: 127,
            question_id: 31,
            option_name: '<p>Prolonged cramping of the legs with exercise</p>',
            is_exclusive: 0
          },
          {
            id: 128,
            question_id: 31,
            option_name: '<p>Abnormal heart beats or rhythms</p>',
            is_exclusive: 0
          },
          {
            id: 208,
            question_id: 31,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 32,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>When was your most recent in-person checkup with a healthcare provider?</p>',
        question_options: [
          {
            id: 130,
            question_id: 32,
            option_name: '<p>Within the last year</p>',
            is_exclusive: 0
          },
          {
            id: 131,
            question_id: 32,
            option_name: '<p>1-2 years ago&nbsp;</p>',
            is_exclusive: 0
          },
          {
            id: 133,
            question_id: 32,
            option_name: '<p>More than 2 years ago</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 33,
        question_set_id: 2,
        input_type_id: 1,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Have you ever been told you have high blood pressure?</p>',
        question_options: [
          {
            id: 134,
            question_id: 33,
            option_name: '<p>Yes</p>',
            is_exclusive: 0
          },
          {
            id: 135,
            question_id: 33,
            option_name: '<p>No</p>',
            is_exclusive: 0
          }
        ],
        input_type: { id: 1, type_name: 'SINGLE_CHOICE' }
      },
      {
        id: 34,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: null,
        title: '<p>Do you take any medications, vitamins or supplements regularly?</p>',
        question_options: [
          {
            id: 136,
            question_id: 34,
            option_name:
              '<p><strong>Medicines containing nitrates</strong>: Nitroglycerin spray, ointment, patches or tablets (Nitro-Dur, Nitrolingual, Nitrostat, Nitromist etc), Isosorbide mononitrate, or isosorbide dinitrate (Isordil, Dilatrate, Sorbitrate, Imdur, Ismo, Monoket',
            is_exclusive: 0
          },
          {
            id: 137,
            question_id: 34,
            option_name:
              '<p><strong>Prostate medicine: </strong>Flomax (Tamsulosin), Uroxatral (Alfuzosin), Rapaflo (Silodosin), Doxazosin (Cardura), Prazosin (Minipress), Terazosin (Hytrin)</p>',
            is_exclusive: 0
          },
          {
            id: 138,
            question_id: 34,
            option_name: '<p>Other medications (please elaborate at the end of the questionnaire)</p>',
            is_exclusive: 0
          },
          {
            id: 139,
            question_id: 34,
            option_name: '<p>None of the above</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 36,
        question_set_id: 2,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc:
          '<p>Please list the things you are allergic to, and describe your allergic reactions. Please put NA if not applicable</p>',
        title: '<p>Do you have any allergies?&nbsp;</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 37,
        question_set_id: 2,
        input_type_id: 3,
        answer_required: 1,
        option_available: 0,
        desc: '<p>&nbsp;</p>\r\n<p>&nbsp;</p>',
        title: '<p>Have you ever been treated with medication for ED?</p>',
        question_options: [
          {
            id: 140,
            question_id: 37,
            option_name: '<p>Viagra (Sildenafil)</p>',
            is_exclusive: 0
          },
          {
            id: 141,
            question_id: 37,
            option_name: '<p>Cialis (Taladafil)</p>',
            is_exclusive: 0
          },
          {
            id: 142,
            question_id: 37,
            option_name: '<p>Levitra (Vardenafil)</p>',
            is_exclusive: 0
          },
          {
            id: 143,
            question_id: 37,
            option_name: '<p>Speedra (Avanafil)</p>',
            is_exclusive: 0
          },
          {
            id: 144,
            question_id: 37,
            option_name: '<p>Others (please elaborate at the end of the questionnaire)</p>',
            is_exclusive: 0
          },
          {
            id: 145,
            question_id: 37,
            option_name: '<p>I have not been treated for ED before</p>',
            is_exclusive: 1
          }
        ],
        input_type: { id: 3, type_name: 'MULTI_CHOICE' }
      },
      {
        id: 40,
        question_set_id: 2,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: '<p>Please put NA if not applicable</p>',
        title: '<p>Have you had any operations or hospitalisations?</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      },
      {
        id: 41,
        question_set_id: 2,
        input_type_id: 2,
        answer_required: 1,
        option_available: 0,
        desc: '<p>If you answered "Other" for any of the previous questions, please elaborate here</p>',
        title:
          '<p>Is there anything else you want your doctor to know about your current medical condition(s) or overall health?</p>',
        question_options: [],
        input_type: { id: 2, type_name: 'FREE_TEXT' }
      }
    ]
  }
]
