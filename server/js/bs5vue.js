const { createApp } = Vue;

const serviceApp = createApp({
  data() {
    return {
      even_card: []
    };
  },

  methods: {
    initGsap() {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(this.$el.querySelectorAll(".col-sm-4"), {
        scrollTrigger: {
          trigger: this.$el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out"
      });
    }
  }
}).mount("#even_card");




$.ajax({
  url: "/even_card",
  method: "get",
  dataType: "json",
  success: function (result) {
    serviceApp.even_card = result;
    serviceApp.$nextTick(() => {
      serviceApp.initGsap();
    });
  },
  error: function (err) {
    console.error(err);
  }
});