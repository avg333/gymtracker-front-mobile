<template>
  <div class="row bg-grey-1">
    <div class="col-12">
      <div class="row">
        <div class="col-11">
          {{ session.name }}
        </div>
        <div class="col-1">
          <q-btn flat dense round icon="more_vert" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { session: Object },
};
</script>
