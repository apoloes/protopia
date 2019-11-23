<template>
  <!--  <div class="content-header h4 text-center pt-2 pb-3">Highlights</div>-->
  <div class="custom-card header-card card">
    <!--    <div class="card-body pb-0">-->
    <div class="content-header h4 text-center pt-2 pb-3">Highlights</div>
    <pos-neg :cleanAskData="cleanAskData"></pos-neg>
    <top-pos :cleanAskData="cleanAskData"></top-pos>
    <top-neg :cleanAskData="cleanAskData"></top-neg>
    <!--    </div>-->
  </div>
</template>

<script>
import PosNeg from "./PosNeg.vue";
import TopPos from "./TopPos.vue";
import TopNeg from "./TopNeg.vue";
export default {
  props: ["cleanAskData"],
  components: {
    "pos-neg": PosNeg,
    "top-pos": TopPos,
    "top-neg": TopNeg,
  },
};
</script>
