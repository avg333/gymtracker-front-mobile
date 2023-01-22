<template>
  <q-btn-group flat>
    <q-btn flat dense round icon="remove" @click="decrement" />
    <q-btn flat dense round icon="add" @click="increment" />
  </q-btn-group>
</template>

<script>
//READY
export default {
  name: "IncrementDecrementButtons",
  emits: ["increment", "decrement", "setZero"],
  props: {
    numberValue: Number,
  },
  setup(props, { emit }) {
    function increment() {
      if (props.numberValue) {
        emit("increment");
      } else {
        emit("setZero");
        emit("increment");
      }
    }

    function decrement() {
      if (props.numberValue && props.numberValue > 0) {
        emit("decrement");
      } else {
        emit("setZero");
      }
    }

    return { increment, decrement };
  },
};
</script>
