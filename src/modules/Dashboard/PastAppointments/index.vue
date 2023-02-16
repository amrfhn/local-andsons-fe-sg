<script lang="jsx">
import { getOrders } from "@/api/orders";
import { formatMetaTags } from "@/utils/prettify.js";
import Table from "./Table.vue";
import moment from "moment";

export default {
  metaInfo() {
    return formatMetaTags({ title: "Appointments", urlPath: this.$route.path })
  },
  data() {
    return {
      upcomingAppointments: [],
      pastAppointments: [],
    };
  },
  mounted(){
    this.getOrders();
  },
  methods: {
    getOrders(){
      getOrders().then((response) => {
        this.orders = response.data.response.data;
        let orders = response.data.response.data;
        //Sort order by appt_date_time
        const now = moment();
        let ordersWithAppointments = orders.filter(order => order.appointment !== null);
        ordersWithAppointments.sort((a, b) => {
          return moment(b.appointment.appt_date_time).isAfter(moment(a.appointment.appt_date_time))
        })
        this.upcomingAppointments = ordersWithAppointments.filter(order =>
          moment(order.appointment.appt_date_time).isAfter(now)
        ).reverse();
        this.pastAppointments = ordersWithAppointments.filter(order =>
          moment(order.appointment.appt_date_time).isBefore(now)
        )
      });
    },
  },
  render() {
    return (
      <div>
        <div class="past-appointments-table-wrapper">
          <Table title={"Upcoming Appointments"} ordersWithAppointments={this.upcomingAppointments}/>
          <Table title={"Past Appointments"} ordersWithAppointments={this.pastAppointments}/>
        </div>
      </div>
    );
  },
};
</script>
