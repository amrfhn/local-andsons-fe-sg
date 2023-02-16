<style lang="scss">
.order-title {
  font-size: 18px;
}
.order-description {
  font-size: 14px;
  margin-top: 5px;
}
.order-link {
  text-decoration: none;
  color: #fff;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-flow: row wrap;
  }
  .search {
    width: 50%;
    position: relative;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 20px;
      height: 50px;
    }
    svg {
      position: absolute;
      color: #b7b7b7;
      width: 20px;
      height: 20px;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 22px;
    }
    input {
      border: 0;
      outline: none;
      height: 70px;
      line-height: 70px;
      font-family: PublicSans, monospace;
      font-size: 20px;
      padding: 16px 32px 16px 64px;
      width: 100%;
      @media screen and (max-width: 768px) {
        height: 100%;
        font-size: 1rem;
      }

      &::placeholder {
        color: #b7b7b7;
      }
    }
  }
}
.past-appointments-table-wrapper {
  @media screen and (max-width: 768px) {
    overflow: auto;
  }
}
.past-appointments-table {
  width: 100%;
  margin-top: 32px;
  border-collapse: collapse;
  border-spacing: 0;

  td {
    background: #fff;
    padding: 16px 32px;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  thead {
    td {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 22px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
        padding: 10px 20px;
      }
      &:not(:first-child) {
        display: none;
      }
    }
  }
  tbody {
    tr {
      @media screen and (max-width: 768px) {
        display: block;
        position: relative;
      }
    }
    td {
      font-family: PublicSans, monospace;
      font-size: 18px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
        display: block;
        //width: 100%;
        padding: 10px 20px;
      }
      &.prescription-col {
        @media screen and (max-width: 768px) {
          position: absolute;
          bottom: 30px;
          right: 20px;
          display: inline-flex;
          background-color: #000 !important;
          color: #fff;
          border-radius: 4px;
        }
      }
      .order-number {
        display: inline-block;
        background: #d85639;
        border-radius: 4px;
        color: #fff;
        font-family: PublicSans, monospace;
        font-size: 15px;
        padding: 8px 16px 6px;
        margin-bottom: 8px;
        @media screen and (max-width: 768px) {
          font-size: 0.75rem;
          padding: 4px 12px;
          margin-top: 20px;
        }
      }
      .doctor {
        @media screen and (max-width: 768px) {
          font-size: 0.75rem;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        img {
          @media screen and (max-width: 768px) {
            width: 40px;
            height: 40px;
          }
        }
      }
      .doctor,
      .prescription {
        display: flex;
        align-items: center;
        img {
          margin-right: 8px;
        }
      }
      .prescription {
        text-decoration: underline;
        cursor: pointer;
        @media screen and (max-width: 768px) {
          color: #fff;
          text-decoration: none;
          font-size: 0.75rem;
        }
        img {
          @media screen and (max-width: 768px) {
            filter: invert(1);
          }
        }
      }
    }
    tr:nth-child(odd) {
      td {
        background: rgb(250, 250, 247);
      }
    }
  }
}

.submit-button {
  margin-top: unset;
  display: block;
  width: fit-content;
  text-decoration: none;
}

.add-to-calenders {
  margin-top: 20px;
  font-size: 14px;
}
</style>

<script lang="jsx">
import calendarIcon from "../../../assets/images/calendar-icon.svg";
import moment from "moment";

export default {
  props: ["ordersWithAppointments", "title"],
  methods: {
    compareDates(appointmentDate) {
      const now = moment();
      const diff = moment(appointmentDate) - now;
      const minutes = Math.floor((diff/1000)/60);
      // return true if appt date is in the future (give 1hour leeway);
      return minutes >= -60;
    },
    formatDate(date) {
      return moment(date).format('ddd Do MMM YYYY, h:mm A')
    }
  },
  render() {
    const orderDetails = (order) => (
      <div>
        {order.order_product_option_prices.map(opop => (
          <div>
            <p class="order-title">{opop.product_option_price.product_option.product.title}</p>
            <p class="order-description">{opop.product_option_price.product_option.name}</p>
          </div>
        ))}
      </div>
    )

    const formatDateGoogle = (datetime) => {
      const startDate = moment(datetime).format('YYYYMMDD[T]HHmmss');
      const endDate = moment(datetime).add(1, 'hours').format('YYYYMMDD[T]HHmmss');
      return `${startDate}+8/${endDate}+8`
    }
    const formatDateMicrosoft = (datetime) => {
      const startDate = moment(datetime).format('YYYY-MM-DD[T]HH:mm:ss');
      const endDate = moment(datetime).add(1, 'hours').format('YYYY-MM-DD[T]HH:mm:ss');
      return {startDate, endDate}
    }

    const formatCalendarLink = (datetime, videoLink, type) => {
      const dates = formatDateGoogle(datetime);
      const {startDate, endDate} = formatDateMicrosoft(datetime);
      const encodedLink = encodeURI(videoLink);
      const details = `Please%20make%20sure%20you%20join%20the%20video%20consultation%20link%20at%20least%205%20minutes%20before.%0A%0AVideo%20Consultation%20Link%3A%20${encodedLink}%20%0A`;

      if (type == 'google') {
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${dates}&details=${details}&location=${encodedLink}&text=Consultation%20with%20andSons%27%20Doctor`
      } else if (type == 'microsoft') {
        return `https://outlook.live.com/calendar/0/deeplink/compose?body=${details}&enddt=${encodeURI(endDate)}&location=${encodedLink}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${encodeURI(startDate)}&subject=Consultation%20with%20andSons%27%20Doctor`
      }
    }

    return (
      <table class="past-appointments-table">
        <thead>
          <th>
            <td>{this.title}</td>
            <td>Date</td>
            <td>Doctor</td>
            <td />
          </th>
        </thead>
        <tbody>
          {this.ordersWithAppointments.length < 1 && (
            <tr>
              <td/><td>There are no appointments.</td><td/><td/>
            </tr>
          )}
          {this.ordersWithAppointments.map((order) => (
            <tr>
              <td>
                <div>
                  <img src={calendarIcon} /> {this.formatDate(order.appointment.appt_date_time)}
                </div>
                {this.compareDates(order.appointment.appt_date_time) && (
                  <div class="add-to-calenders">
                    <p>Add to: </p>
                    <a
                      target="_blank"
                      href={formatCalendarLink(order.appointment.appt_date_time, order.appointment.remedi_link, 'google')}>
                      Google Calendar
                    </a>&nbsp;&nbsp;
                    <a
                      target="_blank"
                      href={formatCalendarLink(order.appointment.appt_date_time, order.appointment.remedi_link, 'microsoft')}>
                      Microsoft Outlook
                    </a>
                  </div>
                )}
              </td>
              <td>
                <div class="order-number">
                  <router-link
                    class="order-link"
                    to={`/dashboard/orders/${order.id}`}>
                    Order #{order.reference}
                  </router-link>
                </div>
                <div>
                  {orderDetails(order)}
                </div>
              </td>
              <td>
                {this.compareDates(order.appointment.appt_date_time) && (
                  <div>
                    <a href={order.appointment.remedi_link} target="_blank" class="submit-button inverted">
                      Access video consultation
                    </a><br/>
                  </div>
                )}
                {!this.compareDates(order.appointment.appt_date_time) && (
                  <p>
                    Video consultation link is no longer available.
                  </p>
                )}
              </td>
              {/*<td class="prescription-col">
                <a class="prescription">
                  <img src={downloadImage} />
                  Prescription
                </a>
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
</script>
