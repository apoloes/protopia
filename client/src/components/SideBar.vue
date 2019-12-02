<template lang="html">
  <div id="parentx">

    <vs-button @click="active=!active" color="primary" type="filled"><vs-icon icon="menu"></vs-icon></vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
                <vs-avatar  size="60px" src="https://ca.slack-edge.com/TN2RCKUVD-UMPFSAJE7-g0a95dac88e4-48"/>
<!--        <vs-avatar size="large" color="primary" icon="person"/>-->
        <h4>
          Protopia
          <!--   <vs-button color="primary" type="flat"><vs-icon icon="more-vert"></vs-icon></vs-button>-->
        </h4>

      </div>

      <div class="items-sidebar">
        <vs-sidebar-item index="1" icon="home" to="/">
          <router-link to="/">Home</router-link>
<!--          Home-->
        </vs-sidebar-item>

        <vs-sidebar-item index="2" size="medium" icon="send" to="/requests">
          <router-link to="/requests">Requests Dashboard</router-link>
<!--          Requests Dashboard-->
        </vs-sidebar-item>

        <vs-sidebar-item index="3" size="medium" icon="reply" to="/responses">
          <router-link to="/responses">Responses Dashboard</router-link>
<!--          Responses Dashboard-->
        </vs-sidebar-item>

<!--        <vs-divider position="left">-->
<!--          <vs-icon icon="person" size="medium"></vs-icon>-->
<!--        </vs-divider>-->

<!--        <vs-sidebar-item index="4" icon="verified_user">-->
<!--          Configurations-->
<!--        </vs-sidebar-item>-->
<!--        <vs-sidebar-item index="5" icon="account_box">-->
<!--          Profile-->
<!--        </vs-sidebar-item>-->
        <!--        <vs-sidebar-item index="6">-->
        <!--          Card-->
        <!--        </vs-sidebar-item>-->
      </div>
      <div class="footer-sidebar" slot="footer">
        <vs-button color="danger" type="flat"><vs-icon icon="reply">logout</vs-icon></vs-button>
        <vs-button color="primary" type="border"><vs-icon icon="settings"></vs-icon></vs-button>
      </div>

    </vs-sidebar>
    <router-view v-bind:cleanData="cleanData" ></router-view>
  </div>
</template>

<script>
    export default {
        props: ["cleanData"],
        data:()=>({
            active:false,
        })
    }
</script>

<style>
  .header-sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
  .header-sidebar h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.7em;
    color: white;
  }
  .header-sidebar h4 > button {
    margin-left: 10px;
  }
  .footer-sidebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*justify-content: center;*/
    width: 100%;
  }
  .footer-sidebar > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }

  .vs-sidebar-primary .vs-sidebar-item-active a {
    color: #9178a0 !important;
  }
</style>
