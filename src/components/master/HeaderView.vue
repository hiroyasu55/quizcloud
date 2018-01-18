<template>
  <header id="header-view">
    <b-navbar toggleable="md" fixed="top">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="/master">
        Quiz Cloud (Master)
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item>Support</b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              User
            </template>

            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<style lang="scss">
.navbar {
  background-color: sienna;
  font-size: 1rem;
  .navbar-brand {
    color: white;
  }
  .navbar-link {
    color: white;
  }
}
</style>
