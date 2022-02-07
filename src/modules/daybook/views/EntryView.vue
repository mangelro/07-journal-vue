<template>
	<template v-if="entry">
		<article class="border no-padding left-align top-align">
		<div class="padding">
			<h5>Day book</h5>
			<span>{{ day }}</span
			>&nbsp; <span>{{ month }}</span
			>&nbsp;
			<span>{{ yearDate }}</span>
		</div>
		<nav>
			<button class="pink small"><i>delete</i><span>Borrar</span></button>
			<button class="small"><i>send</i><span>Subir todo</span></button>
		</nav>
		</article>

		<div class="field textarea label border">
		<textarea v-model="entry.text"></textarea>
		<label>¿Qué sucedió hoy?</label>
		</div>
	</template>
	<fab-button></fab-button>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex"; //computed !!!
import getDayMonthYear from "../../daybook/helpers/getDayMonthYear";

export default {
  components: {
    FabButton: defineAsyncComponent(() => import("@/components/FabButton")),
  },

  props: {
    /*
     * Es más interesante colocar los parámetros de las url´s como props
     * para acerlas mas evidentes.
     * Se cargan desde el router a través del props, pero esto sucede solo
     * al crear el componente, no cuando cambiamos la ruta
     */
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      entry: null,
    };
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),

    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDate() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },

  methods: {
    loadEntry() {
      console.log("id", this.id);

      const entry = this.getEntryById(this.id);

      if (!entry) return this.$router.push({ name: "no-entry" });

      this.entry = entry;
    },
  },
  created() {
    this.loadEntry();
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.$nextTick(() => ui());
  },
  watch: {
    id() {
      //console.log(value,oldValue)
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
button.fab {
  position: fixed;
  bottom: 120px;
  right: 120px;
}
</style>