import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alert: {
        message: "",
        type: ""
      }
    };
  },
  methods: {
    makeAlert(msg, type = "error") {
      this.alert.message = msg;
      this.alert.type = type;
    }
  },
  computed: {
    ...mapGetters({ authId: "auth/authId", authUser: "auth/authUser" })
    // hedaerOptions() {
    //   return {
    //     headers: {
    //       token: this.isAuth
    //     }
    //   };
    // }
  }
};
